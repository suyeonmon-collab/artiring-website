export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { createServerClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

// DELETE - 태그 삭제 (관리자만)
export async function DELETE(request, { params }) {
  try {
    // 관리자 인증 확인
    const admin = await getAuthenticatedAdmin();
    
    if (!admin || admin.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const supabase = createServerClient();

    // 먼저 태그가 사용 중인지 확인
    const { data: postTags, error: checkError } = await supabase
      .from('blog_post_tags')
      .select('*')
      .eq('tag_id', id)
      .limit(1);

    if (checkError) throw checkError;

    if (postTags && postTags.length > 0) {
      return Response.json({ 
        error: '이 태그는 사용 중이어서 삭제할 수 없습니다.' 
      }, { status: 400 });
    }

    // 태그 삭제
    const { error } = await supabase
      .from('blog_tags')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return Response.json({ success: true });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

