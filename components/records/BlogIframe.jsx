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
        // CORS 오류 시 대체 방법
        console.log('CORS 오류로 인해 자동 높이 조절이 불가능합니다.');
      }
    };

    // iframe 로드 완료 이벤트
    iframe.onload = () => {
      adjustHeight();
      
      // iframe 내부에서 메시지 받기 (HTML 파일에 스크립트 추가 필요)
      window.addEventListener('message', (e) => {
        if (e.data.type === 'iframe-resize' && e.data.height) {
          iframe.style.height = e.data.height + 'px';
        }
      });
    };

    // 주기적으로 높이 확인 (동적 콘텐츠 대응)
    const interval = setInterval(adjustHeight, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('message', adjustHeight);
    };
  }, [htmlFileName]);

  return (
    <div className="blog-iframe-wrapper my-8">
      <iframe
        ref={iframeRef}
        src={`/blog/${htmlFileName}`}
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
      />
    </div>
  );
}

