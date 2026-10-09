import Link from 'next/link';

export default function ArtistsTeaser() {
  return (
    <section className="mm-artists" id="artists" aria-labelledby="ar-title">
      <div className="mm-wrap mm-artists__grid">
        <div>
          <div className="mm-sec-head">
            <p className="mm-hand mm-reveal">작가님께</p>
            <h2 className="mm-sec-title mm-reveal" id="ar-title">내 캐릭터를 내가 고른 장소에 두세요</h2>
            <p className="mm-sec-lead mm-reveal">작업실, 작품을 파는 가게, 페어 부스처럼 작가님이 정한 곳에 캐릭터 카드를 놓을 수 있어요. 여행자는 그곳에 와야 카드를 받아요.</p>
          </div>
          <div className="mm-terms mm-reveal" role="list">
            <div className="mm-term" role="listitem"><b>0원</b><span>참여비</span></div>
            <div className="mm-term" role="listitem"><b>100%</b><span>저작권은 작가님께</span></div>
            <div className="mm-term" role="listitem"><b>비독점</b><span>다른 곳 활동 자유</span></div>
          </div>
          <ol className="mm-flow mm-reveal">
            <li><span><b>캐릭터 등록</b> · 카드로 쓸 그림과 소개를 올려요.</span></li>
            <li><span><b>스팟 지정</b> · 카드를 놓을 장소를 골라요.</span></li>
            <li><span><b>지도에 노출</b> · 여행자 지도에 작가님 스팟이 떠요.</span></li>
            <li><span><b>방문과 수집</b> · 찾아온 여행자가 카드를 모아 가요.</span></li>
          </ol>
          <Link className="mm-btn mm-btn--red" href="/artist">작가 참여 안내 보기</Link>
        </div>

        <div className="mm-studio mm-reveal" aria-label="작가용 화면 예시">
          <div className="mm-studio__head"><h3>작가 스튜디오</h3><span className="mm-example-tag">예시 화면</span></div>
          <div className="mm-studio__char">
            <span className="mm-thumb" style={{ '--img': 'url(/images/mumo/card-tuxedo.jpg)' }}></span>
            <dl><dt>캐릭터</dt><dd>신사 턱시도냥</dd><dt>작가</dt><dd>예시 작가</dd><dt>저작권</dt><dd>작가 보유</dd><dt>등록 스팟</dt><dd>2곳</dd></dl>
          </div>
          <ul className="mm-spots">
            <li className="mm-spot"><span className="mm-map-pin mm-map-pin--s" aria-hidden="true">S</span><span>내 작업실 <small>충남 아산 · 작업실 앞</small></span><span className="mm-status mm-status--on">지도에 노출 중</span></li>
            <li className="mm-spot"><span className="mm-map-pin mm-map-pin--a" aria-hidden="true">A</span><span>일러스트 페어 부스 <small>행사 기간에만</small></span><span className="mm-status mm-status--wait">검토 중</span></li>
          </ul>
          <div className="mm-studio__chart">
            <div className="mm-studio__chart-head"><b>요일별 수집</b><small>예시 데이터</small></div>
            <div className="mm-bars"><i style={{ '--h': '35%' }}></i><i style={{ '--h': '48%' }}></i><i style={{ '--h': '30%' }}></i><i style={{ '--h': '52%' }}></i><i style={{ '--h': '64%' }}></i><i className="mm-hi" style={{ '--h': '92%' }}></i><i className="mm-hi" style={{ '--h': '80%' }}></i></div>
            <div className="mm-bars__x"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
