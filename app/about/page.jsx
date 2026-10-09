import ProfileImage from '@/components/about/ProfileImage';
import AboutCtaActions from '@/components/about/AboutCtaActions';
import Image from 'next/image';
import Link from 'next/link';
import { MotionWrapper } from '@/components/common/MotionWrapper';

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
    <div className="mm-page">
      {/* 소개 */}
      <section className="mm-sub-hero">
        <div className="mm-wrap mm-sub-hero__grid">
          <MotionWrapper animate={{ opacity: 1, y: 0 }}>
            <p className="mm-hand mm-sub-hero__kicker">아티링을 소개해요</p>
            <h1 className="mm-sub-hero__title">
              아티링이 만드는 <span className="mm-mark-red">뮤모</span>
            </h1>
            <p className="mm-sub-hero__lead">
              우리는 여행을 &ldquo;사진 몇 장&rdquo;으로 끝내지 않으려고 해요. 가야만 만날 수 있는 캐릭터, 그 순간을 도감에
              남기는 앱 — 그게 뮤모예요.
            </p>
            <p className="mm-sub-hero__lead">
              1인 창작자로 시작한 아티링이, 이제 작가·파트너·지자체와 함께 지역마다 다른 캐릭터 세계를 만들어가고 있습니다.
            </p>
          </MotionWrapper>
          <MotionWrapper animate={{ opacity: 1, y: 0 }}>
            <div className="mm-photo-wrap">
              <p className="mm-hand" aria-hidden="true">골목마다 다른 이야기</p>
              <figure className="mm-photo" style={{ margin: 0 }}>
                <Image
                  src="/images/mumo/travelers.jpg"
                  alt="한옥 골목을 걷는 여행자들"
                  width={900}
                  height={1054}
                  sizes="(min-width: 960px) 50vw, 100vw"
                  priority
                />
              </figure>
              <span
                className="mm-chip-photo"
                style={{ '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }}
                aria-hidden="true"
              ></span>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 작가 참여 방식 */}
      <section className="mm-box mm-box--red">
        <div className="mm-wrap">
          <MotionWrapper className="mm-sec-head" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mm-hand">작가님께</p>
            <h2 className="mm-sec-title">작가로 함께하는 방법</h2>
            <p className="mm-sec-lead">
              캐릭터 하나가 새로운 여행지의 주인공이 되는 과정이에요. 복잡한 계약서보다, 흐름을 따라오시면 됩니다.
            </p>
          </MotionWrapper>
          <ol className="mm-grid mm-grid--3" style={{ listStyle: 'none', padding: 0 }}>
            {creatorFlow.map((item) => (
              <li key={item.step} className="mm-card mm-card--num mm-card--tilt">
                <span className="mm-card__num" aria-hidden="true">
                  {Number(item.step)}
                </span>
                <h3 className="mm-card__title">{item.title}</h3>
                <p className="mm-card__note">{item.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mm-hero__cta">
            <Link href="/artist" className="mm-btn mm-btn--red">
              작가 참여 안내 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 팀 & 파트너 */}
      <section className="mm-section">
        <div className="mm-wrap">
          <MotionWrapper className="mm-sec-head" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mm-sec-title">함께하는 사람들</h2>
          </MotionWrapper>
          <div className="mm-grid mm-grid--2">
            {team.map((member) => (
              <div key={member.name} className="mm-card mm-card--tilt mm-member">
                <ProfileImage src={member.image} alt={`${member.name} ${member.role}`} fit={member.imageFit} />
                <div>
                  <span className="mm-badge mm-badge--red">{member.role}</span>
                  <h3 className="mm-card__title" style={{ marginTop: 'var(--mm-space-xs)' }}>
                    {member.name}
                  </h3>
                  <p className="mm-card__note">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mm-note">디자이너, 아티스트, 회계사, 노무사 등 전문 자문단 20명과 함께하고 있어요.</p>

          <ul className="mm-grid mm-grid--3" style={{ listStyle: 'none', padding: 0, marginTop: 'var(--mm-space-xl)' }}>
            {partners.map((p) => (
              <li key={p.name} className="mm-card" style={{ textAlign: 'center' }}>
                <h3 className="mm-card__title">{p.name}</h3>
                <p className="mm-card__note">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 여정 타임라인 */}
      <section className="mm-box mm-box--arch">
        <div className="mm-wrap mm-narrow">
          <MotionWrapper className="mm-sec-head mm-sec-head--center" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mm-hand">여기까지 왔어요</p>
            <h2 className="mm-sec-title">여정</h2>
          </MotionWrapper>
          <ol className="mm-rows mm-rows--split mm-journey">
            {journey.map((item) => (
              <li key={item.title}>
                <b>{item.year}</b>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mm-hero__cta" style={{ marginTop: 'var(--mm-space-2xl)' }}>
            <a className="mm-btn" href="https://blog.naver.com/artiring" target="_blank" rel="noopener noreferrer">
              네이버 블로그
            </a>
            <a className="mm-btn" href="https://www.instagram.com/arti_ring" target="_blank" rel="noopener noreferrer">
              아티링소식 (인스타그램)
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mm-final" style={{ marginTop: 'var(--mm-panel-inset)' }}>
        <div className="mm-wrap">
          <p className="mm-hand" style={{ color: 'var(--mm-color-on-red)' }}>
            작가이든, 파트너이든
          </p>
          <h2 className="mm-display mm-final__title">함께 만들어요</h2>
          <p className="mm-final__lead">작가이든, 지자체·제휴 파트너이든 — 편하게 연락주세요.</p>
          <AboutCtaActions />
        </div>
      </section>
      <div style={{ height: 'var(--mm-section-y)' }} aria-hidden="true" />
    </div>
  );
}
