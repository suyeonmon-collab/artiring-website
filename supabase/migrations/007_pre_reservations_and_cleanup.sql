-- 007: pre_reservations 스키마 갱신 + blog 테이블 삭제
-- 적용 전 MCP/대시보드 확인 결과 (2026-07-03):
--   pre_reservations: 1건 (임수연 / 01020759911 / type:소속사 — 구 스키마 테스트로 판단)
--   RLS SELECT: "Admins can view" qual=true → public 조회 가능 (수정 필요)
--   contact_inquiries: 2건 (test@example.com 등 테스트) → DROP 보류
--   profiles: 0건, admin 인증용 가능성 → DROP 보류

-- =============================================================================
-- pre_reservations 변경
-- =============================================================================

ALTER TABLE pre_reservations DROP CONSTRAINT IF EXISTS pre_reservations_type_check;

-- 구 스키마 테스트 데이터 (type=소속사, 구 유형 체크값)
DELETE FROM pre_reservations
WHERE phone = '01020759911'
  AND created_at < '2026-07-01';

DROP INDEX IF EXISTS idx_pre_reservations_type;

ALTER TABLE pre_reservations DROP COLUMN IF EXISTS type;

ALTER TABLE pre_reservations ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE pre_reservations ADD COLUMN IF NOT EXISTS agreed_privacy BOOLEAN NOT NULL DEFAULT false;

-- 프론트에서 하이픈 제거 후 저장 (01020759911 형식). 10~11자리 숫자만 허용.
ALTER TABLE pre_reservations DROP CONSTRAINT IF EXISTS pre_reservations_phone_format_check;
ALTER TABLE pre_reservations ADD CONSTRAINT pre_reservations_phone_format_check
  CHECK (phone ~ '^01[0-9]{8,9}$');

-- =============================================================================
-- RLS 정책 재설정
-- INSERT: 누구나 (개인정보 동의 필수)
-- SELECT: anon/authenticated 정책 없음 → service_role만 조회
-- =============================================================================

DROP POLICY IF EXISTS "Admins can view pre_reservations" ON pre_reservations;
DROP POLICY IF EXISTS "Anyone can create pre_reservations" ON pre_reservations;

CREATE POLICY "Anyone can create pre_reservations"
ON pre_reservations FOR INSERT
TO public
WITH CHECK (agreed_privacy = true);

-- =============================================================================
-- blog_* 테이블 삭제
-- =============================================================================

DROP TABLE IF EXISTS blog_post_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS blog_admins CASCADE;

-- =============================================================================
-- contact_inquiries — Formspree 전환 후 미사용
-- 현재 2건 테스트 데이터 존재. 백업·삭제 확인 후 아래 주석 해제.
-- =============================================================================

-- DROP TABLE IF EXISTS contact_inquiries CASCADE;

-- =============================================================================
-- profiles — admin 인증 등 다른 용도 확인 전까지 보류
-- =============================================================================
