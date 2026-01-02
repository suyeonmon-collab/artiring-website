'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getAuthHeaders } from '@/lib/authUtils';

// TipTap은 클라이언트 사이드에서만 로드
const TipTapEditor = dynamic(() => import('@/components/editor/TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-[var(--color-border)] rounded-lg p-4 min-h-[500px] animate-pulse bg-[var(--color-bg-sub)]" />
  ),
});

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [contentHtml, setContentHtml] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isUploadingHtml, setIsUploadingHtml] = useState(false);
  const thumbnailInputRef = useRef(null);
  const htmlFileInputRef = useRef(null);

  useEffect(() => {
    checkAuth();
    fetchCategories();
    fetchTags();
    loadDraft();
  }, []);

  // 자동 저장 (3분마다)
  useEffect(() => {
    if (!hasChanges) return;

    const interval = setInterval(() => {
      saveDraft();
    }, 180000); // 3분

    return () => clearInterval(interval);
  }, [hasChanges, title, content, summary, categoryId, selectedTags]);

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
      }
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

  const loadDraft = () => {
    const draft = localStorage.getItem('post_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.content) setContent(parsed.content);
        if (parsed.contentHtml) setContentHtml(parsed.contentHtml);
        if (parsed.summary) setSummary(parsed.summary);
        if (parsed.categoryId) setCategoryId(parsed.categoryId);
        if (parsed.selectedTags) setSelectedTags(parsed.selectedTags);
        if (parsed.thumbnailUrl) setThumbnailUrl(parsed.thumbnailUrl);
        if (parsed.slug) setSlug(parsed.slug);
      } catch (error) {
        console.error('Load draft error:', error);
      }
    }
  };

  const saveDraft = useCallback(() => {
    const draft = { 
      title, 
      content, 
      contentHtml, 
      summary, 
      categoryId, 
      selectedTags,
      thumbnailUrl,
      slug
    };
    localStorage.setItem('post_draft', JSON.stringify(draft));
    setLastSaved(new Date());
    setHasChanges(false);
  }, [title, content, contentHtml, summary, categoryId, selectedTags, thumbnailUrl, slug]);

  const handleContentChange = ({ json, html }) => {
    setContent(json);
    setContentHtml(html);
    setHasChanges(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasChanges(true);
    // 슬러그 자동 생성
    if (!slug) {
      const generatedSlug = generateSlug(e.target.value);
      setSlug(generatedSlug);
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);
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
        // 이미 존재하는 태그
        const existing = tags.find(t => t.name.toLowerCase() === newTag.trim().toLowerCase());
        if (existing && !selectedTags.includes(existing.id)) {
          setSelectedTags([...selectedTags, existing.id]);
        }
        setNewTag('');
      } else if (response.status === 401) {
        const result = await response.json();
        console.error('Tag add auth error:', result);
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

  const handleHtmlFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // HTML 파일 확인
    if (!file.name.endsWith('.html') && !file.type.includes('html')) {
      alert('HTML 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 확인 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    if (!confirm('HTML 파일을 업로드하면 자동으로 블로그 포스트가 생성됩니다. 계속하시겠습니까?')) {
      return;
    }

    setIsUploadingHtml(true);

    const formData = new FormData();
    formData.append('file', file);

    console.log('📤 HTML 파일 업로드 시작:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    try {
      const authHeaders = getAuthHeaders();
      console.log('🔐 인증 헤더:', authHeaders);
      
      const response = await fetch('/api/upload-html', {
        method: 'POST',
        headers: authHeaders,
        body: formData,
      });

      console.log('📥 응답 상태:', response.status, response.statusText);

      if (response.status === 401) {
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        let errorMessage = 'HTML 파일 업로드에 실패했습니다.';
        try {
          const result = await response.json();
          console.error('❌ Upload failed:', result);
          errorMessage = result.error || result.details || errorMessage;
          if (result.code) {
            errorMessage += ` (코드: ${result.code})`;
          }
        } catch (e) {
          console.error('❌ Failed to parse error response:', e);
          errorMessage = `서버 오류: ${response.status} ${response.statusText}`;
        }
        alert(`❌ ${errorMessage}\n\n브라우저 콘솔(F12)에서 자세한 오류를 확인할 수 있습니다.`);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ Upload success:', result);
      
      // 생성된 포스트 정보 확인
      if (!result.post) {
        console.error('❌ No post in result:', result);
        alert('❌ 포스트가 생성되지 않았습니다.\n\n응답 데이터: ' + JSON.stringify(result, null, 2));
        throw new Error('포스트가 생성되지 않았습니다.');
      }

      if (!result.post.id) {
        console.error('❌ Post ID missing:', result.post);
        alert('❌ 포스트 ID가 없습니다.\n\n응답 데이터: ' + JSON.stringify(result, null, 2));
        throw new Error('포스트 ID가 없습니다.');
      }
      
      // 생성된 포스트 정보로 폼 채우기
      setTitle(result.post.title);
      setSlug(result.post.slug);
      setContentHtml(''); // iframe 사용 시 빈 값
      setHasChanges(true);
      
      console.log('✅ Post created:', {
        id: result.post.id,
        title: result.post.title,
        slug: result.post.slug,
        status: result.post.status,
        html_file: result.fileName
      });
      
      alert(`✅ HTML 파일이 업로드되고 블로그 포스트가 생성되었습니다!\n\n제목: ${result.post.title}\n파일: ${result.fileName}\n상태: ${result.post.status === 'published' ? '발행됨 (기록 페이지에 표시됨)' : '임시저장'}\n\n제목, 카테고리, 요약 등을 수정할 수 있습니다.`);
      
      // 생성된 포스트로 이동하거나 대시보드로 이동
      if (confirm('생성된 포스트를 편집하시겠습니까?')) {
        router.push(`/admin/editor/${result.post.id}`);
      } else {
        // 기록 페이지로 이동하여 생성된 글 확인
        if (confirm('기록 페이지에서 생성된 글을 확인하시겠습니까?')) {
          router.push('/records');
        } else {
          router.push('/admin/dashboard');
        }
      }

      // input 초기화
      if (htmlFileInputRef.current) {
        htmlFileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('HTML upload error:', error);
      alert('HTML 파일 업로드에 실패했습니다: ' + error.message);
    } finally {
      setIsUploadingHtml(false);
    }
  };

  const handleHtmlFileButtonClick = () => {
    if (htmlFileInputRef.current) {
      htmlFileInputRef.current.click();
    }
  };

  const handleSave = async (publish = false) => {
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }

    if (publish && !categoryId) {
      alert('카테고리를 선택하세요.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug: slug || generateSlug(title),
          content,
          content_html: contentHtml,
          summary,
          thumbnail_url: thumbnailUrl,
          category_id: categoryId || null,
          tags: selectedTags,
          status: publish ? 'published' : 'draft',
          published_at: publish ? new Date().toISOString() : null
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '저장에 실패했습니다.');
      }

      // 임시저장 삭제
      localStorage.removeItem('post_draft');

      alert(publish ? '발행되었습니다.' : '저장되었습니다.');
      router.push('/admin/dashboard');
      
    } catch (error) {
      console.error('Save error:', error);
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

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
              {lastSaved && (
                <span className="text-xs text-[var(--color-text-secondary)] mr-2">
                  자동저장: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={saveDraft}
                className="action-button button-save"
              >
                임시 저장
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="action-button button-preview"
              >
                {showPreview ? '편집' : '미리보기'}
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="action-button button-save"
              >
                저장
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="action-button button-publish"
              >
                {isSaving ? '저장 중...' : '발행'}
              </button>
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
                    placeholder="자동 생성됨"
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

                {/* HTML 파일 업로드 */}
                <div className="meta-field md:col-span-2">
                  <label className="meta-label">HTML 파일 업로드 (iframe 블로그)</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleHtmlFileButtonClick}
                      disabled={isUploadingHtml}
                      className="upload-button flex-1"
                    >
                      {isUploadingHtml ? '업로드 중...' : 'HTML 파일 업로드'}
                    </button>
                    <input
                      ref={htmlFileInputRef}
                      type="file"
                      accept=".html,text/html"
                      onChange={handleHtmlFileUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                    HTML 파일을 업로드하면 자동으로 블로그 포스트가 생성되고 iframe으로 표시됩니다.
                  </p>
                </div>

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
                      <div key={tag.id} className="relative inline-block">
                        <button
                          type="button"
                          onClick={() => toggleTag(tag.id)}
                          className={`tag-chip ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                        >
                          {tag.name}
                        </button>
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (!confirm(`태그 "${tag.name}"을(를) 삭제하시겠습니까?`)) return;
                            
                            try {
                              const response = await fetch(`/api/tags/${tag.id}`, {
                                method: 'DELETE',
                                headers: getAuthHeaders()
                              });

                              if (response.ok) {
                                setTags(tags.filter(t => t.id !== tag.id));
                                setSelectedTags(selectedTags.filter(id => id !== tag.id));
                              } else {
                                const error = await response.json();
                                alert(error.error || '태그 삭제에 실패했습니다.');
                              }
                            } catch (error) {
                              console.error('Delete tag error:', error);
                              alert('태그 삭제 중 오류가 발생했습니다.');
                            }
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          title="태그 삭제"
                        >
                          ×
                        </button>
                      </div>
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
