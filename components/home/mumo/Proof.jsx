export default function Proof() {
  return (
    <section className="mm-proof" aria-labelledby="pf-title">
      <div className="mm-wrap">
        <p className="mm-hand mm-reveal">올해 받은 응원</p>
        <p className="mm-proof__num" aria-hidden="true"><span className="mm-count" data-count="3">3</span></p>
        <h2 className="mm-proof__cap mm-reveal" id="pf-title">2026년 뮤모가 받은 선정과 수상 3건</h2>
        <ul className="mm-awards">
          <li className="mm-award mm-reveal"><span className="mm-award__ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/></svg></span><span className="mm-award__txt"><b>K-Art 청년창작자 지원사업 선정</b><small>충남문화관광재단 · 2026년 5월 발표</small></span></li>
          <li className="mm-award mm-reveal"><span className="mm-award__ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-6h6v6"/></svg></span><span className="mm-award__txt"><b>지역성장 예비창업지원사업 선정</b><small>한국기술교육대학교 앵커사업단 주관 · 충청남도 후원</small></span></li>
          <li className="mm-award mm-reveal"><span className="mm-award__ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 7.5 5-2.5 5 2.5-1.5-7.5"/></svg></span><span className="mm-award__txt"><b>제14회 충남 공공데이터·AI 활용 창업경진대회 우수상</b><small>아이디어 기획부문</small></span></li>
        </ul>
        <p className="mm-proof__src">선정 당시 이름은 여모냥이에요. 출처: 아티링 보도자료(2026).</p>
        <p className="mm-safety"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg>걸을 때는 화면 말고 길을 봐 주세요. 카드는 도착해서 받아도 늦지 않아요.</p>
      </div>
    </section>
  );
}
