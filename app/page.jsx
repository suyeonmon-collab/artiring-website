import LandingPage from '@/components/home/LandingPage';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata = {
  title: {
    absolute: '아티링',
  },
  description: '가야만 만날 수 있는 캐릭터를 모으는 GPS 기반 여행 앱. 방문하고, 인증하고, 수집하고, 도감을 채워보세요.',
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '아티링',
    description: '이번 여행, 사진 너머의 추억을 캐릭터로 남겨보세요.',
    type: 'website',
    url: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <LandingPage />;
}
