export default function Friends() {
  return (
    <section className="mm-friends" id="friends" aria-labelledby="fr-title">
      <div className="mm-wrap">
        <div className="mm-sec-head mm-sec-head--center">
          <p className="mm-hand mm-reveal">만나러 가요</p>
          <h2 className="mm-sec-title mm-reveal" id="fr-title">뮤모 친구들</h2>
          <p className="mm-sec-lead mm-reveal">장소마다 다른 친구가 기다려요. 금색 테두리는 그 지역에서만 나오는 한정 카드예요.</p>
        </div>
      </div>
      <ul className="mm-friends__row" role="list">
        <li className="mm-fcard mm-reveal"><div className="mm-fcard__img" style={{ '--img': 'url(/images/mumo/card-mackerel.jpg)' }} role="img" aria-label="고등어냥 카드 그림"></div><p className="mm-fcard__name">고등어냥 <small>일반</small></p></li>
        <li className="mm-fcard mm-fcard--rare mm-reveal"><div className="mm-fcard__img" style={{ '--img': 'url(/images/mumo/card-starlight-calico.jpg)' }} role="img" aria-label="별빛 얼룩냥 카드 그림"></div><p className="mm-fcard__name">별빛 얼룩냥 <small>한정</small></p></li>
        <li className="mm-fcard mm-reveal"><div className="mm-fcard__img" style={{ '--img': 'url(/images/mumo/card-moonlight-black.jpg)' }} role="img" aria-label="달빛 검둥냥 카드 그림"></div><p className="mm-fcard__name">달빛 검둥냥 <small>일반</small></p></li>
        <li className="mm-fcard mm-reveal"><div className="mm-fcard__img" style={{ '--img': 'url(/images/mumo/card-pure-white.jpg)' }} role="img" aria-label="순백의 흰냥 카드 그림"></div><p className="mm-fcard__name">순백의 흰냥 <small>일반</small></p></li>
        <li className="mm-fcard mm-fcard--rare mm-reveal"><div className="mm-fcard__img" style={{ '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }} role="img" aria-label="황금 치즈냥 카드 그림"></div><p className="mm-fcard__name">황금 치즈냥 <small>한정</small></p></li>
        <li className="mm-fcard mm-reveal"><div className="mm-fcard__img" style={{ '--img': 'url(/images/mumo/card-tuxedo.jpg)' }} role="img" aria-label="신사 턱시도냥 카드 그림"></div><p className="mm-fcard__name">신사 턱시도냥 <small>일반</small></p></li>
      </ul>
      <div className="mm-wrap mm-friends__foot"><span className="mm-example-tag">예시 카드</span><span>카드 그림과 등급은 개발 중인 시안이에요.</span></div>
    </section>
  );
}
