'use client';

import { useState } from 'react';

export default function FaqAccordion({ categories }) {
  const [openId, setOpenId] = useState(categories[0]?.items[0]?.id ?? null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <section key={category.id}>
          <h2 className="font-accent text-xl md:text-2xl mb-4 text-[var(--color-gray-900)]">
            {category.title}
          </h2>
          <div className="space-y-2">
            {category.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-[var(--color-gray-300)] bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start justify-between gap-4 px-4 md:px-5 py-4 text-left hover:bg-[var(--color-gray-100)]/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex flex-col gap-1.5 min-w-0">
                      <span className="text-[15px] md:text-base font-semibold text-[var(--color-gray-900)] leading-snug">
                        {item.question}
                      </span>
                      {item.pending && (
                        <span className="inline-flex self-start text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--color-secondary-yellow-light)] text-[var(--color-gray-900)]">
                          세부 내용 추후 안내
                        </span>
                      )}
                    </span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-gray-500)] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 md:px-5 pb-4 pt-0 border-t border-[var(--color-gray-300)]/70">
                      <ul className="pt-3 space-y-1.5 text-sm md:text-[15px] text-[var(--color-gray-700)] leading-relaxed">
                        {item.answer.map((line, idx) => (
                          <li key={`${item.id}-${idx}`} className="flex gap-2">
                            <span className="text-[var(--color-primary)] mt-1.5 flex-shrink-0" aria-hidden>
                              ·
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
