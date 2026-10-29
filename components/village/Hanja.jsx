// 디스플레이 폰트에 없는 한자는 시스템 한자 글꼴로 보여 준다.
export default function Hanja({ children }) {
  return String(children)
    .split(/([一-鿿])/)
    .map((part, i) => (/[一-鿿]/.test(part)
      ? <span key={i} className="vs-hanja" lang="zh-Hant">{part}</span>
      : part));
}
