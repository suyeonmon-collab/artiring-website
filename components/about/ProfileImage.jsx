'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProfileImage({ src, alt, fit = 'cover' }) {
  const [imageStatus, setImageStatus] = useState('loading');
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setImageStatus('loaded');
      } else {
        setImageStatus('error');
      }
    }
  }, [src]);

  const isContain = fit === 'contain';

  return (
    <div
      className={`flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-[var(--color-border)] ${
        isContain ? 'bg-white' : 'bg-[var(--color-bg-sub)]'
      }`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full ${
          isContain ? 'object-contain object-center' : 'object-cover object-top'
        } ${imageStatus === 'loaded' ? '' : 'hidden'}`}
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
