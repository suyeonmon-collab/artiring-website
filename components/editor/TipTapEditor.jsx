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
