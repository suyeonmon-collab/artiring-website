/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
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
