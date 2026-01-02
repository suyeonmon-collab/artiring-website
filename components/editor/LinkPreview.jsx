'use client';

import { Node } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';

export const LinkPreview = Node.create({
  name: 'linkPreview',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
      title: {
        default: null,
      },
      description: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="link-preview"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'link-preview', ...HTMLAttributes }, 0];
  },

  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const { url, title, description } = node.attrs;

      return (
        <NodeViewWrapper className="link-preview-wrapper">
          <div
            className="link-preview-box border border-[var(--color-border)] rounded-lg p-4 my-4 bg-[var(--color-bg-sub)] hover:bg-[var(--color-border)] transition-colors"
            data-type="link-preview"
            {...HTMLAttributes}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {title && (
                <div className="font-semibold text-[var(--color-text-primary)] mb-1">
                  {title}
                </div>
              )}
              {description && (
                <div className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {description}
                </div>
              )}
              <div className="text-xs text-[var(--color-point)] truncate">
                {url}
              </div>
            </a>
          </div>
        </NodeViewWrapper>
      );
    };
  },
});

