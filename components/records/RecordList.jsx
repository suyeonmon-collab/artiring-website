import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function RecordList({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="records-grid">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/records/${post.slug}`}
          className="record-grid-item"
        >
          {/* 썸네일 */}
          {post.thumbnail_url ? (
            <div className="record-thumbnail-wrapper">
              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="record-thumbnail"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="record-thumbnail-wrapper record-thumbnail-placeholder">
              <div className="record-thumbnail-placeholder-content">
                {post.title.charAt(0)}
              </div>
            </div>
          )}

          {/* 제목과 조회수 (이미지 하단) */}
          <div className="record-grid-content">
            <h3 className="record-grid-title">
              {post.title}
            </h3>
            {post.view_count > 0 && (
              <div className="record-grid-views">
                조회 {post.view_count.toLocaleString()}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
