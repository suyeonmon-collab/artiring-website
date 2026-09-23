'use client';

import { useCallback, useEffect, useState } from 'react';

const PHONE_REGEX = /^01[0-9]{8,9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/i;

function formatPhoneDisplay(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const duration = type === 'error' ? 2500 : 2000;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, type]);

  return (
    <div
      role="alert"
      className={type === 'error' ? 'toast toast-error' : 'toast toast-success'}
    >
      {message}
    </div>
  );
}

export default function ArtistApplyForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    portfolioUrl: '',
    characterIntro: '',
    agreedPrivacy: false,
  });
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [portfolioError, setPortfolioError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  const validatePhone = (displayPhone) => {
    const digits = displayPhone.replace(/\D/g, '');
    if (!digits) {
      setPhoneError('');
      return false;
    }
    if (!PHONE_REGEX.test(digits)) {
      setPhoneError('010으로 시작하는 10~11자리 번호를 입력해주세요.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setEmailError('이메일을 입력해주세요.');
      return false;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError('올바른 이메일 형식이 아니에요.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePortfolio = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setPortfolioError('포트폴리오 링크를 입력해주세요.');
      return false;
    }
    if (!URL_REGEX.test(trimmed)) {
      setPortfolioError('http:// 또는 https://로 시작하는 주소를 입력해주세요.');
      return false;
    }
    setPortfolioError('');
    return true;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneDisplay(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (phoneError) validatePhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneValid = validatePhone(formData.phone);
    const emailValid = validateEmail(formData.email);
    const portfolioValid = validatePortfolio(formData.portfolioUrl);

    if (!phoneValid || !emailValid || !portfolioValid) return;

    if (!formData.characterIntro.trim()) {
      showToast('캐릭터 소개를 입력해주세요.', 'error');
      return;
    }

    if (!formData.agreedPrivacy) {
      showToast('개인정보 수집에 동의해주세요.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/artist-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ''),
          email: formData.email.trim(),
          portfolioUrl: formData.portfolioUrl.trim(),
          characterIntro: formData.characterIntro.trim(),
          agreedPrivacy: formData.agreedPrivacy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '신청에 실패했어요.');
      }

      setIsComplete(true);
      showToast('신청이 접수됐어요.', 'success');
    } catch (error) {
      showToast(error.message || '신청에 실패했어요. 잠시 후 다시 시도해주세요.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        <div className="card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-secondary-blue-light)] flex items-center justify-center text-3xl">
            🐱
          </div>
          <h2 className="font-accent text-xl font-bold text-[var(--color-gray-900)]">
            신청이 접수됐어요
          </h2>
          <p className="mt-3 text-[var(--color-gray-700)] leading-relaxed">
            선정 결과는 [마감일] 이후 개별 연락드립니다.
          </p>
        </div>
      </>
    );
  }

  const canSubmit =
    formData.name.trim() &&
    formData.phone.replace(/\D/g, '') &&
    formData.email.trim() &&
    formData.portfolioUrl.trim() &&
    formData.characterIntro.trim() &&
    formData.agreedPrivacy &&
    !phoneError &&
    !emailError &&
    !portfolioError &&
    !isSubmitting;

  const inputClass = (hasError) =>
    `w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
      hasError ? 'border-[var(--color-primary)]' : 'border-[var(--color-gray-300)]'
    }`;

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="artist-name" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            이름 <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            type="text"
            id="artist-name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            autoComplete="name"
            className={inputClass(false)}
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="artist-phone" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            연락처 <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            type="tel"
            id="artist-phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={() => validatePhone(formData.phone)}
            required
            autoComplete="tel"
            inputMode="numeric"
            className={inputClass(!!phoneError)}
            placeholder="010-1234-5678"
          />
          {phoneError && (
            <p className="mt-2 text-sm text-[var(--color-primary)]">{phoneError}</p>
          )}
        </div>

        <div>
          <label htmlFor="artist-email" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            이메일 <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            type="email"
            id="artist-email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(formData.email)}
            required
            autoComplete="email"
            className={inputClass(!!emailError)}
            placeholder="이메일을 입력해주세요"
          />
          {emailError && (
            <p className="mt-2 text-sm text-[var(--color-primary)]">{emailError}</p>
          )}
        </div>

        <div>
          <label htmlFor="artist-portfolio" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            포트폴리오 링크 <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            type="url"
            id="artist-portfolio"
            value={formData.portfolioUrl}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, portfolioUrl: e.target.value }));
              if (portfolioError) validatePortfolio(e.target.value);
            }}
            onBlur={() => validatePortfolio(formData.portfolioUrl)}
            required
            className={inputClass(!!portfolioError)}
            placeholder="https://instagram.com/... 또는 블로그·드라이브 링크"
          />
          {portfolioError && (
            <p className="mt-2 text-sm text-[var(--color-primary)]">{portfolioError}</p>
          )}
        </div>

        <div>
          <label htmlFor="artist-intro" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            캐릭터 소개 <span className="text-[var(--color-primary)]">*</span>
          </label>
          <textarea
            id="artist-intro"
            value={formData.characterIntro}
            onChange={(e) => setFormData((prev) => ({ ...prev, characterIntro: e.target.value }))}
            required
            rows={4}
            className={`${inputClass(false)} resize-y min-h-[120px]`}
            placeholder="등록하고 싶은 캐릭터를 간단히 소개해주세요"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreedPrivacy}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, agreedPrivacy: e.target.checked }))
              }
              className="mt-1 w-4 h-4 accent-[var(--color-primary)] flex-shrink-0"
            />
            <span className="text-sm text-[var(--color-gray-700)] leading-relaxed">
              <span className="font-semibold text-[var(--color-gray-900)]">
                개인정보 수집·이용에 동의합니다
              </span>
              <span className="text-[var(--color-primary)]"> (필수)</span>
              <br />
              수집 항목: 이름·연락처·이메일·포트폴리오 링크 / 목적: 작가 선정 검토 /
              보관기간: 선정 검토 완료 후 한 달 또는 회원 전환 시까지
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full btn-download disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:opacity-50"
        >
          {isSubmitting ? '신청 중...' : '작가로 신청하기'}
        </button>
      </form>
    </>
  );
}
