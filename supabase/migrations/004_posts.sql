-- =====================================================
-- 004_posts.sql - Posts 테이블 및 관련 테이블
-- =====================================================

-- Posts 테이블
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  
  -- 콘텐츠 (TipTap JSON + HTML)
  content JSONB NOT NULL,
  content_html TEXT NOT NULL,
  
  -- 메타데이터
  summary TEXT,
  thumbnail_url TEXT,
  
  -- 카테고리 및 작성자
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  
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
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);

-- 복합 인덱스 (성능 최적화)
CREATE INDEX idx_posts_status_published_at ON posts(status, published_at DESC);

-- updated_at 트리거
CREATE TRIGGER update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 발행된 글은 누구나 조회 가능
CREATE POLICY "Published posts readable by all"
ON posts FOR SELECT
USING (status = 'published');

-- 작성자는 자신의 모든 글 조회 가능 (관리자 페이지용)
CREATE POLICY "Authors can view own posts"
ON posts FOR SELECT
USING (auth.uid() = author_id);

-- =====================================================
-- Post_Tags 테이블 (다대다 관계)
-- =====================================================

CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, tag_id)
);

-- 인덱스
CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);

-- RLS 활성화
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- 누구나 post_tags 조회 가능
CREATE POLICY "Post tags readable by all"
ON post_tags FOR SELECT
USING (true);

-- =====================================================
-- 조회수 증가 함수
-- =====================================================

CREATE OR REPLACE FUNCTION increment_post_view_count(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;







