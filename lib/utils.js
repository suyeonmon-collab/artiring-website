import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜 포맷팅 (2024년 1월 15일)
 */
export function formatDate(date) {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'yyyy년 M월 d일', { locale: ko });
}

/**
 * 상대적 시간 (3일 전)
 */
export function formatRelativeDate(date) {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko });
}

/**
 * 슬러그 생성
 */
export function generateSlug(title) {
  if (!title) return '';
  
  const slug = title
    .toLowerCase()
    .trim()
    // 한글 자모를 로마자로 변환하지 않고 유지
    .replace(/[^\w가-힣\s-]/g, '') // 특수문자 제거 (한글, 영문, 숫자, 공백, 하이픈만 유지)
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/-+/g, '-') // 연속 하이픈 정리
    .replace(/^-|-$/g, ''); // 앞뒤 하이픈 제거

  // 유니크한 슬러그를 위해 타임스탬프 추가
  return `${slug}-${Date.now().toString(36)}`;
}

/**
 * 텍스트 요약 (지정된 길이로 자르기)
 */
export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * HTML에서 텍스트만 추출
 */
export function extractTextFromHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/&nbsp;/g, ' ') // 공백 처리
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * 읽는 시간 계산 (분)
 */
export function calculateReadingTime(text) {
  if (!text) return 0;
  const wordsPerMinute = 500; // 한글 기준
  const words = text.length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

/**
 * 조회수 포맷팅 (1,234 → 1.2K)
 */
export function formatViewCount(count) {
  if (!count) return '0';
  if (count < 1000) return count.toString();
  if (count < 10000) return `${(count / 1000).toFixed(1)}K`;
  return `${Math.floor(count / 1000)}K`;
}

/**
 * 클래스명 조합
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * 이미지 URL 유효성 검사
 */
export function isValidImageUrl(url) {
  if (!url) return false;
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const extension = url.split('.').pop()?.toLowerCase().split('?')[0];
  return imageExtensions.includes(extension);
}

/**
 * 파일 크기 포맷팅
 */
export function formatFileSize(bytes) {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * 디바운스 함수
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}






