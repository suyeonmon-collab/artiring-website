'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: '소개', href: '/about' },
  { name: '뮤모 앱', href: '/#app' },
  {
    name: '아티링소식',
    href: 'https://www.instagram.com/arti_ring',
    external: true,
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // 높이 변경 없이 스타일만 바꿀 때도 경계에서 깜빡임 방지
      const next = y > 48 ? true : y < 16 ? false : scrolledRef.current;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    if (href.startsWith('http')) return false;
    if (href.includes('#')) return pathname === '/';
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b h-16 transition-[background-color,box-shadow,border-color] duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-[var(--color-gray-300)] shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-[var(--color-gray-300)]/60'
      }`}
    >
      <nav className="max-w-content mx-auto px-5 md:px-20 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          <Link href="/" className="flex items-center hover:opacity-70 transition-opacity flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="ARTIRING"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/#download"
              className="inline-flex items-center justify-center px-4 min-h-[40px] text-sm font-semibold text-white bg-[var(--color-primary)] rounded-lg transition-all duration-150 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.97]"
            >
              다운로드
            </a>

            <button
              type="button"
              className="md:hidden p-2 -mr-2 text-[var(--color-gray-700)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-gray-300)]">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                      : 'text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] hover:bg-[var(--color-gray-100)]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
