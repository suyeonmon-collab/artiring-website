import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function RecordList({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="records-list">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/records/${post.slug}`}
          className={`record-list-item ${!post.thumbnail_url ? 'no-thumbnail' : ''}`}
        >
          {/* 썸네일 (1:1 비율, 앨범 형식) */}
          {post.thumbnail_url && (
            <div className="record-thumbnail-wrapper">
              {/* 카테고리 (이미지 상단) */}
              {post.blog_categories && (
                <div className="record-category-overlay">
                  {post.blog_categories.name}
                </div>
              )}
              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="record-thumbnail"
                loading="lazy"
              />
            </div>
          )}

          {/* 콘텐츠 */}
          <div className="record-content">
            {/* 카테고리 (썸네일이 없을 때만 표시) */}
            {!post.thumbnail_url && post.blog_categories && (
              <div className="record-category">
                {post.blog_categories.name}
              </div>
            )}
            
            {/* 제목 */}
            <h3 className="record-title">
              {post.title}
            </h3>
            
            {/* 요약 */}
            {post.summary && (
              <p className="record-summary">
                {post.summary}
              </p>
            )}
            
            {/* 메타 정보 */}
            <div className="record-meta">
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
              {post.view_count > 0 && (
                <span>조회 {post.view_count.toLocaleString()}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
