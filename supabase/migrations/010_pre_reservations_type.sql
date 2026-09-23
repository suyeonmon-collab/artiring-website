-- 010: pre_reservations에 유형(type) + 작가 신청 필드 통합
-- app: 일반 사전예약 / artist: 작가 모집 신청

ALTER TABLE public.pre_reservations
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'app';

ALTER TABLE public.pre_reservations
  DROP CONSTRAINT IF EXISTS pre_reservations_type_check;

ALTER TABLE public.pre_reservations
  ADD CONSTRAINT pre_reservations_type_check
  CHECK (type IN ('app', 'artist'));

ALTER TABLE public.pre_reservations
  ADD COLUMN IF NOT EXISTS portfolio_url text;

ALTER TABLE public.pre_reservations
  ADD COLUMN IF NOT EXISTS character_intro text;

CREATE INDEX IF NOT EXISTS idx_pre_reservations_type
  ON public.pre_reservations (type);

COMMENT ON COLUMN public.pre_reservations.type IS 'app=일반 사전예약, artist=작가 모집 신청';
COMMENT ON COLUMN public.pre_reservations.portfolio_url IS '작가 신청 시 포트폴리오 URL (app은 null)';
COMMENT ON COLUMN public.pre_reservations.character_intro IS '작가 신청 시 캐릭터 소개 (app은 null)';

-- 별도 artist_applications 테이블은 더 이상 사용하지 않음
DROP TABLE IF EXISTS public.artist_applications;
