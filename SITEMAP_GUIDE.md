# Google Search Console Sitemap 제출 가이드

## 1단계: Sitemap URL 확인

배포 후 다음 URL에서 sitemap이 제대로 생성되는지 확인하세요:

```
https://artiring.com/sitemap.xml
```

또는 실제 도메인으로:
```
https://your-domain.com/sitemap.xml
```

sitemap.xml 파일이 XML 형식으로 표시되면 정상입니다.

---

## 2단계: Google Search Console 접속

1. **Google Search Console 접속**
   - https://search.google.com/search-console 접속
   - Google 계정으로 로그인

2. **속성(Property) 추가**
   - 왼쪽 상단의 속성 선택 드롭다운 클릭
   - "속성 추가" 클릭
   - "URL 접두어" 선택
   - 사이트 URL 입력 (예: `https://artiring.com`)
   - "계속" 클릭

3. **소유권 확인**
   - HTML 태그 방법 또는 다른 방법으로 소유권 확인
   - 확인 완료까지 기다리기 (보통 몇 분~몇 시간)

---

## 3단계: Sitemap 제출

1. **Sitemap 메뉴로 이동**
   - 왼쪽 사이드바에서 "Sitemaps" 클릭
   - 또는 URL: `https://search.google.com/search-console/sitemaps`

2. **Sitemap URL 입력**
   - "새 사이트맵 추가" 섹션에서
   - **전체 URL 입력**: `https://artiring.com/sitemap.xml`
   - (경로만 입력하면 "유효하지 않음" 오류가 발생할 수 있습니다)
   - 또는 실제 도메인으로: `https://your-domain.com/sitemap.xml`

3. **제출**
   - "제출" 버튼 클릭

---

## 4단계: 확인 및 모니터링

1. **제출 상태 확인**
   - "제출됨" 상태로 표시되면 성공
   - "처리됨" 상태가 되면 Google이 sitemap을 읽었습니다
   - "오류"가 표시되면 오류 메시지를 확인하고 수정

2. **인덱싱 상태 확인**
   - 왼쪽 사이드바 "색인 생성" → "페이지" 메뉴에서
   - 색인 생성된 페이지 수 확인
   - "URL 검사" 도구로 개별 페이지 인덱싱 요청 가능

---

## 5단계: 추가 최적화 (선택사항)

### robots.txt 확인
`https://artiring.com/robots.txt` 접속하여 다음이 표시되는지 확인:
```
User-agent: *
Allow: /

Sitemap: https://artiring.com/sitemap.xml
```

### 개별 페이지 인덱싱 요청
중요한 새 블로그 글을 작성한 후:
1. Google Search Console → "URL 검사" 도구
2. 블로그 글 URL 입력
3. "색인 생성 요청" 클릭

---

## 문제 해결

### Sitemap이 "오류"로 표시되는 경우

1. **Sitemap URL 확인**
   - 브라우저에서 직접 접속하여 XML이 제대로 표시되는지 확인
   - XML 형식 오류가 없는지 확인

2. **robots.txt 확인**
   - sitemap이 차단되지 않았는지 확인

3. **일반적인 오류**
   - "일부 URL이 robots.txt에 의해 차단됨" → robots.txt 수정
   - "일부 URL이 리디렉션됨" → URL 구조 확인
   - "일부 URL이 404 오류" → 존재하지 않는 페이지 제거

### 인덱싱이 느린 경우

- Google이 크롤링하는 데 시간이 걸릴 수 있습니다 (보통 며칠~몇 주)
- 정기적으로 새 콘텐츠를 추가하면 크롤링 빈도가 증가합니다
- 소셜 미디어 공유나 외부 링크가 있으면 더 빠르게 인덱싱됩니다

---

## 참고사항

- Sitemap은 자동으로 업데이트됩니다 (Next.js가 동적으로 생성)
- 새 블로그 글을 작성하면 자동으로 sitemap에 포함됩니다
- Google Search Console에서 sitemap을 다시 제출할 필요는 없습니다
- Sitemap 제출 후 실제 검색 결과에 반영되기까지는 시간이 걸립니다 (보통 며칠~몇 주)

