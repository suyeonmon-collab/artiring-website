export const runtime = 'nodejs';

import { createServerClient } from '@/lib/supabase';

// POST - 조회수 증가
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const supabase = createServerClient();

    // slug로 조회수 증가 시도
    const { error } = await supabase.rpc('increment_blog_post_view_count', {
      post_slug: id
    });

    if (error) {
      // RPC 함수가 없으면 직접 업데이트
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      const column = isUuid ? 'id' : 'slug';
      
      // 먼저 현재 조회수를 가져옴
      const { data: post, error: fetchError } = await supabase
        .from('blog_posts')
        .select('view_count')
        .eq(column, id)
        .single();
      
      if (fetchError) {
        console.log('View count fetch error:', fetchError);
        return Response.json({ success: false, error: 'Post not found' }, { status: 404 });
      }

      // 조회수 +1 업데이트
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ view_count: (post.view_count || 0) + 1 })
        .eq(column, id);
      
      if (updateError) {
        console.log('View count update error:', updateError);
      }
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

