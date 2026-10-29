import Image from 'next/image';
import { VILLAGE_LOOP } from '@/components/village/villageData';
import Hanja from '@/components/village/Hanja';

const SHOTS = [
  { src: '/images/screenshots/village-world.webp', ratio: '998 / 1662', title: '뮤뮤월드', desc: '모은 카드와 다녀온 기록으로 마을이 자라요.' },
  { src: '/images/screenshots/village-cooking.png', ratio: '998 / 1662', title: '요리 도감', desc: '마을에서 만든 요리가 도감에 기록으로 남아요.' },
];

export default function Village() {
  return (
    <section className="mm-section" id="village" aria-labelledby="vl-title">
      <div className="mm-wrap vl-grid">
        <div>
          <div className="mm-sec-head">
            <p className="mm-hand mm-reveal">앱 안의 또 다른 세계</p>
            <h2 className="mm-sec-title mm-reveal" id="vl-title">카드를 모으면 뮤뮤월드가 자라요</h2>
            <p className="mm-sec-lead mm-reveal">발길이 끊긴 곳엔 무관심의 안개가 껴요. 그 안개 속에서 길을 잃은 냥령들이 여행자를 반기려고 &lsquo;쉬어가는 마을&rsquo;을 차렸어요. 여행에서 모은 카드와 다녀온 기록이 쌓일수록 마을은 자라고 안개는 걷혀요.</p>
          </div>
          <ol className="vl-loop">
            {VILLAGE_LOOP.map((s) => (
              <li key={s.title} className="mm-reveal"><div><h3>{s.title}</h3><p><Hanja>{s.text}</Hanja></p></div></li>
            ))}
          </ol>
        </div>

        <div className="vl-shots mm-reveal">
          {SHOTS.map((s) => (
            <figure key={s.src} className="vl-shot">
              <div className="mm-phone" style={{ aspectRatio: s.ratio }}>
                <Image src={s.src} alt={`${s.title} 앱 화면`} fill sizes="(min-width: 960px) 20vw, 45vw" />
              </div>
              <figcaption className="mm-phone-cap"><b>{s.title}</b><small>{s.desc}</small></figcaption>
            </figure>
          ))}
          <p className="mm-note vl-shots__note">개발 중인 앱 화면이에요. 출시 때 달라질 수 있어요.</p>
        </div>
      </div>

    </section>
  );
}
