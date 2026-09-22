import SupportNav from '@/components/support/SupportNav';
import NoticeList from '@/components/support/NoticeList';
import { getPublishedNotices, getDraftNotices } from '@/lib/support/notices';

export const metadata = {
  title: '공지·고지 - 고객센터 | 아티링',
  description:
    '뮤모·아티링 공지사항, 확률·환불·보상 정책, 약관·고지 문서를 확인하세요.',
};

export default function SupportNoticesPage() {
  const published = getPublishedNotices();
  const drafts = getDraftNotices();

  return (
    <div className="section">
      <div className="container-narrow">
        <header className="mb-8">
          <h1 className="font-accent text-3xl md:text-4xl tracking-tight text-[var(--color-gray-900)]">
            공지·고지
          </h1>
          <p className="mt-3 text-[15px] md:text-base text-[var(--color-gray-700)] leading-relaxed">
            서비스 운영 기준과 법무 고지를 사전 게시합니다. 확정되지 않은 문서는
            &lsquo;준비 중&rsquo;으로 표시됩니다.
          </p>
        </header>

        <SupportNav current="/support/notices" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-4">
            게시된 문서
          </h2>
          <NoticeList items={published} />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-2">
            준비 중
          </h2>
          <p className="text-sm text-[var(--color-gray-700)] mb-4 leading-relaxed">
            위치정보 고지, 확률형 아이템, 미성년자 환불, 장애 보상, 신고 보상 등은
            문서 확정 후 업로드합니다.
          </p>
          <NoticeList items={drafts} />
        </section>
      </div>
    </div>
  );
}
