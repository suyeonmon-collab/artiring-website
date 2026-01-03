'use client';

import { useEffect, useRef } from 'react';

export default function BlogIframe({ htmlFileName }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // iframe 로드 완료 후 높이 조절
    const adjustHeight = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          const height = Math.max(
            iframeDocument.body.scrollHeight,
            iframeDocument.body.offsetHeight,
            iframeDocument.documentElement.clientHeight,
            iframeDocument.documentElement.scrollHeight,
            iframeDocument.documentElement.offsetHeight
          );
          iframe.style.height = height + 'px';
        }
      } catch (e) {
        // CORS 오류 시 대체 방법 (postMessage 사용)
        // 에러는 무시하고 postMessage로 처리
      }
    };

    // postMessage 핸들러 (별도 함수로 분리하여 cleanup 가능하게)
    const handleMessage = (e) => {
      // Supabase Storage URL에서 오는 메시지도 허용
      // iframe이 Supabase Storage URL인 경우 origin이 다를 수 있음
      const isSupabaseOrigin = e.origin.includes('.supabase.co');
      const isSameOrigin = e.origin === window.location.origin;
      
      // 같은 origin이거나 Supabase Storage origin인 경우만 허용
      if (!isSameOrigin && !isSupabaseOrigin) {
        // 알 수 없는 origin은 무시 (보안)
        return;
      }
      
      if (e.data && e.data.type === 'iframe-resize' && typeof e.data.height === 'number') {
        if (iframe && iframe === iframeRef.current) {
          iframe.style.height = e.data.height + 'px';
        }
      }
    };

    // 메시지 리스너 등록
    window.addEventListener('message', handleMessage);

    // iframe 로드 완료 이벤트
    iframe.onload = () => {
      adjustHeight();
    };

    // 주기적으로 높이 확인 (동적 콘텐츠 대응)
    // CORS 문제로 직접 접근이 불가능한 경우 postMessage로 처리됨
    const interval = setInterval(adjustHeight, 1000);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('message', handleMessage);
      // iframe onload 핸들러 제거
      if (iframe) {
        iframe.onload = null;
      }
    };
  }, [htmlFileName]);

  // htmlFileName이 URL인지 확인 (http:// 또는 https://로 시작)
  const isUrl = htmlFileName?.startsWith('http://') || htmlFileName?.startsWith('https://');
  
  // 파일명인 경우 Supabase Storage URL로 변환
  let iframeSrc;
  if (isUrl) {
    iframeSrc = htmlFileName;
  } else {
    // 파일명인 경우 Supabase Storage URL 생성
    // Supabase Storage 공개 URL 형식: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxyjcawijvzhdvoxdpbv.supabase.co';
    const bucketName = 'blog-html';
    iframeSrc = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${htmlFileName}`;
  }

  // 디버깅: 개발 환경에서만 로그 출력
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('BlogIframe props:', { htmlFileName, isUrl, iframeSrc });
  }

  return (
    <div className="blog-iframe-wrapper my-8">
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        width="100%"
        height="2000"
        frameBorder="0"
        style={{
          border: 'none',
          display: 'block',
          minHeight: '500px',
        }}
        title="Blog Post"
        loading="lazy"
        onError={(e) => {
          console.error('Iframe load error:', e);
        }}
        onLoad={() => {
          console.log('Iframe loaded successfully:', iframeSrc);
        }}
      />
    </div>
  );
}

