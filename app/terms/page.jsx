import Link from 'next/link';

export const metadata = {
  title: '이용약관 - 아티링',
  description: '아티링의 이용약관입니다.',
};

export default function TermsPage() {
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
            이용약관
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            시행일: 2026년 1월 1일
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. 서비스 내용</h2>
            <p className="text-[var(--color-text-secondary)]">
              아티링은 디자이너·아티스트와 클라이언트를 연결하는 소속사 기반 플랫폼입니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. 회원 가입</h2>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>• 만 19세 이상 가입 가능</li>
              <li>• 정확한 정보 입력 필수</li>
              <li>• 허위 정보 제공 시 탈퇴 조치</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. 수수료</h2>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>• 프리랜서: 프로젝트 금액의 5%</li>
              <li>• 변경 시 30일 전 공지</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. 금지 행위</h2>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>• 타인 명의 도용</li>
              <li>• 플랫폼 외 직거래 유도</li>
              <li>• 허위 정보 게시</li>
              <li>• 저작권 침해</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. 책임</h2>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>• 매칭 서비스만 제공, 계약 당사자는 회원 간</li>
              <li>• 분쟁 발생 시 중재 지원</li>
              <li>• 서비스 장애 시 48시간 내 복구 노력</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. 해지</h2>
            <p className="text-[var(--color-text-secondary)]">
              회원은 언제든 탈퇴 가능, 진행 중 프로젝트는 완료 후 가능
            </p>
          </section>

          <section className="mb-8">
            <p className="text-[var(--color-text-secondary)]">
              문의: <a href="mailto:sy@artiring.com" className="text-[var(--color-point)] hover:underline">sy@artiring.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

