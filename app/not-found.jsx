import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mm-page">
      <section className="mm-sub-hero mm-sub-hero--center">
        <div className="mm-wrap">
          <p className="mm-hand mm-sub-hero__kicker">길을 잃었어요</p>
          <h1 className="mm-display mm-proof__num">404</h1>
          <p className="mm-sub-hero__lead">요청하신 페이지가 존재하지 않거나 이동되었어요.</p>
          <div className="mm-hero__cta">
            <Link href="/" className="mm-btn mm-btn--red">
              홈으로 돌아가기
            </Link>
            <a href="mailto:sy@artiring.com" className="mm-btn">
              문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
