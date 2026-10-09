export default function ProductMap() {
  return (
    <section className="mm-product" aria-labelledby="pd-title">
      <div className="mm-wrap mm-product__grid">
        <div>
          <div className="mm-sec-head">
            <h2 className="mm-sec-title mm-reveal" id="pd-title">지도에서 고르고, 가서 만나요</h2>
            <p className="mm-sec-lead mm-reveal">어디에 어떤 카드가 있는지는 지도에서 미리 볼 수 있어요. 받는 건 그 자리에 갔을 때만이에요.</p>
          </div>
          <ul className="mm-feat-list">
            <li className="mm-feat mm-reveal">
              <span className="mm-feat__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg></span>
              <div><h3>스팟 지도</h3><p>카드가 놓인 장소와 지역별 수집 목표를 한눈에 봐요.</p></div>
            </li>
            <li className="mm-feat mm-reveal">
              <span className="mm-feat__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><path d="m9.5 10 1.8 1.8L15 8.2"/></svg></span>
              <div><h3>GPS 방문 인증</h3><p>그 장소에 가야만 카드를 받을 수 있어요. 집에서는 못 모아요.</p></div>
            </li>
            <li className="mm-feat mm-reveal">
              <span className="mm-feat__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="m21 16-5-5-8 8"/></svg></span>
              <div><h3>여행 사진 정리와 공유 <span className="mm-state">만드는 중</span></h3><p>카드와 함께 그날 찍은 사진이 모이고, 친구에게 보여 줄 수 있게 만들고 있어요.</p></div>
            </li>
          </ul>
        </div>

        <div className="mm-bigmap mm-reveal" aria-label="스팟 지도 예시 화면">
          <svg className="mm-map-bg" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="500" height="400" fill="var(--mm-color-map-land)"/>
            <path d="M-10 300 C 80 270, 150 320, 250 296 S 430 250, 520 270 L520 330 C 430 310, 330 360, 230 352 S 60 330, -10 350Z" fill="var(--mm-color-map-water)"/>
            <rect x="300" y="60" width="140" height="100" rx="18" fill="var(--mm-color-map-park)"/>
            <rect x="30" y="150" width="110" height="80" rx="16" fill="var(--mm-color-map-park)"/>
            <g stroke="var(--mm-color-map-road)" strokeWidth="14" fill="none" strokeLinecap="round"><path d="M-10 130 L510 100"/><path d="M200 -10 L230 410"/><path d="M-10 250 L510 236"/></g>
            <g stroke="var(--mm-color-map-road)" strokeWidth="5" fill="none"><path d="M60 -10 L90 410"/><path d="M380 -10 L360 410"/><path d="M-10 60 L510 40"/><path d="M-10 380 L510 392"/></g>
          </svg>
          <svg className="mm-bigmap__route" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M250 200 C 220 170, 160 150, 120 175" fill="none" stroke="var(--mm-color-red)" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12"/></svg>
          <span className="mm-bigmap__chip">아산 도감 <em>4/10</em></span>
          <span className="mm-example-tag">예시 화면</span>
          <span className="mm-map-pin mm-map-pin--a mm-bm-pin" style={{ left: '16%', top: '30%' }}>A</span>
          <span className="mm-map-pin mm-map-pin--ss mm-bm-pin" style={{ left: '24%', top: '44%' }}>SS</span>
          <span className="mm-map-pin mm-map-pin--s mm-bm-pin" style={{ left: '70%', top: '24%' }}>S</span>
          <span className="mm-map-pin mm-map-pin--a mm-bm-pin" style={{ left: '82%', top: '52%' }}>B</span>
          <span className="mm-map-pin mm-map-pin--s mm-bm-pin" style={{ left: '40%', top: '78%' }}>S</span>
          <span className="mm-map-me" style={{ left: '50%', top: '50%', '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }}></span>
          <span className="mm-map-label" style={{ left: '60%', top: '30%' }}>현충사</span>
          <span className="mm-map-label" style={{ left: '30%', top: '84%' }}>신정호</span>
          <span className="mm-map-label" style={{ left: '6%', top: '51%' }}>외암마을</span>
          <div className="mm-bigmap__popup">
            <span className="mm-thumb" style={{ '--img': 'url(/images/mumo/card-starlight-calico.jpg)' }}></span>
            <div><b>별빛 얼룩냥</b><small>외암마을 스팟 · 지금 위치에서 걸어서 갈 수 있어요</small><span className="mm-go">길 찾기</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
