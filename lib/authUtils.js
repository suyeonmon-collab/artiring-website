// 클라이언트 측에서 인증 헤더를 가져오는 유틸리티 함수

export function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  
  const user = localStorage.getItem('user');
  if (!user) return {};
  
  try {
    const userData = JSON.parse(user);
    // 세션 정보를 헤더로 전달
    return {
      'x-admin-session': JSON.stringify({
        userId: userData.id,
        email: userData.email,
        role: userData.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7일 후 만료
      })
    };
  } catch {
    return {};
  }
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const user = localStorage.getItem('user');
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    return userData.role === 'admin';
  } catch {
    return false;
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}












