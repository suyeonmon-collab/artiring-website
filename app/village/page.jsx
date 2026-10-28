import Link from 'next/link';
import VillagePreview from '@/components/village/VillagePreview';
import { VILLAGE_LOOP, VILLAGE_FACILITIES, VILLAGE_ACTS, VILLAGE_FAQ } from '@/components/village/villageData';

export const metadata = {
  title: '뮤뮤월드 - 카드를 모으면 자라는 마을',
  description: '뮤모에서 모은 작가 캐릭터 카드와 방문 기록으로 자라는 쉬어가는 마을, 뮤뮤월드. 안개 속 냥령들의 이야기를 소개해요.',
  alternates: { canonical: '/village' },
};

const CARDS = ['card-mackerel', 'card-golden-cheese', 'card-pure-white', 'card-moonlight-black'];

export default function VillagePage() {
  return (
    <div className="mm-page">
      <section className="mm-sub-hero">
        <div className="mm-wrap mm-sub-hero__grid">
          <div>
            <p className="mm-hand mm-sub-hero__kicker">뮤뮤월드를 소개해요</p>
            <h1 className="mm-sub-hero__title">카드를 모으면 <span className="mm-mark-red">마을</span>이 자라요</h1>
            <p className="mm-sub-hero__lead">뮤모에서 여행지의 카드를 모으면, 앱 안의 마을 뮤뮤월드에도 불이 켜져요. 밖에서 다녀온 만큼 마을이 자라고, 마을을 가꾼 만큼 이야기가 열려요.</p>
            <div className="mm-hero__cta">
              <Link className="mm-btn mm-btn--red" href="/structure#preregister">출시 알림 받기</Link>
              <Link className="mm-btn" href="/#how">카드는 이렇게 모아요</Link>
            </div>
            <p className="mm-note" style={{ textAlign: 'left' }}>지금은 만드는 중이에요. 소개 내용은 개발 중인 기준이라 출시 때 달라질 수 있어요.</p>
          </div>
          <VillagePreview />
        </div>
      </section>

      <section className="mm-box mm-box--arch" aria-labelledby="vl-world">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand">안개 속의 마을</p>
            <h2 className="mm-sec-title" id="vl-world">뮤뮤월드는 어떤 곳이에요?</h2>
          </div>
          <ul className="mm-rows mm-rows--split">
            <li><b>무관심의 안개</b><p>사람의 발길이 끊긴 곳에 짙어져요. 직접 찾아가는 방문으로만 걷혀요.</p></li>
            <li><b>냥령</b><p>장소에 깃든 기억과 정이 고양이 모습으로 나타난 존재예요. 길을 잃은 냥령들이 마을의 주민이 됐어요.</p></li>
            <li><b>쉬어가는 마을</b><p>냥령들이 여행자를 반기려고 안개 속에 차린 마을이에요. 밭, 식당, 공방은 모두 손님 대접 준비예요.</p></li>
            <li><b>정(情)</b><p>방문하고, 수집하고, 돌보면서 마을에 쌓이는 온기예요. 마을이 자라는 힘이에요.</p></li>
            <li><b>안내자 콩쥬</b><p>마을을 처음 여는 순간부터 이야기를 들려주는 안내자예요.</p></li>
          </ul>
        </div>
      </section>

      <section className="mm-section" aria-labelledby="vl-loop-t">
        <div className="mm-wrap vl-grid">
          <div>
            <div className="mm-sec-head">
              <h2 className="mm-sec-title" id="vl-loop-t">밖에서 다녀온 만큼 자라요</h2>
              <p className="mm-sec-lead">뮤모의 핵심은 여전히 &lsquo;가야만 만날 수 있다&rsquo;예요. 마을은 그 여행을 더 오래 즐기게 해 주는 또 하나의 공간이에요.</p>
            </div>
            <ol className="vl-loop">
              {VILLAGE_LOOP.map((s) => (<li key={s.title}><div><h3>{s.title}</h3><p>{s.text}</p></div></li>))}
            </ol>
          </div>
          <div className="vl-cards" aria-hidden="true">
            {CARDS.map((c) => (<span key={c} style={{ '--img': `url(/images/mumo/${c}.jpg)` }}></span>))}
          </div>
        </div>
      </section>

      <section className="mm-box mm-box--sun" aria-labelledby="vl-acts">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand">이야기는 이렇게 흘러가요</p>
            <h2 className="mm-sec-title" id="vl-acts">프롤로그와 4막</h2>
            <p className="mm-sec-lead">마을 레벨이 오를 때마다 이야기가 열려요. 건너뛰어도 되고, 나중에 다시 볼 수 있어요.</p>
          </div>
          <ol className="mm-rows mm-rows--split">
            {VILLAGE_ACTS.map((a) => (
              <li key={a.act} className={`vl-act${a.secret ? ' vl-act--secret' : ''}`}>
                <b>{a.act}</b>
                <div className="vl-act__body">
                  <div className="vl-act__head"><h3>{a.title}</h3><span className="vl-lv">{a.lv}</span></div>
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mm-section" aria-labelledby="vl-fac">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head mm-sec-head--center">
            <h2 className="mm-sec-title" id="vl-fac">마을에는 이런 곳이 열려요</h2>
            <p className="mm-sec-lead">레벨이 오르면 시설이 하나씩 열리고, 열릴 때마다 안개가 한 겹씩 걷혀요.</p>
          </div>
          <ul className="mm-rows mm-rows--split">
            {VILLAGE_FACILITIES.map((f) => (
              <li key={f.name}><b><span className="vl-lv">{f.lv}</span> {f.name}</b><p>{f.text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mm-box mm-box--blue" aria-labelledby="vl-star">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand">별이 된 고양이</p>
            <h2 className="mm-sec-title" id="vl-star">떠난 고양이는 마을의 등대가 돼요</h2>
            <p className="mm-sec-lead">고양이가 나이 들거나 오래 돌보지 못해 별이 되어도 빛은 사라지지 않아요. 별은 안개 속 마을을 밝히는 별빛이 되어 마을을 지켜요. 슬픈 이별보다 기억으로 남는 이야기로 그려요.</p>
          </div>
        </div>
      </section>

      <section className="mm-section" aria-labelledby="vl-faq">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head mm-sec-head--center"><h2 className="mm-sec-title" id="vl-faq">자주 묻는 질문</h2></div>
          <ul className="mm-rows mm-rows--split">
            {VILLAGE_FAQ.map((f) => (<li key={f.q}><b>{f.q}</b><p>{f.a}</p></li>))}
          </ul>
        </div>
      </section>

      <section className="mm-final" style={{ marginTop: 'var(--mm-panel-inset)' }} aria-labelledby="vl-cta">
        <div className="mm-wrap">
          <p className="mm-hand" style={{ color: 'var(--mm-color-on-red)' }}>안개가 걷히면</p>
          <h2 className="mm-display mm-final__title" id="vl-cta">마을에서 만나요</h2>
          <p className="mm-final__lead">사전등록해 두시면 출시 소식을 가장 먼저 알려 드릴게요.</p>
          <div className="mm-hero__cta"><Link className="mm-btn" href="/structure#preregister">사전등록 하러 가기</Link></div>
        </div>
      </section>
      <div style={{ height: 'var(--mm-section-y)' }} aria-hidden="true" />
    </div>
  );
}
