export default function Steps() {
  return (
    <section className="mm-steps" id="how" aria-labelledby="how-title">
      <div className="mm-wrap">
        <div className="mm-sec-head">
          <h2 className="mm-sec-title mm-reveal" id="how-title">뮤모로 이렇게 모아요</h2>
          <p className="mm-sec-lead mm-reveal">방문, 인증, 수집, 도감, 완주. 다섯 걸음이면 한 지역이 내 도감에 들어와요.</p>
        </div>
        <div className="mm-steps__notes" aria-hidden="true"><p className="mm-sticker mm-steps__note mm-steps__note--1">보조배터리 챙기기</p><p className="mm-sticker mm-steps__note mm-steps__note--2">걷기 좋은 신발</p></div>
        <ol className="mm-steps__row">
          <li className="mm-step mm-reveal">
            <span className="mm-step__num" aria-hidden="true">1</span>
            <div className="mm-step__viz" aria-hidden="true">
              <div className="mm-viz-pinrow">
                <span className="mm-map-pin mm-map-pin--a" style={{ left: '24%', top: '44%' }}>A</span>
                <span className="mm-map-pin mm-map-pin--s" style={{ left: '58%', top: '30%' }}>S</span>
                <span className="mm-map-pin mm-map-pin--ss" style={{ left: '76%', top: '62%' }}>SS</span>
              </div>
              <span className="mm-viz-badge">근처 스팟 3곳</span>
            </div>
            <h3 className="mm-step__title">방문</h3>
            <p className="mm-step__text">지도에서 카드가 놓인 스팟을 찾아 그 장소로 가요.</p>
          </li>
          <li className="mm-step mm-reveal">
            <span className="mm-step__num" aria-hidden="true">2</span>
            <div className="mm-step__viz" aria-hidden="true"><span className="mm-viz-ring"></span><span className="mm-viz-badge mm-viz-badge--ok">위치 확인됨</span></div>
            <h3 className="mm-step__title">인증</h3>
            <p className="mm-step__text">도착하면 GPS로 내가 그 자리에 있는지 확인해요.</p>
          </li>
          <li className="mm-step mm-reveal">
            <span className="mm-step__num" aria-hidden="true">3</span>
            <div className="mm-step__viz" aria-hidden="true"><div className="mm-viz-cards"><span style={{ '--img': 'url(/images/mumo/card-pure-white.jpg)' }}></span><span style={{ '--img': 'url(/images/mumo/card-moonlight-black.jpg)' }}></span><span style={{ '--img': 'url(/images/mumo/card-starlight-calico.jpg)' }}></span></div></div>
            <h3 className="mm-step__title">수집</h3>
            <p className="mm-step__text">그 장소에서만 나오는 작가 캐릭터 카드를 받아요.</p>
          </li>
          <li className="mm-step mm-reveal">
            <span className="mm-step__num" aria-hidden="true">4</span>
            <div className="mm-step__viz" aria-hidden="true"><div className="mm-viz-dex"><i className="mm-f"></i><i className="mm-f"></i><i className="mm-f"></i><i className="mm-f"></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
            <h3 className="mm-step__title">도감</h3>
            <p className="mm-step__text">받은 카드가 지역별 도감에 차곡차곡 모여요.</p>
          </li>
          <li className="mm-step mm-step--5 mm-reveal">
            <span className="mm-step__num" aria-hidden="true">5</span>
            <div className="mm-step__viz" aria-hidden="true"><span className="mm-viz-stamp">아산<br />완주</span></div>
            <h3 className="mm-step__title">완주</h3>
            <p className="mm-step__text">한 지역 도감을 다 채우면 완주 기록이 남아요.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
