import ProfileImage from '@/components/about/ProfileImage';
import AboutCtaActions from '@/components/about/AboutCtaActions';
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';

export const metadata = {
  title: '소개 - 아티링이 만드는 뮤모',
  description: '아티링은 여행지마다 캐릭터를 심고, 작가와 함께 여행의 추억을 수집하는 뮤모 앱을 만들고 있어요.',
};

const creatorFlow = [
  {
    step: '01',
    title: '캐릭터 등록 신청',
    desc: '내가 그린 캐릭터와 이야기를 신청해요. 포트폴리오와 캐릭터 소개를 남겨주시면 돼요.',
  },
  {
    step: '02',
    title: '선정 & 스팟 지정',
    desc: '선정되면 개별 연락드려요. 카드를 받을 스팟을 작가님이 직접 정해요.',
  },
  {
    step: '03',
    title: '수집 & 노출',
    desc: '유저가 스팟을 방문·수집하면 도감에 쌓이고, 카드 뒷면 서명과 작가 소개로 이어져요.',
  },
];

const team = [
  {
    name: '임수연',
    role: '대표',
    desc: '2019년부터 신디야라는 고양이 캐릭터 브랜드를 직접 운영하며 캐릭터 기획부터 굿즈 제작·판매까지 전 과정을 경험했고, 그 경험이 뮤모로 이어졌어요. 뮤모는 "여행의 순간을 캐릭터로 남기자"는 생각에서 시작했습니다.',
    image: '/images/ceo.png',
    imageFit: 'contain',
  },
  {
    name: '김도형',
    role: '운영매니저',
    desc: '관광 경로 기획, 홍보기획, 관광 파트너 업체 협의를 담당하며, 뮤모의 일상을 함께 만들어가고 있어요.',
    image: '/images/manager.png',
  },
];

const partners = [
  { name: '요일스튜디오', desc: '캐릭터 제작·일러스트 협업' },
  { name: 'EO인터네셔널', desc: '글로벌 IP·콘텐츠 확장' },
  { name: '아트샘', desc: 'K-Art 크리에이터 네트워크' },
];

const journey = [
  {
    year: '2019~2025',
    title: '신디야 브랜드 운영',
    desc: '캐릭터 기획·제작·판매 전 과정을 경험하며, "캐릭터와 함께하는 경험"을 쌓아왔어요.',
  },
  {
    year: '2025',
    title: '뮤모 기획 시작',
    desc: '여행지마다 캐릭터를 두고, GPS로 수집하는 앱 아이디어를 구체화했어요.',
  },
  {
    year: '2026',
    title: 'K-Art 청년창작자 지원사업 선정',
    desc: '충남문화관광재단 K-Art 청년창작자 지원사업에 「뮤모: 캐릭터 수집 관광 플랫폼」으로 선정되어 본격 개발에 들어갔어요.',
  },
  {
    year: '2026',
    title: '충남 공공데이터·AI 창업경진대회 우수상',
    desc: '제14회 충남 공공데이터·AI 활용 창업경진대회 아이디어 기획부문에서 우수상을 수상하며, 뮤모의 가능성을 인정받았어요.',
  },
  {
    year: '2026',
    title: '지역성장 예비창업지원사업 선정',
    desc: '지역성장 예비창업지원사업에 선정되어, 뮤모를 더 많은 지역으로 확장할 준비를 하고 있어요.',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* 소개 */}
      <section className="page-section border-b border-[var(--color-gray-300)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-[var(--color-primary)] mb-3">About</p>
            <h1 className="font-accent text-[32px] md:text-[48px] font-bold leading-snug text-[var(--color-gray-900)] max-w-2xl">
              아티링이 만드는 뮤모
            </h1>
            <p className="mt-6 text-lg text-[var(--color-gray-700)] leading-relaxed max-w-2xl">
              우리는 여행을 &ldquo;사진 몇 장&rdquo;으로 끝내지 않으려고 해요.
              가야만 만날 수 있는 캐릭터, 그 순간을 도감에 남기는 앱 — 그게 뮤모예요.
            </p>
            <p className="mt-4 text-base text-[var(--color-gray-700)] leading-relaxed max-w-2xl">
              1인 창작자로 시작한 아티링이, 이제 작가·파트너·지자체와 함께
              지역마다 다른 캐릭터 세계를 만들어가고 있습니다.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* 작가 참여 방식 */}
      <section className="page-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              작가로 함께하는 방법
            </h2>
            <p className="mt-4 text-[var(--color-gray-700)] max-w-2xl leading-relaxed">
              캐릭터 하나가 새로운 여행지의 주인공이 되는 과정이에요.
              복잡한 계약서보다, 흐름을 따라오시면 됩니다.
            </p>
          </MotionWrapper>

          <StaggerContainer className="mt-12 grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {creatorFlow.map((item) => (
              <StaggerItem key={item.step}>
                <div className="card p-6 h-full">
                  <span className="badge-yellow">{item.step}</span>
                  <h3 className="mt-4 font-semibold text-lg text-[var(--color-gray-900)]">{item.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-gray-700)] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 팀 & 파트너 */}
      <section className="page-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              함께하는 사람들
            </h2>
          </MotionWrapper>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {team.map((member) => (
              <MotionWrapper
                key={member.name}
                className="card p-6 flex gap-5"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true }}
              >
                <ProfileImage
                  src={member.image}
                  alt={`${member.name} ${member.role}`}
                  fit={member.imageFit}
                />
                <div>
                  <p className="text-xs font-semibold text-[var(--color-primary)]">{member.role}</p>
                  <h3 className="mt-1 font-accent text-xl font-bold">{member.name}</h3>
                  <p className="mt-2 text-sm text-[var(--color-gray-700)] leading-relaxed">{member.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>

          <p className="mt-6 text-sm text-[var(--color-gray-700)] text-center leading-relaxed">
            디자이너, 아티스트, 회계사, 노무사 등 전문 자문단 20명과 함께하고 있어요.
          </p>

          <StaggerContainer className="mt-8 grid sm:grid-cols-3 gap-4" staggerDelay={0.08}>
            {partners.map((p) => (
              <StaggerItem key={p.name}>
                <div className="card p-5 text-center">
                  <h4 className="font-semibold text-[var(--color-gray-900)]">{p.name}</h4>
                  <p className="mt-2 text-sm text-[var(--color-gray-500)]">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 여정 타임라인 */}
      <section className="page-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              여정
            </h2>
          </MotionWrapper>

          <div className="mt-10 space-y-0">
            {journey.map((item, i) => (
              <MotionWrapper
                key={item.title}
                className={`flex gap-6 py-8 ${i < journey.length - 1 ? 'border-b border-[var(--color-gray-300)]' : ''}`}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true }}
              >
                <span className="flex-shrink-0 w-24 font-accent font-bold text-[var(--color-primary)]">{item.year}</span>
                <div>
                  <h3 className="font-semibold text-lg text-[var(--color-gray-900)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-gray-700)] leading-relaxed">{item.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* 외부 채널 */}
      <section className="page-section">
        <div className="max-w-content mx-auto px-5 md:px-20 text-center">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-xl md:text-2xl font-bold text-[var(--color-gray-900)]">
              더 많은 이야기가 궁금하다면
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://blog.naver.com/artiring"
                target="_blank"
                rel="noopener noreferrer"
                className="card px-8 py-5 link-channel text-base font-semibold"
              >
                📖 네이버 블로그 팔로우하기
              </a>
              <a
                href="https://www.instagram.com/arti_ring"
                target="_blank"
                rel="noopener noreferrer"
                className="card px-8 py-5 link-channel text-base font-semibold"
              >
                📸 인스타그램 팔로우하기
              </a>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* CTA — about에서만 */}
      <section className="page-section bg-[var(--color-primary-light)]">
        <div className="max-w-content mx-auto px-5 md:px-20 text-center">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              함께 만들어요
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              작가이든, 지자체·제휴 파트너이든 — 편하게 연락주세요.
            </p>
            <AboutCtaActions />
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
}
