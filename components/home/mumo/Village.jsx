import Link from 'next/link';
import { VILLAGE_LOOP } from '@/components/village/villageData';
import VillagePreview from '@/components/village/VillagePreview';

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
              <li key={s.title} className="mm-reveal"><div><h3>{s.title}</h3><p>{s.text}</p></div></li>
            ))}
          </ol>
          <div className="mm-hero__cta mm-reveal" style={{ justifyContent: 'flex-start', marginTop: 'var(--mm-space-xl)' }}>
            <Link className="mm-btn mm-btn--red" href="/village">뮤뮤월드 이야기 보기</Link>
          </div>
        </div>
        <VillagePreview />
      </div>
    </section>
  );
}
