import Link from 'next/link';
import { NOTICE_CATEGORIES } from '@/lib/support/notices';

function formatDate(date) {
  if (!date) return null;
  const [y, m, d] = date.split('-');
  return `${y}.${m}.${d}`;
}

export default function NoticeList({ items, emptyLabel = '등록된 문서가 없습니다.' }) {
  if (!items.length) {
    return (
      <p className="text-sm text-[var(--color-gray-500)] py-8 text-center">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[var(--color-gray-300)] border border-[var(--color-gray-300)] rounded-xl overflow-hidden bg-white">
      {items.map((item) => {
        const isDraft = item.status === 'draft';
        const content = (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  item.category === 'legal'
                    ? 'bg-[var(--color-secondary-blue-light)] text-[var(--color-secondary-blue)]'
                    : item.category === 'policy'
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                      : 'bg-[var(--color-secondary-yellow-light)] text-[var(--color-gray-900)]'
                }`}
              >
                {NOTICE_CATEGORIES[item.category]}
              </span>
              {isDraft ? (
                <span className="text-xs font-semibold text-[var(--color-gray-500)]">
                  준비 중
                </span>
              ) : (
                item.date && (
                  <time
                    dateTime={item.date}
                    className="text-xs text-[var(--color-gray-500)]"
                  >
                    {formatDate(item.date)}
                  </time>
                )
              )}
            </div>
            <h3
              className={`text-base font-semibold leading-snug ${
                isDraft
                  ? 'text-[var(--color-gray-500)]'
                  : 'text-[var(--color-gray-900)]'
              }`}
            >
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-gray-700)] leading-relaxed">
              {item.summary}
            </p>
            {item.note && (
              <p className="mt-2 text-xs text-[var(--color-gray-500)] leading-relaxed">
                {item.note}
              </p>
            )}
          </>
        );

        return (
          <li key={item.slug}>
            {isDraft || !item.href ? (
              <div className="block px-4 md:px-5 py-4 bg-[var(--color-gray-100)]/40">
                {content}
              </div>
            ) : (
              <Link
                href={item.href}
                className="block px-4 md:px-5 py-4 hover:bg-[var(--color-gray-100)]/70 transition-colors group"
              >
                {content}
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-[var(--color-secondary-blue)] group-hover:underline">
                  자세히 보기
                  <svg
                    className="w-4 h-4 ml-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
