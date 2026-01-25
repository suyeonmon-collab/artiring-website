import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: {
    default: 'ARTIRING - 프리랜서 에이전시 기반 인력 관리 플랫폼',
    template: '%s | ARTIRING',
  },
  description: '아티링은 프리랜서와 클라이언트를 연결하는 새로운 에이전시 모델을 제안합니다. 백업 시스템, AI 매칭, 통합 관리로 안정적인 프리랜서 생태계를 구축합니다.',
  keywords: ['프리랜서', '에이전시', '인력관리', 'AI매칭', '아티링', 'ARTIRING'],
  authors: [{ name: 'ARTIRING' }],
  creator: 'ARTIRING',
  publisher: 'ARTIRING',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.artiring.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ARTIRING - 프리랜서 에이전시 기반 인력 관리 플랫폼',
    description: '아티링은 프리랜서와 클라이언트를 연결하는 새로운 에이전시 모델을 제안합니다.',
    url: '/',
    siteName: 'ARTIRING',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/pavicon.png',
    shortcut: '/images/pavicon.png',
    apple: '/images/pavicon.png',
  },
};

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://artiring.com';
  
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        {/* Favicon for Google Search */}
        <link rel="icon" type="image/png" href="/images/pavicon.png" />
        <link rel="shortcut icon" type="image/png" href="/images/pavicon.png" />
        <link rel="apple-touch-icon" href="/images/pavicon.png" />
        {/* Additional sizes for better compatibility */}
        <link rel="icon" type="image/png" sizes="16x16" href="/images/pavicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/pavicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/pavicon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/pavicon.png" />
        {/* Manifest for PWA support */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}




