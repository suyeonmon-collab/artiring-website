export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { createServerClient, createServerComponentClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

// GET - 태그 목록 조회
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const withCount = searchParams.get('withCount') === 'true';

    const supabase = createServerComponentClient();

    if (withCount) {
      // 사용 빈도와 함께 조회
      const { data, error } = await supabase
        .from('blog_tags')
        .select(`
          *,
          blog_post_tags (count)
        `)
        .order('name', { ascending: true });

      if (error) throw error;

      const tagsWithCount = data.map(tag => ({
        ...tag,
        postCount: tag.blog_post_tags?.[0]?.count || 0
      }));

      // 사용 빈도순 정렬
      tagsWithCount.sort((a, b) => b.postCount - a.postCount);

      return Response.json({ data: tagsWithCount });
    } else {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      return Response.json({ data });
    }

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - 태그 생성 (관리자만)
export async function POST(request) {
  try {
    // 1. 관리자 인증 확인 (쿠키 기반)
    let admin = await getAuthenticatedAdmin();

    // 쿠키 인증 실패 시 헤더에서 세션 정보 확인 (fallback)
    if (!admin) {
      const authHeader = request.headers.get('x-admin-session');
      if (authHeader) {
        try {
          const sessionData = JSON.parse(authHeader);
          if (sessionData.role === 'admin' && sessionData.exp > Date.now()) {
            admin = sessionData;
          }
        } catch (e) {
          console.log('Session header parse error:', e);
        }
      }
    }

    if (!admin) {
      console.log('Tags POST: No admin found');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (admin.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const supabase = createServerClient();
    const body = await request.json();

    if (!body.name) {
      return Response.json({ error: 'Tag name is required' }, { status: 400 });
    }

    // 2. slug 생성
    const slug = body.name
      .toLowerCase()
      .trim()
      .replace(/[^\w가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // 3. 태그 생성
    const { data: tag, error } = await supabase
      .from('blog_tags')
      .insert([{
        name: body.name,
        slug: slug || body.name
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        // 중복 태그 - 기존 태그 반환
        const { data: existingTag } = await supabase
          .from('blog_tags')
          .select('*')
          .eq('name', body.name)
          .single();
        
        if (existingTag) {
          return Response.json({ data: existingTag, exists: true }, { status: 200 });
        }
        return Response.json({ error: 'Tag already exists' }, { status: 409 });
      }
      throw error;
    }

    return Response.json({ data: tag }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

