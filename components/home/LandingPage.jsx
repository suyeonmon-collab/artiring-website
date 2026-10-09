'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/home/mumo/Hero';
import Statement from '@/components/home/mumo/Statement';
import Steps from '@/components/home/mumo/Steps';
import ProductMap from '@/components/home/mumo/ProductMap';
import Friends from '@/components/home/mumo/Friends';
import ArtistsTeaser from '@/components/home/mumo/ArtistsTeaser';
import Maker from '@/components/home/mumo/Maker';
import Proof from '@/components/home/mumo/Proof';
import FinalCta from '@/components/home/mumo/FinalCta';
import Dock from '@/components/home/mumo/Dock';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useMumoMotion(rootRef) {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      // 독: 히어로를 지나면 표시 (움직임 줄이기에서도 동작)
      ScrollTrigger.create({
        trigger: q('.mm-hero')[0],
        start: 'bottom 60%',
        end: 'max',
        toggleClass: { targets: q('.mm-dock'), className: 'mm-is-on' },
      });

      const mm = gsap.matchMedia();
      mm.add({ ok: '(prefers-reduced-motion: no-preference)' }, () => {
        // 1) 첫 화면: 제품 화면이 채워지는 짧은 시퀀스
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });
        tl.from(q('.mm-hero__kicker'), { autoAlpha: 0, y: 12, duration: 0.4 })
          .from(q('.mm-hero__title'), { autoAlpha: 0, y: 24 }, '<0.05')
          .from(q('.mm-hero__lead, .mm-hero .mm-hero__cta, .mm-hero__status'), { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.45 }, '<0.2')
          .from(q('.mm-hero__screen'), { autoAlpha: 0, y: 70, stagger: 0.12, duration: 0.7 }, '<0.15')
          .from(q('.mm-screen--map .mm-map-pin'), { scale: 0, transformOrigin: '50% 50%', stagger: 0.06, duration: 0.3, ease: 'power2.out' }, '-=0.3')
          .from(q('.mm-get-card'), { scale: 0.86, autoAlpha: 0, duration: 0.5 }, '<')
          .from(q('.mm-dex-cell.mm-is-filled'), { autoAlpha: 0, scale: 0.85, stagger: 0.07, duration: 0.3 }, '<0.1')
          .from(q('.mm-hero .mm-sticker'), { autoAlpha: 0, y: 10, stagger: 0.1, duration: 0.35 }, '-=0.15');

        // 2) 섹션 진입: 한 번만, 아래에서 살짝
        gsap.set(q('.mm-reveal'), { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(q('.mm-reveal'), {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power2.out', overwrite: true }),
        });

        // 3) 지도: 핀이 떨어지고 길이 이어지고 팝업이 뜸
        const mapTl = gsap.timeline({ scrollTrigger: { trigger: q('.mm-bigmap')[0], start: 'top 70%', once: true } });
        mapTl
          .from(q('.mm-bm-pin'), { y: -24, autoAlpha: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out' })
          .fromTo(q('.mm-bigmap__route path'), { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 0.8, ease: 'none' }, '<0.2')
          .from(q('.mm-bigmap__popup'), { y: 20, autoAlpha: 0, duration: 0.45, ease: 'power3.out' }, '-=0.3');

        // 4) 숫자가 올라가는 표시
        q('.mm-count').forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          el.textContent = '0';
          gsap.to(o, {
            v: end,
            duration: 1.1,
            ease: 'power2.out',
            snap: { v: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => { el.textContent = o.v; },
            onComplete: () => { el.textContent = end; },
          });
        });
      });

      // 웹폰트가 늦게 로드되면 위치를 다시 계산
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, []);
}

export default function LandingPage() {
  const rootRef = useRef(null);
  useMumoMotion(rootRef);

  return (
    <div className="mm-page mm-page--home" ref={rootRef}>
      <Hero />
      <Statement />
      <Steps />
      <ProductMap />
      <Friends />
      <ArtistsTeaser />
      <Maker />
      <Proof />
      <FinalCta />
      <Dock />
    </div>
  );
}
