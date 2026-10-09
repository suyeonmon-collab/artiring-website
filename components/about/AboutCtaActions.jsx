'use client';

import { useState } from 'react';
import Link from 'next/link';

const CONTACT_EMAIL = 'sy@artiring.com';

export default function AboutCtaActions() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInquiry = async () => {
    setOpen(true);
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mm-hero__cta" style={{ flexDirection: 'column', alignItems: 'center' }}>
      <div className="mm-hero__cta" style={{ marginTop: 0 }}>
        <Link href="/artist" className="mm-btn">
          작가로 참여하기
        </Link>
        <button type="button" onClick={handleInquiry} className="mm-btn">
          지자체·제휴 문의
        </button>
      </div>
      {open && (
        <p
          role="status"
          className="px-4 py-3 rounded-2xl bg-white text-sm text-[var(--color-gray-900)] leading-relaxed border-2 border-[var(--color-gray-900)]"
        >
          지자체·제휴 문의는{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('지자체·제휴 문의')}`}
            className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          으로 보내주세요.
          {copied ? ' 이메일을 복사해 두었어요.' : ''}
        </p>
      )}
    </div>
  );
}
