/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      // 이전 slug에서 새 slug로 리디렉션
      {
        source: '/records/artiring-경력-디자이너-자문단과-함께합니다-',
        destination: '/records/2',
        permanent: true, // 301 리디렉션 (영구적)
      },
    ];
  },
};

module.exports = nextConfig;

