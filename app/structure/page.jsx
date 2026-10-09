import PreReservationForm from '@/components/structure/PreReservationForm';

export const metadata = {
  title: '사전예약',
  description: '뮤모 앱 출시 소식을 가장 먼저 받아보세요.',
};

export default function StructurePage() {
  return (
    <div className="mm-page">
      <section id="preregister" className="mm-sub-hero mm-sub-hero--center mm-prereg">
        <div className="mm-wrap">
          <p className="mm-hand mm-sub-hero__kicker">다음 여행엔</p>
          <h1 className="mm-sub-hero__title">
            뮤모 <span className="mm-mark-red">사전예약</span>
          </h1>
          <p className="mm-sub-hero__lead">출시 알림을 가장 먼저 받아보세요. 첫 카드를 받으러 갈 준비가 되면 바로 알려 드릴게요.</p>
          <div className="mm-prereg__cards" aria-hidden="true">
            <span style={{ '--img': 'url(/images/mumo/card-mackerel.jpg)' }}></span>
            <span style={{ '--img': 'url(/images/mumo/card-golden-cheese.jpg)' }}></span>
            <span style={{ '--img': 'url(/images/mumo/card-moonlight-black.jpg)' }}></span>
          </div>
          <div className="mm-form-card">
            <PreReservationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
