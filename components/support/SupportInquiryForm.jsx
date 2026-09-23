'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DETAIL_OPTIONS,
  INQUIRY_TYPES,
  URGENT_DETAIL_TYPE,
} from '@/lib/support/inquiry';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SCREENSHOTS = 3;
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

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

const emptyForm = {
  name: '',
  email: '',
  title: '',
  body: '',
  detailType: '',
  screenName: '',
  artistOrCharacterName: '',
  organization: '',
  agreedPrivacy: false,
};

export default function SupportInquiryForm() {
  const [inquiryType, setInquiryType] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [screenshots, setScreenshots] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  const detailOptions = useMemo(
    () => (inquiryType ? DETAIL_OPTIONS[inquiryType] || [] : []),
    [inquiryType]
  );

  const inputClass = (hasError) =>
    `w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
      hasError ? 'border-[var(--color-primary)]' : 'border-[var(--color-gray-300)]'
    }`;

  const handleTypeChange = (type) => {
    setInquiryType(type);
    setFormData((prev) => ({
      ...prev,
      detailType: '',
      screenName: '',
      artistOrCharacterName: '',
      organization: '',
    }));
    setScreenshots([]);
    setErrors({});
  };

  const validate = () => {
    const next = {};

    if (!inquiryType) {
      next.inquiryType = '문의 유형을 선택해주세요.';
    }

    if (!formData.name.trim()) next.name = '이름을 입력해주세요.';

    const email = formData.email.trim();
    if (!email) next.email = '이메일을 입력해주세요.';
    else if (!EMAIL_REGEX.test(email)) next.email = '올바른 이메일 형식이 아니에요.';

    if (!formData.title.trim()) next.title = '문의 제목을 입력해주세요.';

    const body = formData.body.trim();
    if (!body) next.body = '문의 내용을 입력해주세요.';
    else if (body.length < 10) next.body = '문의 내용은 10자 이상 입력해주세요.';

    if (!formData.detailType) next.detailType = '문의 세부 유형을 선택해주세요.';

    if (!formData.agreedPrivacy) {
      next.agreedPrivacy = '개인정보 수집에 동의해주세요.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleScreenshotChange = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';

    if (!files.length) return;

    const next = [...screenshots];
    for (const file of files) {
      if (next.length >= MAX_SCREENSHOTS) {
        showToast('스크린샷은 최대 3장까지 첨부할 수 있어요.', 'error');
        break;
      }
      if (!ALLOWED_MIME.has(file.type)) {
        showToast('이미지만 첨부할 수 있어요. (jpg, png, webp, gif)', 'error');
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        showToast('스크린샷은 장당 2MB 이하로 첨부해주세요.', 'error');
        continue;
      }
      next.push(file);
    }
    setScreenshots(next);
  };

  const removeScreenshot = (index) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('필수 항목을 확인해 주세요.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const body = new FormData();
      body.append('type', inquiryType);
      body.append('detailType', formData.detailType);
      body.append('name', formData.name.trim());
      body.append('email', formData.email.trim());
      body.append('title', formData.title.trim());
      body.append('body', formData.body.trim());
      body.append('screenName', formData.screenName.trim());
      body.append('artistOrCharacterName', formData.artistOrCharacterName.trim());
      body.append('organization', formData.organization.trim());
      body.append('agreedPrivacy', 'true');

      if (inquiryType === 'user') {
        screenshots.forEach((file) => body.append('screenshots', file));
      }

      const response = await fetch('/api/support-inquiry', {
        method: 'POST',
        body,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '문의 접수에 실패했어요.');
      }

      setIsComplete(true);
      showToast('문의가 접수됐어요.', 'success');
    } catch (error) {
      showToast(error.message || '문의 접수에 실패했어요. 잠시 후 다시 시도해주세요.', 'error');
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
          <h3 className="font-accent text-xl font-bold text-[var(--color-gray-900)]">
            문의가 접수됐어요
          </h3>
          <p className="mt-3 text-[var(--color-gray-700)] leading-relaxed">
            [영업일 기준 며칠] 안에 답변드립니다.
          </p>
        </div>
      </>
    );
  }

  const canSubmit =
    inquiryType &&
    formData.name.trim() &&
    formData.email.trim() &&
    formData.title.trim() &&
    formData.body.trim().length >= 10 &&
    formData.detailType &&
    formData.agreedPrivacy &&
    !isSubmitting;

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <fieldset>
          <legend className="block text-sm font-semibold text-[var(--color-gray-900)] mb-3">
            문의 유형 <span className="text-[var(--color-primary)]">*</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INQUIRY_TYPES.map((item) => {
              const selected = inquiryType === item.value;
              return (
                <label
                  key={item.value}
                  className={`cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                    selected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                      : 'border-[var(--color-gray-300)] bg-white hover:border-[var(--color-primary)]/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="inquiryType"
                    value={item.value}
                    checked={selected}
                    onChange={() => handleTypeChange(item.value)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-semibold text-[var(--color-gray-900)]">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--color-gray-700)] leading-relaxed">
                    {item.description}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.inquiryType && (
            <p className="mt-2 text-sm text-[var(--color-primary)]">{errors.inquiryType}</p>
          )}
        </fieldset>

        {!inquiryType ? (
          <p className="text-sm text-[var(--color-gray-500)] leading-relaxed">
            문의 유형을 먼저 선택해 주세요. 유형에 맞는 항목이 이어서 나타나요.
          </p>
        ) : (
          <>
            <div>
              <label
                htmlFor="inquiry-detail"
                className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
              >
                문의 세부 유형 <span className="text-[var(--color-primary)]">*</span>
              </label>
              <select
                id="inquiry-detail"
                value={formData.detailType}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, detailType: e.target.value }))
                }
                className={inputClass(!!errors.detailType)}
              >
                <option value="">선택해주세요</option>
                {detailOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.detailType && (
                <p className="mt-2 text-sm text-[var(--color-primary)]">{errors.detailType}</p>
              )}
              {inquiryType === 'artist' && formData.detailType === URGENT_DETAIL_TYPE && (
                <p className="mt-3 text-sm text-[var(--color-gray-700)] leading-relaxed rounded-xl bg-[var(--color-gray-100)] px-4 py-3">
                  정지 통지를 받으신 경우, 통지일로부터 2주 안에 이 폼으로 소명 내용을 제출해
                  주세요.
                </p>
              )}
            </div>

            {inquiryType === 'user' && (
              <>
                <div>
                  <label
                    htmlFor="inquiry-screen"
                    className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
                  >
                    발생 화면{' '}
                    <span className="text-[var(--color-gray-500)] font-normal">(선택)</span>
                  </label>
                  <input
                    type="text"
                    id="inquiry-screen"
                    value={formData.screenName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, screenName: e.target.value }))
                    }
                    className={inputClass(false)}
                    placeholder="어느 화면에서 발생했는지 적어주세요"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-screenshots"
                    className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
                  >
                    스크린샷 첨부{' '}
                    <span className="text-[var(--color-gray-500)] font-normal">
                      (선택, 최대 3장)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="inquiry-screenshots"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    onChange={handleScreenshotChange}
                    className="block w-full text-sm text-[var(--color-gray-700)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary-light)] file:text-[var(--color-primary)] hover:file:opacity-90"
                  />
                  {screenshots.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {screenshots.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-3 text-sm text-[var(--color-gray-700)] bg-[var(--color-gray-100)] rounded-lg px-3 py-2"
                        >
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeScreenshot(index)}
                            className="flex-shrink-0 text-[var(--color-primary)] font-semibold hover:underline"
                          >
                            삭제
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}

            {inquiryType === 'artist' && (
              <div>
                <label
                  htmlFor="inquiry-artist-name"
                  className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
                >
                  등록된 작가명 또는 캐릭터명{' '}
                  <span className="text-[var(--color-gray-500)] font-normal">(선택)</span>
                </label>
                <input
                  type="text"
                  id="inquiry-artist-name"
                  value={formData.artistOrCharacterName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      artistOrCharacterName: e.target.value,
                    }))
                  }
                  className={inputClass(false)}
                  placeholder="작가명 또는 캐릭터명"
                />
              </div>
            )}

            {inquiryType === 'non_user' && (
              <div>
                <label
                  htmlFor="inquiry-org"
                  className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
                >
                  소속·기관명{' '}
                  <span className="text-[var(--color-gray-500)] font-normal">(선택)</span>
                </label>
                <input
                  type="text"
                  id="inquiry-org"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, organization: e.target.value }))
                  }
                  className={inputClass(false)}
                  placeholder="소속 또는 기관명"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
              >
                이름 <span className="text-[var(--color-primary)]">*</span>
              </label>
              <input
                type="text"
                id="inquiry-name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                autoComplete="name"
                className={inputClass(!!errors.name)}
                placeholder="이름을 입력해주세요"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-[var(--color-primary)]">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
              >
                이메일 <span className="text-[var(--color-primary)]">*</span>
              </label>
              <input
                type="email"
                id="inquiry-email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                autoComplete="email"
                className={inputClass(!!errors.email)}
                placeholder="답변 받을 이메일"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-[var(--color-primary)]">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="inquiry-title"
                className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
              >
                문의 제목 <span className="text-[var(--color-primary)]">*</span>
              </label>
              <input
                type="text"
                id="inquiry-title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className={inputClass(!!errors.title)}
                placeholder="문의 제목을 입력해주세요"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-[var(--color-primary)]">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="inquiry-body"
                className="block text-sm font-semibold text-[var(--color-gray-900)] mb-2"
              >
                문의 내용 <span className="text-[var(--color-primary)]">*</span>
              </label>
              <textarea
                id="inquiry-body"
                value={formData.body}
                onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                rows={5}
                className={`${inputClass(!!errors.body)} resize-y min-h-[140px]`}
                placeholder="문의하실 내용을 자세히 적어주세요 (최소 10자)"
              />
              {errors.body && (
                <p className="mt-2 text-sm text-[var(--color-primary)]">{errors.body}</p>
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
                  수집 항목: 이름·이메일·문의 내용 / 목적: 문의 답변 / 보관기간: 답변 완료 후
                  한 달
                </span>
              </label>
              {errors.agreedPrivacy && (
                <p className="mt-2 text-sm text-[var(--color-primary)]">{errors.agreedPrivacy}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full btn-download disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:opacity-50"
            >
              {isSubmitting ? '보내는 중...' : '문의 보내기'}
            </button>
          </>
        )}
      </form>
    </>
  );
}
