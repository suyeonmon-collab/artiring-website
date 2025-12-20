'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { getAuthHeaders } from '@/lib/authUtils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    pendingInquiries: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mainTab, setMainTab] = useState('posts'); // 'posts' or 'inquiries'
  const [activeTab, setActiveTab] = useState('all');
  const [inquiryFilter, setInquiryFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      if (mainTab === 'posts') {
        fetchPosts();
      } else {
        fetchInquiries();
      }
    }
  }, [user, mainTab, activeTab, inquiryFilter]);

  const checkAuth = async () => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      router.push('/admin/login');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      
      if (userData.role !== 'admin') {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        router.push('/admin/login');
        return;
      }

      setUser(userData);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const status = activeTab === 'all' ? '' : activeTab;
      
      const response = await fetch(`/api/posts?status=${status || 'all'}&limit=100`);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const { data, pagination } = await response.json();
      setPosts(data || []);

      // 전체 통계 가져오기
      if (activeTab === 'all') {
        const allResponse = await fetch('/api/posts?status=all&limit=100');
        const { data: allPosts } = await allResponse.json();
        
        // 문의 통계도 가져오기
        const inquiriesResponse = await fetch('/api/contact?status=pending', {
          headers: getAuthHeaders()
        });
        const { pagination: inquiryPagination } = await inquiriesResponse.json();
        
        if (allPosts) {
          const published = allPosts.filter(p => p.status === 'published').length;
          const drafts = allPosts.filter(p => p.status === 'draft').length;
          const views = allPosts.reduce((sum, p) => sum + (p.view_count || 0), 0);
          
          setStats({
            totalPosts: allPosts.length,
            publishedPosts: published,
            draftPosts: drafts,
            totalViews: views,
            pendingInquiries: inquiryPagination?.total || 0
          });
        }
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setIsLoading(true);

    try {
      const statusParam = inquiryFilter === 'all' ? '' : `status=${inquiryFilter}`;
      const response = await fetch(`/api/contact?${statusParam}&limit=50`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }

      const { data } = await response.json();
      setInquiries(data || []);
    } catch (error) {
      console.error('Fetch inquiries error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const handleDelete = async (postId) => {
    if (!confirm('정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPosts();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleInquiryStatusChange = async (inquiryId, newStatus) => {
    try {
      const response = await fetch(`/api/contact/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchInquiries();
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        alert('상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Update inquiry status error:', error);
    }
  };

  const handleInquiryDelete = async (inquiryId) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/contact/${inquiryId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        fetchInquiries();
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry(null);
        }
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Delete inquiry error:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'read': return 'bg-blue-100 text-blue-700';
      case 'replied': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return '대기';
      case 'read': return '확인';
      case 'replied': return '답변완료';
      case 'closed': return '종료';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse text-[var(--color-text-secondary)]">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-narrow">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {user.name || user.email}님, 환영합니다.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/editor/new" 
              className="btn btn-primary"
            >
              새 글 작성
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-point)] transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">전체 글</div>
            <div className="stat-value">{stats.totalPosts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">발행됨</div>
            <div className="stat-value">{stats.publishedPosts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">총 조회수</div>
            <div className="stat-value">{stats.totalViews.toLocaleString()}</div>
          </div>
          <div 
            className="stat-card cursor-pointer hover:border-[var(--color-point)] transition-colors"
            onClick={() => setMainTab('inquiries')}
          >
            <div className="stat-label">새 문의</div>
            <div className={`stat-value ${stats.pendingInquiries > 0 ? 'text-[var(--color-point)]' : ''}`}>
              {stats.pendingInquiries}
            </div>
          </div>
        </div>

        {/* 메인 탭 (글 / 문의) */}
        <div className="flex gap-8 mb-6 border-b border-[var(--color-border)]">
          <button
            onClick={() => setMainTab('posts')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              mainTab === 'posts'
                ? 'text-[var(--color-point)] border-[var(--color-point)]'
                : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]'
            }`}
          >
            📝 글 관리
          </button>
          <button
            onClick={() => setMainTab('inquiries')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ${
              mainTab === 'inquiries'
                ? 'text-[var(--color-point)] border-[var(--color-point)]'
                : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]'
            }`}
          >
            📬 문의 관리
            {stats.pendingInquiries > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[var(--color-point)] text-white rounded-full">
                {stats.pendingInquiries}
              </span>
            )}
          </button>
        </div>

        {/* 글 관리 섹션 */}
        {mainTab === 'posts' && (
          <>
            {/* 글 필터 탭 */}
            <div className="flex gap-4 mb-6">
              {[
                { key: 'all', label: '전체' },
                { key: 'published', label: '발행됨' },
                { key: 'draft', label: '임시 저장' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    activeTab === tab.key
                      ? 'bg-[var(--color-point)] text-white'
                      : 'bg-[var(--color-bg-sub)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 글 목록 테이블 */}
            {isLoading ? (
              <div className="py-12 text-center text-[var(--color-text-secondary)]">
                로딩 중...
              </div>
            ) : posts.length > 0 ? (
              <div className="posts-table-mobile">
                <table className="posts-table">
                  <thead>
                    <tr>
                      <th className="w-1/2">제목</th>
                      <th>카테고리</th>
                      <th>상태</th>
                      <th>조회수</th>
                      <th>날짜</th>
                      <th className="text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td>
                          <Link 
                            href={`/admin/editor/${post.id}`}
                            className="font-medium hover:text-[var(--color-point)] transition-colors line-clamp-1"
                          >
                            {post.title || '(제목 없음)'}
                          </Link>
                        </td>
                        <td className="text-[var(--color-text-secondary)]">
                          {post.blog_categories?.name || '-'}
                        </td>
                        <td>
                          <span className={`status-badge ${post.status}`}>
                            {post.status === 'published' ? '발행됨' : '임시저장'}
                          </span>
                        </td>
                        <td className="text-[var(--color-text-secondary)]">
                          {(post.view_count || 0).toLocaleString()}
                        </td>
                        <td className="text-[var(--color-text-secondary)]">
                          {formatDate(post.updated_at || post.created_at)}
                        </td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/editor/${post.id}`}
                              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-point)] transition-colors"
                              title="수정"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            {post.status === 'published' && (
                              <Link
                                href={`/records/${post.slug}`}
                                target="_blank"
                                className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-point)] transition-colors"
                                title="보기"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </Link>
                            )}
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] transition-colors"
                              title="삭제"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-[var(--color-text-secondary)]">
                  {activeTab === 'all' 
                    ? '작성된 글이 없습니다.' 
                    : activeTab === 'published' 
                      ? '발행된 글이 없습니다.'
                      : '임시 저장된 글이 없습니다.'}
                </p>
                <Link 
                  href="/admin/editor/new" 
                  className="mt-4 inline-block text-[var(--color-point)] hover:underline"
                >
                  첫 번째 글 작성하기
                </Link>
              </div>
            )}
          </>
        )}

        {/* 문의 관리 섹션 */}
        {mainTab === 'inquiries' && (
          <>
            {/* 문의 필터 탭 */}
            <div className="flex gap-4 mb-6">
              {[
                { key: 'all', label: '전체' },
                { key: 'pending', label: '대기' },
                { key: 'read', label: '확인' },
                { key: 'replied', label: '답변완료' },
                { key: 'closed', label: '종료' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setInquiryFilter(tab.key)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    inquiryFilter === tab.key
                      ? 'bg-[var(--color-point)] text-white'
                      : 'bg-[var(--color-bg-sub)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* 문의 목록 */}
              <div className="space-y-3">
                {isLoading ? (
                  <div className="py-12 text-center text-[var(--color-text-secondary)]">
                    로딩 중...
                  </div>
                ) : inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        // 선택하면 자동으로 'read' 상태로 변경
                        if (inquiry.status === 'pending') {
                          handleInquiryStatusChange(inquiry.id, 'read');
                        }
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedInquiry?.id === inquiry.id
                          ? 'border-[var(--color-point)] bg-blue-50'
                          : 'border-[var(--color-border)] hover:border-[var(--color-point)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(inquiry.status)}`}>
                              {getStatusLabel(inquiry.status)}
                            </span>
                            <span className="text-xs text-[var(--color-text-secondary)]">
                              {inquiry.type === 'partnership' ? '파트너십' : '일반'}
                            </span>
                          </div>
                          <h4 className="font-medium line-clamp-1">{inquiry.subject}</h4>
                          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-1">
                            {inquiry.name} · {inquiry.email}
                          </p>
                        </div>
                        <div className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">
                          {formatDate(inquiry.created_at)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-[var(--color-text-secondary)]">
                    문의가 없습니다.
                  </div>
                )}
              </div>

              {/* 문의 상세 */}
              <div className="lg:sticky lg:top-4">
                {selectedInquiry ? (
                  <div className="border border-[var(--color-border)] rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(selectedInquiry.status)}`}>
                          {getStatusLabel(selectedInquiry.status)}
                        </span>
                        <span className="ml-2 text-xs text-[var(--color-text-secondary)]">
                          {selectedInquiry.type === 'partnership' ? '파트너십 문의' : '일반 문의'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleInquiryDelete(selectedInquiry.id)}
                        className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] transition-colors"
                        title="삭제"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">{selectedInquiry.subject}</h3>

                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex gap-4">
                        <span className="text-[var(--color-text-secondary)] w-16">이름</span>
                        <span>{selectedInquiry.name}</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-[var(--color-text-secondary)] w-16">이메일</span>
                        <a 
                          href={`mailto:${selectedInquiry.email}`}
                          className="text-[var(--color-point)] hover:underline"
                        >
                          {selectedInquiry.email}
                        </a>
                      </div>
                      {selectedInquiry.company && (
                        <div className="flex gap-4">
                          <span className="text-[var(--color-text-secondary)] w-16">회사</span>
                          <span>{selectedInquiry.company}</span>
                        </div>
                      )}
                      {selectedInquiry.phone && (
                        <div className="flex gap-4">
                          <span className="text-[var(--color-text-secondary)] w-16">연락처</span>
                          <a 
                            href={`tel:${selectedInquiry.phone}`}
                            className="text-[var(--color-point)] hover:underline"
                          >
                            {selectedInquiry.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex gap-4">
                        <span className="text-[var(--color-text-secondary)] w-16">접수일</span>
                        <span>{new Date(selectedInquiry.created_at).toLocaleString('ko-KR')}</span>
                      </div>
                    </div>

                    <div className="border-t border-[var(--color-border)] pt-4 mb-6">
                      <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">문의 내용</h4>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </p>
                    </div>

                    {/* 상태 변경 버튼 */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-[var(--color-text-secondary)] mr-2">상태 변경:</span>
                      {['pending', 'read', 'replied', 'closed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleInquiryStatusChange(selectedInquiry.id, status)}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            selectedInquiry.status === status
                              ? getStatusBadgeClass(status)
                              : 'bg-[var(--color-bg-sub)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                          }`}
                        >
                          {getStatusLabel(status)}
                        </button>
                      ))}
                    </div>

                    {/* 빠른 답장 버튼 */}
                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <a
                        href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                        className="btn btn-primary w-full text-center"
                      >
                        이메일로 답장하기
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="border border-[var(--color-border)] rounded-lg p-12 text-center text-[var(--color-text-secondary)]">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p>문의를 선택하면<br />상세 내용을 확인할 수 있습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
