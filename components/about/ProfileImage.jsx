'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProfileImage() {
  const [imageStatus, setImageStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const imgRef = useRef(null);

  useEffect(() => {
    // 이미 로드된 이미지인지 확인 (캐시된 경우)
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setImageStatus('loaded');
      } else {
        setImageStatus('error');
      }
    }
  }, []);

  return (
    <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-[var(--color-bg-sub)] border border-[var(--color-border)]">
      <img 
        ref={imgRef}
        src="/images/ceo.jpg" 
        alt="임수연 대표"
        className={`w-full h-full object-cover object-top ${imageStatus === 'loaded' ? '' : 'hidden'}`}
        onLoad={() => setImageStatus('loaded')}
        onError={() => setImageStatus('error')}
      />
      {imageStatus !== 'loaded' && (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-point)]">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  );
}

