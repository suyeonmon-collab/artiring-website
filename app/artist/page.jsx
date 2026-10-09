import Image from 'next/image';
import { MotionWrapper } from '@/components/common/MotionWrapper';
import FaqAccordion from '@/components/support/FaqAccordion';
import ArtistApplyForm from '@/components/artist/ArtistApplyForm';
import { artistFaqCategories } from '@/lib/artist/faq';

export const metadata = {
  title: {
    absolute: '뮤모 베타 작가 모집 | 아티링',
  },
  description:
    '10월 말 베타 오픈. 지금 합류하는 작가님께 오픈 기념 메인 노출과 SS등급 우선 배정을 드려요. 전국 어디서나, 선별 없이 신청할 수 있어요.',
  alternates: {
    canonical: 'https://www.artiring.com/artist',
  },
  openGraph: {
    title: '뮤모 베타, 첫 작가님을 찾아요',
    description:
      '10월 말 베타 오픈. 지금 합류하는 작가님께 오픈 기념 메인 노출과 SS등급 우선 배정을 드려요. 전국 어디서나, 선별 없이 신청할 수 있어요.',
    url: 'https://www.artiring.com/artist',
    images: [
      {
        url: '/images/og/artist-og.png',
        width: 1731,
        height: 909,
        alt: '뮤모 베타 작가 모집',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '뮤모 베타, 첫 작가님을 찾아요',
    description:
      '10월 말 베타 오픈. 지금 합류하는 작가님께 오픈 기념 메인 노출과 SS등급 우선 배정을 드려요. 전국 어디서나, 선별 없이 신청할 수 있어요.',
  },
};

const HOW_IT_WORKS = [
  {
    step: '01',
    title: '등록',
    desc: '내 스팟으로 신청해요',
    src: '/images/screenshots/artist-register.png',
  },
  {
    step: '02',
    title: '지정',
    desc: '카드를 받을 스팟을 직접 정해요 (작업실, 판매처, 페어 부스 등)',
    src: '/images/screenshots/artist-spot.png',
    fit: 'contain',
  },
  {
    step: '03',
    title: '수집',
    desc: '유저가 카드를 수집하고 도감에 저장해요',
    src: '/images/screenshots/artist-collect.png',
  },
  {
    step: '04',
    title: '노출',
    desc: '카드 뒷면 작가 서명, 앱 안 작가 소개 페이지로 이어져요',
    src: '/images/screenshots/artist-expose.png',
  },
];

const BETA_PERKS = [
  {
    title: '오픈 기념 메인 노출',
    desc: '정식 오픈 때 앱 메인에 베타 작가님 캐릭터를 먼저 걸어드려요.',
    note: '처음 앱을 연 사람이 가장 먼저 만나는 캐릭터가 돼요',
  },
  {
    title: 'SS등급 우선 배정',
    desc: '뮤모 카드는 C부터 SS까지 등급이 있어요. 베타 작가님 캐릭터는 최상위 SS등급에 우선 배정해요.',
    note: '가장 모으고 싶은 카드가, 작가님 캐릭터예요',
  },
];

const BETA_TIMELINE = [
  {
    step: '01',
    title: '신청',
    desc: '아래 폼으로 신청해요. 선별 없이 모두 참여할 수 있어요',
  },
  {
    step: '02',
    title: '베타 전달',
    desc: '10월 말, 베타 앱과 참여 안내를 이메일로 보내드려요',
  },
  {
    step: '03',
    title: '캐릭터·스팟 등록',
    desc: '캐릭터를 올리고 스팟을 지정해요. 페어 일정도 이때 입력해요',
  },
  {
    step: '04',
    title: '첫 공개',
    desc: '12월 첫 테스트에서 유저들과 만나요',
  },
];

const BENEFITS = [
  {
    title: '저작권 100% 보유',
    desc: '양도 없어요. 사용 허락만 받아요.',
    note: '이 그림은 여전히 작가님 거예요',
  },
  {
    title: '페어 부스 QR 연동',
    desc: '참가하는 일러스트 페어 부스에 QR을 걸어 방문객을 유입해요.',
    note: '3일 동안 그냥 지나가던 사람들이, 이번엔 멈춰서요',
  },
  {
    title: '스팟 페이지 직접 운영',
    desc: '행사 일정·구매예약·쿠폰·이벤트를 스팟에서 직접 운영해요.',
    note: '카드를 받으러 온 사람에게, 보여줄 게 생겨요',
  },
  {
    title: '캐릭터별 리포트',
    desc: '방문·수집·도감 등록 수를 캐릭터별로 안내드려요.',
    note: '몇 명이 걸어와서 만났는지, 숫자로 보여드려요',
  },
  {
    title: '앱 내 작가 소개',
    desc: '카드와 연결된 작가 소개 페이지가 앱에 생겨요.',
    note: '궁금해질 때, 바로 작가님 페이지로 이어져요',
  },
  {
    title: '새 기회 우선 제안',
    desc: '지자체 협업 등 새 기회가 생기면 먼저 제안드려요.',
    note: '다음 기회가 생기면, 가장 먼저 연락드려요',
  },
];

const SPOT_FEATURES = [
  {
    title: '행사 목록',
    desc: '페어·팝업·전시 일정을 업로드해요.',
    note: '카드를 모은 사람이, 다음 일정까지 따라와요',
    src: '/images/screenshots/spot-events.png',
  },
  {
    title: '구매 예약',
    desc: '접수만 받아요. 결제는 작가가 직접 처리하고, 수수료는 없어요.',
    note: '찾아온 김에, 그 자리에서 바로 다음 만남을 예약해요',
    src: '/images/screenshots/spot-reserve.png',
  },
  {
    title: '쿠폰',
    desc: '내 스팟에서만 쓸 수 있는 쿠폰을 발급해요. 아티링이 발행하는 쿠폰은 없어요.',
    note: '다시 찾아올 이유가 하나 더 생겨요',
    src: '/images/screenshots/spot-coupon.png',
  },
  {
    title: '이벤트',
    desc: '기간 한정 이벤트를 작가가 직접 개설해요.',
    note: '오늘만 여는 이벤트로, 카드가 특별해져요',
    src: '/images/screenshots/spot-event.png',
  },
];

const CONDITIONS = [
  {
    title: '원고료·수익배분 없음',
    desc: '앱 자체 수익이 없어서, 나눌 수익이 없어요.',
  },
  {
    title: '참여비 없음',
    desc: '참가비·등록비 없이 신청할 수 있어요.',
  },
  {
    title: '비독점',
    desc: '다른 곳에서 판매·계약·활동하시는 건 그대로예요.',
  },
  {
    title: '본인 창작물만',
    desc: '본인 창작물만 등록할 수 있어요. 도용·타인 작품이 확인되면 정지 절차를 진행해요.',
  },
  {
    title: '준비하실 것',
    desc: '기존 캐릭터를 이용한 카드용 이미지 1장 이상. 새로 그리실 필요 없어요',
  },
];

export default function ArtistPage() {
  return (
    <div className="mm-page">
      {/* 1. Hero */}
      <section className="mm-sub-hero">
        <div className="mm-wrap mm-sub-hero__grid">
          <MotionWrapper animate={{ opacity: 1, y: 0 }}>
            <p className="mm-hand mm-sub-hero__kicker">베타 작가 모집</p>
            <h1 className="mm-sub-hero__title">
              뮤모 베타, <span className="mm-nw">첫 작가님을</span> <span className="mm-mark-red">찾아요</span>
            </h1>
            <p className="mm-sub-hero__lead">그림은 계속 쌓이는데, 찾아오는 사람은 그대로인가요?</p>
            <p className="mm-sub-hero__lead">10월 말 베타부터 함께할 작가님께만 드리는 혜택이 있어요.</p>
            <div className="mm-badges">
              <span className="mm-badge">오픈 기념 메인 노출</span>
              <span className="mm-badge mm-badge--red">SS등급 우선 배정</span>
            </div>
            <div className="mm-hero__cta">
              <a href="#apply" className="mm-btn mm-btn--red">
                베타 작가로 신청하기
              </a>
              <a href="#how" className="mm-btn">
                어떻게 함께하나요
              </a>
            </div>
          </MotionWrapper>

          <MotionWrapper animate={{ opacity: 1, y: 0 }}>
            <div className="mm-phone-fan">
              <div className="mm-phone">
                <Image src="/images/screenshots/map-full.png" alt="뮤모 지도 화면" fill sizes="240px" priority />
              </div>
              <div className="mm-phone" aria-hidden="true">
                <Image src="/images/screenshots/album-full.png" alt="" fill sizes="240px" />
              </div>
              <div className="mm-phone" aria-hidden="true">
                <Image src="/images/screenshots/collect-full.png" alt="" fill sizes="240px" />
              </div>
              <p className="mm-sticker mm-sticker--2" aria-hidden="true">내 캐릭터가 SS등급!</p>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 2. 공감 → 해결 */}
      <section className="mm-box">
        <div className="mm-wrap">
          <MotionWrapper className="mm-split" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mm-round">
              <Image
                src="/images/screenshots/empathy-1.png"
                alt="비 오는 날 바위 밑에서 스케치북을 안고 있는 고양이 캐릭터"
                fill
                sizes="320px"
              />
            </div>
            <div className="mm-split__text">
              <p>
                포트폴리오는 늘어나는데 조회수는 그대로고, 페어 부스는 3일 내내 서 있어도 지나가는 사람이 대부분이죠.
              </p>
              <p>SNS에 올려도 알고리즘이 한 번 훑고 지나가면 끝이에요.</p>
              <p className="mm-hand">사람이 안 보는 그림은, 멈춰있는 그림이에요</p>
            </div>
          </MotionWrapper>

          <MotionWrapper className="mm-split mm-split--rev" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mm-round">
              <Image
                src="/images/screenshots/empathy-2b.png"
                alt="야외에서 스케치북에 그림을 그리는 고양이 캐릭터"
                fill
                sizes="320px"
              />
            </div>
            <div className="mm-split__text">
              <p>뮤모는 그림을 &lsquo;찾아오는 이유&rsquo;로 바꿔요.</p>
              <p>
                유저는 카드를 모으려고 지도를 켜고, GPS로 그 장소까지 직접 이동해요. 도착하면 그 자리에서 작가님 캐릭터를
                만나고, 도감에 담아가요.
              </p>
              <p className="mm-hand">광고가 아니라 발걸음이에요</p>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 3. 베타 작가 특전 */}
      <section className="mm-section">
        <div className="mm-wrap">
          <MotionWrapper className="mm-sec-head" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mm-hand">지금 합류하시면</p>
            <h2 className="mm-sec-title">베타 작가님께만 드려요</h2>
            <p className="mm-sec-lead">지금 합류하시는 분들께 먼저 드리는 혜택이에요.</p>
          </MotionWrapper>
          <div className="mm-grid mm-grid--2">
            {BETA_PERKS.map((item) => (
              <div key={item.title} className="mm-card mm-card--lg mm-card--tilt">
                <h3 className="mm-card__title mm-card__title--red mm-card__title--big">{item.title}</h3>
                <p className="mm-card__text">{item.desc}</p>
                <p className="mm-card__note">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="mm-note">베타 기간에 신청하신 작가님께 적용돼요</p>
        </div>
      </section>

      {/* 4. 어떻게 작동하는지 */}
      <section className="mm-box mm-box--red" id="how">
        <div className="mm-wrap">
          <MotionWrapper className="mm-sec-head" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mm-sec-title">이렇게 함께해요</h2>
            <p className="mm-sec-lead">등록부터 노출까지, 작가님과 유저가 만나는 흐름이에요.</p>
          </MotionWrapper>
          <div className="mm-phones">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step}>
                <div className={`mm-phone${item.fit === 'contain' ? ' mm-phone--contain' : ''}`}>
                  <Image
                    src={item.src}
                    alt={`${item.title} 화면`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 250px"
                  />
                </div>
                <p className="mm-phone-cap">
                  <span className="mm-step-tag">{Number(item.step)}</span>
                  <b>{item.title}</b>
                  <small>{item.desc}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 작가가 얻는 것 */}
      <section className="mm-section">
        <div className="mm-wrap">
          <MotionWrapper className="mm-sec-head" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mm-sec-title">작가가 얻는 것</h2>
            <p className="mm-sec-lead">약속드릴 수 있는 것만 적어 두었어요.</p>
          </MotionWrapper>
          <div className="mm-grid mm-grid--3">
            {BENEFITS.map((item) => (
              <div key={item.title} className="mm-card mm-card--tilt">
                <h3 className="mm-card__title">{item.title}</h3>
                <p className="mm-card__text">{item.desc}</p>
                <p className="mm-card__note">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 스팟 기능 상세 */}
      <section className="mm-box mm-box--blue">
        <div className="mm-wrap">
          <MotionWrapper className="mm-sec-head" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mm-hand">작업실 · 판매처 · 페어 부스</p>
            <h2 className="mm-sec-title">스팟으로 등록하면</h2>
            <p className="mm-sec-lead">작업실·판매처·페어 부스를 스팟으로 두고, 아래를 직접 운영할 수 있어요.</p>
          </MotionWrapper>
          <div className="mm-phones">
            {SPOT_FEATURES.map((item) => (
              <div key={item.title}>
                <div className="mm-phone">
                  <Image src={item.src} alt={`${item.title} 화면`} fill sizes="(min-width: 1024px) 22vw, 250px" />
                </div>
                <p className="mm-phone-cap">
                  <b>{item.title}</b>
                  <small>{item.desc}</small>
                  <small>{item.note}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 참여 일정 */}
      <section className="mm-section">
        <div className="mm-wrap">
          <MotionWrapper className="mm-sec-head" whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mm-sec-title">이렇게 진행돼요</h2>
          </MotionWrapper>
          <ol className="mm-grid mm-grid--4" style={{ listStyle: 'none', padding: 0 }}>
            {BETA_TIMELINE.map((item) => (
              <li key={item.step} className="mm-card mm-card--num mm-card--tilt">
                <span className="mm-card__num" aria-hidden="true">
                  {Number(item.step)}
                </span>
                <h3 className="mm-card__title">{item.title}</h3>
                <p className="mm-card__note">{item.desc}</p>
              </li>
            ))}
          </ol>
          <p className="mm-note">전국 어디서 활동하셔도 신청할 수 있어요</p>
        </div>
      </section>

      {/* 8. 솔직하게 말씀드려요 + FAQ */}
      <section className="mm-box">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head">
            <h2 className="mm-sec-title">솔직하게 말씀드려요</h2>
            <p className="mm-sec-lead">신청하시기 전에 꼭 알아두셨으면 하는 조건이에요.</p>
          </div>
          <ul className="mm-rows mm-rows--split">
            {CONDITIONS.map((item) => (
              <li key={item.title}>
                <b>{item.title}</b>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 'var(--mm-space-3xl)' }}>
            <FaqAccordion categories={artistFaqCategories} />
            <p className="mm-note">
              <a href="/support#inquiry" style={{ fontWeight: 700 }}>
                더 궁금한 점은 문의해 주세요 →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 9. 신청 폼 */}
      <section id="apply" className="mm-section" style={{ scrollMarginTop: '84px' }}>
        <div className="mm-wrap">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand">베타 작가 모집</p>
            <h2 className="mm-sec-title">베타 작가로 신청하기</h2>
            <p className="mm-sec-lead">포트폴리오와 캐릭터 소개를 남겨주세요. 10월 말 베타 안내를 이메일로 보내드려요.</p>
          </div>
          <div className="mm-form-card">
            <ArtistApplyForm />
          </div>
        </div>
      </section>
    </div>
  );
}
