import Link from 'next/link';

export default function FinalCta() {
  return (
    <section className="mm-final" aria-labelledby="fn-title">
      <div className="mm-final__cards" aria-hidden="true">
        <span style={{ '--img': 'url(/images/mumo/card-mackerel.jpg)' }}></span><span style={{ '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }}></span><span style={{ '--img': 'url(/images/mumo/card-pure-white.jpg)' }}></span><span style={{ '--img': 'url(/images/mumo/card-starlight-calico.jpg)' }}></span>
      </div>
      <div className="mm-wrap">
        <p className="mm-hand mm-reveal" style={{ color: 'var(--mm-color-on-red)' }}>다음 여행엔</p>
        <h2 className="mm-display mm-final__title mm-reveal" id="fn-title">첫 카드를 받으러 가요</h2>
        <p className="mm-final__lead mm-reveal">사전등록해 두시면 출시 소식을 가장 먼저 알려 드릴게요.</p>
        <div className="mm-hero__cta mm-reveal">
          <Link className="mm-btn" href="/structure#preregister">사전등록 하러 가기</Link>
          <span className="mm-btn" aria-disabled="true" role="link" title="곧 만나요">App Store · 곧 만나요</span>
          <span className="mm-btn" aria-disabled="true" role="link" title="곧 만나요">Google Play · 곧 만나요</span>
        </div>
      </div>
    </section>
  );
}
