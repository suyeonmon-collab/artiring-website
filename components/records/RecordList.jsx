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
          {/* 썸네일 (선택적) */}
          {post.thumbnail_url && (
            <img
              src={post.thumbnail_url}
              alt=""
              className="record-thumbnail"
              loading="lazy"
            />
          )}

          {/* 콘텐츠 */}
          <div className="record-content">
            {/* 카테고리 */}
            {post.blog_categories && (
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
