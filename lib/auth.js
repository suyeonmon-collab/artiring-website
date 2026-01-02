import { cookies } from 'next/headers';
import { createServerClient } from './supabase';

// 현재 로그인된 관리자 정보 가져오기
export async function getAuthenticatedAdmin() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie?.value) {
      return null;
    }

    // 세션 토큰 디코딩
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
    );

    // 만료 확인
    if (sessionData.exp < Date.now()) {
      return null;
    }

    // 사용자 정보 조회
    const supabase = createServerClient();
    const { data: admin, error } = await supabase
      .from('blog_admins')
      .select('id, email, name, role')
      .eq('id', sessionData.userId)
      .single();

    if (error || !admin) {
      return null;
    }

    return admin;

  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
}

// 관리자 권한 확인
export async function requireAdmin() {
  const admin = await getAuthenticatedAdmin();
  
  if (!admin) {
    throw new Error('Unauthorized');
  }
  
  if (admin.role !== 'admin') {
    throw new Error('Forbidden');
  }
  
  return admin;
}













