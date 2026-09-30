'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const PANELS = [
  { src: '/images/cartoon/01.png', alt: '뮤모 소개 만화 1페이지' },
  { src: '/images/cartoon/02.jpg', alt: '뮤모 소개 만화 2페이지' },
  { src: '/images/cartoon/03.jpg', alt: '뮤모 소개 만화 3페이지' },
  { src: '/images/cartoon/04.png', alt: '뮤모 소개 만화 4페이지' },
  { src: '/images/cartoon/05.png', alt: '뮤모 소개 만화 5페이지' },
  { src: '/images/cartoon/06.png', alt: '뮤모 소개 만화 6페이지' },
  { src: '/images/cartoon/07.png', alt: '뮤모 소개 만화 7페이지' },
  { src: '/images/cartoon/08.jpg', alt: '뮤모 소개 만화 8페이지' },
];

export default function CartoonIntroCarousel() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const center = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

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
    scrollTo(Math.max(0, Math.min(PANELS.length - 1, activeIndex + dir)));
  };

  return (
    <div className="relative mt-10 md:mt-12">
      <div className="hidden sm:flex absolute left-0 md:-left-2 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={activeIndex === 0}
          aria-label="이전 만화"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-[var(--color-gray-300)] flex items-center justify-center text-[var(--color-gray-700)] disabled:opacity-30 hover:bg-[var(--color-gray-100)] transition-colors"
        >
          ‹
        </button>
      </div>
      <div className="hidden sm:flex absolute right-0 md:-right-2 top-1/2 -translate-y-1/2 z-10">
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={activeIndex === PANELS.length - 1}
          aria-label="다음 만화"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-[var(--color-gray-300)] flex items-center justify-center text-[var(--color-gray-700)] disabled:opacity-30 hover:bg-[var(--color-gray-100)] transition-colors"
        >
          ›
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        aria-label="뮤모 소개 만화"
      >
        {PANELS.map((panel, i) => (
          <div
            key={panel.src}
            className="flex-shrink-0 w-[min(78vw,320px)] sm:w-[340px] md:w-[360px] snap-center"
          >
            <div className="relative w-full aspect-[880/1168] rounded-[var(--radius-lg)] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.1)] bg-[var(--color-gray-100)]">
              <Image
                src={panel.src}
                alt={panel.alt}
                fill
                sizes="(min-width: 768px) 360px, 78vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-5">
        <p className="text-sm text-[var(--color-gray-500)] tabular-nums" aria-live="polite">
          {activeIndex + 1} / {PANELS.length}
        </p>
        <div className="flex gap-1.5">
          {PANELS.map((panel, i) => (
            <button
              key={panel.src}
              type="button"
              aria-label={`만화 ${i + 1}페이지`}
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? 'bg-[var(--color-primary)] w-5'
                  : 'bg-[var(--color-gray-300)] w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
