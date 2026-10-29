import Image from 'next/image';
import {
  VILLAGE_WORLD,
  VILLAGE_ACTS,
  VILLAGE_FACILITIES,
  VILLAGE_FAQ,
} from '@/components/village/villageData';
import Hanja from '@/components/village/Hanja';

const ICON_PROPS = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

// 안개 · 냥령 · 마을 · 정 · 안내자
const WORLD_ICON = [
  <svg key="fog" {...ICON_PROPS}><path d="M7 15a4 4 0 1 1 .9-7.9A5 5 0 0 1 17.5 9 3.5 3.5 0 0 1 17 16"/><path d="M4 19h10M9 22h10"/></svg>,
  <svg key="cat" {...ICON_PROPS}><path d="M5 4l4 3h6l4-3v9a7 7 0 0 1-14 0z"/><path d="M9.5 12.5h.01M14.5 12.5h.01M10.5 16c.5.6 1 .8 1.5.8s1-.2 1.5-.8"/></svg>,
  <svg key="home" {...ICON_PROPS}><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>,
  <svg key="heart" {...ICON_PROPS}><path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/></svg>,
  <svg key="compass" {...ICON_PROPS}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>,
];

// 앱에서 직접 찍은 화면이 있는 시설
const FEATURED = {
  'Lv.1': {
    src: '/images/screenshots/village-farm.jpg',
    alt: '뮤뮤월드 동물농장 앱 화면: 닭과 오리, 양이 먹이를 기다려요',
    title: '동물농장',
    tag: '처음부터 열려 있어요',
    extra: '닭, 오리, 양이 달걀과 깃털, 양털을 모아 두고 기다려요.',
  },
  'Lv.2': {
    src: '/images/screenshots/village-restaurant.jpg',
    alt: '뮤뮤월드 식당 앱 화면: 도마와 가스레인지가 놓인 주방',
    title: '식당',
    tag: '도마와 가스레인지가 있는 주방',
    extra: '모은 재료로 요리를 만들면 요리 도감에 기록으로 남아요.',
  },
};

export default function VillageStory() {
  const featured = VILLAGE_FACILITIES.filter((f) => FEATURED[f.lv]);
  const ladder = VILLAGE_FACILITIES.filter((f) => !FEATURED[f.lv]);

  return (
    <>
      {/* 1. 세계관 */}
      <section className="mm-box mm-box--sun" id="village-world" aria-labelledby="vw-title">
        <div className="mm-wrap">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand mm-reveal">안개 속의 마을</p>
            <h2 className="mm-sec-title mm-reveal" id="vw-title">뮤뮤월드는 어떤 곳이에요?</h2>
            <p className="mm-sec-lead mm-reveal">다섯 가지만 알면 마을 이야기가 술술 읽혀요.</p>
          </div>
          <ul className="vs-world" role="list">
            {VILLAGE_WORLD.map((w, i) => (
              <li key={w.title} className="vs-world__card mm-reveal">
                <span className="vs-world__ico" aria-hidden="true">{WORLD_ICON[i]}</span>
                <h3><Hanja>{w.title}</Hanja></h3>
                <p><Hanja>{w.text}</Hanja></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. 이야기: 프롤로그와 4막 */}
      <section className="mm-section" id="village-story" aria-labelledby="vst-title">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand mm-reveal">이야기는 이렇게 흘러가요</p>
            <h2 className="mm-sec-title mm-reveal" id="vst-title">프롤로그와 4막</h2>
            <p className="mm-sec-lead mm-reveal">마을 레벨이 오를 때마다 이야기가 한 편씩 열려요. 건너뛰어도 되고, 나중에 다시 볼 수 있어요.</p>
          </div>
          <ol className="vs-path">
            {VILLAGE_ACTS.map((a) => (
              <li key={a.act} className={`vs-path__step mm-reveal${a.secret ? ' vs-path__step--secret' : ''}`}>
                <span className="vs-path__dot" aria-hidden="true">{a.secret ? '?' : ''}</span>
                <div className="vs-path__card">
                  <div className="vs-path__head">
                    <b>{a.act}</b>
                    <span className="vl-lv">{a.lv}</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  {a.secret && <span className="vs-path__lock">직접 만나 보세요</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. 시설 */}
      <section className="mm-box mm-box--red" id="village-places" aria-labelledby="vp-title">
        <div className="mm-wrap">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand mm-reveal">하나씩 불이 켜져요</p>
            <h2 className="mm-sec-title mm-reveal" id="vp-title">마을에는 이런 곳이 열려요</h2>
            <p className="mm-sec-lead mm-reveal">레벨이 오르면 시설이 하나씩 열리고, 열릴 때마다 안개가 한 겹씩 걷혀요.</p>
          </div>

          <div className="vs-feats">
            {featured.map((f, i) => {
              const m = FEATURED[f.lv];
              return (
                <article key={f.lv} className={`vs-feat mm-reveal${i % 2 ? ' vs-feat--rev' : ''}`}>
                  <figure className="vs-feat__shot">
                    <div className="mm-phone">
                      <Image src={m.src} alt={m.alt} fill sizes="(min-width: 960px) 240px, 60vw" />
                    </div>
                  </figure>
                  <div className="vs-feat__body">
                    <span className="vl-lv">{f.lv}</span>
                    <h3>{m.title}</h3>
                    <p className="vs-feat__tag">{m.tag}</p>
                    <p>{f.text}</p>
                    <p>{m.extra}</p>
                    <p className="vs-feat__also">{f.name}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <ol className="vs-ladder" aria-label="레벨별로 열리는 시설">
            {ladder.map((f) => (
              <li key={f.lv} className="vs-ladder__step mm-reveal">
                <span className="vl-lv">{f.lv}</span>
                <b>{f.name}</b>
                <p>{f.text}</p>
              </li>
            ))}
          </ol>
          <p className="mm-note">레벨과 시설은 개발 중인 기준이라 출시 때 달라질 수 있어요.</p>
        </div>
      </section>

      {/* 4. 별이 된 고양이 */}
      <section className="mm-box mm-box--blue" id="village-star" aria-labelledby="vsr-title">
        <div className="mm-wrap vs-star">
          <figure className="vs-star__shot mm-reveal">
            <div className="mm-phone">
              <Image
                src="/images/screenshots/village-star.jpg"
                alt="고양이별 앱 화면: 날개와 천사 고리를 단 고양이들이 구름 위를 날아요"
                fill
                sizes="(min-width: 960px) 260px, 62vw"
              />
            </div>
            <span className="mm-sticker vs-star__sticker" aria-hidden="true">별이 된 우리 냥이</span>
          </figure>
          <div className="vs-star__body">
            <p className="mm-hand mm-reveal">별이 된 고양이</p>
            <h2 className="mm-sec-title mm-reveal" id="vsr-title">떠난 고양이는 마을의 등대가 돼요</h2>
            <p className="mm-sec-lead mm-reveal">고양이가 나이 들거나 오래 돌보지 못해 별이 되어도 빛은 사라지지 않아요. 별은 안개 속 마을을 밝히는 별빛이 되어 마을을 지켜요.</p>
            <p className="mm-reveal">슬픈 이별보다 기억으로 남는 이야기로 그려요. 별이 된 고양이들은 고양이별에서 날개를 달고 구름 위를 날아다녀요.</p>
            <p className="mm-note vs-star__note mm-reveal">앱 화면은 미리보기예요. 별로 떠난 고양이가 생기면 그 고양이들이 날아요.</p>
          </div>
        </div>
      </section>

      {/* 5. 자주 묻는 질문 */}
      <section className="mm-section" id="village-faq" aria-labelledby="vf-title">
        <div className="mm-wrap mm-narrow">
          <div className="mm-sec-head mm-sec-head--center">
            <p className="mm-hand mm-reveal">궁금한 게 있다면</p>
            <h2 className="mm-sec-title mm-reveal" id="vf-title">뮤뮤월드 자주 묻는 질문</h2>
          </div>
          <div className="vs-faq">
            {VILLAGE_FAQ.map((f) => (
              <div key={f.q} className="vs-faq__pair mm-reveal">
                <p className="vs-faq__q"><span aria-hidden="true">Q</span>{f.q}</p>
                <p className="vs-faq__a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
