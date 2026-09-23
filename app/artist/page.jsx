import Image from 'next/image';
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';
import FaqAccordion from '@/components/support/FaqAccordion';
import ArtistApplyForm from '@/components/artist/ArtistApplyForm';
import { artistFaqCategories } from '@/lib/artist/faq';

export const metadata = {
  title: '작가로 참여',
  description:
    '아티링이 만드는 뮤모, 함께할 작가를 찾습니다. 12월 첫 테스트를 앞두고 캐릭터 카드와 스팟을 함께 만들어갈 작가님을 모집해요.',
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

const TRUST_POINTS = [
  {
    icon: 'design',
    text: '10년 넘게 그래픽 디자인을 해온 대표가 직접 만들고 있어요',
  },
  {
    icon: 'calendar',
    text: '12월, 첫 테스트가 확정됐어요',
  },
  {
    icon: 'map',
    text: '서울에서 시작해서, 전국으로 넓혀가요',
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
];

function StepIcon({ type, className = 'w-9 h-9 flex-shrink-0 text-[var(--color-primary)]' }) {
  const icons = {
    map: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    design: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };

  return icons[type] || null;
}

export default function ArtistPage() {
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-b from-[var(--color-primary-light)]/40 to-white">
        <div className="max-w-content mx-auto px-5 md:px-20 w-full py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <MotionWrapper
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-[var(--color-primary)] mb-3">작가 모집</p>
              <h1 className="font-accent text-2xl md:text-[36px] font-bold text-[var(--color-gray-900)] leading-snug">
                아티링이 만드는 뮤모,
                <br />
                작가님과 함께 만들어요
              </h1>
              <p className="mt-4 text-base md:text-lg text-[var(--color-gray-700)] leading-relaxed">
                그림은 계속 쌓이는데, 아무도 찾아오지 않는 곳에만 있으세요?
              </p>
              <p className="mt-3 text-base md:text-lg text-[var(--color-gray-700)] leading-relaxed">
                뮤모와, 발걸음으로, 카드로 나를 알릴 작가님을 찾습니다
              </p>
              <div className="mt-8">
                <a href="#apply" className="btn-download">
                  작가로 신청하기
                </a>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative w-[320px] sm:w-[360px] md:w-[400px] h-[480px] sm:h-[530px] md:h-[580px] -translate-x-4 md:-translate-x-10">
                {/* 맨뒤: 수집 화면 — 더 많이 보이게 오른쪽으로 더 밀어냄 */}
                <div
                  className="absolute top-6 -right-2 sm:right-0 w-[180px] sm:w-[200px] md:w-[220px] rotate-[14deg] origin-bottom z-0"
                  aria-hidden="true"
                >
                  <div className="rounded-[2rem] border-2 border-[var(--color-gray-900)] bg-[var(--color-gray-900)] p-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.1)]">
                    <div className="relative w-full aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-white">
                      <Image
                        src="/images/screenshots/collect-full.png"
                        alt=""
                        fill
                        sizes="220px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                {/* 중간: 도감 화면 */}
                <div
                  className="absolute top-3 right-10 sm:right-12 md:right-14 w-[190px] sm:w-[210px] md:w-[230px] rotate-[6deg] origin-bottom z-[1]"
                  aria-hidden="true"
                >
                  <div className="rounded-[2rem] border-2 border-[var(--color-gray-900)] bg-[var(--color-gray-900)] p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.14)]">
                    <div className="relative w-full aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-white">
                      <Image
                        src="/images/screenshots/album-full.png"
                        alt=""
                        fill
                        sizes="230px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                {/* 앞: 지도 화면 */}
                <div className="absolute top-0 left-0 w-[200px] sm:w-[220px] md:w-[240px] -rotate-[4deg] origin-bottom z-10">
                  <div className="rounded-[2rem] border-2 border-[var(--color-gray-900)] bg-[var(--color-gray-900)] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
                    <div className="relative w-full aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-white">
                      <Image
                        src="/images/screenshots/map-full.png"
                        alt="뮤모 지도·도감·수집 화면"
                        fill
                        sizes="240px"
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* 공감 — 원형 이미지(좌) + 텍스트 */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-24 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 flex-shrink-0 rounded-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/screenshots/empathy-1.png"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 320px, 256px"
                  className="object-cover object-center"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg md:text-xl text-[var(--color-gray-700)] leading-relaxed">
                  포트폴리오는 늘어나는데 조회수는 그대로고,
                  <br className="hidden sm:block" />
                  페어 부스는 3일 내내 서 있어도 지나가는 사람이 대부분이죠.
                </p>
                <p className="mt-5 text-lg md:text-xl text-[var(--color-gray-700)] leading-relaxed">
                  SNS에 올려도 알고리즘이 한 번 훑고 지나가면 끝이에요.
                </p>
                <p className="mt-10 text-lg md:text-xl font-semibold text-[var(--color-gray-900)] leading-relaxed">
                  사람이 안 보는 그림은, 아무리 잘 그려도 멈춰있는 그림이에요.
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 해결책 — 원형 이미지(좌) + 텍스트 */}
      <section className="landing-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 flex-shrink-0 rounded-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/screenshots/empathy-2b.png"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 320px, 256px"
                  className="object-cover object-center"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg md:text-xl text-[var(--color-gray-700)] leading-relaxed">
                  여모냥은 그림을 &lsquo;찾아오는 이유&rsquo;로 바꿔요.
                </p>
                <p className="mt-5 text-lg md:text-xl text-[var(--color-gray-700)] leading-relaxed">
                  유저는 카드를 모으려고 지도를 켜고, GPS로 그 장소까지 직접 이동해요.
                  <br className="hidden sm:block" />
                  도착하면 그 자리에서 작가님 캐릭터를 만나고, 도감에 담아가요.
                </p>
                <p className="mt-10 text-lg md:text-xl font-semibold text-[var(--color-gray-900)] leading-relaxed">
                  광고가 아니라 발걸음이에요.
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 2. 어떻게 작동하는지 */}
      <section className="landing-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              이렇게 함께해요
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              등록부터 노출까지, 작가님과 유저가 만나는 흐름이에요
            </p>
          </MotionWrapper>

          <div className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex-shrink-0 w-[260px] md:w-auto snap-center">
                <div className="rounded-[2rem] border-2 border-[var(--color-gray-900)] bg-[var(--color-gray-900)] p-1.5 shadow-xl">
                  <div className="relative w-full aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-white">
                    <Image
                      src={item.src}
                      alt={`${item.title} 화면`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 40vw, 260px"
                      className={
                        item.fit === 'contain'
                          ? 'object-contain object-top'
                          : 'object-cover object-top'
                      }
                    />
                  </div>
                </div>
                <p className="mt-4 text-center text-xs font-semibold text-[var(--color-primary)]">
                  {item.step}
                </p>
                <p className="mt-1 text-center font-semibold text-[var(--color-gray-900)]">
                  {item.title}
                </p>
                <p className="mt-1 text-center text-sm text-[var(--color-gray-500)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 작가가 얻는 것 */}
      <section className="landing-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              작가가 얻는 것
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              약속드릴 수 있는 것만 적어 두었어요
            </p>
          </MotionWrapper>

          <StaggerContainer
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            staggerDelay={0.08}
          >
            {BENEFITS.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full p-6 bg-[var(--color-secondary-yellow-light)] rounded-[var(--radius-lg)] shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <h3 className="font-accent text-lg font-bold text-[var(--color-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--color-gray-900)] leading-relaxed">
                    {item.desc}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-gray-700)] leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. 스팟 기능 상세 */}
      <section className="landing-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              스팟으로 등록하면
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              작업실·판매처·페어 부스를 스팟으로 두고, 아래를 직접 운영할 수 있어요
            </p>
          </MotionWrapper>

          <div className="mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:gap-6">
            {SPOT_FEATURES.map((item) => (
              <div key={item.title} className="flex-shrink-0 w-[260px] md:w-auto snap-center">
                <div className="rounded-[2rem] border-2 border-[var(--color-gray-900)] bg-[var(--color-gray-900)] p-1.5 shadow-xl">
                  <div className="relative w-full aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-white">
                    <Image
                      src={item.src}
                      alt={`${item.title} 화면`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 40vw, 260px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <p className="mt-4 text-center font-semibold text-[var(--color-gray-900)]">
                  {item.title}
                </p>
                <p className="mt-1 text-center text-sm text-[var(--color-gray-500)] leading-relaxed">
                  {item.desc}
                </p>
                <p className="mt-1.5 text-center text-sm text-[var(--color-gray-700)] leading-relaxed">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 신뢰 근거 — about/메인 카드·스텝 톤 */}
      <section className="landing-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              지금, 이 정도까지 왔어요
            </h2>
          </MotionWrapper>

          <StaggerContainer
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={0.08}
          >
            {TRUST_POINTS.map((item, index) => (
              <StaggerItem key={item.text}>
                <div className="card p-6 h-full">
                  <div className="flex items-center justify-center w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--color-gray-100)]">
                    <StepIcon type={item.icon} />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-[var(--color-primary)]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-sm md:text-[15px] text-[var(--color-gray-700)] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. 솔직하게 말씀드려요 — 장식 없이 담백하게 */}
      <section className="landing-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <div className="max-w-2xl">
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              솔직하게 말씀드려요
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)] leading-relaxed">
              신청하시기 전에 꼭 알아두셨으면 하는 조건이에요.
            </p>

            <ul className="mt-8 space-y-6">
              {CONDITIONS.map((item) => (
                <li key={item.title} className="border-b border-[var(--color-gray-300)] pb-6 last:border-0 last:pb-0">
                  <h3 className="text-base font-semibold text-[var(--color-gray-900)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-[15px] text-[var(--color-gray-700)] leading-relaxed">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="landing-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <div className="max-w-2xl mx-auto">
            <MotionWrapper
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true }}
            >
              <FaqAccordion categories={artistFaqCategories} />
              <p className="mt-8 text-sm text-[var(--color-gray-700)] text-center leading-relaxed">
                <a
                  href="/support#inquiry"
                  className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
                >
                  더 궁금한점은 문의해 주세요
                </a>
              </p>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* 7. 신청 폼 */}
      <section id="apply" className="page-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-medium text-[var(--color-primary)] mb-3 text-center">
              작가 모집
            </p>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)] text-center">
              작가로 신청하기
            </h2>
            <p className="mt-4 text-[var(--color-gray-700)] text-center max-w-lg mx-auto leading-relaxed">
              포트폴리오와 캐릭터 소개를 남겨주시면, 선정 후 개별 연락드려요.
            </p>
            <div className="mt-10 max-w-md mx-auto">
              <ArtistApplyForm />
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
}
