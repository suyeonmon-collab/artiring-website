/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 외장 볼륨에서 개발할 때 .next/cache/images 의 '._' 사이드카 파일이 이미지로 읽혀 깨지는 문제를 피한다.
    // 배포(production)에서는 기존대로 최적화한다.
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/village',
        destination: '/#village',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: false,
      },
      {
        source: '/contact/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
