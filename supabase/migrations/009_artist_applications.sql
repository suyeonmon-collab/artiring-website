-- 009: ARTIRING 홈페이지 작가 모집 신청
-- INSERT: anon/authenticated (개인정보 동의 필수)
-- SELECT: 정책 없음 (관리자는 service_role로만 조회)

CREATE TABLE IF NOT EXISTS public.artist_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  portfolio_url text NOT NULL,
  character_intro text NOT NULL,
  joins_illust_korea boolean NOT NULL DEFAULT false,
  agreed_privacy boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT artist_applications_phone_format_check CHECK (phone ~ '^01[0-9]{8,9}$')
);

CREATE INDEX IF NOT EXISTS idx_artist_applications_created_at
  ON public.artist_applications (created_at DESC);

COMMENT ON TABLE public.artist_applications IS 'ARTIRING 홈페이지 작가 모집 신청';

ALTER TABLE public.artist_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_applications FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create artist_applications" ON public.artist_applications;
CREATE POLICY "Anyone can create artist_applications"
ON public.artist_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (agreed_privacy = true);

REVOKE ALL ON TABLE public.artist_applications FROM PUBLIC;
GRANT INSERT ON TABLE public.artist_applications TO anon, authenticated;
GRANT ALL ON TABLE public.artist_applications TO service_role;
