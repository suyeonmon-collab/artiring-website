'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { common, createLowlight } from 'lowlight';
import { useCallback, useEffect, useRef } from 'react';
import EditorToolbar from './EditorToolbar';
import { getAuthHeaders } from '@/lib/authUtils';
import Iframe from './Iframe';

const lowlight = createLowlight(common);

export default function TipTapEditor({ content, onChange, placeholder = '내용을 입력하세요...' }) {
  // 이미지 업로드 함수를 ref로 저장하여 useEditor 내에서 참조 가능하게 함
  const uploadImageRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'editor-image',
        },
        addAttributes() {
          return {
            ...this.parent?.(),
            loading: {
              default: 'lazy',
            },
          };
        },
        parseHTML() {
          return [
            {
              tag: 'img[src]',
              getAttrs: (element) => {
                const src = element.getAttribute('src') || '';
                // 외부 이미지 URL 차단
                const blockedDomains = [
                  'postfiles.pstatic.net',
                  'dthumb-phinf.pstatic.net',
                  'cdninstagram.com',
                  'scontent-icn2-1.cdninstagram.com'
                ];
                const isBlocked = blockedDomains.some(domain => src.includes(domain));
                if (isBlocked) {
                  return false; // 파싱하지 않음 (이미지 제거)
                }
                return {};
              },
            },
          ];
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
        renderHTML({ HTMLAttributes }) {
          return ['a', { ...HTMLAttributes, class: 'editor-link' }, 0];
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Iframe,
    ],
    content,
    // SSR 하이드레이션 오류 방지
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
      onChange?.({ json, html });
    },
    editorProps: {
      attributes: {
        class: 'editor-content focus:outline-none',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            // ref를 통해 업로드 함수 호출
            if (uploadImageRef.current) {
              uploadImageRef.current(file);
            }
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of items) {
            if (item.type.startsWith('image/')) {
              event.preventDefault();
              const file = item.getAsFile();
              if (file && uploadImageRef.current) {
                uploadImageRef.current(file);
              }
              return true;
            }
          }
        }
        
        // HTML 텍스트에서 iframe 태그 감지 및 파싱
        const html = event.clipboardData?.getData('text/html') || event.clipboardData?.getData('text/plain');
        if (html && html.includes('<iframe')) {
          // iframe 태그 추출
          const iframeMatch = html.match(/<iframe([^>]*)>/i);
          if (iframeMatch) {
            event.preventDefault();
            
            // 속성 파싱
            const attrsString = iframeMatch[1];
            const attrs = {};
            
            // src 추출
            const srcMatch = attrsString.match(/src=["']([^"']+)["']/i);
            if (srcMatch) attrs.src = srcMatch[1];
            
            // width 추출
            const widthMatch = attrsString.match(/width=["']([^"']+)["']/i);
            if (widthMatch) attrs.width = widthMatch[1];
            else attrs.width = '100%';
            
            // height 추출
            const heightMatch = attrsString.match(/height=["']([^"']+)["']/i);
            if (heightMatch) attrs.height = heightMatch[1];
            else attrs.height = '2000px';
            
            // style 추출
            const styleMatch = attrsString.match(/style=["']([^"']+)["']/i);
            if (styleMatch) attrs.style = styleMatch[1];
            else attrs.style = 'border: none;';
            
            // frameborder 추출
            const frameborderMatch = attrsString.match(/frameborder=["']?([^"'\s]+)["']?/i);
            if (frameborderMatch) attrs.frameborder = frameborderMatch[1];
            else attrs.frameborder = '0';
            
            // iframe 삽입
            if (editor) {
              editor.chain().focus().setIframe(attrs).run();
            }
            return true;
          }
        }
        
        return false;
      },
    },
  });

  const handleImageUpload = useCallback(async (file) => {
    if (!file || !editor) {
      console.log('Image upload cancelled: no file or editor', { file, hasEditor: !!editor });
      return;
    }

    console.log('Starting image upload:', file.name, file.type, file.size);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const authHeaders = getAuthHeaders();
      console.log('Auth headers:', Object.keys(authHeaders));

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: authHeaders,
        body: formData,
      });

      console.log('Upload response status:', response.status);

      if (response.status === 401) {
        const result = await response.json();
        console.error('Auth error:', result);
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        return;
      }

      if (!response.ok) {
        const result = await response.json();
        console.error('Upload error response:', result);
        throw new Error(result.error || 'Upload failed');
      }

      const result = await response.json();
      console.log('Upload success:', result);

      if (result.url) {
        editor.chain().focus().setImage({ src: result.url }).run();
        console.log('Image inserted into editor');
      } else {
        throw new Error('No URL returned from upload');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('이미지 업로드에 실패했습니다: ' + error.message);
    }
  }, [editor]);

  // uploadImageRef에 함수 할당
  useEffect(() => {
    uploadImageRef.current = handleImageUpload;
  }, [handleImageUpload]);

  // content가 외부에서 변경될 때 에디터 업데이트
  useEffect(() => {
    if (editor && content && !editor.isDestroyed) {
      const currentContent = editor.getJSON();
      // 내용이 다를 때만 업데이트 (무한 루프 방지)
      if (JSON.stringify(currentContent) !== JSON.stringify(content)) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  if (!editor) {
    return (
      <div className="border border-[var(--color-border)] rounded-lg p-4 min-h-[500px] animate-pulse bg-[var(--color-bg-sub)]" />
    );
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white">
      <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
      <div className="border-t border-[var(--color-border)]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
