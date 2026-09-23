import Link from 'next/link';

const tabs = [
  { name: '고객센터', href: '/support' },
  { name: '공지·고지', href: '/support/notices' },
  { name: '작가 FAQ', href: '/support/faq' },
  { name: '협업 정책', href: '/support/creator-policy' },
];

export default function SupportNav({ current }) {
  return (
    <nav
      className="flex flex-wrap gap-2 mb-10"
      aria-label="고객센터 메뉴"
    >
      {tabs.map((tab) => {
        const active = current === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`inline-flex items-center px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              active
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-gray-100)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-300)]/40 hover:text-[var(--color-gray-900)]'
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
