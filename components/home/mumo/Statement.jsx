import CartoonIntroCarousel from '@/components/home/CartoonIntroCarousel';

export default function Statement() {
  return (
    <section className="mm-panel mm-statement" aria-labelledby="st-title">
      <div className="mm-wrap">
        <h2 className="mm-display mm-statement__lines mm-reveal" id="st-title">이번 여행 <span className="mm-chip" style={{ '--img': 'url(/images/mumo/hanok-alley.jpg)' }} role="img" aria-label="한옥 골목 사진"></span> 사진만 <span className="mm-chip" style={{ '--img': 'url(/images/mumo/card-pure-white.jpg)' }} role="img" aria-label="순백의 흰냥 카드"></span> 남기고 끝나지 <span className="mm-chip mm-chip--tall" style={{ '--img': 'url(/images/mumo/card-mackerel.jpg)' }} role="img" aria-label="고등어냥 카드"></span> 않았나요?</h2>
        <p className="mm-hand mm-statement__hand mm-reveal">이번엔 카드로 남겨요</p>
        <p className="mm-statement__note mm-reveal">뮤모에서는 간 곳마다 그 장소의 캐릭터 카드가 쌓여요. 사진 말고도 여행이 남고, 못 모은 카드는 다음 여행을 떠날 이유가 돼요.</p>
        <div className="mm-statement__comic mm-reveal">
          <CartoonIntroCarousel />
        </div>
      </div>
    </section>
  );
}
