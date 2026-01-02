'use client';

import { useState } from 'react';

export default function PreReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '클라이언트'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/pre-reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '신청에 실패했습니다.');
      }

      // 성공 시 폼 초기화 및 모달 표시
      setFormData({ name: '', phone: '', type: '클라이언트' });
      setShowModal(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4">
          {/* 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-point)]"
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* 핸드폰번호 */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              핸드폰번호
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-point)]"
              placeholder="010-1234-5678"
            />
          </div>

          {/* 유형 */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-2">
              유형
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-point)]"
            >
              <option value="클라이언트">클라이언트</option>
              <option value="소속사">소속사</option>
              <option value="프리랜서">프리랜서</option>
            </select>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn btn-primary"
          >
            {isSubmitting ? '신청 중...' : '신청하기'}
          </button>
        </div>
      </form>

      {/* 신청완료 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">신청완료</h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                사전예약이 완료되었습니다.
                <br />
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-primary w-full"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

