import Link from 'next/link';
import Image from 'next/image';

// 히어로를 지나면 아래에서 떠오르는 사전등록 독 (토글은 LandingPage 모션에서)
export default function Dock() {
  return (
    <Link className="mm-dock" href="/structure#preregister" aria-label="뮤모 사전등록 하러 가기">
      <Image src="/images/mumo-logo.png" alt="" width={34} height={34} />
      <span>출시 알림 받기</span>
      <span className="mm-btn mm-btn--red mm-btn--sm" aria-hidden="true">사전등록</span>
    </Link>
  );
}
