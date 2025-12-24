import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// 단일 문의 조회
export async function GET(request, { params }) {
  try {
    const { id } = params;

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

    const supabase = createServerClient(request);

    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Get inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiry' },
      { status: 500 }
    );
  }
}

// 문의 상태 업데이트
export async function PATCH(request, { params }) {
  try {
    const { id } = params;

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

    const body = await request.json();
    const { status, admin_note } = body;

    const supabase = createServerClient(request);

    const updateData = {};
    if (status) updateData.status = status;
    if (admin_note !== undefined) updateData.admin_note = admin_note;

    const { data, error } = await supabase
      .from('contact_inquiries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

// 문의 삭제
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

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

    const supabase = createServerClient(request);

    const { error } = await supabase
      .from('contact_inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}








