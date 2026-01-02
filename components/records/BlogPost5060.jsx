'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function BlogPost5060() {
  useEffect(() => {
    // AOS 초기화
    if (typeof window !== 'undefined' && window.AOS) {
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
        }, 100);
      });
    } else {
      setTimeout(() => {
        initCounters();
        initCharts();
        initSocialShare();
        initSmoothScroll();
      }, 100);
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
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.umd.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        strategy="afterInteractive"
      />
    </>
  );
}

