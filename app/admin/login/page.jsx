'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '로그인에 실패했습니다.');
      }

      // 세션 정보 저장
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        // 세션 토큰이 있으면 저장
        if (data.session?.access_token) {
          localStorage.setItem('access_token', data.session.access_token);
        }
      }

      // 관리자 대시보드로 이동
      router.push('/admin/dashboard');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="login-form">
        {/* 타이틀 */}
        <h1 className="login-title">
          ARTIRING Admin
        </h1>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-3 text-sm text-[var(--color-error)] bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {/* 이메일 */}
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@artiring.com"
              required
              autoComplete="email"
            />
          </div>

          {/* 비밀번호 */}
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[var(--color-text-secondary)]">
          관리자 전용 페이지입니다.
        </p>
      </div>
    </div>
  );
}
