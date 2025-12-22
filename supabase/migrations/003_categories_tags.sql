-- =====================================================
-- 003_categories_tags.sql - Categories, Tags 테이블
-- =====================================================

-- Categories 테이블
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
CREATE INDEX idx_categories_order ON categories(order_index);

-- RLS 활성화
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

-- =====================================================
-- Tags 테이블
-- =====================================================

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_name ON tags(name);

-- RLS 활성화
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- 누구나 태그 조회 가능
CREATE POLICY "Tags readable by all"
ON tags FOR SELECT
USING (true);






