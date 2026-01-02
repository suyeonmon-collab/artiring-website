'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from '@/lib/utils';

export default function RecordToolbar({ 
  categories = [], 
  tags = [],
  currentCategory, 
  currentTag,
  currentSort, 
  currentSearch 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch || '');

  const updateParams = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // 필터 변경 시 페이지 초기화
    if (key !== 'page') {
      params.delete('page');
    }
    
    router.push(`/records?${params.toString()}`);
  }, [router, searchParams]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      updateParams('search', value);
    }, 500),
    [updateParams]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams('search', searchValue);
  };

  const handleCategoryClick = (categoryId) => {
    if (currentCategory === categoryId) {
      updateParams('category', '');
    } else {
      updateParams('category', categoryId);
    }
  };

  const handleTagClick = (tagId) => {
    if (currentTag === tagId) {
      updateParams('tag', '');
    } else {
      updateParams('tag', tagId);
    }
  };

  const handleSortChange = (e) => {
    updateParams('sort', e.target.value);
  };

  return (
    <div className="records-toolbar">
      {/* 카테고리 필터 - 텍스트 버튼 형태 */}
      <div className="category-filter">
        <button
          type="button"
          onClick={() => handleCategoryClick('')}
          className={`category-filter-item ${!currentCategory ? 'active' : ''}`}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategoryClick(category.id)}
            className={`category-filter-item ${currentCategory === category.id ? 'active' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 정렬 + 검색 */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* 정렬 드롭다운 */}
        <select
          value={currentSort || 'latest'}
          onChange={handleSortChange}
          className="sort-dropdown"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="views">인기순</option>
        </select>

        {/* 검색창 */}
        <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
          <svg 
            className="search-icon w-4 h-4"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="제목 또는 내용 검색"
            className="search-input"
          />
        </form>
      </div>

      {/* 활성 필터 표시 */}
      {(currentCategory || currentTag || currentSearch) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
          <span className="text-[var(--color-text-secondary)]">적용된 필터:</span>
          
          {currentCategory && (
            <button
              onClick={() => updateParams('category', '')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-bg-sub)] rounded-full hover:bg-[var(--color-border)] transition-colors"
            >
              {categories.find(c => c.id === currentCategory)?.name || '카테고리'}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {currentTag && (
            <button
              onClick={() => updateParams('tag', '')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-bg-sub)] rounded-full hover:bg-[var(--color-border)] transition-colors"
            >
              #{tags.find(t => t.id === currentTag)?.name || '태그'}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {currentSearch && (
            <button
              onClick={() => {
                setSearchValue('');
                updateParams('search', '');
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-bg-sub)] rounded-full hover:bg-[var(--color-border)] transition-colors"
            >
              "{currentSearch}"
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
