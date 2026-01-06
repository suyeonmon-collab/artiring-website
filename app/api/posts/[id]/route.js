export const runtime = 'nodejs';

import { createServerClient, createServerComponentClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

// GET - 글 상세 조회
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const supabase = createServerComponentClient();

    // slug 또는 id로 조회
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          id,
          name,
          slug,
          description
        ),
        author:blog_admins (
          id,
          name
        )
      `);

    // UUID 형식인지 확인
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (isUuid) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data: post, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return Response.json({ error: 'Post not found' }, { status: 404 });
      }
      throw error;
    }

    // 태그 조회
    const { data: postTags } = await supabase
      .from('blog_post_tags')
      .select(`
        blog_tags (
          id,
          name,
          slug
        )
      `)
      .eq('post_id', post.id);

    // 이전/다음 글 조회
    const { data: prevPost } = await supabase
      .from('blog_posts')
      .select('id, title, slug, thumbnail_url')
      .eq('status', 'published')
      .lt('published_at', post.published_at)
      .order('published_at', { ascending: false })
      .limit(1)
      .single();

    const { data: nextPost } = await supabase
      .from('blog_posts')
      .select('id, title, slug, thumbnail_url')
      .eq('status', 'published')
      .gt('published_at', post.published_at)
      .order('published_at', { ascending: true })
      .limit(1)
      .single();

    return Response.json({
      data: {
        ...post,
        tags: postTags?.map(pt => pt.blog_tags).filter(Boolean) || [],
        prevPost: prevPost || null,
        nextPost: nextPost || null
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT - 글 수정 (관리자만)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    // 1. 관리자 인증 확인
    const admin = await getAuthenticatedAdmin();

    if (!admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (admin.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createServerClient();
    const body = await request.json();

    // 2. 기존 글 확인
    const { data: existingPost, error: findError } = await supabase
      .from('blog_posts')
      .select('id, status, published_at')
      .eq('id', id)
      .single();

    if (findError || !existingPost) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    // 3. 썸네일 자동 할당 (없을 경우 랜덤 캐릭터)
    let thumbnailUrl = body.thumbnail_url;
    if (body.thumbnail_url === undefined) {
      // 업데이트하지 않음
    } else if (!body.thumbnail_url) {
      // 빈 문자열이면 랜덤 캐릭터 할당
      const characterImages = [
        '/images/character1.jpg',
        '/images/character2.jpg',
        '/images/character3.jpg',
        '/images/character4.jpg',
        '/images/character5.jpg',
        '/images/character6.jpg',
        '/images/character7.jpg',
        '/images/character8.jpg',
        '/images/character9.jpg',
      ];
      const randomIndex = Math.floor(Math.random() * characterImages.length);
      thumbnailUrl = characterImages[randomIndex];
    }

    // 4. 업데이트 데이터 구성
    const updateData = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.content_html !== undefined) updateData.content_html = body.content_html;
    if (body.summary !== undefined) updateData.summary = body.summary;
    if (body.thumbnail_url !== undefined) updateData.thumbnail_url = thumbnailUrl;
    if (body.category_id !== undefined) updateData.category_id = body.category_id;

    // 상태 변경 처리
    if (body.status !== undefined) {
      updateData.status = body.status;

      // draft -> published 전환 시 published_at 설정
      if (body.status === 'published' && !existingPost.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    if (body.scheduled_at !== undefined) {
      updateData.scheduled_at = body.scheduled_at;
    }

    // 4. 게시글 업데이트
    const { data: post, error: updateError } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    // 5. 태그 업데이트 (있는 경우)
    if (body.tags !== undefined) {
      // 기존 태그 삭제
      await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', id);

      // 새 태그 추가
      if (body.tags && body.tags.length > 0) {
        const postTags = body.tags.map(tagId => ({
          post_id: id,
          tag_id: tagId
        }));

        await supabase
          .from('blog_post_tags')
          .insert(postTags);
      }
    }

    return Response.json({ data: post });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - 글 삭제 (관리자만)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // 1. 관리자 인증 확인
    const admin = await getAuthenticatedAdmin();

    if (!admin) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (admin.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createServerClient();

    // 2. 글 삭제 (cascade로 post_tags도 자동 삭제됨)
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    return Response.json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
