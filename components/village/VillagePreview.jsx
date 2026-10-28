// 안개에 덮인 마을 예시 (CSS 연출 · 실제 앱 화면이 아님)
export default function VillagePreview() {
  return (
    <div className="vl-fog mm-reveal" role="img" aria-label="안개 속에 집 몇 채가 보이는 뮤뮤월드 예시 그림">
      <span className="mm-example-tag">예시 · 개발 중인 디자인</span>
      <div className="vl-fog__houses" aria-hidden="true">
        <span className="vl-house vl-house--c">식당</span>
        <span className="vl-house vl-house--b">내 집</span>
        <span className="vl-house vl-house--c">공방</span>
      </div>
      <div className="vl-mist" aria-hidden="true"></div>
      <div className="vl-fog__cap"><b>뮤뮤월드</b><span>다녀온 만큼 안개가 걷혀요</span></div>
    </div>
  );
}
