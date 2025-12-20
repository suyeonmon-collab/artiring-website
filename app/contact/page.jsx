'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formType, setFormType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formType,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '전송에 실패했습니다.');
      }
      
      // 성공 처리
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            문의하기
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            아티링에 대한 궁금한 점이나 파트너십 제안이 있으시다면 언제든 연락주세요.
            빠른 시일 내에 답변드리겠습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Form Type Tabs */}
            <div className="flex gap-4 mb-8 border-b border-[var(--color-border)]">
              <button
                onClick={() => setFormType('general')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  formType === 'general'
                    ? 'text-[var(--color-point)] border-[var(--color-point)]'
                    : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]'
                }`}
              >
                일반 문의
              </button>
              <button
                onClick={() => setFormType('partnership')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  formType === 'partnership'
                    ? 'text-[var(--color-point)] border-[var(--color-point)]'
                    : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]'
                }`}
              >
                파트너십 / MOU
              </button>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                <p className="font-medium">문의가 성공적으로 전송되었습니다.</p>
                <p className="mt-1 text-sm">빠른 시일 내에 답변드리겠습니다.</p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                <p className="font-medium">전송에 실패했습니다.</p>
                <p className="mt-1 text-sm">잠시 후 다시 시도해주세요.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    이름 <span className="text-[var(--color-error)]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    이메일 <span className="text-[var(--color-error)]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="hong@example.com"
                  />
                </div>
              </div>

              {formType === 'partnership' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      회사/기관명 <span className="text-[var(--color-error)]">*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      required={formType === 'partnership'}
                      className="input"
                      placeholder="주식회사 예시"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      연락처
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  제목 <span className="text-[var(--color-error)]">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder={formType === 'general' ? '문의 제목' : '제휴 제안 제목'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  내용 <span className="text-[var(--color-error)]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input textarea"
                  placeholder={
                    formType === 'general'
                      ? '문의 내용을 입력해주세요.'
                      : '제휴 제안 내용을 상세히 작성해주세요.\n\n- 제휴 목적\n- 협력 방안\n- 기대 효과'
                  }
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? '전송 중...' : '문의 전송'}
                </button>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  * 필수 입력 항목
                </p>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-medium mb-4">연락처</h3>
              <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="block font-medium text-[var(--color-text-primary)]">이메일</span>
                    <a href="mailto:contact@artiring.com" className="hover:text-[var(--color-point)]">
                      contact@artiring.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">소셜 미디어</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-point)] transition-colors"
                  aria-label="인스타그램"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-point)] transition-colors"
                  aria-label="유튜브"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="p-4 bg-[var(--color-bg-sub)] rounded-lg">
              <h3 className="font-medium mb-2">파트너십 안내</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                아티링은 다양한 형태의 파트너십을 환영합니다.
                MOU, 기술 협력, 공동 연구, 투자 등 
                어떤 형태든 열린 마음으로 논의하겠습니다.
              </p>
            </div>

            <div className="p-4 bg-[var(--color-bg-sub)] rounded-lg">
              <h3 className="font-medium mb-2">응답 시간</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                일반적으로 영업일 기준 1-2일 내에 답변드립니다.
                긴급한 문의는 이메일 제목에 [긴급]을 표시해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


