'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';
import AppDownloadSection from '@/components/app/AppDownloadSection';
import HeroWalkingCharacter from '@/components/home/HeroWalkingCharacter';

const EXPERIENCE_STEPS = [
  { step: '01', title: '방문', desc: '여행지에 도착하면 앱이 살짝 알려줘요', icon: 'visit' },
  { step: '02', title: '인증', desc: '현장에서 GPS로 방문을 인증해요', icon: 'verify' },
  { step: '03', title: '수집', desc: '그곳에만 있는 캐릭터를 만나요', icon: 'collect' },
  { step: '04', title: '도감', desc: '모은 친구들이 도감에 차곡차곡', icon: 'book' },
  { step: '05', title: '완주', desc: '여행이 끝나도 추억은 계속 남아요', icon: 'complete' },
];

const CHARACTERS = [
  { name: '고등어냥', src: '/images/cards/mackerel.jpg', grade: 'S' },
  { name: '달빛 검둥냥', src: '/images/cards/moonlight-black.jpg', grade: 'S' },
  { name: '별빛 얼룩냥', src: '/images/cards/starlight-calico.jpg', grade: 'S' },
  { name: '순백의 흰냥', src: '/images/cards/pure-white.jpg', grade: 'S' },
  { name: '신사 턱시도냥', src: '/images/cards/tuxedo.jpg', grade: 'S' },
  { name: '황금 치즈냥', src: '/images/cards/golden-cheese.jpg', grade: 'S' },
];

const SCREENSHOTS = [
  { label: '지도 화면', desc: '주변 캐릭터 탐색', src: '/images/screenshots/map.jpg' },
  { label: '수집 화면', desc: '방문 인증 & 획득', src: '/images/screenshots/collect.jpg' },
  { label: '도감 화면', desc: '나만의 여행 도감', src: '/images/screenshots/album.jpg' },
  { label: '스팟 화면', desc: '방문 가능한 스팟을 한눈에 지도에서 볼 수 있어요', src: '/images/screenshots/spot.jpg' },
];

const TESTIMONIALS = [
  {
    stat: '8/10',
    quote: '여행자 10명 중 8명이 다시 오고 싶다고 했어요',
    detail: '현장 인터뷰, 2026.01',
  },
  {
    stat: '92%',
    quote: '사진 말고도 여행이 남는다는 말을 들었어요',
    detail: '사전 테스트 응답',
  },
  {
    stat: '7/10',
    quote: '아이와 함께 가면 더 재밌을 것 같다는 의견이 많았어요',
    detail: '가족 여행자 그룹',
  },
  {
    stat: '85%',
    quote: '현지에 가야 만날 수 있다는 점이 가장 매력적이에요',
    detail: 'MZ 여행자 인터뷰',
  },
];

function ExperienceStepIcon({ type }) {
  const className = 'w-9 h-9 flex-shrink-0 text-[var(--color-primary)]';

  const icons = {
    visit: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    verify: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    collect: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    book: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    complete: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8M12 17v4M6 4h12v5a6 6 0 11-12 0V4zM6 4H4v2a2 2 0 002 2M18 4h2v2a2 2 0 01-2 2" />
      </svg>
    ),
  };

  return icons[type] || null;
}

function PlaceholderIllustration({ label, className = '', children }) {
  return (
    <div
      className={`flex items-center justify-center bg-white rounded-[var(--radius-lg)] ${className}`}
      aria-hidden={!children}
    >
      {children || <span className="text-4xl md:text-5xl opacity-60">{label}</span>}
    </div>
  );
}

function DownloadCtaButton({ children, href = '#download', className = '' }) {
  return (
    <a href={href} className={`btn-download ${className}`}>
      {children}
    </a>
  );
}

function TestimonialCarousel({ items }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.children[0].offsetWidth + 16;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollTo = (index) => {
    const el = scrollRef.current;
    if (!el || !el.children[index]) return;
    el.children[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActiveIndex(index);
  };

  const scrollByDir = (dir) => {
    const next = Math.max(0, Math.min(items.length - 1, activeIndex + dir));
    scrollTo(next);
  };

  return (
    <div className="relative mt-10">
      <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={activeIndex === 0}
          aria-label="이전 후기"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-[var(--color-gray-300)] flex items-center justify-center text-[var(--color-gray-700)] disabled:opacity-30 hover:bg-[var(--color-gray-100)] transition-colors"
        >
          ‹
        </button>
      </div>
      <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={activeIndex === items.length - 1}
          aria-label="다음 후기"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-[var(--color-gray-300)] flex items-center justify-center text-[var(--color-gray-700)] disabled:opacity-30 hover:bg-[var(--color-gray-100)] transition-colors"
        >
          ›
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-pl-5 md:scroll-pl-0 -mx-5 px-5 md:mx-0 md:px-0"
      >
        {items.map((item) => (
          <div
            key={item.quote}
            className="flex-shrink-0 w-[240px] md:w-[260px] snap-center p-6 bg-[var(--color-secondary-yellow-light)] rounded-[var(--radius-lg)] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <p className="font-accent text-3xl md:text-[32px] font-bold text-[var(--color-primary)]">
              {item.stat}
            </p>
            <p className="mt-4 text-base text-[var(--color-gray-900)] leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </p>
            <p className="mt-4 text-xs text-[var(--color-gray-500)]">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((item, i) => (
          <button
            key={item.quote}
            type="button"
            aria-label={`후기 ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex
                ? 'bg-[var(--color-primary)] w-5'
                : 'bg-[var(--color-gray-300)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero */}
      <section id="app" className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[var(--color-primary-light)]/40 to-white scroll-mt-16">
        <div className="w-full max-w-content mx-auto px-5 md:px-20 py-16 md:py-20">
          <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] gap-8 md:gap-8 items-center">
            <MotionWrapper animate={{ opacity: 1, y: 0 }}>
              <Image
                src="/images/mumo-logo.png"
                alt="뮤모"
                width={120}
                height={80}
                className="h-8 md:h-10 w-auto mb-3"
                priority
              />
              <h1 className="font-accent text-[28px] md:text-[40px] font-bold leading-[1.3] text-[var(--color-gray-900)]">
                여행할수록
                <br />
                채워지는 도감
              </h1>
              <p className="mt-4 text-base md:text-lg text-[var(--color-gray-700)] leading-relaxed max-w-md">
                가야만 만날 수 있는 친구들이 기다리고 있어요.
                이번 여행, 사진 너머의 추억을 모아보세요.
              </p>
              <p className="mt-6">
                <a href="#download" className="text-sm font-medium text-[var(--color-secondary-blue)] hover:underline">
                  앱 출시 소식 받기 →
                </a>
              </p>
            </MotionWrapper>

            <MotionWrapper
              className="flex justify-center md:justify-end"
              animate={{ opacity: 1, y: 0 }}
            >
              <HeroWalkingCharacter />
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* 2. 공감 유발 */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-[720px] mx-auto px-5 md:px-20 text-center">
          <MotionWrapper
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <h2 className="font-accent text-2xl md:text-[32px] font-bold leading-snug text-[var(--color-gray-900)]">
              이번 여행,
              <br />
              사진만 남기고 끝나지 않았나요?
            </h2>
            <p className="mt-8 text-base md:text-lg text-[var(--color-gray-700)] leading-relaxed">
              같은 장소, 같은 하늘 — 그런데 돌아오면 기억만 흐릿해져요.
            </p>
            <p className="mt-4 text-base md:text-lg text-[var(--color-gray-700)] leading-relaxed">
              뮤모는 그 순간을 캐릭터로 남겨드려요 🐱
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* 3. 핵심 경험 소개 */}
      <section id="experience" className="landing-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              이렇게 모아요
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              방문부터 완주까지, 여행이 게임처럼 쌓여요
            </p>
          </MotionWrapper>

          <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4" staggerDelay={0.08}>
            {EXPERIENCE_STEPS.map((item) => (
              <StaggerItem key={item.step}>
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-3 md:text-center">
                  <PlaceholderIllustration className="w-20 h-20 md:w-full md:aspect-square flex-shrink-0">
                    <ExperienceStepIcon type={item.icon} />
                  </PlaceholderIllustration>
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-primary)]">{item.step}</span>
                    <h3 className="mt-1 font-semibold text-[var(--color-gray-900)]">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-gray-700)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <MotionWrapper
            className="mt-12 text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true }}
          >
            <DownloadCtaButton href="#download">지금 다운받고 첫 캐릭터 받기</DownloadCtaButton>
          </MotionWrapper>
        </div>
      </section>

      {/* 4. 캐릭터 매력 어필 */}
      <section className="landing-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              나만 몰랐던 뮤모 친구들
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              앱에 접속하면 바로 만날 수 있어요
            </p>
          </MotionWrapper>

          <StaggerContainer className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {CHARACTERS.map((char) => (
              <StaggerItem key={char.name}>
                <div className="group rounded-[var(--radius-lg)] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <div className="relative w-full aspect-[1/1.618] overflow-hidden bg-[var(--color-gray-100)]">
                    <Image
                      src={char.src}
                      alt={char.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="font-accent font-bold text-[var(--color-gray-900)]">{char.name}</p>
                    <p className="text-xs text-[var(--color-gray-500)] mt-0.5">기본 캐릭터</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold bg-[var(--color-secondary-yellow-light)] text-[var(--color-gray-900)] rounded-full">
                      {char.grade}등급
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. 앱 화면 미리보기 */}
      <section id="app-preview" className="landing-section bg-[var(--color-gray-100)] scroll-mt-16">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              앱 속 여행 미리보기
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              친구들과의 만남을 기다리고 있어요
            </p>
          </MotionWrapper>

          <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
            {SCREENSHOTS.map((screen) => (
              <div key={screen.label} className="flex-shrink-0 w-[200px] md:w-auto snap-center">
                <div className="rounded-[2rem] border-2 border-[var(--color-gray-900)] bg-[var(--color-gray-900)] p-1 shadow-xl">
                  <div className="relative w-full aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-white">
                    <Image
                      src={screen.src}
                      alt={screen.label}
                      fill
                      sizes="(min-width: 768px) 25vw, 200px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <p className="mt-4 text-center font-semibold text-[var(--color-gray-900)]">{screen.label}</p>
                <p className="text-center text-sm text-[var(--color-gray-500)] leading-relaxed">{screen.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 후기/기대 인용 */}
      <section className="landing-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              미리 만나본 분들의 이야기
            </h2>
          </MotionWrapper>

          <TestimonialCarousel items={TESTIMONIALS} />
        </div>
      </section>

      {/* 7. 외부 채널 */}
      <section className="landing-section bg-[var(--color-gray-100)]">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-accent text-xl md:text-2xl font-bold text-[var(--color-gray-900)] text-center">
              더 많은 이야기가 궁금하다면
            </h2>

            <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href="https://blog.naver.com/artiring"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 md:p-8 bg-white rounded-[var(--radius-lg)] transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-2xl">📖</span>
                <p className="mt-4 font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-secondary-blue)] transition-colors">
                  네이버 블로그 팔로우하기
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-700)]">
                  뮤모가 만들어지는 과정을 기록하고 있어요
                </p>
              </a>
              <a
                href="https://www.instagram.com/arti_ring"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 md:p-8 bg-white rounded-[var(--radius-lg)] transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-2xl">📸</span>
                <p className="mt-4 font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-secondary-blue)] transition-colors">
                  인스타그램 팔로우하기
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-700)]">
                  캐릭터 소식과 여행 이야기를 올려요
                </p>
              </a>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 8. 다운로드 CTA (메인) */}
      <section id="download" className="landing-section bg-white scroll-mt-16">
        <div className="max-w-content mx-auto px-5 md:px-20 text-center">
          <MotionWrapper whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }}>
            <h2 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)]">
              지금 만나러 가기
            </h2>
            <p className="mt-3 text-[var(--color-gray-700)]">
              첫 캐릭터가 기다리고 있어요 🐱
            </p>

            <div className="mt-10 flex justify-center">
              <AppDownloadSection variant="compact" />
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/structure#preregister" className="btn-secondary">
                사전예약하기
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
}
