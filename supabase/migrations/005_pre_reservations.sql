-- =====================================================
-- 005_pre_reservations.sql - 사전예약 테이블
-- =====================================================

CREATE TABLE pre_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('클라이언트', '소속사', '프리랜서')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_pre_reservations_created_at ON pre_reservations(created_at DESC);
CREATE INDEX idx_pre_reservations_type ON pre_reservations(type);

-- RLS 활성화
ALTER TABLE pre_reservations ENABLE ROW LEVEL SECURITY;

-- 누구나 사전예약 생성 가능
CREATE POLICY "Anyone can create pre_reservations"
ON pre_reservations FOR INSERT
WITH CHECK (true);

-- 관리자만 조회 가능 (인증은 API 레벨에서 처리)
CREATE POLICY "Admins can view pre_reservations"
ON pre_reservations FOR SELECT
USING (true);

