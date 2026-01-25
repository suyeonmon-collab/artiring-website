import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { formatDate, extractTextFromHtml } from '@/lib/utils';
import TableOfContents from '@/components/records/TableOfContents';
import CopyLinkButton from '@/components/records/CopyLinkButton';
import dynamic from 'next/dynamic';

const BlogIframe = dynamic(() => import('@/components/records/BlogIframe'), {
  ssr: false,
});

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: '블로그 글을 찾을 수 없습니다 - 아티링',
    };
  }

  const baseUrl = await getBaseUrl();
  const description = post.summary || extractTextFromHtml(post.content_html).slice(0, 160);
  const url = `${baseUrl}/records/${post.slug}`;
  const images = post.thumbnail_url ? [post.thumbnail_url] : [];

  return {
    title: `${post.title} - 아티링 블로그`,
    description,
    keywords: post.tags?.map(tag => tag.name).join(', ') || '프리랜서, 에이전시, 디자인, 아티링',
    authors: [{ name: post.author?.name || 'ARTIRING' }],
    creator: 'ARTIRING',
    publisher: 'ARTIRING',
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url,
      siteName: 'ARTIRING',
      locale: 'ko_KR',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author?.name || 'ARTIRING'],
      images: images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: images,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Base URL 가져오기 헬퍼 함수
async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  return process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;
}

async function getPost(slug) {
  const baseUrl = await getBaseUrl();
  
  try {
    const response = await fetch(`${baseUrl}/api/posts/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch post');
    }
    
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function incrementViewCount(slug) {
  const baseUrl = await getBaseUrl();
  
  try {
    await fetch(`${baseUrl}/api/posts/${slug}/view`, {
      method: 'POST',
      cache: 'no-store'
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}

// H2 태그 개수 확인
function countH2Tags(html) {
  if (!html) return 0;
  const matches = html.match(/<h2[^>]*>/gi);
  return matches ? matches.length : 0;
}

export default async function RecordDetailPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // 조회수 증가 (백그라운드에서)
  incrementViewCount(params.slug);

  const h2Count = countH2Tags(post.content_html);
  const showToc = h2Count >= 3;
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/records/${post.slug}`;

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || extractTextFromHtml(post.content_html).slice(0, 200),
    image: post.thumbnail_url ? [post.thumbnail_url] : [],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Organization',
      name: post.author?.name || 'ARTIRING',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ARTIRING',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: post.blog_categories?.name || '블로그',
    keywords: post.tags?.map(tag => tag.name).join(', ') || '프리랜서, 에이전시, 디자인',
  };

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container-narrow">
        {/* 아티클 헤더 */}
        <header className="article-header">
          {/* 카테고리 */}
          {post.blog_categories && (
            <Link 
              href={`/records?category=${post.blog_categories.id}`}
              className="article-category hover:underline"
            >
              {post.blog_categories.name}
            </Link>
          )}
          
          {/* 제목 */}
          <h1 className="article-title">
            {post.title}
          </h1>
          
          {/* 메타 정보 */}
          <div className="article-meta">
            {post.blog_admins?.name && (
              <span>{post.blog_admins.name}</span>
            )}
            <time dateTime={post.published_at}>
              {formatDate(post.published_at)}
            </time>
            <span>·</span>
            <span>조회 {(post.view_count || 0).toLocaleString()}</span>
          </div>

          {/* 태그 */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/records?tag=${tag.id}`}
                  className="article-tag hover:text-[var(--color-point)] transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* 구분선 */}
        <hr className="article-divider" />

        {/* 목차 (H2가 3개 이상일 때만 표시) */}
        {showToc && !post.html_file && (
          <TableOfContents content={post.content_html} />
        )}

        {/* 본문 */}
        {post.html_file ? (
          /* HTML 파일이 있는 경우 iframe으로 표시, 실패 시 content_html fallback */
          <div>
            <BlogIframe htmlFileName={post.html_file} />
            {/* html_file이 있지만 content_html도 있는 경우, iframe 로드 실패 시 대체용으로 숨김 */}
            {post.content_html && (
              <div 
                className="article-body hidden"
                id="fallback-content"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />
            )}
          </div>
        ) : (
          /* 일반 HTML 콘텐츠 */
          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        )}

        {/* 자동 마무리 배너 */}
        <div className="mt-12 mb-8">
          <img 
            src="/images/banner.jpg" 
            alt="마무리 배너" 
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* 공유 기능 */}
        <div className="mt-12 flex justify-center">
          <CopyLinkButton />
        </div>

        {/* 아티클 푸터 - 이전/다음 네비게이션 */}
        <nav className="article-footer-nav">
          {/* 이전 글 */}
          {post.prevPost ? (
            <Link
              href={`/records/${post.prevPost.slug}`}
              className="article-nav-item text-left"
            >
              <div className="article-nav-label">← 이전 글</div>
              <div className="article-nav-title line-clamp-1">
                {post.prevPost.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {/* 다음 글 */}
          {post.nextPost ? (
            <Link
              href={`/records/${post.nextPost.slug}`}
              className="article-nav-item text-right"
            >
              <div className="article-nav-label">다음 글 →</div>
              {post.nextPost.thumbnail_url && (
                <div className="mt-2 mb-2">
                  <img 
                    src={post.nextPost.thumbnail_url} 
                    alt={post.nextPost.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="article-nav-title line-clamp-1">
                {post.nextPost.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        {/* 목록으로 돌아가기 */}
        <div className="mt-12 text-center">
          <Link
            href="/records"
            className="inline-flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-point)] transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </article>
  );
}
