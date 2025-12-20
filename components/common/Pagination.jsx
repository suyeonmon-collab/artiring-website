import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, baseUrl, searchParams = {} }) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page) => {
    const params = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value);
      }
    });
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
  };

  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="pagination" aria-label="페이지 네비게이션">
      {/* 이전 */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="pagination-arrow hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="이전 페이지"
        >
          ← 이전
        </Link>
      ) : (
        <span className="pagination-arrow opacity-30">
          ← 이전
        </span>
      )}

      {/* 페이지 번호 */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`pagination-item ${page === currentPage ? 'active' : ''}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* 다음 */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="pagination-arrow hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="다음 페이지"
        >
          다음 →
        </Link>
      ) : (
        <span className="pagination-arrow opacity-30">
          다음 →
        </span>
      )}
    </nav>
  );
}
