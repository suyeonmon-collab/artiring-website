# ARTIRING 프로젝트 구조 및 데이터베이스 스키마

## 프로젝트 개요
프리랜서 소속사 기반 인력 관리 플랫폼의 준비 단계
**현재 목표**: 회사 홈페이지 + 기록 중심 블로그형 사이트 구축

## 기술 스택
- **프론트엔드**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS + CSS Variables
- **언어**: JavaScript (TypeScript 사용 안 함)
- **에디터**: TipTap (Headless Rich Text Editor)
- **인증**: Supabase Auth
- **데이터베이스**: Supabase (PostgreSQL)
- **파일 저장소**: Supabase Storage
- **배포**: Vercel

## 프로젝트 구조

### 디렉토리 구조
```
artiring/
├── app/                          # Next.js App Router
│   ├── page.jsx                  # 메인 페이지
│   │                             # - Hero 섹션
│   │                             # - 문제 정의 섹션
│   │                             # - 우리의 접근 섹션
│   │                             # - 최신 기록 미리보기 (3개)
│   │                             # - 외부 채널 섹션 (블로그/인스타/유튜브)
│   ├── about/                    # 소개 페이지
│   │   └── page.jsx              # - 회사 소개
│   │                             # - 비전 및 미션
│   │                             # - 팀 소개
│   │                             # - 연혁 타임라인
│   ├── structure/                # 구조 설명 페이지
│   │   └── page.jsx              # - 3자 구조 설명
│   │                             # - 백업 시스템
│   │                             # - AI 매칭 시스템
│   │                             # - 통합 관리 시스템
│   │                             # - 5060세대 특화 프로그램
│   ├── records/                  # 기록 페이지 (블로그)
│   │   ├── page.jsx              # 기록 목록
│   │   │                         # - 카테고리 필터
│   │   │                         # - 태그 필터
│   │   │                         # - 검색 기능
│   │   │                         # - 정렬 (최신순/오래된순)
│   │   │                         # - 페이지네이션
│   │   └── [slug]/
│   │       └── page.jsx          # 기록 상세
│   │                             # - 제목, 메타정보
│   │                             # - 목차 (자동 생성, 선택적)
│   │                             # - 본문
│   │                             # - 이전/다음 글
│   ├── contact/                  # 문의/파트너십 페이지
│   │   └── page.jsx              # - 일반 문의 폼
│   │                             # - MOU 및 제휴 문의
│   ├── admin/                    # 관리자 페이지
│   │   ├── login/                # 관리자 로그인
│   │   │   └── page.jsx
│   │   ├── dashboard/            # 관리자 대시보드
│   │   │   └── page.jsx          # - 전체 글 목록
│   │   │                         # - 임시 저장 글
│   │   │                         # - 조회수 통계
│   │   │                         # - 카테고리별 글 수
│   │   └── editor/               # 글 작성/수정
│   │       ├── new/
│   │       │   └── page.jsx      # 새 글 작성
│   │       └── [id]/
│   │           └── page.jsx      # 글 수정
│   └── api/                      # API Routes (서버 전용)
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.js      # 로그인
│       │   ├── logout/
│       │   │   └── route.js      # 로그아웃
│       │   └── session/
│       │       └── route.js      # 세션 확인
│       ├── posts/
│       │   ├── route.js          # GET: 글 목록, POST: 글 작성
│       │   └── [id]/
│       │       └── route.js      # GET: 글 조회, PUT: 글 수정, DELETE: 글 삭제
│       ├── categories/
│       │   └── route.js          # GET: 카테고리 목록
│       ├── tags/
│       │   └── route.js          # GET: 태그 목록
│       └── upload/
│           └── route.js          # POST: 이미지 업로드
│       └── upload-html/
│           └── route.js          # POST: HTML 파일 업로드 및 포스트 생성, PUT: HTML 파일 업데이트
│   └── blog/                     # 블로그 HTML 파일 서빙
│       └── [filename]/
│           └── route.js          # GET: HTML 파일 서빙 (public/blog 또는 Supabase Storage)
├── components/                   # React 컴포넌트
│   ├── common/
│   │   ├── Header.jsx            # 헤더 (네비게이션)
│   │   ├── Footer.jsx            # 푸터
│   │   └── Layout.jsx            # 레이아웃 래퍼
│   ├── records/
│   │   ├── RecordCard.jsx        # 기록 카드 (목록용)
│   │   ├── RecordList.jsx        # 기록 목록
│   │   ├── RecordDetail.jsx      # 기록 상세
│   │   ├── RecordToolbar.jsx     # 필터/정렬 툴바
│   │   ├── TableOfContents.jsx   # 목차
│   │   ├── BlogIframe.jsx        # HTML 파일을 iframe으로 표시
│   │   └── CopyLinkButton.jsx    # 링크 복사 버튼
│   └── editor/
│       ├── TipTapEditor.jsx      # TipTap 에디터
│       ├── EditorToolbar.jsx     # 에디터 툴바
│       ├── EditorPreview.jsx     # 미리보기
│       └── ImageUploader.jsx     # 이미지 업로드
├── lib/                          # 유틸리티 및 설정
│   ├── supabase.js               # Supabase 클라이언트
│   └── utils.js                  # 유틸리티 함수
├── services/                     # API 서비스 레이어
│   ├── post-service.js           # 게시글 API (getPosts, getPost, createPost, updatePost, deletePost)
│   └── auth-service.js           # 인증 API (login, logout, getSession)
├── hooks/                        # Custom React Hooks
│   ├── useAuth.js                # 인증 상태 관리
│   └── usePosts.js               # 게시글 데이터 관리
├── supabase/
│   └── migrations/               # 데이터베이스 마이그레이션
│       ├── 001_init.sql          # 초기 설정 (UUID 확장)
│       ├── 002_users.sql         # users 테이블
│       ├── 003_posts.sql         # posts 테이블
│       └── 004_categories_tags.sql # categories, tags, post_tags 테이블
├── public/
│   ├── images/
│   └── blog/                     # 정적 HTML 파일 (선택적)
│       └── *.html                # 예: 20260106.html
├── .env.local                    # 환경 변수 (로컬)
├── .env.example                  # 환경 변수 예시
├── next.config.js
├── package.json
├── tailwind.config.js
└── .cursorrules                  # Cursor AI 규칙
```

## 데이터베이스 스키마

### 환경 변수 설정
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 테이블 구조

#### 1. users 테이블
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- RLS 정책
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 모든 사용자는 자신의 정보만 조회 가능
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- 초기 관리자 데이터 (이메일은 실제 사용할 이메일로 변경)
INSERT INTO users (email, name, role) 
VALUES ('admin@artiring.com', '관리자', 'admin');
```

#### 2. categories 테이블
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_categories_slug ON categories(slug);

-- RLS 정책
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 누구나 카테고리 조회 가능
CREATE POLICY "Categories readable by all"
ON categories FOR SELECT
USING (true);

-- 초기 카테고리 데이터
INSERT INTO categories (name, slug, description, order_index) VALUES
('문제정의', 'problem-definition', '프리랜서 시장의 구조적 문제', 1),
('실험과정', 'experiments', '문제 해결을 위한 실험 및 테스트', 2),
('구조설계', 'structure-design', '플랫폼 구조 및 시스템 설계', 3),
('특허·법률', 'patent-legal', '특허 출원 및 법률 관련 기록', 4),
('창업준비', 'startup-preparation', '사업 준비 및 진행 과정', 5);
```

#### 3. tags 테이블
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_tags_slug ON tags(slug);

-- RLS 정책
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- 누구나 태그 조회 가능
CREATE POLICY "Tags readable by all"
ON tags FOR SELECT
USING (true);
```

#### 4. blog_posts 테이블
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  
  -- 콘텐츠 (TipTap JSON + HTML)
  content JSONB,                       -- TipTap JSON format (선택적)
  content_html TEXT NOT NULL,           -- Rendered HTML (iframe 사용 시 빈 값 가능)
  html_file TEXT,                      -- HTML 파일 URL (Supabase Storage 공개 URL)
                                       -- html_file이 있으면 iframe으로 표시, 없으면 content_html 사용
  
  -- 메타데이터
  summary TEXT,                        -- 요약 (150자)
  thumbnail_url TEXT,                  -- 썸네일 이미지 URL
  
  -- 카테고리 및 작성자
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES blog_admins(id) ON DELETE CASCADE NOT NULL,
  
  -- 발행 상태
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  
  -- 통계
  view_count INTEGER DEFAULT 0,
  
  -- 타임스탬프
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_html_file ON blog_posts(html_file) WHERE html_file IS NOT NULL;

-- 복합 인덱스 (성능 최적화)
CREATE INDEX idx_blog_posts_status_published_at ON blog_posts(status, published_at DESC);

-- RLS 정책
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 발행된 글은 누구나 조회 가능
CREATE POLICY "Published posts readable by all"
ON blog_posts FOR SELECT
USING (status = 'published');

-- 작성자는 자신의 모든 글 조회 가능 (관리자 페이지용)
CREATE POLICY "Authors can view own posts"
ON blog_posts FOR SELECT
USING (auth.uid() = author_id);

-- 쓰기/수정/삭제는 서버에서만 (Service Role)
```

#### 5. blog_post_tags 테이블 (다대다 관계)
```sql
CREATE TABLE blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, tag_id)
);

-- 인덱스
CREATE INDEX idx_blog_post_tags_post_id ON blog_post_tags(post_id);
CREATE INDEX idx_blog_post_tags_tag_id ON blog_post_tags(tag_id);

-- RLS 정책
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- 누구나 blog_post_tags 조회 가능
CREATE POLICY "Post tags readable by all"
ON blog_post_tags FOR SELECT
USING (true);
```

### 트리거 및 함수

#### updated_at 자동 업데이트 트리거
```sql
-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- users 테이블 트리거
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- blog_posts 테이블 트리거
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

#### 조회수 증가 함수
```sql
CREATE OR REPLACE FUNCTION increment_blog_post_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Storage 구조

### Supabase Storage 버킷
```
post-images/                   # 게시글 이미지 (공개)
├── {post_id}/
│   ├── {timestamp}_{filename}
│   └── ...

thumbnails/                    # 썸네일 (공개)
└── {post_id}_{timestamp}.jpg

blog-html/                     # HTML 파일 (공개)
└── {timestamp}_{filename}.html
    # 예: 1767443802071_20260106.html
    # 파일명 형식: 타임스탬프_원본파일명.html
```

### Storage 정책
```sql
-- post-images 버킷 (공개 읽기)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- thumbnails 버킷 (공개 읽기)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

-- blog-html 버킷 (공개 읽기)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-html');

-- 쓰기는 서버에서만 (Service Role)
```

## API 엔드포인트

### 인증 API
- `POST /api/auth/login` - 관리자 로그인 (이메일/비밀번호)
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/session` - 현재 세션 확인

### 게시글 API
- `GET /api/posts` - 게시글 목록 조회
  - Query params: `category`, `tag`, `search`, `page`, `limit`, `sort`
  - 발행된 글만 반환 (status = 'published')
  - 페이지네이션 정보 포함
- `GET /api/posts/[id]` - 게시글 상세 조회
  - 조회수 자동 증가
  - 관련 카테고리, 태그 정보 포함
- `POST /api/posts` - 게시글 작성 (관리자 전용)
  - 필수: title, content, content_html, category_id
  - 선택: summary, thumbnail_url, tags, status, scheduled_at
- `PUT /api/posts/[id]` - 게시글 수정 (관리자 전용)
- `DELETE /api/posts/[id]` - 게시글 삭제 (관리자 전용)

### 카테고리 API
- `GET /api/categories` - 카테고리 목록 조회
  - order_index 순으로 정렬

### 태그 API
- `GET /api/tags` - 태그 목록 조회
  - 사용 빈도순 정렬 (선택적)

### 업로드 API
- `POST /api/upload` - 이미지 업로드 (관리자 전용)
  - 최대 파일 크기: 5MB
  - 허용 포맷: jpg, jpeg, png, webp, gif
  - 반환: { url: 'public-url' }
- `POST /api/upload-html` - HTML 파일 업로드 및 블로그 포스트 자동 생성 (관리자 전용)
  - 최대 파일 크기: 10MB
  - 허용 포맷: text/html, application/xhtml+xml
  - 외부 이미지 URL 자동 제거 (403 오류 방지)
  - iframe 높이 자동 조절 스크립트 자동 주입
  - 반환: { success: true, post: {...}, fileName: '...', publicUrl: '...' }
- `PUT /api/upload-html` - 기존 포스트의 HTML 파일 업데이트 (관리자 전용)
  - FormData: file, postId
  - 반환: { success: true, post: {...}, fileName: '...', publicUrl: '...' }

### 블로그 HTML 서빙 API
- `GET /blog/[filename]` - HTML 파일 서빙
  - public/blog 폴더 또는 Supabase Storage에서 HTML 파일 제공
  - CSP 헤더 완화 (인라인 스타일/스크립트 허용)
  - 파일명 형식: `{timestamp}_{filename}.html` (Supabase Storage)
  - 또는 일반 파일명 (public/blog 폴더)
- `GET /blog/proxy?url=...` - Supabase Storage URL 프록시
  - 외부 URL을 프록시하여 CSP 문제 해결

## 주요 기능 구현 가이드

### 1. 게시글 목록 조회 (공개)
```javascript
// app/records/page.jsx
import { createBrowserClient } from '@/lib/supabase';

export default async function RecordsPage({ searchParams }) {
  const supabase = createBrowserClient();
  const category = searchParams.category;
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;
  
  let query = supabase
    .from('posts')
    .select('*, categories(*), author:users(name)', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);
  
  if (category) {
    query = query.eq('category_id', category);
  }
  
  const { data: posts, count } = await query;
  
  return (
    <div>
      <RecordList posts={posts} />
      <Pagination page={page} total={count} limit={limit} />
    </div>
  );
}
```

### 2. 게시글 상세 조회 (공개)
```javascript
// app/records/[slug]/page.jsx
import { createBrowserClient } from '@/lib/supabase';

export default async function RecordDetailPage({ params }) {
  const supabase = createBrowserClient();
  
  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      categories(*),
      author:users(name),
      post_tags(tags(*))
    `)
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();
  
  // 조회수 증가 (서버 사이드에서)
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.id}/view`, {
    method: 'POST'
  });
  
  return <RecordDetail post={post} />;
}
```

### 3. 게시글 작성 (관리자)
```javascript
// app/api/posts/route.js
export const runtime = 'nodejs';

import { createServerClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const supabase = createServerClient(request);
    
    // 세션 검증
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
    
    const body = await request.json();
    
    // slug 생성 (제목 기반)
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    // 게시글 생성
    const { data: post, error } = await supabase
      .from('posts')
      .insert([{
        title: body.title,
        slug: `${slug}-${Date.now()}`, // 중복 방지
        content: body.content,
        content_html: body.content_html,
        summary: body.summary,
        thumbnail_url: body.thumbnail_url,
        category_id: body.category_id,
        author_id: session.user.id,
        status: body.status || 'draft',
        published_at: body.status === 'published' ? new Date() : null,
        scheduled_at: body.scheduled_at
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    // 태그 연결
    if (body.tags && body.tags.length > 0) {
      const postTags = body.tags.map(tagId => ({
        post_id: post.id,
        tag_id: tagId
      }));
      
      await supabase.from('post_tags').insert(postTags);
    }
    
    return Response.json({ data: post }, { status: 201 });
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### 4. TipTap 에디터 설정
```javascript
// components/editor/TipTapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

export default function TipTapEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: '내용을 입력하세요...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
      onChange({ json, html });
    },
  });
  
  return (
    <div className="editor-wrapper">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
```

## DB 및 API 구조 검증 포인트

### 데이터베이스 검증
- [ ] UUID 확장이 활성화됨 (`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
- [ ] 모든 테이블에 적절한 외래 키 제약조건 설정
- [ ] 필요한 인덱스가 성능 최적화를 위해 생성됨
- [ ] 트리거가 올바르게 작동함 (updated_at 자동 업데이트)
- [ ] RLS 정책이 올바르게 설정됨
- [ ] 초기 데이터가 올바르게 삽입됨 (categories, admin user)

### API 구조 검증
- [ ] RESTful API 패턴이 일관성 있게 적용됨
- [ ] 모든 API Route에 `runtime = 'nodejs'` 설정
- [ ] 인증이 필요한 엔드포인트에 세션 검증 적용
- [ ] 관리자 권한이 필요한 작업에 권한 검증 적용
- [ ] 적절한 HTTP 상태 코드 사용
- [ ] 에러 응답이 일관성 있는 형식
- [ ] 입력 검증이 POST/PUT 요청에 포함됨
- [ ] 페이지네이션이 목록 API에 구현됨

### 보안 검증
- [ ] Service Role Key가 클라이언트에 노출되지 않음
- [ ] 클라이언트는 공개 데이터 읽기만 가능
- [ ] 모든 쓰기 작업이 서버를 통해 수행됨
- [ ] 사용자 권한이 명시적으로 검증됨
- [ ] Storage 버킷 정책이 적절히 설정됨

### UI/UX 검증
- [ ] Apple HIG 원칙 준수
- [ ] 카드형 디자인 사용 안 함
- [ ] 텍스트 가독성 최우선
- [ ] 불필요한 애니메이션 없음
- [ ] 컬러 시스템 일관성 유지
- [ ] Mobile First 반응형 디자인

### 성능 검증
- [ ] 데이터베이스 쿼리가 최적화됨
- [ ] 불필요한 데이터 조인이 없음
- [ ] 이미지 최적화 적용
- [ ] 코드 스플리팅 적용

### 확장성 검증
- [ ] 새로운 기능 추가 시 기존 구조에 영향 없음
- [ ] 데이터베이스 스키마 변경이 마이그레이션으로 관리됨
- [ ] 컴포넌트가 재사용 가능하게 설계됨
