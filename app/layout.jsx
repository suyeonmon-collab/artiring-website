import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata = {
  title: {
    default: '아티링',
    template: '%s | 아티링',
  },
  description: '가야만 만날 수 있는 캐릭터를 모으는 GPS 기반 여행 앱. 방문하고, 인증하고, 수집하고, 도감을 채워보세요.',
  keywords: ['뮤모', '여행앱', '캐릭터 수집', 'GPS', '아티링', 'ARTIRING'],
  authors: [{ name: 'ARTIRING' }],
  creator: 'ARTIRING',
  publisher: 'ARTIRING',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '아티링',
    description: '이번 여행, 사진 너머의 추억을 캐릭터로 남겨보세요.',
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




