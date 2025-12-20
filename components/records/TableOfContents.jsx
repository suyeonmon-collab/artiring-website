'use client';

import { useState, useEffect } from 'react';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // HTML에서 헤딩 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');
    
    const items = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const level = parseInt(heading.tagName[1]);
      return {
        id,
        text: heading.textContent,
        level
      };
    });

    setHeadings(items);

    // 실제 DOM에 ID 추가
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const articleHeadings = document.querySelectorAll('.article-body h2, .article-body h3');
        articleHeadings.forEach((heading, index) => {
          heading.id = `heading-${index}`;
        });
      }, 100);
    }
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0 
      }
    );

    const timer = setTimeout(() => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length < 2) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="table-of-contents" aria-label="목차">
      <h2 className="toc-title">목차</h2>
      <ul className="toc-list">
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className="toc-item"
            style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`text-left w-full transition-colors ${
                activeId === heading.id
                  ? 'text-[var(--color-point)] font-medium'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {heading.level === 2 && `${index + 1}. `}
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
