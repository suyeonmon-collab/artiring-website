import Link from 'next/link';
import { formatDate } from '@/lib/utils';

// 조회수 높은 상위 3개 기록 가져오기
async function getTopRecords() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/posts?sort=views&limit=3`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch top records');
      return [];
    }
    
    const result = await response.json();
    return result?.data || [];
  } catch (error) {
    console.error('Error fetching top records:', error);
    return [];
  }
}

// 문제 정의 아이콘
const problemIcons = {
  dropout: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  matching: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  management: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

// 핵심 구조 아이콘
const coreIcons = {
  agency: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  backup: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  integration: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
};

export const metadata = {
  title: '아티링 - 프리랜서를 구조로 연결합니다',
  description: '아티링은 프리랜서를 소속사 단위로 조직화하고, 백업 인력 구조와 통합 관리 시스템을 통해 프로젝트의 안정성을 높이는 인력 관리 플랫폼입니다.',
  openGraph: {
    title: '아티링 - 프리랜서를 구조로 연결합니다',
    description: '프로젝트는 지속 가능한 구조 위에서 완성되어야 합니다.',
    type: 'website',
  },
};

export default async function HomePage() {
  const topRecords = await getTopRecords();
  
  return (
    <div>
      {/* Section 1: Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
            프리랜서를 개인이 아닌
            <br />
            구조로 연결합니다.
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            프로젝트는 사람 한 명이 아니라,
            <br className="hidden md:block" />
            지속 가능한 구조 위에서 완성되어야 한다고 생각합니다.
          </p>
          <div className="mt-8 flex gap-6">
            <Link href="/structure" className="text-link text-base">
              구조 보기
            </Link>
            <Link href="/records" className="text-link text-base">
              기록 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: 문제 정의 */}
      <section className="section bg-[var(--color-bg-sub)]">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            왜 프리랜서 프로젝트가
            <br />
            일반 대행사보다 신뢰성이 떨어질까요?
          </h2>
          
          <div className="mt-12 space-y-10">
            {/* 문제 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[var(--color-point)] border border-[var(--color-border)]">
                {problemIcons.dropout}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  중도 포기는 개인의 문제가 아닙니다
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed">
                  프리랜서가 개인 단위로 활동하는 구조에서는
                  이탈 시 프로젝트 전체가 중단됩니다.
                  이는 시스템이 아닌 개인에게 모든 책임을 집중시킨 결과입니다.
                </p>
              </div>
            </div>

            {/* 문제 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[var(--color-point)] border border-[var(--color-border)]">
                {problemIcons.matching}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  매칭은 역량만으로 충분하지 않습니다
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed">
                  개인의 포트폴리오와 평점만으로는
                  프로젝트의 안정성을 보장할 수 없습니다.
                  백업 가능성과 관리 구조가 함께 고려되어야 합니다.
                </p>
              </div>
            </div>

            {/* 문제 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[var(--color-point)] border border-[var(--color-border)]">
                {problemIcons.management}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  관리 부담이 프로젝트를 막습니다
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed">
                  근태, 급여, 계약, 행정 처리를
                  개별적으로 처리하는 구조는
                  프로젝트 본질에 집중하기 어렵게 만듭니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 구조 개요 - 3자 구조 다이어그램 */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            3자 구조로 안정성을 확보합니다
          </h2>
          
          {/* Structure Diagram - 구조 페이지와 동일 */}
          <div className="mt-12 p-8 bg-[var(--color-bg-sub)] rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
              {/* Client */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-full border-2 border-[var(--color-border)]">
                  <svg className="w-10 h-10 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="mt-3 font-medium">클라이언트</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-[var(--color-border)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8m0 0l-4 4m4-4l-4-4" />
                </svg>
              </div>
              <div className="md:hidden text-[var(--color-border)]">
                <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8m0 0l-4 4m4-4l-4-4" />
                </svg>
              </div>

              {/* Platform */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto flex items-center justify-center bg-[var(--color-point)] rounded-full">
                  <span className="text-white font-semibold text-lg">ARTIRING</span>
                </div>
                <p className="mt-3 font-medium">소속사 (플랫폼)</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-[var(--color-border)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8m0 0l-4 4m4-4l-4-4" />
                </svg>
              </div>
              <div className="md:hidden text-[var(--color-border)]">
                <svg className="w-8 h-8 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8m0 0l-4 4m4-4l-4-4" />
                </svg>
              </div>

              {/* Freelancer */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-full border-2 border-[var(--color-border)]">
                  <svg className="w-10 h-10 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="mt-3 font-medium">프리랜서</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-[var(--color-text-secondary)] leading-relaxed text-center max-w-xl mx-auto">
            이 구조를 통해 프로젝트는 개인에게 종속되지 않고,
            <br className="hidden md:block" />
            소속사 단위로 안정적으로 운영됩니다.
          </p>

          <div className="mt-8 text-center">
            <Link href="/structure" className="text-link text-base">
              자세한 구조 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: 세 가지 핵심 구조 */}
      <section className="section bg-[var(--color-bg-sub)]">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            세 가지 핵심 구조
          </h2>
          
          <div className="mt-12 space-y-10">
            {/* 기능 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[var(--color-point)] border border-[var(--color-border)]">
                {coreIcons.agency}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  소속사 단위 운영
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed">
                  프리랜서는 개인이 아닌 사업자가 개설한 소속사 단위로 관리됩니다.
                  계약 정보, 프로젝트 책임, 인력 교체 시 연속성이 구조적으로 유지됩니다.
                </p>
              </div>
            </div>

            {/* 기능 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[var(--color-point)] border border-[var(--color-border)]">
                {coreIcons.backup}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  백업 인력 시스템
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed">
                  프로젝트 진행 중 비활성 상태가 감지되면 동일 소속사 내 백업 인력을 탐색합니다.
                  작업 파일, 이력, 진행 정보가 자동으로 이관되어 업무 연속성이 유지됩니다.
                </p>
              </div>
            </div>

            {/* 기능 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[var(--color-point)] border border-[var(--color-border)]">
                {coreIcons.integration}
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  통합 관리 시스템
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed">
                  프로젝트 상태, 근태, 계약, 행정 처리가 하나의 시스템으로 통합됩니다.
                  소속사와 클라이언트의 관리 부담을 최소화합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 최신 기록 미리보기 */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            아티링의 기록
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            문제를 정의하고, 실험하고, 설계한 과정을 기록합니다.
          </p>
          
          {topRecords.length > 0 ? (
            <>
              <div className="mt-12 space-y-0">
                {topRecords.map((record) => (
                  <Link
                    key={record.id}
                    href={`/records/${record.slug}`}
                    className="block py-6 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-sub)] -mx-4 px-4 transition-colors"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-point)]">
                      {record.blog_categories?.name || '기록'}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug">
                      {record.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">
                      {record.summary}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                      <time>{formatDate(record.published_at)}</time>
                      {record.view_count > 0 && (
                        <span>조회 {record.view_count.toLocaleString()}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/records" className="text-link text-base">
                  모든 기록 보기
                </Link>
              </div>
            </>
          ) : (
            <div className="mt-12 text-center text-[var(--color-text-secondary)]">
              <p>아직 기록된 글이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Section 6: 외부 채널 */}
      <section className="section bg-[var(--color-bg-sub)]">
        <div className="container-narrow">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            아티링의 기록을 더 보고 싶다면
          </h2>
          
          <div className="mt-8 flex items-center gap-6">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-point)] transition-colors"
              aria-label="블로그"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-point)] transition-colors"
              aria-label="인스타그램"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-point)] transition-colors"
              aria-label="유튜브"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            함께 구조를 만들어갈
            <br />
            파트너를 찾고 있습니다.
          </h2>
          
          <div className="mt-8">
            <Link href="/contact" className="text-link text-lg">
              제휴 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
