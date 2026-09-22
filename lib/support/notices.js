/**
 * 고객센터 공지·고지 문서
 * status: 'published' | 'draft'
 * category: 'notice' | 'policy' | 'legal'
 */

export const NOTICE_CATEGORIES = {
  notice: '공지',
  policy: '정책',
  legal: '약관·고지',
};

export const notices = [
  {
    slug: 'terms',
    title: '이용약관 (Meowmo)',
    summary:
      '안전수칙·스팟 신고(제11조), 확률형 카드 공개(제12조), 장애 시 보상(제13조), 오프라인 안전사고 면책을 포함합니다.',
    category: 'legal',
    status: 'published',
    date: '2026-09-22',
    href: '/terms',
    highlight: true,
    note: '시행일 2026.10.22 · 앱 내 약관과 동일',
  },
  {
    slug: 'privacy',
    title: '개인정보처리방침 (Meowmo)',
    summary:
      '카카오 연동·GPS·이용기록 수집, 보유·파기, 처리 위탁, 위치정보 보호(제7조)를 안내합니다.',
    category: 'legal',
    status: 'published',
    date: '2026-09-22',
    href: '/privacy',
    highlight: true,
    note: '시행일 2026.10.22 · 앱 내 방침과 동일',
  },
  {
    slug: 'location-notice',
    title: '위치정보 수집·이용 고지',
    summary:
      'GPS 수집 목적·범위, 보관기간, 동의 철회, 이용·제공사실 확인자료 6개월 보관을 안내합니다.',
    category: 'legal',
    status: 'published',
    date: '2026-09-22',
    href: '/privacy#location',
    note: '개인정보처리방침 제7조 · 위치기반서비스사업자 신고(방통위)는 별도 이행',
  },
  {
    slug: 'creator-policy',
    title: '작가 협업 정책 사전 고지',
    summary: '원고료·수익배분 없음, 저작권 작가 보유, 카드·스팟 운영 원칙과 정지 절차를 안내합니다.',
    category: 'policy',
    status: 'published',
    date: '2026-09-22',
    href: '/support/creator-policy',
    highlight: true,
  },
  {
    slug: 'creator-faq',
    title: '작가용 FAQ 안내',
    summary: '신청·저작권·수익·카드·스팟·정지 절차 등 작가 협업 관련 자주 묻는 질문입니다.',
    category: 'notice',
    status: 'published',
    date: '2026-09-22',
    href: '/support/faq',
    highlight: true,
  },
  {
    slug: 'probability-items',
    title: '확률형 아이템(카드) 등급별 확률표',
    summary: '스팟 캐릭터 카드의 등급별 획득 확률을 홈페이지와 앱 내에 함께 고지합니다.',
    category: 'notice',
    status: 'draft',
    date: null,
    href: null,
    note: '이용약관 제12조에 공개 의무 명시 · 확률표 확정 및 앱 내 표시와 동시 게시 예정',
  },
  {
    slug: 'outage-compensation',
    title: '장애·점검 보상 기준표',
    summary: '서비스 장애 지속 시간(등급)별 게임 재화 보상 기준을 사전에 게시합니다.',
    category: 'notice',
    status: 'draft',
    date: null,
    href: null,
    note: '이용약관 제13조에 원칙 명시 · 구체 기준표 확정 후 게시',
  },
  {
    slug: 'minor-refund',
    title: '미성년자 결제 환불 정책',
    summary: '필요서류(가족관계증명서 등), 처리 절차, 1회 한정 취소 기준을 안내합니다.',
    category: 'policy',
    status: 'draft',
    date: null,
    href: null,
    note: '실결제 도입 시점에 맞춰 게시',
  },
  {
    slug: 'report-reward',
    title: '신고·제보 보상 정책',
    summary: '매크로·어뷰징 신고 시 보상(한정 카드 등) 지급 기준을 안내합니다.',
    category: 'notice',
    status: 'draft',
    date: null,
    href: null,
    note: '이용약관 제6조·제11조(부정이용·스팟 신고)와 연계 · 보상 기준 확정 후 게시',
  },
  {
    slug: 'account-transfer',
    title: '계정·QR·수령권 양도 금지',
    summary: '계정·QR·수령권 양도 및 거래 금지, 위반 시 제재 근거를 약관에 명문화합니다.',
    category: 'legal',
    status: 'draft',
    date: null,
    href: null,
    note: '현행 이용약관에 미반영 · 약관 개정 시 게시',
  },
];

export function getPublishedNotices() {
  return notices.filter((n) => n.status === 'published');
}

export function getDraftNotices() {
  return notices.filter((n) => n.status === 'draft');
}

export function getNoticeBySlug(slug) {
  return notices.find((n) => n.slug === slug) ?? null;
}
