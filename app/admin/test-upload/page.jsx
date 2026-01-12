'use client';

import { useState } from 'react';
import { getAuthHeaders } from '@/lib/authUtils';

export default function TestUploadPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testUpload = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // 테스트 HTML 생성
    const testHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>자동 생성 테스트</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        h1 { color: #333; }
        p { line-height: 1.6; }
    </style>
</head>
<body>
    <h1>자동 생성 테스트 포스트</h1>
    <p>이것은 HTML 파일 업로드 자동 생성 기능 테스트입니다.</p>
    <p>생성 시간: ${new Date().toLocaleString('ko-KR')}</p>
    <p>이 포스트가 /records 페이지에 표시되는지 확인하세요.</p>
</body>
</html>`;

    const blob = new Blob([testHtml], { type: 'text/html' });
    const file = new File([blob], `test-${Date.now()}.html`, { type: 'text/html' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('📤 테스트 업로드 시작');
      console.log('파일 정보:', { name: file.name, size: file.size, type: file.type });
      
      const authHeaders = getAuthHeaders();
      console.log('인증 헤더:', authHeaders);

      const response = await fetch('/api/upload-html', {
        method: 'POST',
        headers: authHeaders,
        body: formData,
      });

      console.log('📥 응답 상태:', response.status, response.statusText);

      const responseText = await response.text();
      console.log('📋 응답 텍스트:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('응답 파싱 실패:', e);
        setError(`응답 파싱 실패: ${responseText.substring(0, 200)}`);
        setLoading(false);
        return;
      }

      console.log('📋 파싱된 데이터:', data);

      if (response.ok) {
        setResult(data);
        console.log('✅ 성공:', data);
      } else {
        setError(data.error || data.details || '알 수 없는 오류');
        console.error('❌ 실패:', data);
      }
    } catch (err) {
      console.error('❌ 에러:', err);
      setError(err.message || '네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">HTML 업로드 자동 생성 테스트</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <button
          onClick={testUpload}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '업로드 중...' : '테스트 업로드 실행'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">❌ 오류</h2>
          <pre className="text-sm text-red-600 whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-800 mb-4">✅ 성공</h2>
          
          {result.post && (
            <div className="space-y-2 mb-4">
              <p><strong>포스트 ID:</strong> {result.post.id}</p>
              <p><strong>제목:</strong> {result.post.title}</p>
              <p><strong>슬러그:</strong> {result.post.slug}</p>
              <p><strong>상태:</strong> {result.post.status}</p>
              <p><strong>HTML 파일:</strong> {result.fileName}</p>
            </div>
          )}

          <div className="mt-4 space-x-2">
            {result.post?.id && (
              <>
                <a
                  href={`/admin/editor/${result.post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  편집 페이지 열기
                </a>
                <a
                  href={`/records/${result.post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  기록 페이지 열기
                </a>
                <a
                  href="/records"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  기록 목록 확인
                </a>
              </>
            )}
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600">전체 응답 데이터 보기</summary>
            <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">디버깅 정보</h2>
        <p className="text-sm text-gray-600 mb-2">
          브라우저 개발자 도구(F12)의 콘솔 탭을 열어서 자세한 로그를 확인하세요.
        </p>
        <p className="text-sm text-gray-600">
          네트워크 탭에서 <code className="bg-gray-200 px-1 rounded">/api/upload-html</code> 요청을 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}







