export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { createServerClient, createServerComponentClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

// GET - 글 목록 조회 (공개)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sort = searchParams.get('sort') || 'latest';
    const status = searchParams.get('status'); // admin용
    const offset = (page - 1) * limit;

    const supabase = createServerComponentClient();

    let query = supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        slug,
        summary,
        thumbnail_url,
        status,
        published_at,
        view_count,
        created_at,
        updated_at,
        blog_categories (
          id,
          name,
          slug
        ),
        author:blog_admins (
          id,
          name
        )
      `, { count: 'exact' });

    // 상태 필터 (기본: 발행된 글만)
    if (status === 'all') {
      // admin용: 모든 글 (인증 필요)
    } else if (status) {
      query = query.eq('status', status);
    } else {
      query = query.eq('status', 'published');
    }

    // 카테고리 필터
    if (category) {
      query = query.eq('category_id', category);
    }

    // 검색 필터
    if (search) {
      query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
    }

    // 정렬
    if (sort === 'oldest') {
      query = query.order('published_at', { ascending: true, nullsFirst: false });
    } else if (sort === 'views') {
      query = query.order('view_count', { ascending: false });
    } else {
      // latest (기본)
      query = query.order('published_at', { ascending: false, nullsFirst: false });
    }

    // 페이지네이션
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    // 태그 필터 (별도 쿼리 필요)
    let filteredData = data;
    if (tag && data) {
      const postIds = data.map(p => p.id);
      const { data: taggedPosts } = await supabase
        .from('blog_post_tags')
        .select('post_id')
        .eq('tag_id', tag)
        .in('post_id', postIds);

      if (taggedPosts) {
        const taggedPostIds = new Set(taggedPosts.map(pt => pt.post_id));
        filteredData = data.filter(p => taggedPostIds.has(p.id));
      }
    }

    return Response.json({
      data: filteredData,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - 글 작성 (관리자만)
export async function POST(request) {
  try {
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

    // 2. 입력 검증
    if (!body.title || !body.content || !body.content_html) {
      return Response.json(
        { error: 'Missing required fields: title, content, content_html' },
        { status: 400 }
      );
    }

    // 3. slug 생성
    const baseSlug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    // 4. 썸네일 자동 할당 (없을 경우 랜덤 캐릭터)
    let thumbnailUrl = body.thumbnail_url;
    if (!thumbnailUrl) {
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

    // 5. 게시글 생성
    const postData = {
      title: body.title,
      slug: body.slug || slug,
      content: body.content,
      content_html: body.content_html,
      html_file: body.html_file || null, // iframe HTML 파일명
      summary: body.summary || null,
      thumbnail_url: thumbnailUrl,
      category_id: body.category_id || null,
      author_id: admin.id,
      status: body.status || 'draft',
      published_at: body.status === 'published' ? new Date().toISOString() : null,
      scheduled_at: body.scheduled_at || null
    };

    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();

    if (postError) throw postError;

    // 6. 태그 연결
    if (body.tags && body.tags.length > 0) {
      const postTags = body.tags.map(tagId => ({
        post_id: post.id,
        tag_id: tagId
      }));

      const { error: tagError } = await supabase
        .from('blog_post_tags')
        .insert(postTags);

      if (tagError) {
        console.error('Tag insertion error:', tagError);
      }
    }

    return Response.json({ data: post }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
