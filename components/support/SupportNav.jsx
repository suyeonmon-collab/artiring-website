import Link from 'next/link';

const tabs = [
  { name: '고객센터', href: '/support' },
  { name: '공지·고지', href: '/support/notices' },
  { name: '작가 FAQ', href: '/support/faq' },
  { name: '협업 정책', href: '/support/creator-policy' },
];

export default function SupportNav({ current }) {
  return (
    <nav className="mm-tabs" aria-label="고객센터 메뉴">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} aria-current={current === tab.href ? 'page' : undefined}>
          {tab.name}
        </Link>
      ))}
    </nav>
  );
}
