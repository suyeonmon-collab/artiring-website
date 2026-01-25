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
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: '블로그 글을 찾을 수 없습니다 - 아티링',
    };
  }

  const baseUrl = await getBaseUrl();
  const description = post.summary || extractTextFromHtml(post.content_html).slice(0, 160);
  const url = `${baseUrl}/records/${post.slug}`;
  const images = post.thumbnail_url ? [post.thumbnail_url] : [`${baseUrl}/images/logo.png`];
  const keywords = post.tags?.map(tag => tag.name).join(', ') || '프리랜서, 에이전시, 디자인, 아티링';
  
  // 검색 엔진 최적화를 위한 더 풍부한 메타데이터
  return {
    title: `${post.title} | 아티링 블로그`,
    description: description || `${post.title} - 아티링 블로그에서 프리랜서와 에이전시에 대한 인사이트를 확인하세요.`,
    keywords: `${keywords}, 아티링, ARTIRING, 프리랜서 플랫폼, 에이전시 모델`,
    authors: [{ name: post.author?.name || 'ARTIRING' }],
    creator: 'ARTIRING',
    publisher: 'ARTIRING',
    // 검색 엔진 최적화를 위한 추가 메타데이터
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: post.title,
      description: description || `${post.title} - 아티링 블로그`,
      type: 'article',
      url: url,
      siteName: 'ARTIRING',
      locale: 'ko_KR',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author?.name || 'ARTIRING'],
      images: images,
      // OpenGraph 추가 필드
      section: post.blog_categories?.name || '블로그',
      tags: post.tags?.map(tag => tag.name) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description || `${post.title} - 아티링 블로그`,
      images: images,
      creator: '@artiring',
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
    // 추가 SEO 메타데이터
    category: post.blog_categories?.name || '블로그',
    classification: 'Blog Post',
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
      if (response.status === 404) {
        console.warn(`Post not found with slug: ${slug}`);
        return null;
      }
      const errorText = await response.text();
      console.error(`Failed to fetch post (${response.status}):`, errorText);
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.data) {
      console.warn(`Post data is null for slug: ${slug}`);
      return null;
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    console.error('Slug:', slug);
    console.error('Base URL:', baseUrl);
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
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // 조회수 증가 (백그라운드에서)
  incrementViewCount(slug);

  const h2Count = countH2Tags(post.content_html);
  const showToc = h2Count >= 3;
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/records/${post.slug}`;

  // Structured Data (JSON-LD) for SEO - 개별 블로그 글 검색 최적화
  const description = post.summary || extractTextFromHtml(post.content_html).slice(0, 200);
  const keywords = post.tags?.map(tag => tag.name).join(', ') || '프리랜서, 에이전시, 디자인, 아티링';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: description,
    image: post.thumbnail_url ? [post.thumbnail_url] : [`${baseUrl}/images/logo.png`],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Organization',
      name: post.author?.name || 'ARTIRING',
      url: baseUrl,
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
    keywords: keywords,
    // 검색 엔진 최적화를 위한 추가 필드
    inLanguage: 'ko-KR',
    url: url,
  };

  // Breadcrumb 구조화된 데이터 (별도로 추가)
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '블로그',
        item: `${baseUrl}/records`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <article className="section">
      {/* 구조화된 데이터 (JSON-LD) - BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Breadcrumb 구조화된 데이터 (별도로 추가) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
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
