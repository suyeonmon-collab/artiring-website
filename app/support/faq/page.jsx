import Link from 'next/link';
import SupportNav from '@/components/support/SupportNav';
import FaqAccordion from '@/components/support/FaqAccordion';
import { faqCategories } from '@/lib/support/faq';

export const metadata = {
  title: '작가용 FAQ - 고객센터 | 아티링',
  description:
    '여모냥·뮤모 작가 협업 FAQ. 신청, 저작권, 수익, 카드·스팟, 정지 절차를 안내합니다.',
};

export default function SupportFaqPage() {
  return (
    <div className="section">
      <div className="container-narrow">
        <header className="mb-8">
          <h1 className="font-accent text-3xl md:text-4xl tracking-tight text-[var(--color-gray-900)]">
            작가용 FAQ
          </h1>
          <p className="mt-3 text-[15px] md:text-base text-[var(--color-gray-700)] leading-relaxed">
            작가 협업을 고민 중이신 분을 위한 자주 묻는 질문입니다.
            &lsquo;세부 내용 추후 안내&rsquo; 표시가 있는 항목은 확정되는 대로 업데이트합니다.
          </p>
        </header>

        <SupportNav current="/support/faq" />

        <div className="mb-6 rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-secondary-yellow-light)]/50 px-4 py-3 text-sm text-[var(--color-gray-700)] leading-relaxed">
          핵심만 먼저 보려면 위쪽 &lsquo;핵심 안내&rsquo;(원고료·저작권·카드 수집·스팟 기능·신청 흐름)를
          확인하세요. 전체 정책은{' '}
          <Link
            href="/support/creator-policy"
            className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
          >
            작가 협업 정책
          </Link>
          에서 볼 수 있습니다.
        </div>

        <FaqAccordion categories={faqCategories} />
      </div>
    </div>
  );
}
