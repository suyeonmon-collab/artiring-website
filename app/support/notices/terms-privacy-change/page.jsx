import Link from 'next/link';
import SupportNav from '@/components/support/SupportNav';

export const metadata = {
  title: '이용약관·개인정보처리방침 변경 사전공지 - 고객센터 | 아티링',
  description:
    'Meowmo(뮤모) 이용약관·개인정보처리방침이 2026년 10월 23일부터 변경·시행됩니다. 30일 전 사전고지입니다.',
};

const NOTICE_DATE = '2026년 9월 23일';
const EFFECTIVE_DATE = '2026년 10월 23일';

export default function TermsPrivacyChangeNoticePage() {
  return (
    <div className="section">
      <div className="container-narrow">
        <header className="mb-8">
          <Link
            href="/support/notices"
            className="inline-flex items-center text-sm text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            공지·고지로 돌아가기
          </Link>
          <p className="text-sm text-[var(--color-gray-500)] mb-2">공지일: {NOTICE_DATE}</p>
          <h1 className="font-accent text-3xl md:text-4xl tracking-tight text-[var(--color-gray-900)]">
            [사전공지] 이용약관·개인정보처리방침 변경 안내
          </h1>
          <p className="mt-3 text-[15px] text-[var(--color-gray-700)] leading-relaxed">
            이용자에게 불리할 수 있는 변경이 포함되어, 약관 제3조에 따라 시행일 30일 전부터
            고지합니다.
          </p>
        </header>

        <SupportNav current="/support/notices" />

        <div className="space-y-8 text-[15px] text-[var(--color-gray-700)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              1. 시행일
            </h2>
            <p>
              변경된 이용약관 및 개인정보처리방침은{' '}
              <strong className="text-[var(--color-gray-900)]">{EFFECTIVE_DATE}</strong>부터
              적용·시행됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              2. 주요 변경 내용
            </h2>
            <ul className="space-y-2">
              {[
                '안전수칙·스팟 신고(이용약관 제11조)',
                '확률형 카드 공개(이용약관 제12조)',
                '서비스 장애 시 보상 원칙(이용약관 제13조)',
                '오프라인 안전사고 관련 면책 안내',
                '위치정보 수집·이용·보관 및 동의 철회(개인정보처리방침 제7조)',
                '카카오 연동·GPS·이용기록 등 수집·보유·파기·처리 위탁 안내 정비',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[var(--color-primary)] mt-1.5 flex-shrink-0" aria-hidden>
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              3. 전문 확인
            </h2>
            <p className="mb-3">변경 전문은 아래 페이지와 앱 내 약관·방침에서 동일하게 확인할 수 있습니다.</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
                >
                  이용약관 전문 보기
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
                >
                  개인정보처리방침 전문 보기
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              4. 동의하지 않는 경우
            </h2>
            <p>
              변경 내용에 동의하지 않으시면 시행일 전까지 서비스 이용을 중단하고 회원 탈퇴하실 수
              있습니다. 시행일 이후에도 서비스를 계속 이용하시면 변경된 약관·방침에 동의한 것으로
              봅니다.
            </p>
          </section>

          <section className="pt-4 border-t border-[var(--color-gray-300)]">
            <p>
              문의:{' '}
              <a
                href="mailto:sy@artiring.com"
                className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
              >
                sy@artiring.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
