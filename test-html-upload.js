/**
 * HTML 업로드 API 테스트 스크립트
 * 
 * 사용법:
 * 1. 관리자 로그인 후 브라우저 콘솔에서 실행
 * 2. 또는 Node.js 환경에서 실행 (인증 토큰 필요)
 */

// 브라우저 콘솔에서 실행할 수 있는 테스트 함수
async function testHtmlUpload() {
  console.log('=== HTML 업로드 테스트 시작 ===');
  
  // 1. 테스트용 HTML 파일 생성
  const testHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>테스트 HTML</title>
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
    <h1>테스트 HTML 파일</h1>
    <p>이것은 자동 생성 테스트를 위한 HTML 파일입니다.</p>
    <p>업로드 시간: ${new Date().toLocaleString('ko-KR')}</p>
</body>
</html>`;

  // 2. Blob으로 변환
  const blob = new Blob([testHtml], { type: 'text/html' });
  const file = new File([blob], `test-${Date.now()}.html`, { type: 'text/html' });

  // 3. FormData 생성
  const formData = new FormData();
  formData.append('file', file);

  // 4. 인증 헤더 가져오기
  const user = localStorage.getItem('user');
  if (!user) {
    console.error('❌ 로그인이 필요합니다. 관리자 페이지에 로그인해주세요.');
    return;
  }

  let authHeaders = {};
  try {
    const userData = JSON.parse(user);
    authHeaders = {
      'x-admin-session': JSON.stringify({
        userId: userData.id,
        email: userData.email,
        role: userData.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000
      })
    };
    console.log('✅ 인증 헤더 준비 완료:', { userId: userData.id, email: userData.email });
  } catch (e) {
    console.error('❌ 인증 정보 파싱 실패:', e);
    return;
  }

  // 5. API 호출
  try {
    console.log('📤 파일 업로드 중...', { name: file.name, size: file.size });
    
    const response = await fetch('/api/upload-html', {
      method: 'POST',
      headers: authHeaders,
      body: formData,
    });

    console.log('📥 응답 상태:', response.status, response.statusText);

    const result = await response.json();
    console.log('📋 응답 데이터:', result);

    if (response.ok) {
      console.log('✅ 성공!');
      console.log('생성된 포스트:', result.post);
      console.log('파일명:', result.fileName);
      
      if (result.post) {
        alert(`✅ 테스트 성공!\n\n포스트 ID: ${result.post.id}\n제목: ${result.post.title}\n파일: ${result.fileName}`);
      }
    } else {
      console.error('❌ 실패:', result);
      alert(`❌ 업로드 실패: ${result.error}\n\n상세: ${result.details || ''}`);
    }
  } catch (error) {
    console.error('❌ 에러 발생:', error);
    alert(`❌ 에러: ${error.message}`);
  }
}

// 브라우저 콘솔에서 실행
if (typeof window !== 'undefined') {
  console.log('테스트 함수 준비 완료. testHtmlUpload() 실행하세요.');
  window.testHtmlUpload = testHtmlUpload;
}


