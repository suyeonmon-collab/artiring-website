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
    slug: 'terms',
    title: '이용약관',
    summary: '서비스 이용 조건, 안전사고 면책, 계정·QR·수령권 양도 금지 조항을 포함합니다.',
    category: 'legal',
    status: 'published',
    date: '2026-01-01',
    href: '/terms',
    note: '안전 경고·양도 금지 조항은 변호사 검토 후 보강 예정',
  },
  {
    slug: 'privacy',
    title: '개인정보처리방침',
    summary: '개인정보 수집·이용 목적, 보유 기간, 제3자 제공, 파기 정책을 안내합니다.',
    category: 'legal',
    status: 'published',
    date: '2026-01-01',
    href: '/privacy',
    note: '위치정보 수집·이용 고지는 위치정보법 요건에 맞춰 보강 예정',
  },
  {
    slug: 'location-notice',
    title: '위치정보 수집·이용 고지',
    summary: 'GPS 방문 인증을 위한 위치정보 수집 목적, 보관기간, 제3자 제공 여부, 파기 정책.',
    category: 'legal',
    status: 'draft',
    date: null,
    href: null,
    note: '개인정보처리방침과 함께 게시 예정 · 위치기반서비스사업자 신고(방통위)와 병행',
  },
  {
    slug: 'probability-items',
    title: '확률형 아이템 표시',
    summary: '확률형 아이템·카드의 획득 확률을 홈페이지와 앱 내에 함께 고지합니다.',
    category: 'notice',
    status: 'draft',
    date: null,
    href: null,
    note: '홈페이지 게시만으로는 불충분 — 게임 내 표시와 동시 적용 필요',
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
    slug: 'outage-compensation',
    title: '장애·점검 보상 기준',
    summary: '서비스 장애·점검 등급별 보상 기준표를 사전에 게시합니다.',
    category: 'notice',
    status: 'draft',
    date: null,
    href: null,
    note: '발생 후 임기응변보다 사전 게시로 신뢰도 확보',
  },
  {
    slug: 'report-reward',
    title: '신고·제보 보상 정책',
    summary: '매크로·어뷰징 신고 시 보상(한정 카드 등) 지급 기준을 안내합니다.',
    category: 'notice',
    status: 'draft',
    date: null,
    href: null,
    note: '커뮤니티 자율 감시 유도용 · 기준 확정 후 게시',
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
