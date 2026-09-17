# ARTIRING 홈페이지

아티링 공식 홈페이지 (Next.js 14 App Router)

## 환경 변수

`.env.local` 파일을 생성하고 `.env.example`을 참고해 설정하세요.

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 사이트 기본 URL (sitemap, OG 메타 등) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL (`yeomonyaong`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

문의는 `sy@artiring.com` 이메일로 안내합니다. 구 `/contact` URL은 홈(`/`)으로 리다이렉트됩니다.

## Vercel 환경 변수

사전예약 API(`/api/preregister`)는 Supabase `pre_reservations` 테이블에 anon 키로 저장합니다.
Vercel에 `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 설정해 주세요. **앱 DB의 service role 키는 넣지 마세요.**

## Supabase 마이그레이션

`supabase/migrations/` SQL 파일을 Supabase Dashboard SQL Editor 또는 MCP로 적용하세요.
최신: `008_website_pre_reservations.sql` (홈페이지 사전예약 테이블)

## 개발

```bash
npm install
npm run dev
```

## 배포

```bash
npm run build
```
