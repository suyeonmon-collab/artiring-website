import Link from 'next/link';
import SupportNav from '@/components/support/SupportNav';
import NoticeList from '@/components/support/NoticeList';
import { getPublishedNotices, getDraftNotices } from '@/lib/support/notices';

export const metadata = {
  title: '고객센터 - 아티링',
  description:
    '뮤모·아티링 공지사항, 작가 FAQ, 협업 정책, 약관·고지 문서를 확인하세요.',
};

const CONTACT_EMAIL = 'sy@artiring.com';

const quickLinks = [
  {
    title: '공지·고지',
    desc: '사전 고지, 보상 기준, 확률·환불 정책 등',
    href: '/support/notices',
  },
  {
    title: '작가 FAQ',
    desc: '신청·저작권·수익·카드·스팟·정지 절차',
    href: '/support/faq',
  },
  {
    title: '협업 정책',
    desc: '작가 협업의 기본 원칙과 운영 규칙',
    href: '/support/creator-policy',
  },
];

export default function SupportPage() {
  const published = getPublishedNotices().slice(0, 4);
  const upcoming = getDraftNotices();

  return (
    <div className="section">
      <div className="container-narrow">
        <header className="mb-8">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">
            Support
          </p>
          <h1 className="font-accent text-3xl md:text-4xl tracking-tight text-[var(--color-gray-900)]">
            고객센터
          </h1>
          <p className="mt-3 text-[15px] md:text-base text-[var(--color-gray-700)] leading-relaxed">
            작가 협업 정책·FAQ와 Meowmo 이용약관·개인정보처리방침(위치정보 포함)을 확인할 수
            있습니다. 확률표·보상 기준표 등 아직 준비 중인 항목도 목록에 올려 두었습니다.
          </p>
        </header>

        <SupportNav current="/support" />

        <section className="mb-12">
          <div className="grid gap-3 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[var(--color-gray-300)] bg-white p-5 hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all"
              >
                <h2 className="text-base font-semibold text-[var(--color-gray-900)]">
                  {link.title}
                </h2>
                <p className="mt-1.5 text-sm text-[var(--color-gray-700)] leading-relaxed">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-end justify-between gap-4 mb-4">
            <h2 className="font-accent text-xl md:text-2xl text-[var(--color-gray-900)]">
              최근 게시
            </h2>
            <Link
              href="/support/notices"
              className="text-sm font-semibold text-[var(--color-secondary-blue)] hover:underline"
            >
              전체 보기
            </Link>
          </div>
          <NoticeList items={published} />
        </section>

        <section className="mb-12">
          <h2 className="font-accent text-xl md:text-2xl text-[var(--color-gray-900)] mb-2">
            준비 중인 고지
          </h2>
          <p className="text-sm text-[var(--color-gray-700)] mb-4 leading-relaxed">
            법무·운영 문서 작업으로 충족되는 항목입니다. 내용이 확정되면 이곳에 게시합니다.
            확률 고지·안전 경고는 홈페이지와 앱 내부 표시가 함께 필요합니다.
          </p>
          <NoticeList items={upcoming} />
        </section>

        <section className="rounded-xl bg-[var(--color-gray-100)] p-6 md:p-8">
          <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-2">
            문의
          </h2>
          <p className="text-sm text-[var(--color-gray-700)] leading-relaxed mb-3">
            공지에 없는 내용은 이메일로 문의해 주세요.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm font-semibold text-[var(--color-secondary-blue)] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </section>
      </div>
    </div>
  );
}
