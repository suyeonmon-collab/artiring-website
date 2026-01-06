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
  // 클라이언트 컴포넌트에서는 환경 변수를 직접 사용할 수 있음 (NEXT_PUBLIC_ 접두사)
  const supabaseUrl = typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxyjcawijvzhdvoxdpbv.supabase.co')
    : 'https://nxyjcawijvzhdvoxdpbv.supabase.co';
  const bucketName = 'blog-html';
  
  let iframeSrc;
  if (isUrl) {
    // URL인 경우 Next.js API route를 통해 프록시 (CSP 문제 해결)
    // URL을 query parameter로 전달
    const encodedUrl = encodeURIComponent(htmlFileName);
    iframeSrc = `/blog/proxy?url=${encodedUrl}`;
  } else if (htmlFileName) {
    // 파일명인 경우 직접 파일명 사용 (Next.js API route가 Supabase Storage에서 가져옴)
    // 파일명 형식: 타임스탬프_파일명.html (예: 1767443802071_20260110-ai-designer-future.html)
    iframeSrc = `/blog/${htmlFileName}`;
  } else {
    // htmlFileName이 없는 경우 빈 문자열
    iframeSrc = '';
  }

  // 디버깅: 항상 로그 출력 (문제 해결을 위해)
  useEffect(() => {
    console.log('🔍 BlogIframe Debug:', { 
      htmlFileName, 
      isUrl, 
      iframeSrc,
      supabaseUrl,
      hasHtmlFileName: !!htmlFileName
    });
  }, [htmlFileName, isUrl, iframeSrc, supabaseUrl]);

  return (
    <div className="blog-iframe-wrapper my-8">
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        width="100%"
        height="2000"
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
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

