/** 고객센터 문의 유형·세부 유형 상수 */

export const INQUIRY_TYPES = [
  {
    value: 'user',
    label: '유저용',
    description: '앱을 쓰는 이용자',
  },
  {
    value: 'artist',
    label: '작가용',
    description: '작가로 등록·활동 중이거나 지원 중인 분',
  },
  {
    value: 'non_user',
    label: '비유저용',
    description: '제휴·취재·기타 일반 문의',
  },
];

export const DETAIL_OPTIONS = {
  user: [
    { value: 'app_error', label: '앱 이용 오류' },
    { value: 'card_collect', label: '카드·수집 문제' },
    { value: 'reservation_coupon', label: '구매예약·쿠폰 문의' },
    { value: 'account_privacy', label: '계정·개인정보' },
    { value: 'other', label: '기타' },
  ],
  artist: [
    { value: 'apply_select', label: '신청·선정 문의' },
    { value: 'card_spot', label: '카드·스팟 등록 문의' },
    { value: 'copyright', label: '저작권 관련' },
    { value: 'reservation_coupon_event', label: '구매예약·쿠폰·이벤트 운영' },
    { value: 'suspension_appeal', label: '정지·소명 관련' },
    { value: 'other', label: '기타' },
  ],
  non_user: [
    { value: 'partnership', label: '제휴 문의' },
    { value: 'press', label: '취재·인터뷰 요청' },
    { value: 'investment', label: '투자 문의' },
    { value: 'other', label: '기타' },
  ],
};

export const URGENT_DETAIL_TYPE = 'suspension_appeal';

export function isUrgentInquiry(type, detailType) {
  return type === 'artist' && detailType === URGENT_DETAIL_TYPE;
}

export function isValidDetailType(type, detailType) {
  return (DETAIL_OPTIONS[type] || []).some((item) => item.value === detailType);
}
