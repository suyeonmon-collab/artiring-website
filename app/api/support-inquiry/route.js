import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { isUrgentInquiry, isValidDetailType } from '@/lib/support/inquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TYPES = new Set(['user', 'artist', 'non_user']);
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_SCREENSHOTS = 3;
const MAX_FILE_BYTES = 2 * 1024 * 1024;

function extensionForMime(mime) {
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/gif') return 'gif';
  return 'jpg';
}

async function parseBody(request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    const screenshots = form
      .getAll('screenshots')
      .filter((item) => item && typeof item === 'object' && 'arrayBuffer' in item);

    return {
      type: String(form.get('type') || ''),
      detailType: String(form.get('detailType') || ''),
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      title: String(form.get('title') || ''),
      body: String(form.get('body') || ''),
      screenName: String(form.get('screenName') || ''),
      artistOrCharacterName: String(form.get('artistOrCharacterName') || ''),
      organization: String(form.get('organization') || ''),
      agreedPrivacy: form.get('agreedPrivacy') === 'true' || form.get('agreedPrivacy') === 'on',
      screenshotFiles: screenshots,
    };
  }

  const json = await request.json();
  return {
    type: String(json.type || ''),
    detailType: String(json.detailType || ''),
    name: String(json.name || ''),
    email: String(json.email || ''),
    title: String(json.title || ''),
    body: String(json.body || ''),
    screenName: String(json.screenName || ''),
    artistOrCharacterName: String(json.artistOrCharacterName || ''),
    organization: String(json.organization || ''),
    agreedPrivacy: Boolean(json.agreedPrivacy),
    screenshotFiles: [],
  };
}

export async function POST(request) {
  try {
    const payload = await parseBody(request);

    if (!payload.agreedPrivacy) {
      return NextResponse.json(
        { error: '개인정보 수집에 동의해주세요.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(payload.type)) {
      return NextResponse.json(
        { error: '문의 유형을 선택해주세요.' },
        { status: 400 }
      );
    }

    if (!isValidDetailType(payload.type, payload.detailType)) {
      return NextResponse.json(
        { error: '문의 세부 유형을 선택해주세요.' },
        { status: 400 }
      );
    }

    const name = payload.name.trim();
    if (!name) {
      return NextResponse.json({ error: '이름을 입력해주세요.' }, { status: 400 });
    }

    const email = payload.email.trim();
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일을 입력해주세요.' },
        { status: 400 }
      );
    }

    const title = payload.title.trim();
    if (!title) {
      return NextResponse.json({ error: '문의 제목을 입력해주세요.' }, { status: 400 });
    }

    const body = payload.body.trim();
    if (body.length < 10) {
      return NextResponse.json(
        { error: '문의 내용은 10자 이상 입력해주세요.' },
        { status: 400 }
      );
    }

    if (payload.screenshotFiles.length > MAX_SCREENSHOTS) {
      return NextResponse.json(
        { error: '스크린샷은 최대 3장까지 첨부할 수 있어요.' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const screenshotUrls = [];

    for (const file of payload.screenshotFiles) {
      const mime = file.type || '';
      if (!ALLOWED_MIME.has(mime)) {
        return NextResponse.json(
          { error: '이미지만 첨부할 수 있어요. (jpg, png, webp, gif)' },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: '스크린샷은 장당 2MB 이하로 첨부해주세요.' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const path = `${payload.type}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extensionForMime(mime)}`;

      const { error: uploadError } = await supabase.storage
        .from('website-support-inquiries')
        .upload(path, buffer, {
          contentType: mime,
          upsert: false,
        });

      if (uploadError) {
        console.error('[support-inquiry] upload failed:', uploadError);
        return NextResponse.json(
          { error: '스크린샷 업로드에 실패했어요. 잠시 후 다시 시도해주세요.' },
          { status: 500 }
        );
      }

      const { data: publicData } = supabase.storage
        .from('website-support-inquiries')
        .getPublicUrl(path);

      if (publicData?.publicUrl) {
        screenshotUrls.push(publicData.publicUrl);
      }
    }

    const isUrgent = isUrgentInquiry(payload.type, payload.detailType);

    const row = {
      type: payload.type,
      detail_type: payload.detailType,
      is_urgent: isUrgent,
      name,
      email,
      title,
      body,
      screen_name:
        payload.type === 'user' ? payload.screenName.trim() || null : null,
      artist_or_character_name:
        payload.type === 'artist'
          ? payload.artistOrCharacterName.trim() || null
          : null,
      organization:
        payload.type === 'non_user' ? payload.organization.trim() || null : null,
      screenshot_urls: payload.type === 'user' ? screenshotUrls : [],
      agreed_privacy: true,
    };

    const { error: insertError } = await supabase.from('support_inquiries').insert(row);

    if (insertError) {
      console.error('[support-inquiry] insert failed:', insertError);
      return NextResponse.json(
        { error: '문의 접수에 실패했어요. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, isUrgent });
  } catch (error) {
    console.error('[support-inquiry] unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
