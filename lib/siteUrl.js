const DEFAULT_SITE_URL = 'https://www.artiring.com';

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    DEFAULT_SITE_URL
  );
}
