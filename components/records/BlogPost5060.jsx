'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function BlogPost5060({ contentHtml }) {
  // 스크립트 로드 완료 확인 함수
  const checkScriptsLoaded = () => {
    return typeof window !== 'undefined' && 
           window.Chart && 
           (window.CountUp || window.countUp) && 
           window.AOS;
  };

  useEffect(() => {
    // 모든 스크립트가 로드될 때까지 대기
    const initAll = () => {
      if (!checkScriptsLoaded()) {
        setTimeout(initAll, 100);
        return;
      }

      // AOS 초기화
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          once: true,
          offset: 100
        });
      }

      // 카운터 애니메이션
      function initCounters() {
        if (typeof window === 'undefined') return;
        
        // CountUp.js가 로드되었는지 확인
        const CountUpClass = window.CountUp || window.countUp;
        
        if (!CountUpClass) {
          // CountUp.js가 없으면 직접 값 설정
          document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseFloat(el.dataset.count);
            if (target && !isNaN(target)) {
              const hasDecimal = target % 1 !== 0;
              const decimals = hasDecimal ? 1 : 0;
              el.textContent = target.toFixed(decimals);
            }
          });
          // 잠시 후 다시 시도
          setTimeout(initCounters, 500);
          return;
        }
        
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseFloat(el.dataset.count);
          if (target && !isNaN(target)) {
            const hasDecimal = target % 1 !== 0;
            const decimals = hasDecimal ? 1 : 0;
            
            const options = {
              duration: 2,
              useEasing: true,
              separator: ',',
              decimal: '.',
              decimals: decimals
            };
            
            try {
              const counter = new CountUpClass(el, target, options);
              
              if (counter.error) {
                el.textContent = target.toFixed(decimals);
                return;
              }
              
              // Intersection Observer로 뷰포트 진입 시 시작
              const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    counter.start();
                    observer.unobserve(entry.target);
                  }
                });
              }, { threshold: 0.5 });
              
              observer.observe(el);
            } catch (e) {
              el.textContent = target.toFixed(decimals);
            }
          }
        });
      }

      // 차트 초기화 함수
      function initCharts() {
        if (typeof window === 'undefined' || !window.Chart) {
          setTimeout(initCharts, 500);
          return;
        }
        
        const Chart = window.Chart;
        
        // 차트 1 생성 (노인 빈곤율)
        const ctx1 = document.getElementById('chart1');
        if (ctx1 && !ctx1.chart) {
          ctx1.chart = new Chart(ctx1.getContext('2d'), {
            type: 'bar',
            data: {
              labels: ['한국', '일본', '미국', '독일', 'OECD 평균'],
              datasets: [{
                label: '빈곤율 (%)',
                data: [40.4, 20.0, 23.1, 9.1, 14.2],
                backgroundColor: [
                  'rgba(90, 90, 90, 0.8)', 'rgba(90, 90, 90, 0.6)', 'rgba(90, 90, 90, 0.4)', 'rgba(90, 90, 90, 0.3)', 'rgba(65, 105, 225, 0.8)'
                ],
                borderWidth: 0,
                borderRadius: 8
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  padding: 12,
                  titleFont: { size: 14, weight: 'bold' },
                  bodyFont: { size: 13 },
                  cornerRadius: 8,
                  callbacks: {
                    label: function(context) {
                      return context.parsed.y + '%';
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: '#F3F4F6'
                  },
                  ticks: {
                    callback: function(value) {
                      return value + '%';
                    }
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
        }
        
        // 차트 2 생성 (디지털 역량)
        const ctx2 = document.getElementById('chart2');
        if (ctx2 && !ctx2.chart) {
          ctx2.chart = new Chart(ctx2.getContext('2d'), {
            type: 'line',
            data: {
              labels: ['20대', '30대', '40대', '50대', '60대 이상'],
              datasets: [{
                label: '디지털 역량 지수',
                data: [98.5, 96.2, 89.4, 75.3, 64.2],
                borderColor: 'rgba(65, 105, 225, 1)',
                backgroundColor: 'rgba(65, 105, 225, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: 'rgba(65, 105, 225, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  padding: 12,
                  titleFont: { size: 14, weight: 'bold' },
                  bodyFont: { size: 13 },
                  cornerRadius: 8,
                  callbacks: {
                    label: function(context) {
                      return '디지털 역량 지수: ' + context.parsed.y + '점';
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  grid: {
                    color: '#F3F4F6'
                  },
                  ticks: {
                    callback: function(value) {
                      return value + '점';
                    }
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
        }
        
        // 차트 3 생성 (소득 비교)
        const ctx3 = document.getElementById('chart3');
        if (ctx3 && !ctx3.chart) {
          ctx3.chart = new Chart(ctx3.getContext('2d'), {
            type: 'bar',
            data: {
              labels: ['Before (기존)', 'After (아티링)'],
              datasets: [
                {
                  label: '최저 월소득',
                  data: [0, 150],
                  backgroundColor: 'rgba(90, 90, 90, 0.6)'
                },
                {
                  label: '평균 월소득',
                  data: [50, 200],
                  backgroundColor: 'rgba(90, 90, 90, 0.8)'
                },
                {
                  label: '최대 월소득',
                  data: [100, 250],
                  backgroundColor: 'rgba(65, 105, 225, 0.8)'
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  padding: 12,
                  titleFont: { size: 14, weight: 'bold' },
                  bodyFont: { size: 13 },
                  cornerRadius: 8,
                  callbacks: {
                    label: function(context) {
                      return context.dataset.label + ': ' + context.parsed.y + '만원';
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: '#F3F4F6'
                  },
                  ticks: {
                    callback: function(value) {
                      return value + '만원';
                    }
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
        }
      }

      // 소셜 공유
      function initSocialShare() {
        document.querySelectorAll('.share-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;
            if (platform) {
              const url = encodeURIComponent(window.location.href);
              const title = encodeURIComponent(document.title);
              
              let shareUrl;
              switch(platform) {
                case 'twitter':
                  shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                  break;
                case 'facebook':
                  shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                  break;
                case 'linkedin':
                  shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                  break;
              }
              
              if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
              }
            } else if (btn.classList.contains('copy-link')) {
              navigator.clipboard.writeText(window.location.href).then(() => {
                alert('링크가 복사되었습니다!');
              });
            }
          });
        });
      }

      // Smooth Scroll
      function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });
      }

      // DOM 로드 후 초기화
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(() => {
            initCounters();
            initCharts();
            initSocialShare();
            initSmoothScroll();
          }, 200);
        });
      } else {
        setTimeout(() => {
          initCounters();
          initCharts();
          initSocialShare();
          initSmoothScroll();
        }, 200);
      }
    };

    // 초기화 시작
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }, []);

  useEffect(() => {
    // AOS CSS 동적 로드
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
      document.head.appendChild(link);
      
      return () => {
        // Cleanup
        const existingLink = document.querySelector(`link[href="${link.href}"]`);
        if (existingLink) {
          existingLink.remove();
        }
      };
    }
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Chart.js 로드 완료
          if (typeof window !== 'undefined') {
            window.Chart = window.Chart || window.chart;
          }
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          // CountUp.js 로드 완료
          if (typeof window !== 'undefined') {
            window.CountUp = window.CountUp || window.countUp;
          }
        }}
      />
      <Script
        src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        strategy="afterInteractive"
        onLoad={() => {
          // AOS 로드 완료
          if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
              duration: 800,
              once: true,
              offset: 100
            });
          }
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        /* ===== Color Variables ===== */
        :root {
            --blue: #4169E1;
            --gray: #5A5A5A;
            --green: #2ECC71;
            --beige: #F5DEB3;
            --purple: #9B59B6;
            --sky: #87CEEB;
            --pink: #FF69B4;
            --yellow: #FFD700;
            --black: #2C2C2C;
            --white: #FFFFFF;
            --bg-light: #FAFAFA;
        }

        /* ===== Container ===== */
        .blog-post-5060-content .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        .blog-post-5060-content .container-narrow {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* ===== Hero Section ===== */
        .blog-post-5060-content .hero-section {
            background: white;
            padding: 80px 0 60px;
            text-align: center;
        }

        .blog-post-5060-content .breadcrumb {
            font-size: 14px;
            color: var(--gray);
            margin-bottom: 24px;
        }

        .blog-post-5060-content .breadcrumb span:last-child {
            color: var(--blue);
            font-weight: 600;
        }

        .blog-post-5060-content .hero-title {
            font-size: clamp(32px, 5vw, 56px);
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
            color: var(--black);
        }

        .blog-post-5060-content .hero-subtitle {
            font-size: clamp(18px, 2.5vw, 24px);
            color: var(--gray);
            margin-bottom: 32px;
            line-height: 1.5;
        }

        .blog-post-5060-content .meta-info {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            color: var(--gray);
            flex-wrap: wrap;
        }

        .blog-post-5060-content .meta-info .divider {
            color: #D1D5DB;
        }

        /* ===== Key Stats ===== */
        .blog-post-5060-content .key-stats-section {
            padding: 60px 0;
        }

        .blog-post-5060-content .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
        }

        .blog-post-5060-content .stat-card {
            background: white;
            padding: 40px 32px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .blog-post-5060-content .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }

        .blog-post-5060-content .stat-icon {
            font-size: 48px;
            margin-bottom: 16px;
        }

        .blog-post-5060-content .stat-number {
            font-size: 56px;
            font-weight: 900;
            color: var(--blue);
            line-height: 1;
            margin-bottom: 4px;
        }

        .blog-post-5060-content .stat-unit {
            font-size: 24px;
            font-weight: 700;
            color: var(--blue);
            margin-bottom: 12px;
        }

        .blog-post-5060-content .stat-label {
            font-size: 16px;
            color: var(--gray);
            font-weight: 500;
        }

        /* ===== Content Section ===== */
        .blog-post-5060-content .content-section {
            padding: 80px 0;
            width: 100%;
        }
        
        .blog-post-5060-content .content-section .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        .blog-post-5060-content .section-header {
            text-align: center;
            margin-bottom: 48px;
        }

        .blog-post-5060-content .section-tag {
            display: inline-block;
            padding: 6px 16px;
            background: var(--blue);
            color: white;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-radius: 20px;
            margin-bottom: 16px;
        }

        .blog-post-5060-content .section-title {
            font-size: clamp(28px, 4vw, 40px);
            font-weight: 700;
            margin-bottom: 16px;
            line-height: 1.3;
            color: var(--black);
        }

        /* ===== Content Card ===== */
        .blog-post-5060-content .content-card {
            background: white;
            border-radius: 16px;
            padding: 48px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .blog-post-5060-content .card-body {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        .blog-post-5060-content .text-block {
            max-width: 680px;
            margin: 0 auto;
        }

        .blog-post-5060-content .text-block p {
            font-size: 18px;
            line-height: 1.8;
            color: var(--gray);
            margin-bottom: 20px;
        }

        .blog-post-5060-content .lead-text {
            font-size: 20px;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 20px;
            line-height: 1.6;
        }

        /* ===== Chart ===== */
        .blog-post-5060-content .chart-wrapper {
            background: var(--bg-light);
            padding: 32px;
            border-radius: 12px;
        }

        .blog-post-5060-content .chart-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 24px;
            text-align: center;
            color: var(--black);
        }

        .blog-post-5060-content .chart-caption {
            margin-top: 16px;
            font-size: 14px;
            color: var(--gray);
            text-align: center;
        }

        .blog-post-5060-content canvas {
            max-height: 400px;
        }

        /* ===== Quote ===== */
        .blog-post-5060-content .quote-section {
            padding: 80px 0;
            background: var(--blue);
            color: white;
        }

        .blog-post-5060-content .big-quote {
            text-align: center;
            padding: 0;
            border: none;
        }

        .blog-post-5060-content .big-quote p {
            font-size: clamp(24px, 3vw, 36px);
            font-weight: 700;
            line-height: 1.4;
            margin-bottom: 24px;
        }

        .blog-post-5060-content .big-quote cite {
            font-size: 16px;
            font-style: normal;
            opacity: 0.8;
        }

        /* ===== Comparison Grid ===== */
        .blog-post-5060-content .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
            width: 100%;
            justify-items: stretch;
        }

        .blog-post-5060-content .compare-card {
            background: white;
            border-radius: 16px;
            padding: 40px 32px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.3s;
            width: 100%;
            box-sizing: border-box;
        }

        .blog-post-5060-content .compare-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }

        .blog-post-5060-content .compare-card.before {
            border-top: 4px solid var(--gray);
        }

        .blog-post-5060-content .compare-card.after {
            border-top: 4px solid var(--blue);
        }

        .blog-post-5060-content .card-header {
            margin-bottom: 24px;
        }

        .blog-post-5060-content .card-header h3 {
            font-size: 24px;
            font-weight: 700;
            margin: 0;
            color: var(--black);
        }

        .blog-post-5060-content .big-number {
            font-size: 64px;
            font-weight: 900;
            line-height: 1;
            margin-bottom: 16px;
        }

        .blog-post-5060-content .big-number.color-gray {
            color: var(--gray);
        }

        .blog-post-5060-content .big-number.color-blue {
            color: var(--blue);
        }

        .blog-post-5060-content .compare-card p {
            font-size: 18px;
            color: var(--gray);
            line-height: 1.7;
            margin-bottom: 20px;
        }

        .blog-post-5060-content .feature-list {
            list-style: none;
            padding: 0;
            margin-top: 24px;
        }

        .blog-post-5060-content .feature-list li {
            padding: 12px 0 12px 32px;
            position: relative;
            font-size: 17px;
            color: var(--gray);
            line-height: 1.7;
        }

        .blog-post-5060-content .feature-list li::before {
            content: '•';
            position: absolute;
            left: 12px;
            color: var(--gray);
        }

        /* ===== Timeline ===== */
        .blog-post-5060-content .timeline {
            position: relative;
            padding-left: 40px;
        }

        .blog-post-5060-content .timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--blue);
        }

        .blog-post-5060-content .timeline-item {
            position: relative;
            padding-bottom: 48px;
        }

        .blog-post-5060-content .timeline-marker {
            position: absolute;
            left: -40px;
            top: 0;
            width: 32px;
            height: 32px;
            background: var(--blue);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
        }

        .blog-post-5060-content .timeline-content h4 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
            color: var(--black);
        }

        .blog-post-5060-content .timeline-content p {
            font-size: 18px;
            color: var(--gray);
            line-height: 1.7;
        }

        /* ===== Source Section ===== */
        .blog-post-5060-content .source-section {
            padding: 40px 0;
            background: var(--bg-light);
        }
        
        .blog-post-5060-content .source-text {
            text-align: center;
            font-size: 14px;
            color: var(--gray);
            opacity: 0.7;
        }
        
        /* ===== CTA Section ===== */
        .blog-post-5060-content .cta-section {
            padding: 80px 0;
            background: var(--black);
            color: white;
        }

        .blog-post-5060-content .cta-card {
            text-align: center;
            padding: 60px 40px;
            background: var(--black);
            border-radius: 20px;
        }

        .blog-post-5060-content .cta-title {
            font-size: clamp(28px, 4vw, 40px);
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.3;
        }

        .blog-post-5060-content .cta-description {
            font-size: 18px;
            opacity: 0.8;
            margin-bottom: 40px;
            line-height: 1.6;
        }

        .blog-post-5060-content .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }

        .blog-post-5060-content .btn {
            display: inline-block;
            padding: 16px 40px;
            font-size: 16px;
            font-weight: 700;
            border-radius: 50px;
            text-decoration: none;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
            border: none;
        }

        .blog-post-5060-content .btn:hover {
            transform: scale(1.05);
        }

        .blog-post-5060-content .btn-primary {
            background: var(--yellow);
            color: var(--black);
        }

        .blog-post-5060-content .btn-primary:hover {
            box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
        }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
            .blog-post-5060-content .hero-section {
                padding: 60px 0 40px;
            }
            
            .blog-post-5060-content .content-card {
                padding: 32px 24px;
            }
            
            .blog-post-5060-content .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .blog-post-5060-content .comparison-grid {
                grid-template-columns: 1fr;
            }
            
            .blog-post-5060-content .cta-buttons {
                flex-direction: column;
            }
            
            .blog-post-5060-content .btn {
                width: 100%;
            }
        }
      `}} />
      <div 
        className="blog-post-5060-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </>
  );
}
