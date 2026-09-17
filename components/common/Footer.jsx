import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  { name: '소개', href: '/about' },
  { name: '뮤모 앱', href: '/#app' },
];

const CONTACT_EMAIL = 'sy@artiring.com';

const socialLinks = [
  {
    name: '블로그',
    href: 'https://blog.naver.com/artiring',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: '인스타그램',
    href: 'https://www.instagram.com/arti_ring',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-gray-100)] border-t border-[var(--color-gray-300)]">
      <div className="max-w-content mx-auto px-5 md:px-20 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-sm">
            <Link href="/" className="inline-block hover:opacity-70 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="ARTIRING"
                width={150}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-[var(--color-gray-700)] leading-relaxed">
              아티링이 만든 뮤모
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h4 className="text-sm font-medium mb-4 text-[var(--color-gray-900)]">페이지</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 text-[var(--color-gray-900)]">이메일</h4>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] transition-colors"
              >
                제휴·문의 {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 text-[var(--color-gray-900)]">채널</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[var(--color-gray-700)] hover:text-[var(--color-blue)] transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-gray-300)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-[var(--color-gray-500)]">
              © {currentYear} ARTIRING. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="text-xs text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[var(--color-gray-500)] hover:text-[var(--color-gray-900)] transition-colors"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
