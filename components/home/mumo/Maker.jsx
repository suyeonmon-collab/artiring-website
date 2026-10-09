import Image from 'next/image';
import Link from 'next/link';

export default function Maker() {
  return (
    <section className="mm-maker" aria-labelledby="mk-title">
      <div className="mm-wrap mm-maker__grid">
        <div className="mm-photo-wrap mm-reveal">
          <p className="mm-hand" aria-hidden="true">골목마다 다른 이야기</p>
          <figure className="mm-photo" style={{ margin: '0' }}><Image src="/images/mumo/travelers.jpg" alt="한옥 골목을 걷는 여행자들" width={900} height={1054} sizes="(min-width: 960px) 50vw, 100vw" /></figure>
          <span className="mm-chip-photo" style={{ '--img': 'url(/images/mumo/card-pure-white.jpg)' }} aria-hidden="true"></span>
        </div>
        <div className="mm-maker__body">
          <h2 className="mm-sec-title mm-reveal" id="mk-title">캐릭터를 만들던 사람이 여행 앱을 만들어요</h2>
          <p className="mm-reveal">아티링은 2019년부터 2025년까지 캐릭터 브랜드 ‘신디야’를 운영했어요. 그 경험으로 2025년 11월부터 뮤모를 기획하고, 대표가 직접 디자인과 개발을 하고 있어요.</p>
          <ul className="mm-team mm-reveal">
            <li><b>대표</b><span>시각디자인, 아트 디렉팅과 기획, 앱 개발</span></li>
            <li><b>운영매니저</b><span>관광 경로 기획, 제휴처 협의</span></li>
            <li><b>만드는 곳</b><span>충남 아산</span></li>
          </ul>
          <Link className="mm-btn mm-maker__more mm-reveal" href="/about">아티링 소개 보기</Link>
        </div>
      </div>
    </section>
  );
}
