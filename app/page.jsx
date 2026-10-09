import LandingPage from '@/components/home/LandingPage';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata = {
  title: {
    absolute: '아티링',
  },
  description: '여행지 곳곳의 작가 캐릭터 카드를 그 장소에 가야만 GPS로 모을 수 있는 여행 앱 뮤모. 아티링이 만들고 있어요.',
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
