'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// 좌측 알약 2개 · 가운데 로고 · 우측 알약 (레퍼런스 N9 edge-aligned pills)
const leftNav = [
  { name: '소개', href: '/about', tone: '' },
  { name: '뮤모 앱', href: '/#app', tone: 'sun' },
];

const rightNav = [
  { name: '작가로 참여', href: '/artist', tone: 'blue' },
  { name: '고객센터', href: '/support', tone: '' },
];

const PREREGISTER_HREF = '/structure#preregister';

const allNav = [...leftNav, ...rightNav];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href.includes('#')) return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const pillClass = (tone) => `mm-nav__pill${tone ? ` mm-nav__pill--${tone}` : ''}`;

  return (
    <header className="mm-nav" aria-label="주요 메뉴">
      <nav className="mm-nav__group" aria-label="사이트 메뉴">
        {leftNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${pillClass(item.tone)} mm-nav__hide-sm`}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
        <button
          type="button"
          className="mm-nav__pill mm-nav__pill--menu mm-nav__only-sm"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mm-mobile-menu"
        >
          메뉴
        </button>
      </nav>

      <Link className="mm-nav__logo" href="/" aria-label="아티링 홈으로">
        <Image src="/images/logo.png" alt="" width={74} height={22} priority />
      </Link>

      <div className="mm-nav__group mm-nav__group--end">
        {rightNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${pillClass(item.tone)} mm-nav__hide-sm`}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
        <Link className="mm-nav__pill mm-nav__pill--red" href={PREREGISTER_HREF}>
          사전등록
        </Link>
      </div>

      {menuOpen && (
        <div className="mm-menu" id="mm-mobile-menu" role="dialog" aria-modal="true" aria-label="메뉴">
          <div className="mm-menu__top">
            <Link className="mm-nav__logo" href="/" aria-label="아티링 홈으로" onClick={() => setMenuOpen(false)}>
              <Image src="/images/logo.png" alt="" width={74} height={22} />
            </Link>
            <button
              type="button"
              className="mm-nav__pill mm-nav__pill--menu"
              onClick={() => setMenuOpen(false)}
              autoFocus
            >
              닫기
            </button>
          </div>
          <ul className="mm-menu__list">
            {allNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mm-menu__cta">
            <Link className="mm-btn mm-btn--red" href={PREREGISTER_HREF} onClick={() => setMenuOpen(false)}>
              출시 알림 받기
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
