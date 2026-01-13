import { createServerComponentClient } from '@/lib/supabase';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://artiring.com';
  
  // 블로그 포스트 목록 가져오기 (직접 데이터베이스에서)
  let posts = [];
  try {
    const supabase = createServerComponentClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(1000);
    
    if (error) {
      console.error('Error fetching posts for sitemap:', error);
    } else {
      posts = data || [];
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
    .filter(post => post.slug)
    .map(post => ({
      url: `${baseUrl}/records/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.published_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  return [...staticPages, ...blogPages];
}

