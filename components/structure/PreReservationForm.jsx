'use client';

import { useCallback, useEffect, useState } from 'react';

const PHONE_REGEX = /^01[0-9]{8,9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INSTAGRAM_URL = 'https://www.instagram.com/arti_ring';

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

export default function PreReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    agreedPrivacy: false,
  });
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

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
      setEmailError('');
      return true;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError('올바른 이메일 형식이 아니에요.');
      return false;
    }
    setEmailError('');
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

    if (!phoneValid || !emailValid) return;
    if (!formData.agreedPrivacy) {
      showToast('개인정보 수집에 동의해주세요.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/preregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ''),
          email: formData.email.trim() || undefined,
          agreedPrivacy: formData.agreedPrivacy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '신청에 실패했어요.');
      }

      setTotalCount(data.count ?? 0);
      setIsComplete(true);
      showToast('신청 완료! 소식 있으면 바로 알려드릴게요 🐱', 'success');
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
            신청 완료!
          </h2>
          <p className="mt-3 text-[var(--color-gray-700)] leading-relaxed">
            소식 있으면 바로 알려드릴게요.
          </p>
          {totalCount !== null && totalCount > 0 && (
            <p className="mt-4 font-accent text-lg font-bold text-[var(--color-primary)]">
              지금까지 {totalCount.toLocaleString()}명이 함께했어요
            </p>
          )}

          <div className="mt-8 p-5 rounded-xl bg-[var(--color-gray-100)] text-left">
            <p className="text-sm font-semibold text-[var(--color-gray-900)]">
              아티링소식도 함께 받아보세요
            </p>
            <p className="mt-2 text-sm text-[var(--color-gray-700)] leading-relaxed">
              개발 과정과 캐릭터 이야기를 인스타그램에서 가장 먼저 만날 수 있어요.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center w-full min-h-[48px] px-6 text-sm font-semibold text-white bg-[var(--color-primary)] rounded-xl transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              인스타그램 팔로우하기
            </a>
          </div>
        </div>
      </>
    );
  }

  const canSubmit =
    formData.name.trim() &&
    formData.phone.replace(/\D/g, '') &&
    formData.agreedPrivacy &&
    !phoneError &&
    !emailError &&
    !isSubmitting;

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            이름 <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            autoComplete="name"
            className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            연락처 <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={() => validatePhone(formData.phone)}
            required
            autoComplete="tel"
            inputMode="numeric"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
              phoneError ? 'border-[var(--color-primary)]' : 'border-[var(--color-gray-300)]'
            }`}
            placeholder="010-1234-5678"
          />
          {phoneError && (
            <p className="mt-2 text-sm text-[var(--color-primary)]">{phoneError}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2">
            이메일 <span className="text-[var(--color-gray-500)] font-normal">(선택)</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(formData.email)}
            autoComplete="email"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
              emailError ? 'border-[var(--color-primary)]' : 'border-[var(--color-gray-300)]'
            }`}
            placeholder="이메일을 입력해주세요"
          />
          {emailError && (
            <p className="mt-2 text-sm text-[var(--color-primary)]">{emailError}</p>
          )}
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
              수집 항목: 이름·연락처(선택 시 이메일) / 목적: 사전예약 출시 알림 발송 /
              보관기간: 출시 후 3개월 또는 회원 전환 시까지
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full btn-download disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:opacity-50"
        >
          {isSubmitting ? '신청 중...' : '사전예약 신청하기'}
        </button>
      </form>
    </>
  );
}
