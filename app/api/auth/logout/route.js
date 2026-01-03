export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { cookies } from 'next/headers';

// POST - 로그아웃
export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // 세션 쿠키 삭제
    cookieStore.delete('admin_session');

    return Response.json({ 
      success: true, 
      message: '로그아웃되었습니다.' 
    });

  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { error: '로그아웃 중 오류가 발생했습니다.' }, 
      { status: 500 }
    );
  }
}
