export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { createServerClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// POST - 관리자 로그인
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // blog_admins 테이블에서 사용자 조회
    const { data: admin, error } = await supabase
      .from('blog_admins')
      .select('id, email, password_hash, name, role')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return Response.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 검증
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);

    if (!isValidPassword) {
      return Response.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // 세션 토큰 생성 (간단한 방식)
    const sessionToken = Buffer.from(
      JSON.stringify({
        userId: admin.id,
        email: admin.email,
        role: admin.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7일 후 만료
      })
    ).toString('base64');

    // 쿠키에 세션 저장
    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7일
      path: '/'
    });

    return Response.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
