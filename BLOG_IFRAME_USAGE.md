# Blog HTML iframe 사용 가이드

## 개요
`blog` 폴더의 HTML 파일을 기록 페이지에서 iframe으로 표시할 수 있습니다.

## 사용 방법

### 1. HTML 파일을 public/blog 폴더에 복사
```bash
cp blog/blog-post-5060.html artiring/public/blog/
```

### 2. Supabase에서 블로그 포스트에 html_file 필드 추가
블로그 포스트의 `html_file` 필드에 HTML 파일명을 지정합니다.
예: `blog-post-5060.html`

### 3. 또는 특정 slug에 대해 직접 iframe 사용
`app/records/[slug]/page.jsx`에서 특정 slug에 대해 iframe을 사용하도록 수정:

```jsx
{post.slug === '특정-slug' ? (
  <BlogIframe htmlFileName="blog-post-5060.html" />
) : (
  // 기존 렌더링
)}
```

## 작동 원리

1. **자동 높이 조절**: 
   - iframe 내부 HTML에 높이 전달 스크립트가 포함되어 있습니다
   - `postMessage` API를 통해 부모 창에 높이를 전달합니다
   - 동적 콘텐츠(차트, 애니메이션) 로드 후에도 높이가 자동으로 조절됩니다

2. **CORS 문제 없음**:
   - 같은 도메인(`/blog/`)에서 서빙되므로 CORS 문제가 없습니다
   - GitHub Pages를 사용하지 않아도 됩니다

3. **성능**:
   - `loading="lazy"` 속성으로 지연 로딩
   - 초기 높이는 2000px로 설정되어 스크롤 없이 대부분의 콘텐츠 표시

## 주의사항

- HTML 파일은 `public/blog/` 폴더에 있어야 합니다
- HTML 파일 내부에 높이 전달 스크립트가 포함되어 있어야 합니다 (이미 추가됨)
- iframe 내부의 링크는 같은 도메인 내에서만 작동합니다


