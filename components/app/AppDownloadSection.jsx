'use client';

import { useState } from 'react';
import CatVideo from '@/components/common/CatVideo';

// TODO: 스토어 링크 입력 예정
const APP_STORE_HREF = '#';
const PLAY_STORE_HREF = '#';

function StoreButton({ href, label, icon }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isComingSoon = href === '#';

  const handleClick = (e) => {
    if (isComingSoon) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-disabled={isComingSoon ? 'true' : undefined}
      className="relative inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 bg-[var(--color-primary)] text-white font-semibold rounded-[14px] transition-all duration-150 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.97] shadow-[0_4px_16px_rgba(232,52,26,0.25)]"
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
      {showTooltip && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-[var(--color-gray-900)] text-white rounded-lg whitespace-nowrap shadow-lg">
          곧 만나요!
        </span>
      )}
    </a>
  );
}

export function AppLogo({ className = '' }) {
  return (
    <CatVideo
      src="/videos/cat2.mp4"
      alt="춤추는 뮤모 캐릭터"
      className={`w-[22rem] h-[22rem] md:w-[26rem] md:h-[26rem] mx-auto object-contain ${className}`}
    />
  );
}

export function AppTagline({ className = '', children }) {
  return (
    <p className={`text-base md:text-lg text-[var(--color-gray-700)] leading-relaxed max-w-md ${className}`}>
      {children || (
        <>
          다운로드 버튼이 곧 활성화돼요.
          <br />
          지금은 사전예약으로 먼저 만나보세요
        </>
      )}
    </p>
  );
}

export function AppScreenshots({ className = '' }) {
  const slots = ['지도', '수집', '도감', '스팟'];

  return (
    <div className={`flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory ${className}`}>
      {slots.map((label) => (
        <div key={label} className="flex-shrink-0 w-[160px] md:w-[180px] snap-center">
          <div className="rounded-[1.5rem] border-4 border-[var(--color-gray-900)] bg-[var(--color-gray-900)] p-1.5 shadow-lg">
            <div className="aspect-[9/19] rounded-[1.25rem] bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-secondary-yellow-light)] flex items-center justify-center text-2xl">
              📱
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-[var(--color-gray-500)]">{label}</p>
        </div>
      ))}
    </div>
  );
}

export function AppStoreButton({ href = APP_STORE_HREF }) {
  const icon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
  return <StoreButton href={href} label="App Store" icon={icon} />;
}

export function PlayStoreButton({ href = PLAY_STORE_HREF }) {
  const icon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.003 1.003 0 01-1.542-.844V2.658A1.003 1.003 0 013.61 1.814zM14.5 12l8.4 6.3a1 1 0 001.6-.8V6.5a1 1 0 00-1.6-.8L14.5 12z" />
    </svg>
  );
  return <StoreButton href={href} label="Google Play" icon={icon} />;
}

export function DownloadButtons({ className = '', layout = 'row' }) {
  const layoutClass = layout === 'column' ? 'flex-col items-center' : 'flex-col sm:flex-row items-center justify-center';
  return (
    <div className={`flex ${layoutClass} gap-3 ${className}`}>
      <AppStoreButton />
      <PlayStoreButton />
    </div>
  );
}

export default function AppDownloadSection({ variant = 'full', className = '' }) {
  if (variant === 'hero') {
    return (
      <div className={`space-y-6 ${className}`}>
        <DownloadButtons />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col items-center gap-6 text-center ${className}`}>
        <AppLogo />
        <AppTagline />
        <DownloadButtons className="justify-center" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      <div className="flex flex-col items-center gap-4 text-center">
        <AppLogo />
        <AppTagline />
      </div>
      <AppScreenshots className="w-full max-w-3xl justify-center" />
      <DownloadButtons className="justify-center" />
    </div>
  );
}
