import Link from 'next/link';

export const metadata = {
  title: '서비스',
  description: '아티링의 3자 구조(클라이언트-플랫폼-소속사-프리랜서), 백업 시스템, AI 매칭 시스템, 통합 관리 시스템을 소개합니다.',
};

const structures = [
  {
    id: 'three-party',
    title: '3자 구조',
    subtitle: '클라이언트 - 플랫폼(소속사) - 프리랜서',
    description: '기존의 양자 구조(클라이언트-프리랜서)에서 벗어나, 소속사가 중간에서 양측을 관리하고 보호하는 새로운 구조입니다.',
    details: [
      {
        role: '클라이언트',
        benefits: [
          '검증된 프리랜서 풀 접근',
          '프로젝트 중단 리스크 제거 (백업 시스템)',
          '단일 계약 창구로 관리 효율화',
          '품질 보증 및 중재 서비스'
        ]
      },
      {
        role: '소속사 (플랫폼)',
        benefits: [
          '프리랜서 검증 및 포트폴리오 관리',
          '클라이언트 매칭 및 영업 대행',
          '계약, 정산, 세금 처리 대행',
          '분쟁 조정 및 커리어 컨설팅'
        ]
      },
      {
        role: '프리랜서',
        benefits: [
          '안정적인 프로젝트 확보',
          '행정 업무 부담 제거',
          '체계적인 커리어 관리',
          '소속사 네트워크 활용'
        ]
      }
    ]
  }
];

const systems = [
  {
    id: 'backup',
    title: '백업 시스템',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: '프리랜서의 갑작스러운 이탈에도 프로젝트가 중단되지 않도록 보장하는 시스템입니다.',
    features: [
      {
        name: '사전 백업 인력 지정',
        detail: '프로젝트 시작 시 동일 역량의 백업 프리랜서를 미리 지정합니다.'
      },
      {
        name: '실시간 진행 상황 공유',
        detail: '백업 인력이 프로젝트 진행 상황을 실시간으로 파악할 수 있습니다.'
      },
      {
        name: '즉시 투입 프로토콜',
        detail: '메인 프리랜서 이탈 시 24시간 내 백업 인력이 투입됩니다.'
      },
      {
        name: '인수인계 자동화',
        detail: '표준화된 문서와 시스템으로 빠른 인수인계가 가능합니다.'
      }
    ]
  },
  {
    id: 'ai-matching',
    title: 'AI 매칭 시스템',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    description: '단순한 스킬 매칭을 넘어, 작업 스타일과 커뮤니케이션 선호도까지 고려한 정밀 매칭 시스템입니다.',
    features: [
      {
        name: '다차원 역량 분석',
        detail: '기술 스택, 경력, 포트폴리오를 종합적으로 분석합니다.'
      },
      {
        name: '작업 스타일 매칭',
        detail: '자율성 vs 지시 선호, 비동기 vs 동기 소통 등 작업 스타일을 고려합니다.'
      },
      {
        name: '프로젝트 적합도 점수',
        detail: 'AI가 프로젝트와 프리랜서의 적합도를 점수로 제시합니다.'
      },
      {
        name: '피드백 학습',
        detail: '프로젝트 완료 후 피드백을 학습해 매칭 정확도를 지속 개선합니다.'
      }
    ]
  },
  {
    id: 'integrated',
    title: '통합 관리 시스템',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    description: '계약부터 정산까지, 프리랜서 업무의 모든 것을 한 곳에서 관리할 수 있는 시스템입니다.',
    features: [
      {
        name: '전자 계약',
        detail: '표준화된 계약서 템플릿과 전자 서명으로 빠른 계약 체결이 가능합니다.'
      },
      {
        name: '작업물 관리',
        detail: '버전 관리, 피드백, 승인 프로세스를 체계적으로 관리합니다.'
      },
      {
        name: '자동 정산',
        detail: '마일스톤 달성 시 자동으로 정산이 처리됩니다.'
      },
      {
        name: '세금 처리',
        detail: '세금계산서 발행, 원천징수 등 세금 관련 업무를 대행합니다.'
      }
    ]
  },
  {
    id: '5060',
    title: '5060세대 특화 프로그램',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description: '풍부한 경험과 전문성을 가진 5060세대 전문가를 위한 맞춤형 프로그램입니다.',
    features: [
      {
        name: '경력 재설계',
        detail: '기존 경력을 프리랜서 시장에 맞게 재구성합니다.'
      },
      {
        name: '디지털 역량 강화',
        detail: '필수 디지털 도구 사용법 교육을 제공합니다.'
      },
      {
        name: '멘토링 매칭',
        detail: '젊은 프리랜서에게 멘토로 참여할 수 있는 기회를 제공합니다.'
      },
      {
        name: '유연한 근무',
        detail: '시간 제약 없이 유연하게 참여할 수 있는 프로젝트를 우선 매칭합니다.'
      }
    ]
  }
];

export default function StructurePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            아티링의 서비스
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            기존 프리랜서 플랫폼의 한계를 넘어,
            새로운 3자 구조로 모든 참여자에게 가치를 제공합니다.
          </p>
        </div>
      </section>

      {/* 3-Party Structure */}
      <section className="section">
        <div className="container-narrow">
          <span className="text-sm font-medium text-[var(--color-point)]">Core Structure</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            3자 구조
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            클라이언트 - 소속사(플랫폼) - 프리랜서. 
            소속사가 중간에서 양측을 관리하고 보호하는 새로운 협업 구조입니다.
          </p>

          {/* Structure Diagram */}
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

          {/* Benefits Grid */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {structures[0].details.map((party) => (
              <div key={party.role}>
                <h3 className="font-medium text-lg">{party.role}</h3>
                <ul className="mt-4 space-y-3">
                  {party.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <svg className="w-4 h-4 mt-0.5 text-[var(--color-point)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems */}
      {systems.map((system, index) => (
        <section 
          key={system.id} 
          className={`section ${index % 2 === 0 ? 'bg-[var(--color-bg-sub)]' : ''}`}
        >
          <div className="container-narrow">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-[var(--color-point)]">
                {system.icon}
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{system.title}</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">
                  {system.description}
                </p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {system.features.map((feature) => (
                <div key={feature.name} className="p-4 bg-white rounded-lg border border-[var(--color-border)]">
                  <h3 className="font-medium">{feature.name}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    {feature.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section border-t border-[var(--color-border)]">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            더 자세한 내용이 궁금하신가요?
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-lg mx-auto">
            아티링의 기록을 통해 우리가 이 구조를 왜, 어떻게 설계했는지 자세히 확인해보세요.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/records?category=structure-design" className="btn btn-primary">
              구조설계 기록 보기
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


