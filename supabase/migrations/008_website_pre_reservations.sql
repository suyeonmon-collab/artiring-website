-- 008: ARTIRING 홈페이지 사전예약 (yeomonyaong)
-- INSERT: anon/authenticated (개인정보 동의 필수)
-- SELECT: 정책 없음. 건수는 pre_reservations_count() RPC만 허용.

CREATE TABLE IF NOT EXISTS public.pre_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  agreed_privacy boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pre_reservations_phone_format_check CHECK (phone ~ '^01[0-9]{8,9}$')
);

CREATE INDEX IF NOT EXISTS idx_pre_reservations_created_at
  ON public.pre_reservations (created_at DESC);

COMMENT ON TABLE public.pre_reservations IS 'ARTIRING 홈페이지 사전예약 신청';

ALTER TABLE public.pre_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pre_reservations FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create pre_reservations" ON public.pre_reservations;
CREATE POLICY "Anyone can create pre_reservations"
ON public.pre_reservations
FOR INSERT
TO anon, authenticated
WITH CHECK (agreed_privacy = true);

REVOKE ALL ON TABLE public.pre_reservations FROM PUBLIC;
GRANT INSERT ON TABLE public.pre_reservations TO anon, authenticated;
GRANT ALL ON TABLE public.pre_reservations TO service_role;

CREATE OR REPLACE FUNCTION public.pre_reservations_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::integer FROM public.pre_reservations;
$$;

REVOKE ALL ON FUNCTION public.pre_reservations_count() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.pre_reservations_count() TO anon, authenticated;
