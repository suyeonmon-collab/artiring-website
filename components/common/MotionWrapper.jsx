'use client';

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from 'react';

function useReveal({ immediate = false, once = true, amount = 0.2 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: amount }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, once, amount]);

  return { ref, visible };
}

export function MotionWrapper({
  children,
  className = '',
  animate,
  whileInView,
  viewport = { once: true, amount: 0.2 },
}) {
  const immediate = Boolean(animate && !whileInView);
  const { ref, visible } = useReveal({
    immediate,
    once: viewport?.once !== false,
    amount: viewport?.amount ?? 0.2,
  });

  return (
    <div
      ref={ref}
      className={`motion-reveal ${visible ? 'motion-reveal-visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
}) {
  const { ref, visible } = useReveal({ once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      className={`motion-stagger ${visible ? 'motion-stagger-visible' : ''} ${className}`.trim()}
      style={{ '--stagger-delay': `${staggerDelay}s` }}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child) && child.type === StaggerItem) {
          return cloneElement(child, { index });
        }
        return child;
      })}
    </div>
  );
}

export function StaggerItem({ children, className = '', index = 0 }) {
  return (
    <div
      className={`motion-stagger-item ${className}`.trim()}
      style={{ '--stagger-index': index }}
    >
      {children}
    </div>
  );
}
