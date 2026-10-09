import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  { name: '소개', href: '/about' },
  { name: '뮤모 앱', href: '/#app' },
  { name: '작가로 참여', href: '/artist' },
  { name: '사전등록', href: '/structure#preregister' },
  { name: '고객센터', href: '/support' },
];

const CONTACT_EMAIL = 'sy@artiring.com';

const socialLinks = [
  { name: '아티링소식', href: 'https://www.instagram.com/arti_ring' },
  { name: '블로그', href: 'https://blog.naver.com/artiring' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mm-foot-outer">
      <footer className="mm-foot">
        <div className="mm-wrap">
          <p className="mm-foot__statement">여행할수록 채워지는 도감, 뮤모.</p>

          <div className="mm-foot__grid">
            <div className="mm-foot__brand">
              <Link href="/" aria-label="아티링 홈으로">
                <Image src="/images/logo.png" alt="아티링 ARTIRING" width={150} height={45} />
              </Link>
              <p>뮤모는 아티링이 만들어요. 충남 아산.</p>
              <nav className="mm-foot__links" aria-label="푸터 메뉴">
                {footerLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mm-foot__cols">
              <div className="mm-foot__col">
                <h3>제휴·문의</h3>
                <a className="mm-foot__mail" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="mm-foot__col">
                <h3>소식</h3>
                <p>캐릭터 소식과 뮤모가 만들어지는 과정을 올려요.</p>
                <div className="mm-foot__links mm-foot__social">
                  {socialLinks.map((link) => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mm-foot__copy">
            <span>© {currentYear} 아티링 ARTIRING</span>
            <span className="mm-foot__legal">
              <Link href="/privacy">개인정보처리방침</Link>
              <Link href="/terms">이용약관</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
