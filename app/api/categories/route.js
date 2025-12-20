export const runtime = 'nodejs';

import { createServerComponentClient } from '@/lib/supabase';

// GET - 카테고리 목록 조회
export async function GET() {
  try {
    const supabase = createServerComponentClient();

    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    return Response.json({ data });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

