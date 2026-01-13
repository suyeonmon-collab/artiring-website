export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://artiring.com';
  
  // 블로그 포스트 목록 가져오기
  let posts = [];
  try {
    const response = await fetch(`${baseUrl}/api/posts?limit=1000`, {
      cache: 'no-store'
    });
    if (response.ok) {
      const data = await response.json();
      posts = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
  }

  // 정적 페이지
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/structure`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/records`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 블로그 포스트 페이지
  const blogPages = posts
    .filter(post => post.published && post.slug)
    .map(post => ({
      url: `${baseUrl}/records/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.published_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  return [...staticPages, ...blogPages];
}

