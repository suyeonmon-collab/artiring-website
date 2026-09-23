import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PHONE_REGEX = /^01[0-9]{8,9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/i;

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, portfolioUrl, characterIntro, agreedPrivacy } = body;

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
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: '올바른 이메일을 입력해주세요.' },
        { status: 400 }
      );
    }

    const trimmedPortfolio = String(portfolioUrl || '').trim();
    if (!trimmedPortfolio || !URL_REGEX.test(trimmedPortfolio)) {
      return NextResponse.json(
        { error: '포트폴리오 링크는 http:// 또는 https://로 시작해야 해요.' },
        { status: 400 }
      );
    }

    const trimmedIntro = String(characterIntro || '').trim();
    if (!trimmedIntro) {
      return NextResponse.json(
        { error: '캐릭터 소개를 입력해주세요.' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const { error: insertError } = await supabase.from('pre_reservations').insert({
      type: 'artist',
      name: trimmedName,
      phone: normalizedPhone,
      email: trimmedEmail,
      portfolio_url: trimmedPortfolio,
      character_intro: trimmedIntro,
      agreed_privacy: true,
    });

    if (insertError) {
      console.error('[artist-apply] insert failed:', insertError);
      return NextResponse.json(
        { error: '신청 저장에 실패했어요. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[artist-apply] unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
