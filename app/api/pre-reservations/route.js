export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { createServerClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

// GET - 사전예약 목록 조회 (관리자만)
export async function GET(request) {
  try {
    // 관리자 인증 확인
    const admin = await getAuthenticatedAdmin();
    
    if (!admin || admin.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const sort = searchParams.get('sort') || 'latest';
    const limit = parseInt(searchParams.get('limit') || '50');

    const supabase = createServerClient();

    let query = supabase
      .from('pre_reservations')
      .select('*');

    // 필터
    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    // 정렬
    if (sort === 'latest') {
      query = query.order('created_at', { ascending: false });
    } else if (sort === 'oldest') {
      query = query.order('created_at', { ascending: true });
    } else if (sort === 'name') {
      query = query.order('name', { ascending: true });
    }

    // 제한
    query = query.limit(limit);

    const { data, error } = await query;

    if (error) throw error;

    return Response.json({ data });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - 사전예약 생성 (누구나)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, type } = body;

    // 유효성 검사
    if (!name || !phone || !type) {
      return Response.json({ error: '이름, 전화번호, 유형은 필수입니다.' }, { status: 400 });
    }

    if (!['클라이언트', '소속사', '프리랜서'].includes(type)) {
      return Response.json({ error: '유효하지 않은 유형입니다.' }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('pre_reservations')
      .insert([{
        name: name.trim(),
        phone: phone.trim(),
        type
      }])
      .select()
      .single();

    if (error) throw error;

    return Response.json({ data }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

