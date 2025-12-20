import Link from 'next/link';
import { Suspense } from 'react';
import RecordList from '@/components/records/RecordList';
import RecordToolbar from '@/components/records/RecordToolbar';
import Pagination from '@/components/common/Pagination';

export const metadata = {
  title: '기록 - 아티링 | ARTIRING',
  description: '아티링이 문제를 정의하고, 실험하고, 설계한 과정을 기록합니다. 문제정의, 실험과정, 구조설계, 특허·법률, 창업준비의 모든 여정을 공유합니다.',
};

async function getPosts(searchParams) {
  const params = new URLSearchParams();
  
  if (searchParams.category) params.set('category', searchParams.category);
  if (searchParams.tag) params.set('tag', searchParams.tag);
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.page) params.set('page', searchParams.page);
  if (searchParams.sort) params.set('sort', searchParams.sort);
  params.set('limit', '10');
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/posts?${params.toString()}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } };
  }
}

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: 'force-cache'
    });
    
    if (!response.ok) throw new Error('Failed to fetch categories');
    
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getTags() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/tags?withCount=true`, {
      cache: 'force-cache'
    });
    
    if (!response.ok) throw new Error('Failed to fetch tags');
    
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export default async function RecordsPage({ searchParams }) {
  const [postsData, categories, tags] = await Promise.all([
    getPosts(searchParams),
    getCategories(),
    getTags()
  ]);

  const { data: posts, pagination } = postsData;

  return (
    <div className="section">
      <div className="container-narrow">
        {/* 페이지 헤더 */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-[48px] font-semibold tracking-tight">
            기록
          </h1>
          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            아티링이 문제를 정의하고, 실험하고, 설계한 과정
          </p>
        </header>

        {/* 툴바 - 필터/정렬/검색 */}
        <Suspense fallback={<div className="h-20 bg-[var(--color-bg-sub)] rounded-lg animate-pulse" />}>
          <RecordToolbar 
            categories={categories}
            tags={tags}
            currentCategory={searchParams.category}
            currentTag={searchParams.tag}
            currentSort={searchParams.sort}
            currentSearch={searchParams.search}
          />
        </Suspense>

        {/* 기록 목록 */}
        {posts && posts.length > 0 ? (
          <>
            <RecordList posts={posts} />
            
            {/* 페이지네이션 */}
            {pagination.totalPages > 1 && (
              <Pagination 
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                baseUrl="/records"
                searchParams={searchParams}
              />
            )}
          </>
        ) : (
          /* 빈 상태 */
          <div className="empty-state">
            {searchParams.search ? (
              <>
                <p className="empty-state-title">
                  검색 결과가 없습니다.
                </p>
                <p className="empty-state-description">
                  다른 키워드로 검색해보세요.
                </p>
                <Link 
                  href="/records"
                  className="mt-6 inline-block text-[var(--color-point)] hover:underline"
                >
                  전체 기록 보기
                </Link>
              </>
            ) : searchParams.category || searchParams.tag ? (
              <>
                <p className="empty-state-title">
                  해당 조건에 맞는 기록이 없습니다.
                </p>
                <p className="empty-state-description">
                  다른 카테고리나 태그를 선택해보세요.
                </p>
                <Link 
                  href="/records"
                  className="mt-6 inline-block text-[var(--color-point)] hover:underline"
                >
                  전체 기록 보기
                </Link>
              </>
            ) : (
              <>
                <p className="empty-state-title">
                  아직 작성된 기록이 없습니다.
                </p>
                <p className="empty-state-description">
                  곧 아티링의 여정을 공유할 예정입니다.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
