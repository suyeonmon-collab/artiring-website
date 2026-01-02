import Link from 'next/link';

export const metadata = {
  title: '개인정보처리방침 - 아티링',
  description: '아티링의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container-narrow">
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            개인정보처리방침
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            시행일: 2026년 1월 1일
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. 수집하는 개인정보</h2>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>• 회원가입: 이름, 이메일, 전화번호, 유형(클라이언트/소속사/프리랜서)</li>
              <li>• 서비스 이용: 프로젝트 정보, 포트폴리오, 계약 내역</li>
              <li>• 자동 수집: 접속 IP, 쿠키, 이용 기록</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. 이용 목적</h2>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>• 회원 관리 및 서비스 제공</li>
              <li>• 프리랜서-클라이언트 매칭</li>
              <li>• 계약 및 정산 처리</li>
              <li>• 공지사항 전달</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. 보유 기간</h2>
            <p className="text-[var(--color-text-secondary)]">
              회원 탈퇴 시까지 (단, 관계 법령에 따라 일부 정보는 최대 5년 보관)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. 제3자 제공</h2>
            <p className="text-[var(--color-text-secondary)]">
              원칙적으로 제공하지 않으며, 매칭 성사 시 상대방에게 필요 최소 정보만 제공됩니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. 권리</h2>
            <p className="text-[var(--color-text-secondary)] mb-2">
              정보 열람, 수정, 삭제, 처리정지 요구 가능
            </p>
            <p className="text-[var(--color-text-secondary)]">
              문의: <a href="mailto:sy@artiring.com" className="text-[var(--color-point)] hover:underline">sy@artiring.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

