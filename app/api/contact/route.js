import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// 문의 등록 (누구나 가능)
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, name, email, company, phone, subject, message } = body;

    // 필수 필드 검증
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 파트너십 문의일 경우 회사명 필수
    if (type === 'partnership' && !company) {
      return NextResponse.json(
        { error: '파트너십 문의는 회사/기관명이 필수입니다.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient(request);

    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        type: type || 'general',
        name,
        email,
        company: company || null,
        phone: phone || null,
        subject,
        message,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Insert inquiry error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다.',
      data: { id: data.id }
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: '문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

// 문의 목록 조회 (관리자 전용)
export async function GET(request) {
  try {
    // 관리자 인증 확인
    const sessionHeader = request.headers.get('x-admin-session');
    if (!sessionHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let session;
    try {
      session = JSON.parse(sessionHeader);
    } catch {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    if (!session.userId || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 세션 만료 확인
    if (session.exp && session.exp < Date.now()) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const supabase = createServerClient(request);

    let query = supabase
      .from('contact_inquiries')
      .select('*', { count: 'exact' });

    // 필터 적용
    if (status) {
      query = query.eq('status', status);
    }
    if (type) {
      query = query.eq('type', type);
    }

    // 정렬 및 페이지네이션
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Fetch inquiries error:', error);
      throw error;
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}






