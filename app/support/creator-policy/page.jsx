import Link from 'next/link';
import SupportNav from '@/components/support/SupportNav';
import {
  creatorPolicyMeta,
  creatorPolicySections,
  creatorPolicyPending,
} from '@/lib/support/creatorPolicy';

export const metadata = {
  title: '작가 협업 정책 - 고객센터 | 아티링',
  description: creatorPolicyMeta.summary,
};

function BulletList({ items }) {
  return (
    <ul className="space-y-2 text-[15px] text-[var(--color-gray-700)] leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-[var(--color-primary)] mt-1.5 flex-shrink-0" aria-hidden>
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PolicyTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-gray-300)]">
      <table className="w-full text-left text-sm md:text-[15px]">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--color-gray-100)]/50'}
            >
              <th
                scope="row"
                className="align-top w-[32%] min-w-[6.5rem] px-3 md:px-4 py-3 font-semibold text-[var(--color-gray-900)] border-r border-[var(--color-gray-300)]"
              >
                {row.label}
              </th>
              <td className="px-3 md:px-4 py-3 text-[var(--color-gray-700)] leading-relaxed">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CreatorPolicyPage() {
  return (
    <div className="section">
      <div className="container-narrow">
        <header className="mb-8">
          <h1 className="font-accent text-3xl md:text-4xl tracking-tight text-[var(--color-gray-900)]">
            {creatorPolicyMeta.title}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-gray-500)]">
            최종 업데이트: {creatorPolicyMeta.updatedAt.replace(/-/g, '.')}
          </p>
          <p className="mt-3 text-[15px] md:text-base text-[var(--color-gray-700)] leading-relaxed">
            {creatorPolicyMeta.summary}
          </p>
        </header>

        <SupportNav current="/support/creator-policy" />

        <div className="space-y-12">
          {creatorPolicySections.map((section) => (
            <section key={section.id}>
              <h2 className="font-accent text-xl md:text-2xl text-[var(--color-gray-900)] mb-4">
                {section.title}
              </h2>

              {section.intro && (
                <div className="mb-4">
                  <BulletList items={section.intro} />
                </div>
              )}

              {section.steps && (
                <ol className="mb-4 space-y-2 list-decimal list-inside text-[15px] text-[var(--color-gray-700)] leading-relaxed">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}

              {section.items && (
                <div className="mb-4">
                  <BulletList items={section.items} />
                </div>
              )}

              {section.table && (
                <div className="mb-4">
                  <PolicyTable rows={section.table} />
                </div>
              )}

              {section.subsections?.map((sub) => (
                <div key={sub.title} className="mt-6">
                  <h3 className="text-base font-semibold text-[var(--color-gray-900)] mb-3">
                    {sub.title}
                  </h3>
                  <BulletList items={sub.items} />
                </div>
              ))}
            </section>
          ))}

          <section className="rounded-xl border border-[var(--color-gray-300)] bg-[var(--color-gray-100)]/60 p-5 md:p-6">
            <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-2">
              아직 확정 중인 항목
            </h2>
            <p className="text-sm text-[var(--color-gray-700)] mb-3 leading-relaxed">
              아래 항목은 확정되는 대로 공지·FAQ에 반영합니다.
            </p>
            <BulletList items={creatorPolicyPending} />
          </section>

          <p className="text-sm text-[var(--color-gray-700)]">
            관련 FAQ는{' '}
            <Link
              href="/support/faq"
              className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
            >
              작가용 FAQ
            </Link>
            에서 확인할 수 있습니다. 문의:{' '}
            <a
              href="mailto:sy@artiring.com"
              className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
            >
              sy@artiring.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
