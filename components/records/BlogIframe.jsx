'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlogIframe({ htmlFileName }) {
  const iframeRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // 로드 타임아웃 설정 (10초 후 실패로 간주)
    const timeoutId = setTimeout(() => {
      // iframe이 로드되지 않았거나 내용이 없는 경우
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDocument || !iframeDocument.body || iframeDocument.body.innerHTML.trim() === '') {
          setLoadTimeout(true);
        }
      } catch (e) {
        // CORS 오류로 접근 불가능한 경우, 타임아웃으로 간주
        setLoadTimeout(true);
      }
    }, 10000);

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
          
          // 로드 성공 시 타임아웃 취소
          clearTimeout(timeoutId);
          setLoadTimeout(false);
          setLoadError(false);
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
      clearTimeout(timeoutId);
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
  
  // Supabase Storage URL에서 파일명 추출
  // 예: https://nxyjcawijvzhdvoxdpbv.supabase.co/storage/v1/object/public/blog-html/1767443802071_20260106.html
  // → 1767443802071_20260106.html
  let fileName = htmlFileName;
  if (isUrl && htmlFileName.includes('/blog-html/')) {
    const match = htmlFileName.match(/\/blog-html\/([^\/\?]+)/);
    if (match && match[1]) {
      fileName = match[1];
    }
  }
  
  let iframeSrc;
  if (isUrl) {
    // URL인 경우 Next.js API route를 통해 프록시 (CSP 문제 해결)
    // 파일명이 추출된 경우 파일명 사용, 아니면 URL 사용
    if (fileName && fileName !== htmlFileName && fileName.match(/^\d+_[^\/]+\.html$/)) {
      // Supabase Storage 파일명 형식인 경우
      iframeSrc = `/blog/${fileName}`;
    } else {
      // 전체 URL인 경우 query parameter로 전달
      const encodedUrl = encodeURIComponent(htmlFileName);
      iframeSrc = `/blog/proxy?url=${encodedUrl}`;
    }
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
      fileName,
      iframeSrc,
      hasHtmlFileName: !!htmlFileName
    });
  }, [htmlFileName, isUrl, fileName, iframeSrc]);

  // 로드 실패 시 fallback 콘텐츠 표시
  useEffect(() => {
    if (loadError || loadTimeout) {
      const fallbackContent = document.getElementById('fallback-content');
      const iframeWrapper = document.querySelector('.blog-iframe-wrapper');
      
      if (fallbackContent && iframeWrapper) {
        fallbackContent.classList.remove('hidden');
        iframeWrapper.style.display = 'none';
      }
    }
  }, [loadError, loadTimeout]);

  if (loadError || loadTimeout) {
    // 에러 발생 시 fallback 콘텐츠가 표시되도록 빈 div 반환
    return null;
  }

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
          setLoadError(true);
        }}
        onLoad={() => {
          console.log('Iframe loaded successfully:', iframeSrc);
          setLoadError(false);
          setLoadTimeout(false);
        }}
      />
    </div>
  );
}

