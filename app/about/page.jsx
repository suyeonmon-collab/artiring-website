import Link from 'next/link';
import ProfileImage from '@/components/about/ProfileImage';
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';

export const metadata = {
  title: 'About - 아티링',
  description: '아티링은 프리랜서가 구조 안에서 일할 수 있도록 설계된 인력 관리 시스템을 만들고 있습니다. 우리는 프리랜서 시장의 구조적 문제를 시스템 설계로 해결합니다.',
};

const timeline = [
  {
    date: '2025.11',
    title: '프로젝트 시작',
    description: '프리랜서 시장의 구조적 문제 해결을 목표로 아티링 프로젝트를 시작했습니다.'
  },
  {
    date: '2025.11',
    title: '사업 구조 설계 완료',
    description: '3자 구조(클라이언트-플랫폼-소속사-프리랜서) 기반 백업 시스템 및 통합 관리 시스템 설계를 완료했습니다.'
  },
  {
    date: '2025.12',
    title: '특허 출원',
    description: '프리랜서 소속사 기반 인력 관리 시스템 및 방법에 대한 특허 출원을 완료했습니다.'
  },
  {
    date: '2026.01',
    title: '문제 정의 및 시장 조사',
    description: '프리랜서 시장의 구조적 문제를 분석하고, 해결 방안 연구를 시작했습니다.'
  },
];

// 문제 정의 아이콘
const problemIcons = {
  dropout: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  matching: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  management: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

// 방향성 아이콘
const directionIcons = {
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
  automation: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
};

// 미션 아이콘
const missionIcons = {
  stability: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  matching: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  efficiency: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

// 접근 방식 아이콘
const approachIcons = {
  observe: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  hypothesis: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  structure: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  transparent: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

const problems = [
  {
    icon: problemIcons.dropout,
    title: '프리랜서 중도 이탈 시 프로젝트 전체 중단',
    description: '개인 단위 활동 구조에서는 한 명의 이탈이 전체 프로젝트를 멈춥니다. 이는 시스템이 아닌 개인에게 모든 책임을 집중시킨 결과입니다.'
  },
  {
    icon: problemIcons.matching,
    title: '역량 중심 매칭의 한계',
    description: '포트폴리오와 평점만으로는 프로젝트 안정성을 보장할 수 없습니다. 백업 가능성과 관리 구조가 함께 고려되어야 합니다.'
  },
  {
    icon: problemIcons.management,
    title: '과도한 관리 부담',
    description: '근태, 급여, 계약, 행정 처리를 개별적으로 수행하는 구조는 프로젝트 본질에 집중하기 어렵게 만듭니다.'
  },
];

const directions = [
  {
    icon: directionIcons.agency,
    title: '소속사 단위 운영',
    description: '프리랜서를 개인이 아닌 소속사 구조 안에서 관리합니다.'
  },
  {
    icon: directionIcons.backup,
    title: '백업 전제 설계',
    description: '이탈은 예외가 아닌 전제입니다. 언제든 백업이 가능한 구조를 설계합니다.'
  },
  {
    icon: directionIcons.automation,
    title: '통합 자동화',
    description: '관리 부담을 최소화하는 통합 시스템을 구축합니다.'
  },
];

const missions = [
  {
    icon: missionIcons.stability,
    title: '프로젝트 안정성 확보',
    description: [
      '프리랜서 이탈로 인한 프로젝트 실패를 구조적으로 방지합니다.',
      '소속사 단위 백업 시스템을 통해 업무 연속성을 보장합니다.'
    ]
  },
  {
    icon: missionIcons.matching,
    title: '신뢰 가능한 매칭 제공',
    description: [
      '개인 역량뿐 아니라 백업 가능성을 고려한 매칭을 제공합니다.',
      '클라이언트는 더 안정적인 프로젝트 환경을 얻습니다.'
    ]
  },
  {
    icon: missionIcons.efficiency,
    title: '관리 효율성 극대화',
    description: [
      '근태, 급여, 계약, 행정 처리를 통합 자동화합니다.',
      '소속사와 클라이언트가 프로젝트 본질에 집중할 수 있도록 합니다.'
    ]
  },
];

const approaches = [
  {
    icon: approachIcons.observe,
    title: '문제를 관찰하고 기록합니다',
    description: '시장에서 반복되는 문제를 구조적으로 분석하고, 왜 이런 문제가 발생하는지 근본 원인을 찾습니다.'
  },
  {
    icon: approachIcons.hypothesis,
    title: '가설을 세우고 검증합니다',
    description: '작은 단위의 실험을 통해 가설을 검증하고, 실패와 성공을 투명하게 기록합니다.'
  },
  {
    icon: approachIcons.structure,
    title: '구조를 먼저 설계합니다',
    description: '기능보다 구조를 먼저 설계하고, 지속 가능한 시스템을 만드는 데 집중합니다.'
  },
  {
    icon: approachIcons.transparent,
    title: '과정을 투명하게 공개합니다',
    description: '특허 출원, 사업 준비, 시스템 설계 과정을 기록으로 남기고 공유합니다.'
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Section 1: 페이지 헤더 */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container-narrow">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              ARTIRING
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[var(--color-text-secondary)]">
              디자이너·아티스트를 소속사로 연결하는 플랫폼
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Section 2: 브랜드 정의 */}
      <section className="section">
        <div className="container-narrow">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              아티링은 프리랜서를 묶는 회사가 아닙니다
            </p>
            <p className="mt-6 text-lg md:text-xl leading-relaxed">
              대신 사람과 일, 책임과 보호 사이에
              <br className="hidden md:block" />
              <strong className="text-[var(--color-text-primary)]">'보이지 않는 고리'</strong>를 만듭니다.
            </p>
            <div className="mt-8 space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
              <p className="font-medium text-[var(--color-text-primary)]">
                그 고리는:
              </p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-point)] mt-1">•</span>
                  <span>AI로 작동합니다 (자동 매칭)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-point)] mt-1">•</span>
                  <span>기록으로 증명됩니다 (투명성)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-point)] mt-1">•</span>
                  <span>구조가 책임집니다 (개인 ❌ 소속사 ⭕)</span>
                </li>
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Section 3: 우리가 해결하려는 문제 */}
      <section className="section bg-[var(--color-bg-sub)]">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            왜 이 문제를 선택했는가
          </h2>
          <div className="mt-6 text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
            <p>
              프리랜서 시장은 빠르게 성장했지만, 프로젝트 실패와 중도 포기는 여전히 반복되고 있습니다.
              이는 개인의 성실함이나 실력의 문제가 아니라, 프리랜서를 항상 혼자 일하게 만드는 구조에서 비롯된 문제라고 판단했습니다.
            </p>
            <p className="mt-4 text-[var(--color-text-primary)] font-medium">
              아티링은 이 구조 자체를 바꾸는 것을 목표로 합니다.
            </p>
          </div>

          {/* 핵심 문제 리스트 - 가로 레이아웃 */}
          <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {problems.map((problem, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-[var(--color-point)]/10 text-[var(--color-point)] mb-4">
                    <div className="w-14 h-14">
                      {problem.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 4: 비전과 방향성 */}
      <section className="section">
        <div className="container-narrow">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              아티링의 비전
            </h2>
            
            <p className="mt-12 text-xl md:text-2xl font-semibold leading-snug">
              프리랜서가 구조 안에서 일하는 시장을 만듭니다.
            </p>

            <div className="mt-8 space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                우리는 프리랜서를 개인으로만 보는 시장 구조가
                <br className="hidden md:block" />
                지속 가능하지 않다고 판단합니다.
              </p>
              <p>
                개인의 능력을 존중하되,
                <br className="hidden md:block" />
                그들이 안정적인 구조 안에서 일할 수 있는 환경을 만드는 것.
                <br className="hidden md:block" />
                이것이 아티링이 추구하는 시장의 모습입니다.
              </p>
            </div>
          </MotionWrapper>

          {/* 3가지 방향성 */}
          <StaggerContainer className="mt-12 space-y-6" staggerDelay={0.1}>
            {directions.map((direction, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-bg-sub)] text-[var(--color-point)]">
                    {direction.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {index + 1}. {direction.title}
                    </h3>
                    <p className="mt-1 text-[var(--color-text-secondary)] leading-relaxed">
                      {direction.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 5: 미션 */}
      <section className="section bg-[var(--color-bg-sub)]">
        <div className="container-narrow">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              아티링의 미션
            </h2>
          </MotionWrapper>
          
          {/* 미션 카드 - 가로 레이아웃 */}
          <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {missions.map((mission, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-[var(--color-point)]/10 text-[var(--color-point)] mb-4">
                    <div className="w-14 h-14">
                      {mission.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-4">
                    {mission.title}
                  </h3>
                  <div className="space-y-3">
                    {mission.description.map((desc, i) => (
                      <p key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 6: 접근 방식 */}
      <section className="section">
        <div className="container-narrow">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              어떻게 접근하는가
            </h2>
            
            <div className="mt-12 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                아티링은 기능을 먼저 만들기보다,
                <br className="hidden md:block" />
                문제를 구조적으로 해결하는 방식을 먼저 설계합니다.
              </p>
              <p className="mt-4 text-[var(--color-text-primary)]">
                그래서 우리는:
              </p>
            </div>
          </MotionWrapper>

          <StaggerContainer className="mt-8 space-y-8" staggerDelay={0.1}>
            {approaches.map((approach, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-bg-sub)] text-[var(--color-point)]">
                    {approach.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {index + 1}. {approach.title}
                    </h3>
                    <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 7: 연혁 타임라인 */}
      <section className="section bg-[var(--color-bg-sub)]">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            아티링의 여정
          </h2>
          
          {/* 가로 타임라인 */}
          <div className="mt-12">
            {/* 데스크탑: 가로 타임라인 */}
            <div className="hidden md:block">
              {/* 타임라인 라인 + 포인트 + 날짜 */}
              <div className="relative mb-8">
                {/* 가로줄 */}
                <div className="absolute top-5 left-[5%] right-[5%] h-[3px] bg-[var(--color-border)]" />
                
                {/* 날짜 포인트들 */}
                <div className="flex justify-between px-[5%]">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {/* 포인트 */}
                      <div className="w-10 h-10 rounded-full bg-[var(--color-point)] flex items-center justify-center z-10 shadow-md">
                        <div className="w-4 h-4 rounded-full bg-white" />
                      </div>
                      {/* 날짜 */}
                      <span className="mt-3 text-sm font-bold text-[var(--color-point)]">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 타임라인 설명 카드 */}
              <div className="grid grid-cols-4 gap-4">
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-5 border border-[var(--color-border)] text-center shadow-sm"
                  >
                    <h3 className="text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 모바일: 세로 타임라인 */}
            <div className="md:hidden">
              <div className="relative pl-8">
                {/* 세로줄 */}
                <div className="absolute left-[11px] top-0 bottom-0 w-[3px] bg-[var(--color-border)]" />
                
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative">
                      {/* 포인트 */}
                      <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-[var(--color-point)] flex items-center justify-center z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      </div>
                      {/* 날짜 & 내용 */}
                      <div className="bg-white rounded-xl p-4 border border-[var(--color-border)] shadow-sm">
                        <span className="text-sm font-bold text-[var(--color-point)]">
                          {item.date}
                        </span>
                        <h3 className="mt-2 text-base font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: 팀 소개 */}
      <section className="section">
        <div className="container-narrow">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Team
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              구조적 사고로 문제를 해결하는 팀
            </p>
          </MotionWrapper>
          
          <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.15}>
            <StaggerItem>
              <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold">임수연</h3>
                <p className="mt-2 text-[var(--color-point)] font-medium">Founder & CEO</p>
                <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                  프리랜서 생태계 혁신과 구조 설계
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold">이준호</h3>
                <p className="mt-2 text-[var(--color-point)] font-medium">CTO</p>
                <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                  AI 매칭 시스템 및 플랫폼 개발
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold">박민지</h3>
                <p className="mt-2 text-[var(--color-point)] font-medium">운영 매니저</p>
                <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                  소속사 관리 및 프로젝트 운영
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold">최서현</h3>
                <p className="mt-2 text-[var(--color-point)] font-medium">마케팅 매니저</p>
                <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                  브랜드 전략 및 파트너십 확대
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--color-bg-sub)]">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            함께 구조를 만들어갈
            <br />
            파트너를 찾고 있습니다.
          </h2>
          <p className="mt-6 text-[var(--color-text-secondary)] leading-relaxed">
            아티링의 여정에 관심이 있으시다면,
            <br />
            기록을 통해 우리의 과정을 지켜봐 주세요.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/records" className="text-link text-lg">
              기록 보기
            </Link>
            <Link href="/contact" className="text-link text-lg">
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
