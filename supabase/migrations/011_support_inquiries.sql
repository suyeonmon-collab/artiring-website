-- 011: ARTIRING 홈페이지 고객센터 문의
-- type: user | artist | non_user
-- is_urgent: 작가 정지·소명 관련 문의 시 true

CREATE TABLE IF NOT EXISTS public.support_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  detail_type text NOT NULL,
  is_urgent boolean NOT NULL DEFAULT false,
  name text NOT NULL,
  email text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  screen_name text,
  artist_or_character_name text,
  organization text,
  screenshot_urls text[] NOT NULL DEFAULT '{}',
  agreed_privacy boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT support_inquiries_type_check
    CHECK (type IN ('user', 'artist', 'non_user')),
  CONSTRAINT support_inquiries_body_min_check
    CHECK (char_length(trim(body)) >= 10),
  CONSTRAINT support_inquiries_privacy_check
    CHECK (agreed_privacy = true)
);

CREATE INDEX IF NOT EXISTS idx_support_inquiries_created_at
  ON public.support_inquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_support_inquiries_type
  ON public.support_inquiries (type);

CREATE INDEX IF NOT EXISTS idx_support_inquiries_is_urgent
  ON public.support_inquiries (is_urgent)
  WHERE is_urgent = true;

COMMENT ON TABLE public.support_inquiries IS 'ARTIRING 홈페이지 고객센터 문의';
COMMENT ON COLUMN public.support_inquiries.type IS 'user=앱 이용자, artist=작가, non_user=비유저(제휴·취재 등)';
COMMENT ON COLUMN public.support_inquiries.is_urgent IS '작가 정지·소명 관련 문의 여부';

ALTER TABLE public.support_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_inquiries FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create support_inquiries" ON public.support_inquiries;
CREATE POLICY "Anyone can create support_inquiries"
ON public.support_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (agreed_privacy = true);

REVOKE ALL ON TABLE public.support_inquiries FROM PUBLIC;
GRANT INSERT ON TABLE public.support_inquiries TO anon, authenticated;
GRANT ALL ON TABLE public.support_inquiries TO service_role;

-- 스크린샷 업로드용 스토리지 버킷
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-support-inquiries',
  'website-support-inquiries',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Anyone can upload support inquiry screenshots" ON storage.objects;
CREATE POLICY "Anyone can upload support inquiry screenshots"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'website-support-inquiries');

DROP POLICY IF EXISTS "Public read support inquiry screenshots" ON storage.objects;
CREATE POLICY "Public read support inquiry screenshots"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'website-support-inquiries');
