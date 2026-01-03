export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

// GET - 현재 세션 확인
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie?.value) {
      return Response.json({ user: null, authenticated: false });
    }

    // 세션 토큰 디코딩
    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
      );

      // 만료 확인
      if (sessionData.exp < Date.now()) {
        return Response.json({ user: null, authenticated: false, reason: 'expired' });
      }

      // 사용자 정보 조회
      const supabase = createServerClient();
      const { data: admin, error } = await supabase
        .from('blog_admins')
        .select('id, email, name, role')
        .eq('id', sessionData.userId)
        .single();

      if (error || !admin) {
        return Response.json({ user: null, authenticated: false });
      }

      return Response.json({
        user: admin,
        authenticated: true
      });

    } catch (parseError) {
      return Response.json({ user: null, authenticated: false, reason: 'invalid_token' });
    }

  } catch (error) {
    console.error('Session error:', error);
    return Response.json({ user: null, authenticated: false, error: error.message });
  }
}
