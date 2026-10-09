import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mm-hero" id="app" aria-labelledby="hero-title">
      <div className="mm-wrap">
        <p className="mm-hand mm-hero__kicker">뮤모를 소개해요</p>
        <h1 className="mm-display mm-hero__title" id="hero-title"><span className="mm-nw">가야만</span> <span className="mm-nw">만날 수 <span className="mm-mark-red">있어요</span></span></h1>
        <p className="mm-hero__lead">여행지 곳곳에 작가의 캐릭터 카드가 숨어 있어요. 그 장소에 직접 가서 GPS로 인증하면 카드가 내 도감에 들어와요.</p>
        <div className="mm-hero__cta">
          <Link className="mm-btn mm-btn--red" href="/structure#preregister">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            출시 알림 받기
          </Link>
          <a className="mm-btn" href="#artists">작가로 참여하기</a>
        </div>
        <p className="mm-hero__status"><b>지금은 만드는 중이에요.</b> 출시 전 사전등록을 받고 있어요.</p>
      </div>

      <div className="mm-stage" aria-label="뮤모 앱 예시 화면 세 장: 지도, 카드 수집, 도감">
        <span className="mm-example-tag mm-stage__tag">예시 화면 · 개발 중인 디자인</span>

        {/* 지도 화면 */}
        <div className="mm-screen mm-screen--map mm-hero__screen" aria-hidden="true">
          <div className="mm-app-bar"><span className="mm-app-bar__brand">MEOWMO</span><span className="mm-app-bar__icons"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span></div>
          <div className="mm-mapui">
            <svg className="mm-map-bg" viewBox="0 0 100 160" preserveAspectRatio="none">
              <rect width="100" height="160" fill="var(--mm-color-map-land)"/>
              <path d="M-5 120 C 20 110, 35 128, 60 118 S 95 100, 110 108 L110 126 C 90 118, 70 136, 50 136 S 10 128, -5 138Z" fill="var(--mm-color-map-water)"/>
              <rect x="58" y="30" width="30" height="26" rx="6" fill="var(--mm-color-map-park)"/>
              <rect x="6" y="70" width="22" height="20" rx="5" fill="var(--mm-color-map-park)"/>
              <g stroke="var(--mm-color-map-road)" strokeWidth="4" fill="none" strokeLinecap="round"><path d="M-5 60 L105 48"/><path d="M40 -5 L46 165"/><path d="M-5 100 L105 92"/><path d="M75 -5 L70 165"/></g>
              <g stroke="var(--mm-color-map-road)" strokeWidth="1.6" fill="none"><path d="M10 -5 L18 165"/><path d="M-5 30 L105 24"/><path d="M-5 140 L105 150"/><path d="M90 60 L95 160"/></g>
            </svg>
            <div className="mm-mapui__search"><b>아산 스팟</b><div className="mm-mapui__quest"><span>카드 10개 수집 <em>4/10</em></span><span>30개 수집 <em>4/30</em></span></div></div>
            <span className="mm-map-pin mm-map-pin--a" style={{ left: '30%', top: '40%' }}>A</span>
            <span className="mm-map-pin mm-map-pin--s" style={{ left: '72%', top: '28%' }}>S</span>
            <span className="mm-map-pin mm-map-pin--a" style={{ left: '62%', top: '56%' }}>B</span>
            <span className="mm-map-pin mm-map-pin--ss" style={{ left: '24%', top: '68%' }}>SS</span>
            <span className="mm-map-pin mm-map-pin--s" style={{ left: '80%', top: '74%' }}>S</span>
            <span className="mm-map-me" style={{ left: '50%', top: '50%', '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }}></span>
            <span className="mm-map-label" style={{ left: '52%', top: '34%' }}>현충사</span>
            <span className="mm-map-label" style={{ left: '8%', top: '76%' }}>신정호</span>
          </div>
          <div className="mm-tabbar"><span className="mm-is-on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>탐험</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h7v15H4zM13 5h7v15h-7z"/></svg>도감</span><span className="mm-tabbar__cam"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg></span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.5c3 0 6 1.8 6 5.5"/></svg>친구</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>다이어리</span></div>
        </div>

        {/* 카드 획득 화면 */}
        <div className="mm-screen mm-screen--get mm-hero__screen" aria-hidden="true">
          <div className="mm-app-bar" style={{ background: 'var(--mm-color-night)', color: 'var(--mm-color-on-red)' }}><span className="mm-app-bar__brand">MEOWMO</span><span className="mm-app-bar__icons" style={{ color: 'var(--mm-color-on-red)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg></span></div>
          <div className="mm-getui">
            <div className="mm-get-card" style={{ '--img': 'url(/images/mumo/card-moonlight-black.jpg)' }}><span className="mm-get-card__badge">아산 한정</span></div>
            <p className="mm-getui__title">달빛 검둥냥 수집 완료!</p>
            <div className="mm-getui__meta"><span>고양이</span><span>현충사</span><span>10월 7일</span></div>
            <div className="mm-getui__btn">도감에서 확인</div>
          </div>
        </div>

        {/* 도감 화면 */}
        <div className="mm-screen mm-screen--dex mm-hero__screen" aria-hidden="true">
          <div className="mm-app-bar"><span className="mm-app-bar__brand">MEOWMO</span><span className="mm-app-bar__icons"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg></span></div>
          <div className="mm-dexui">
            <div className="mm-dexui__profile"><span className="mm-dexui__avatar" style={{ '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }}></span><span className="mm-dexui__name">여행하는 수연<small>Lv.3 · 아산 탐험가</small></span><span className="mm-dexui__stats"><span><b>4</b>수집</span><span><b>1</b>친구</span><span><b>0</b>완주</span></span></div>
            <div className="mm-dexui__progress"><span>아산 도감<span className="mm-dexui__bar" style={{ '--p': '40%' }}><i></i></span></span><span>4/10</span></div>
            <div className="mm-dexui__chips"><span className="mm-is-on">전체</span><span>캐릭터</span><span>일러스트</span><span>아이템</span></div>
            <div className="mm-dex-grid">
              <span className="mm-dex-cell mm-is-filled" style={{ '--img': 'url(/images/mumo/card-mackerel.jpg)' }}></span>
              <span className="mm-dex-cell mm-is-filled" style={{ '--img': 'url(/images/mumo/card-moonlight-black.jpg)' }}></span>
              <span className="mm-dex-cell mm-is-filled" style={{ '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }}></span>
              <span className="mm-dex-cell mm-is-filled" style={{ '--img': 'url(/images/mumo/card-tuxedo.jpg)' }}></span>
              <span className="mm-dex-cell mm-is-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span>
              <span className="mm-dex-cell mm-is-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span>
            </div>
          </div>
          <div className="mm-tabbar"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/></svg>탐험</span><span className="mm-is-on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h7v15H4zM13 5h7v15h-7z"/></svg>도감</span><span className="mm-tabbar__cam"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg></span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>친구</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="15" rx="2"/></svg>다이어리</span></div>
        </div>

        <p className="mm-sticker mm-sticker--1" aria-hidden="true">이번 주말은 아산!</p>
        <p className="mm-sticker mm-sticker--2" aria-hidden="true">한정 카드 꼭 받기</p>
        <p className="mm-sticker mm-sticker--3" aria-hidden="true">도감 4/10</p>
      </div>
    </section>
  );
}
