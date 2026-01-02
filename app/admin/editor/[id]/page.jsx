'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getAuthHeaders } from '@/lib/authUtils';

const TipTapEditor = dynamic(() => import('@/components/editor/TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-[var(--color-border)] rounded-lg p-4 min-h-[500px] animate-pulse bg-[var(--color-bg-sub)]" />
  ),
});

export default function EditPostPage({ params }) {
  const router = useRouter();
  const postId = params.id;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [contentHtml, setContentHtml] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [htmlFile, setHtmlFile] = useState('');
  const [status, setStatus] = useState('draft');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const thumbnailInputRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/admin/login');
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user.role !== 'admin') {
        router.push('/admin/login');
        return;
      }

      // Auth 확인 후 데이터 로드
      await Promise.all([
        fetchCategories(),
        fetchTags(),
        fetchPost()
      ]);
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const { data } = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error('Fetch categories error:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags');
      const { data } = await response.json();
      setTags(data || []);
    } catch (error) {
      console.error('Fetch tags error:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);

      if (!response.ok) {
        throw new Error('Post not found');
      }

      const { data } = await response.json();
      
      setTitle(data.title || '');
      setContent(data.content);
      setContentHtml(data.content_html || '');
      setSummary(data.summary || '');
      setSlug(data.slug || '');
      setCategoryId(data.category_id || '');
      setSelectedTags(data.tags?.map(t => t.id) || []);
      setThumbnailUrl(data.thumbnail_url || '');
      setHtmlFile(data.html_file || '');
      setStatus(data.status || 'draft');
      
    } catch (error) {
      console.error('Fetch post error:', error);
      alert('글을 불러올 수 없습니다.');
      router.push('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = ({ json, html }) => {
    setContent(json);
    setContentHtml(html);
    setHasChanges(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasChanges(true);
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ name: newTag.trim() })
      });

      if (response.ok) {
        const { data } = await response.json();
        setTags([...tags, data]);
        setSelectedTags([...selectedTags, data.id]);
        setNewTag('');
      } else if (response.status === 409) {
        const existing = tags.find(t => t.name.toLowerCase() === newTag.trim().toLowerCase());
        if (existing && !selectedTags.includes(existing.id)) {
          setSelectedTags([...selectedTags, existing.id]);
        }
        setNewTag('');
      } else if (response.status === 401) {
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Add tag error:', error);
    }
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
    setHasChanges(true);
  };

  const handleThumbnailUpload = async (e) => {
    console.log('썸네일 파일 선택됨:', e.target.files);
    const file = e.target.files?.[0];
    if (!file) {
      console.log('파일이 선택되지 않음');
      return;
    }

    // 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 확인 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    console.log('썸네일 업로드 시작:', file.name, file.type, file.size);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      console.log('썸네일 업로드 응답 상태:', response.status);

      if (response.status === 401) {
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Upload failed');
      }

      const { url } = await response.json();
      console.log('썸네일 업로드 성공:', url);
      setThumbnailUrl(url);
      setHasChanges(true);

      // input 초기화 (같은 파일 재선택 가능하도록)
      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Thumbnail upload error:', error);
      alert('썸네일 업로드에 실패했습니다: ' + error.message);
    }
  };

  const handleThumbnailButtonClick = () => {
    console.log('썸네일 버튼 클릭됨');
    console.log('thumbnailInputRef:', thumbnailInputRef.current);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.click();
    }
  };

  const handleSave = async (newStatus = null) => {
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }

    const finalStatus = newStatus || status;

    if (finalStatus === 'published' && !categoryId) {
      alert('발행하려면 카테고리를 선택하세요.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          content_html: contentHtml,
          html_file: htmlFile || null, // iframe HTML 파일명
          summary,
          thumbnail_url: thumbnailUrl,
          category_id: categoryId || null,
          tags: selectedTags,
          status: finalStatus
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '저장에 실패했습니다.');
      }

      if (newStatus) {
        setStatus(newStatus);
      }

      setHasChanges(false);
      alert('저장되었습니다.');
      
    } catch (error) {
      console.error('Save error:', error);
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--color-text-secondary)]">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* 에디터 헤더 */}
      <div className="editor-header">
        <div className="container-narrow">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (hasChanges && !confirm('저장하지 않은 변경사항이 있습니다. 나가시겠습니까?')) {
                  return;
                }
                router.push('/admin/dashboard');
              }}
              className="flex items-center text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              돌아가기
            </button>

            <div className="editor-actions">
              <span className={`status-badge ${status} mr-2`}>
                {status === 'published' ? '발행됨' : '임시저장'}
              </span>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="action-button button-preview"
              >
                {showPreview ? '편집' : '미리보기'}
              </button>
              <button
                onClick={() => handleSave()}
                disabled={isSaving}
                className="action-button button-save"
              >
                저장
              </button>
              {status !== 'published' && (
                <button
                  onClick={() => handleSave('published')}
                  disabled={isSaving}
                  className="action-button button-publish"
                >
                  {isSaving ? '저장 중...' : '발행'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-narrow py-8">
        {showPreview ? (
          /* 미리보기 모드 */
          <div className="max-w-none">
            <div className="mb-4 text-xs text-[var(--color-text-secondary)]">미리보기</div>
            {thumbnailUrl && (
              <img 
                src={thumbnailUrl} 
                alt="" 
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            )}
            <h1 className="text-4xl font-semibold tracking-tight leading-tight">
              {title || '제목 없음'}
            </h1>
            {summary && (
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{summary}</p>
            )}
            <hr className="article-divider" />
            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: contentHtml || '<p>내용이 없습니다.</p>' }}
            />
          </div>
        ) : (
          /* 편집 모드 */
          <div className="space-y-6">
            {/* 제목 입력 */}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
              className="title-input"
            />

            {/* 메타 패널 */}
            <div className="meta-panel">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 카테고리 */}
                <div className="meta-field">
                  <label className="meta-label">카테고리</label>
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      setHasChanges(true);
                    }}
                    className="meta-select"
                  >
                    <option value="">카테고리 선택</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* URL 슬러그 */}
                <div className="meta-field">
                  <label className="meta-label">URL 슬러그</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setHasChanges(true);
                    }}
                    placeholder="url-slug"
                    className="meta-input"
                  />
                </div>

                {/* 요약 */}
                <div className="meta-field md:col-span-2">
                  <label className="meta-label">요약 (선택, 150자)</label>
                  <textarea
                    value={summary}
                    onChange={(e) => {
                      setSummary(e.target.value);
                      setHasChanges(true);
                    }}
                    placeholder="기록의 핵심 내용을 간단히 요약해주세요"
                    maxLength={150}
                    className="meta-textarea"
                  />
                  <div className="text-right text-xs text-[var(--color-text-secondary)] mt-1">
                    {summary.length}/150
                  </div>
                </div>

                {/* HTML 파일 정보 (iframe 사용 시) */}
                {htmlFile && (
                  <div className="meta-field md:col-span-2">
                    <label className="meta-label">HTML 파일 (iframe)</label>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        📄 {htmlFile}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        이 포스트는 iframe으로 표시됩니다. HTML 파일은 /public/blog/ 폴더에 저장되어 있습니다.
                      </p>
                    </div>
                  </div>
                )}

                {/* 썸네일 */}
                <div className="meta-field md:col-span-2">
                  <label className="meta-label">썸네일 이미지</label>
                  <div className="thumbnail-upload">
                    {thumbnailUrl ? (
                      <img 
                        src={thumbnailUrl} 
                        alt="썸네일" 
                        className="thumbnail-preview"
                      />
                    ) : (
                      <div className="thumbnail-preview flex items-center justify-center text-[var(--color-text-secondary)]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleThumbnailButtonClick}
                        className="upload-button"
                      >
                        이미지 업로드
                      </button>
                      {thumbnailUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnailUrl('');
                            setHasChanges(true);
                          }}
                          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-error)]"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleThumbnailUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* 태그 */}
                <div className="meta-field md:col-span-2">
                  <label className="meta-label">태그</label>
                  <div className="tag-selector">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`tag-chip ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="새 태그 추가"
                      className="meta-input flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="upload-button"
                    >
                      추가
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TipTap 에디터 */}
            <TipTapEditor
              content={content}
              onChange={handleContentChange}
              placeholder="내용을 입력하세요..."
            />
          </div>
        )}
      </div>
    </div>
  );
}
