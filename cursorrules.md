# ARTIRING 프로젝트 규칙

## 프로젝트 개요
프리랜서 소속사 기반 인력 관리 플랫폼 준비 단계
현재 목표: **회사 홈페이지 + 기록 중심 블로그형 사이트 구축**

이 사이트는:
- 런칭 전부터 살아있는 회사처럼 보이는 구조
- 기록이 쌓일수록 신뢰도가 증가하는 구조
- 향후 서비스 플랫폼으로 자연스럽게 확장 가능한 기반

**"잘 디자인된 서비스"가 아니라 "정제된 문서와 기록 플랫폼"이 목표**

## 기술 스택
- **프론트엔드**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS + CSS Variables
- **언어**: JavaScript (TypeScript 사용 안 함)
- **에디터**: TipTap (Headless Rich Text Editor)
- **데이터베이스**: Supabase (PostgreSQL)
- **파일 저장소**: Supabase Storage
- **배포**: Vercel

## 🔒 핵심 보안 아키텍처

### 서버 사이드 접근 패턴 (필수!)

**원칙**: 민감한 데이터 조작은 반드시 서버를 통해 수행

```
❌ 금지 패턴:
클라이언트 → Supabase anon key → DB (관리자 작업)

✅ 올바른 패턴:
클라이언트 → Next.js API Route → Service Role Key → DB
           ↑ Supabase Auth 세션 검증
```

**이유**:
1. 관리자 권한이 필요한 작업은 서버에서만 수행
2. Service Role Key는 서버 환경에서만 사용
3. 클라이언트는 공개 데이터 읽기만 가능

### 구현 규칙

#### 1) 클라이언트 코드 (공개 데이터 읽기만 허용)
```javascript
// ✅ 올바름: 공개 게시글 목록 읽기
import { createBrowserClient } from '@/lib/supabase';
const supabase = createBrowserClient();
const { data } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published');

// ❌ 금지: 글 작성/수정/삭제는 API Route 사용
const response = await fetch('/api/posts', {
  method: 'POST',
  body: JSON.stringify({ title, content })
});
```

#### 2) 서버 Route Handler (관리자 권한 검증 필수)
```javascript
// app/api/posts/route.js
export const runtime = 'nodejs'; // ⚠️ 필수!

import { createServerClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    // 1. Supabase 세션 검증
    const supabase = createServerClient(request);
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 2. 관리자 권한 확인
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const body = await request.json();
    
    // 3. 입력 검증
    if (!body.title || !body.content) {
      return Response.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // 4. Service Role로 DB 작업
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        author_id: session.user.id,
        ...body
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return Response.json({ data }, { status: 201 });
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## 필수 명명 규칙

### 데이터베이스 (snake_case)
```
user_id          사용자 ID
post_id          게시글 ID
category_id      카테고리 ID
tag_id           태그 ID
created_at       생성 시간
updated_at       수정 시간
published_at     발행 시간
scheduled_at     예약 발행 시간
```

### 코드 스타일
- **파일명**: kebab-case (예: `post-card.jsx`)
- **컴포넌트**: PascalCase (예: `PostCard`)
- **함수/변수**: camelCase (예: `getUserPosts`)
- **CSS 클래스**: kebab-case (예: `post-card`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_FILE_SIZE`)

## 프로젝트 구조
```
/
├── app/
│   ├── page.jsx                 # 메인 페이지
│   ├── about/                   # 소개 페이지
│   ├── structure/               # 구조 설명 페이지
│   ├── records/                 # 기록 페이지 (블로그)
│   │   ├── page.jsx             # 기록 목록
│   │   └── [slug]/
│   │       └── page.jsx         # 기록 상세
│   ├── contact/                 # 문의/파트너십 페이지
│   ├── admin/                   # 관리자 페이지
│   │   ├── login/               # 관리자 로그인
│   │   ├── dashboard/           # 관리자 대시보드
│   │   └── editor/              # 글 작성/수정
│   │       ├── new/
│   │       └── [id]/
│   └── api/                     # API Routes (서버 전용)
│       ├── auth/
│       │   └── route.js         # 인증 API
│       ├── posts/
│       │   ├── route.js         # 글 목록/생성
│       │   └── [id]/
│       │       └── route.js     # 글 조회/수정/삭제
│       ├── categories/
│       │   └── route.js
│       ├── tags/
│       │   └── route.js
│       └── upload/
│           └── route.js         # 이미지 업로드
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── records/
│   │   ├── RecordCard.jsx
│   │   ├── RecordList.jsx
│   │   ├── RecordDetail.jsx
│   │   └── RecordToolbar.jsx
│   └── editor/
│       ├── TipTapEditor.jsx
│       ├── EditorToolbar.jsx
│       └── EditorPreview.jsx
├── lib/
│   ├── supabase.js              # Supabase 클라이언트 (서버/클라 분리)
│   └── utils.js                 # 유틸리티 함수
├── services/                    # API 호출 래퍼
│   ├── post-service.js
│   └── auth-service.js
├── hooks/                       # Custom Hooks
│   ├── useAuth.js
│   └── usePosts.js
├── supabase/
│   └── migrations/              # 마이그레이션 SQL
│       ├── 001_init.sql
│       ├── 002_posts.sql
│       └── 003_categories_tags.sql
└── public/
    └── images/
```

## Supabase 사용 규칙

### 환경변수
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key  # 공개 데이터 읽기용
SUPABASE_SERVICE_ROLE_KEY=your-service-key   # 서버 전용 (절대 노출 금지!)
```

### Supabase 클라이언트 (lib/supabase.js)
```javascript
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 클라이언트용 (공개 데이터 읽기만)
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// 서버용 (모든 권한, API Route에서만 사용)
export function createServerClient(request) {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
```

### API Route 패턴 (필수 템플릿)
```javascript
// app/api/posts/route.js

export const runtime = 'nodejs'; // ⚠️ 필수!

import { createServerClient } from '@/lib/supabase';

// GET - 공개 글 목록 조회 (인증 불필요)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    
    const supabase = createServerClient(request);
    
    let query = supabase
      .from('posts')
      .select('*, categories(*), author:users(name)', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (category) {
      query = query.eq('category_id', category);
    }
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return Response.json({ 
      data, 
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - 글 작성 (관리자만)
export async function POST(request) {
  try {
    // 1. 세션 검증
    const supabase = createServerClient(request);
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 2. 관리자 권한 확인
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const body = await request.json();
    
    // 3. 입력 검증
    if (!body.title || !body.content) {
      return Response.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // 4. DB 작업
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        author_id: session.user.id,
        ...body
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return Response.json({ data }, { status: 201 });
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### Row Level Security (RLS) 설정

**전략**: 공개 데이터는 RLS로 읽기 허용, 쓰기는 서버에서만

```sql
-- posts 테이블 RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 발행된 글은 누구나 읽기 가능
CREATE POLICY "Published posts readable by all"
ON posts FOR SELECT
USING (status = 'published');

-- 쓰기/수정/삭제는 서버에서만 (Service Role)
-- Service Role Key는 RLS 우회 가능

-- categories, tags도 동일 패턴
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories readable by all"
ON categories FOR SELECT
USING (true);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tags readable by all"
ON tags FOR SELECT
USING (true);
```

## 🍎 UI/UX 규칙 (Apple 스타일)

### 전체 원칙 (절대 규칙)
```
1. Apple HIG 기준 설계
2. 카드형 디자인, 과도한 그림자, 박스 레이아웃 사용 금지
3. 텍스트 가독성 최우선
4. "문서 읽기 경험" 목표
5. 장식 목적의 그래픽, 불필요한 애니메이션 금지
```

### 레이아웃
```
- 중앙 정렬 단일 컬럼 (max-width: 840px)
- 좌우 여백 충분히 확보
- 섹션 간 간격 넉넉하게
```

### 타이포그래피
```css
font-family: Pretendard, '나눔고딕', -apple-system, BlinkMacSystemFont, system-ui;

/* 한글 사용 시 */
letter-spacing: -0.01em;
line-height: 1.6;

/* 본문 */
font-size: 16px;
line-height: 1.7;

/* 제목은 굵기와 크기로만 위계 표현 */
```

### 컬러 시스템
```css
:root {
  --color-bg: #FFFFFF;
  --color-bg-sub: #F5F5F7;
  --color-text-primary: #1D1D1F;
  --color-text-secondary: #6E6E73;
  --color-point: #007AFF;
}
```

### 금지 요소
```
❌ 카드형 박스
❌ 과도한 drop-shadow
❌ 그라데이션 배경
❌ 강조를 위한 색상 남발
❌ 불필요한 아이콘 장식
❌ 과한 애니메이션
```

### 기록 페이지 UI 규칙

#### 기록 목록
```
- 리스트형 (카드형 아님)
- 썸네일은 보조 요소 (크기 제한)
- 배경색, 그림자, 테두리 없음
```

#### 기록 상세
```
- 문서 읽기 경험 최우선
- 넓은 여백과 안정적인 줄 간격
- 과도한 박스, 배경, 구분선 금지
- 필요 시 얇은 수평선만 사용
```

## TipTap 에디터 규칙

### 에디터 기능 (필수)
```
텍스트 편집:
- 제목 (H1~H3)
- 폰트 선택
- 글자 크기 조절
- 자간/행간 조절
- 굵게/기울임/밑줄

구조 요소:
- 구분선
- 번호 목록/불릿 목록
- 인용 블록
- 코드 블록

미디어:
- 이미지 업로드 (드래그 앤 드롭)
- 이미지 정렬 (좌/중앙/우)

기능:
- 실시간 미리보기
- 임시 저장
- 발행/비공개 설정
```

### 에디터 UI 규칙
```
- 기능적으로 풍부하되 시각적으로 미니멀
- 플로팅 툴바 사용
- 작성 화면 ≠ 공개 화면
- 공개 화면은 항상 가장 단순한 형태
```

## Storage 사용 규칙

### 버킷 구조
```
post-images/              # 게시글 이미지 (공개)
├── {post_id}/
│   ├── {timestamp}_{filename}
│   └── ...

thumbnails/              # 썸네일 (공개)
└── {post_id}_{timestamp}.jpg
```

### Storage 정책
```sql
-- post-images 버킷 (공개 읽기)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- 쓰기는 서버에서만 (Service Role)
```

### 이미지 업로드 (서버 API)
```javascript
// app/api/upload/route.js
export const runtime = 'nodejs';

import { createServerClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const supabase = createServerClient(request);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 관리자 권한 확인
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // 파일 크기 검증
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return Response.json({ error: 'File too large' }, { status: 400 });
    }
    
    const fileName = `${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // 공개 URL 생성
    const { data: urlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(data.path);
    
    return Response.json({ url: urlData.publicUrl });
    
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## 반응형 디자인 규칙

### Mobile First (필수)
```css
/* ✅ 올바름: 모바일 기본, 큰 화면은 추가 */
.container {
  padding: 1rem;           /* 모바일 */
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;         /* 태블릿 */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 3rem;         /* 데스크톱 */
  }
}
```

### Tailwind 브레이크포인트
```jsx
<div className="
  w-full          /* 모바일: 전체 너비 */
  md:w-1/2        /* 태블릿: 1/2 */
  lg:w-1/3        /* 데스크톱: 1/3 */
">
```

## 금지사항

### ❌ 절대 금지
1. **클라이언트에서 관리자 작업**
```javascript
   // ❌ 금지: 클라이언트에서 글 작성
   const supabase = createBrowserClient();
   await supabase.from('posts').insert(data);
```

2. **Service Role Key 노출**
```javascript
   // ❌ 금지: 클라이언트 파일에서
   const supabase = createClient(url, serviceKey);
```

3. **Edge Runtime에서 Supabase**
```javascript
   // ❌ 금지
   export const runtime = 'edge';
   import { supabase } from '@/lib/supabase';
```

4. **하드코딩된 px 값**
```css
   /* ❌ 금지 */
   width: 320px;
   
   /* ✅ 권장 */
   width: 100%;
   max-width: 20rem;
```

5. **카드형 UI, 과한 그림자, 그라데이션**
```css
   /* ❌ 금지 */
   box-shadow: 0 10px 30px rgba(0,0,0,0.3);
   background: linear-gradient(...);
```

## Git 커밋 규칙
```bash
git commit -m "feat: 게시글 작성 API 추가"
git commit -m "fix: 이미지 업로드 권한 오류 수정"
git commit -m "ui: 기록 목록 레이아웃 개선"
```

## 검증 체크리스트 (AI 수행용)

### 보안 검증
- [ ] 모든 API Route에 `export const runtime = 'nodejs'` 명시
- [ ] 관리자 작업은 서버 API를 통해서만 수행
- [ ] Service Role Key가 클라이언트 번들에 포함되지 않음
- [ ] 모든 API Route에서 세션 및 권한 검증 수행
- [ ] Storage 버킷 정책이 올바르게 설정됨

### 데이터베이스 검증
- [ ] UUID 확장이 활성화됨
- [ ] 필요한 인덱스가 생성됨
- [ ] RLS 정책이 올바르게 설정됨
- [ ] 외래 키 제약조건이 올바르게 설정됨

### 코드 품질 검증
- [ ] ESLint 에러가 없음
- [ ] console.log가 제거됨 (개발용 제외)
- [ ] 에러 핸들링이 모든 API Route에 적용됨
- [ ] 입력 검증이 POST/PUT 요청에 포함됨

### UI/UX 검증
- [ ] Apple HIG 원칙 준수
- [ ] 카드형 디자인 사용 안 함
- [ ] 텍스트 가독성 최우선
- [ ] 불필요한 애니메이션 없음
- [ ] 컬러 시스템 일관성 유지

### 반응형 검증
- [ ] Mobile First 접근법 적용
- [ ] 모바일 (375px)에서 레이아웃 확인
- [ ] 태블릿 (768px)에서 레이아웃 확인
- [ ] 데스크톱 (1440px)에서 레이아웃 확인
- [ ] 하드코딩된 px 값 사용 안 함

### API 설계 검증
- [ ] RESTful API 패턴 준수
- [ ] 적절한 HTTP 상태 코드 사용
- [ ] 에러 응답이 일관성 있음
- [ ] 페이지네이션이 구현됨 (목록 API)
- [ ] 검색/필터링 기능이 구현됨
