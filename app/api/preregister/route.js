import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PHONE_REGEX = /^01[0-9]{8,9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, agreedPrivacy } = body;

    if (!agreedPrivacy) {
      return NextResponse.json(
        { error: '개인정보 수집에 동의해주세요.' },
        { status: 400 }
      );
    }

    const trimmedName = String(name || '').trim();
    if (!trimmedName) {
      return NextResponse.json(
        { error: '이름을 입력해주세요.' },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);
    if (!PHONE_REGEX.test(normalizedPhone)) {
      return NextResponse.json(
        { error: '올바른 연락처 형식이 아니에요. (예: 010-1234-5678)' },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email || '').trim();
    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아니에요.' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const { error: insertError } = await supabase.from('pre_reservations').insert({
      name: trimmedName,
      phone: normalizedPhone,
      email: trimmedEmail || null,
      agreed_privacy: true,
    });

    if (insertError) {
      console.error('[preregister] insert failed:', insertError);
      return NextResponse.json(
        { error: '신청 저장에 실패했어요. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    let count = null;
    const { data: total, error: countError } = await supabase.rpc('pre_reservations_count');

    if (countError) {
      console.error('[preregister] count failed:', countError);
    } else if (typeof total === 'number') {
      count = total;
    }

    return NextResponse.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error('[preregister] unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
