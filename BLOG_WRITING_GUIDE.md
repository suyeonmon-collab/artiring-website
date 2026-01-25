# 아티링 블로그 작성 가이드

## 📋 목차
1. [개요](#개요)
2. [HTML 구조](#html-구조)
3. [스타일 가이드](#스타일-가이드)
4. [콘텐츠 구조](#콘텐츠-구조)
5. [컴포넌트 사용법](#컴포넌트-사용법)
6. [톤과 어조](#톤과-어조)
7. [SEO 최적화](#seo-최적화)
8. [체크리스트](#체크리스트)

---

## 개요

이 가이드는 아티링 블로그 글을 작성할 때 따라야 할 통일된 스타일과 구조를 정의합니다. 모든 블로그 글은 이 가이드를 준수하여 일관성 있는 사용자 경험을 제공합니다.

### 기본 원칙
- **데이터 중심**: 통계, 숫자, 차트를 활용한 객관적 근거 제시
- **시각적 표현**: 비교 카드, 타임라인, 차트 등으로 정보 전달
- **명확한 구조**: Hero → Key Stats → Sections → CTA 순서
- **반응형 디자인**: 모바일과 데스크톱 모두 최적화

---

## HTML 구조

### 1. 기본 템플릿

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[제목] | 아티링</title>
    
    <!-- CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.umd.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    
    <style>
        /* CSS는 여기에 */
    </style>
</head>
<body>
    <!-- Hero Section -->
    <!-- Key Stats Section -->
    <!-- Content Sections -->
    <!-- Quote Section (선택) -->
    <!-- Source Section -->
    <!-- CTA Section -->
    
    <script>
        // JavaScript는 여기에
    </script>
</body>
</html>
```

### 2. 필수 CDN
- **Pretendard 폰트**: 한글 최적화 폰트
- **AOS (Animate On Scroll)**: 스크롤 애니메이션
- **Chart.js**: 차트 생성
- **CountUp.js**: 숫자 카운터 애니메이션

---

## 스타일 가이드

### 1. 색상 변수 (CSS Variables)

모든 블로그 글에서 동일한 색상 팔레트를 사용합니다:

```css
:root {
    --blue: #4169E1;      /* 주요 강조색, 링크, 배지 */
    --gray: #5A5A5A;      /* 본문 텍스트, 보조 정보 */
    --green: #2ECC71;      /* 성공, 긍정적 메시지 */
    --beige: #F5DEB3;      /* 배경, 강조 */
    --purple: #9B59B6;     /* 특별 강조 */
    --sky: #87CEEB;        /* 보조 강조 */
    --pink: #FF69B4;       /* 특별 강조 */
    --yellow: #FFD700;     /* CTA 버튼 */
    --black: #2C2C2C;      /* 제목, 주요 텍스트 */
    --white: #FFFFFF;      /* 배경 */
    --bg-light: #FAFAFA;   /* 섹션 배경 */
}
```

### 2. 컨테이너

```css
.container {
    max-width: 1200px;  /* 넓은 레이아웃 (차트, 그리드) */
    margin: 0 auto;
    padding: 0 24px;
}

.container-narrow {
    max-width: 800px;   /* 좁은 레이아웃 (본문, 타임라인) */
    margin: 0 auto;
    padding: 0 24px;
}
```

### 3. 타이포그래피

- **Hero Title**: `clamp(32px, 5vw, 56px)`, `font-weight: 800`
- **Hero Subtitle**: `clamp(18px, 2.5vw, 24px)`, `color: var(--gray)`
- **Section Title**: `clamp(28px, 4vw, 40px)`, `font-weight: 700`
- **본문**: `font-size: 18px`, `line-height: 1.8`
- **Lead Text**: `font-size: 20px`, `font-weight: 600`

---

## 콘텐츠 구조

### 1. Hero Section (필수)

```html
<section class="hero-section">
    <div class="container-narrow">
        <div class="breadcrumb">
            <span>블로그</span> > <span>[카테고리]</span>
        </div>
        
        <h1 class="hero-title" data-aos="fade-up">
            [메인 제목]
        </h1>
        
        <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
            [부제목: 핵심 메시지를 한 문장으로]
        </p>
        
        <div class="meta-info" data-aos="fade-up" data-aos-delay="200">
            <span class="author">[작성자]</span>
            <span class="divider">•</span>
            <span class="date">[날짜]</span>
            <span class="divider">•</span>
            <span class="read-time">[X]분 읽기</span>
        </div>
    </div>
</section>
```

**가이드라인:**
- 제목: 명확하고 검색 가능한 키워드 포함
- 부제목: 핵심 문제나 솔루션을 한 문장으로 요약
- 읽기 시간: 실제 읽기 시간 기준 (평균 200-250자/분)

### 2. Key Stats Section (권장)

주요 통계를 시각적으로 강조합니다:

```html
<section class="key-stats-section">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-card" data-aos="fade-up">
                <div class="stat-icon">[이모지]</div>
                <div class="stat-number" data-count="[숫자]">0</div>
                <div class="stat-unit">[단위]</div>
                <div class="stat-label">[설명]</div>
            </div>
            <!-- 최대 3개 권장 -->
        </div>
    </div>
</section>
```

**가이드라인:**
- 통계는 객관적이고 검증 가능한 데이터 사용
- 이모지는 통계의 성격을 나타냄 (예: 💸 소득, 📉 감소, 📈 증가)
- 숫자는 CountUp.js로 애니메이션 처리

### 3. Content Sections

#### 3.1 섹션 헤더

```html
<div class="section-header" data-aos="fade-up">
    <span class="section-tag">[태그]</span>
    <h2 class="section-title">[섹션 제목]</h2>
</div>
```

**섹션 태그 종류:**
- `Problem`: 문제 제시
- `Data`: 데이터 분석
- `Analysis`: 분석
- `Solution`: 해결책
- `Process`: 프로세스
- `Case Study`: 사례 연구

#### 3.2 Content Card

```html
<div class="content-card" data-aos="fade-up">
    <div class="card-body">
        <div class="text-block">
            <p class="lead-text">[강조할 텍스트]</p>
            <p>[본문 내용]</p>
        </div>
        
        <!-- 차트, 비교 카드, 타임라인 등 추가 -->
    </div>
</div>
```

### 4. 비교 카드 (Before/After)

프리랜서 vs 에이전시 비교 시 사용:

```html
<div class="comparison-grid">
    <div class="compare-card before">
        <div class="card-header">
            <span class="badge badge-gray">[Before 라벨]</span>
            <h3>[제목]</h3>
        </div>
        <ul class="feature-list">
            <li>● [항목 1]</li>
            <li>● [항목 2]</li>
        </ul>
    </div>
    
    <div class="compare-card after">
        <div class="card-header">
            <span class="badge badge-blue">[After 라벨]</span>
            <h3>[제목]</h3>
        </div>
        <ul class="feature-list">
            <li class="highlight">✓ [항목 1]</li>
            <li class="highlight">✓ [항목 2]</li>
        </ul>
    </div>
</div>
```

**가이드라인:**
- Before: 회색 배지, 불리한 점 (● 사용)
- After: 파란색 배지, 유리한 점 (✓ 사용, `highlight` 클래스)

### 5. 타임라인

프로세스나 단계별 설명 시 사용:

```html
<div class="timeline">
    <div class="timeline-item" data-aos="fade-up">
        <div class="timeline-marker">1</div>
        <div class="timeline-content">
            <h4>[단계 제목]</h4>
            <p>[설명]</p>
        </div>
    </div>
    <!-- 최대 4-5단계 권장 -->
</div>
```

### 6. 차트 (Chart.js)

```html
<div class="chart-wrapper">
    <h3 class="chart-title">[차트 제목]</h3>
    <canvas id="chart1"></canvas>
    <p class="chart-caption">[출처 또는 설명]</p>
</div>
```

**차트 초기화 예시:**
```javascript
const ctx1 = document.getElementById('chart1');
if (ctx1) {
    const chart1 = new Chart(ctx1.getContext('2d'), {
        type: 'bar', // 또는 'line', 'pie', 'doughnut'
        data: {
            labels: ['라벨1', '라벨2'],
            datasets: [{
                label: '데이터셋',
                data: [값1, 값2],
                backgroundColor: 'var(--blue)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });
}
```

### 7. Quote Section (선택)

강조할 인용구가 있을 때 사용:

```html
<section class="quote-section">
    <div class="container-narrow">
        <blockquote class="big-quote" data-aos="fade-up">
            <p>"[인용구]"</p>
            <cite>[출처]</cite>
        </blockquote>
    </div>
</section>
```

### 8. Source Section (필수)

데이터 출처 명시:

```html
<section class="source-section">
    <div class="container-narrow">
        <p class="source-text" data-aos="fade-up">
            출처: [출처1], [출처2], [출처3]
        </p>
    </div>
</section>
```

### 9. CTA Section (필수)

행동 유도 버튼:

```html
<section class="cta-section">
    <div class="container-narrow">
        <div class="cta-card" data-aos="zoom-in">
            <h3 class="cta-title">[CTA 제목]</h3>
            <p class="cta-description">[설명]</p>
            
            <div class="cta-buttons">
                <a href="https://www.artiring.com" class="btn btn-primary">더 알아보기</a>
            </div>
        </div>
    </div>
</section>
```

---

## 컴포넌트 사용법

### 1. 이모지 사용

- **통계 아이콘**: 💸 (소득), 📉 (감소), 📈 (증가), 💻 (디지털), 🛡️ (보험), ⚖️ (법률)
- **리스트 아이콘**: ✓ (긍정), ● (일반), ❌ (부정)
- **섹션 구분**: 각 섹션의 주요 키워드에 맞는 이모지 사용

### 2. AOS 애니메이션

```html
<div data-aos="fade-up" data-aos-delay="100">
    <!-- 콘텐츠 -->
</div>
```

**애니메이션 타입:**
- `fade-up`: 위로 페이드 인 (가장 많이 사용)
- `fade-down`: 아래로 페이드 인
- `zoom-in`: 확대
- `fade-left`: 왼쪽에서 페이드 인
- `fade-right`: 오른쪽에서 페이드 인

**지연 시간:**
- `data-aos-delay="100"`: 100ms 지연
- 연속된 요소는 100ms씩 증가 권장

### 3. CountUp 애니메이션

```html
<div class="stat-number" data-count="70">0</div>
```

- 숫자는 `data-count` 속성에 설정
- 초기값은 `0`으로 설정 (자동으로 카운트업)

---

## 톤과 어조

### 1. 기본 원칙

- **객관적**: 데이터와 통계로 근거 제시
- **명확한**: 전문 용어는 설명과 함께 사용
- **공감적**: 프리랜서의 어려움을 이해하는 톤
- **해결책 제시**: 문제만 제시하지 않고 솔루션 제시

### 2. 금지 표현

- ❌ "소속사" → ✅ "에이전시" (통일된 용어 사용)
- ❌ 모호한 표현 ("많다", "적다") → ✅ 구체적 숫자 ("70%", "280만명")
- ❌ 과장된 표현 → ✅ 검증 가능한 데이터

### 3. 권장 표현

- "데이터로 보면..."
- "실제 사례를 분석하면..."
- "통계에 따르면..."
- "아티링의 해결책은..."

---

## SEO 최적화

### 1. 제목 (Title)

```
[주요 키워드] | 아티링
```

예: "프리랜서 실수령 30%의 진실 | 아티링"

### 2. 메타 정보

- Hero Section의 부제목이 메타 description으로 활용됨
- 읽기 시간은 실제 읽기 시간 기준

### 3. 키워드 배치

- 제목에 주요 키워드 포함
- 본문 첫 단락에 키워드 자연스럽게 포함
- 섹션 제목에도 관련 키워드 포함

### 4. 구조화된 데이터

- HTML 파일 내 텍스트는 검색 엔진이 인덱싱 가능
- 제목 태그 (`h1`, `h2`, `h3`) 적절히 사용
- 의미 있는 클래스명 사용

---

## 체크리스트

### 작성 전

- [ ] 주제와 타겟 독자 명확히 정의
- [ ] 검증 가능한 데이터 수집
- [ ] 차트/그래프에 필요한 데이터 준비
- [ ] 출처 확인

### 작성 중

- [ ] Hero Section: 제목, 부제목, 메타 정보 완성
- [ ] Key Stats: 주요 통계 2-3개 포함
- [ ] Content Sections: 섹션 태그와 제목 명확히
- [ ] 비교 카드: Before/After 구조 사용
- [ ] 차트: Chart.js로 시각화
- [ ] 타임라인: 프로세스 설명 시 사용
- [ ] Source Section: 출처 명시
- [ ] CTA Section: 행동 유도 버튼 포함

### 작성 후

- [ ] 색상 변수 일관성 확인
- [ ] 반응형 디자인 테스트 (모바일, 태블릿, 데스크톱)
- [ ] AOS 애니메이션 작동 확인
- [ ] CountUp 애니메이션 작동 확인
- [ ] 차트 정확성 확인
- [ ] 외부 이미지 URL 제거 확인 (403 오류 방지)
- [ ] "소속사" → "에이전시" 용어 통일 확인
- [ ] 읽기 시간 정확성 확인
- [ ] 링크 작동 확인
- [ ] 오타 및 문법 검사

### 업로드 전

- [ ] 파일명: `YYYYMMDD-slug.html` 형식 (예: `20260131-freelancer-30percent-truth.html`)
- [ ] HTML 파일이 `public/blog` 폴더에 저장되었는지 확인
- [ ] 에디터에서 HTML 파일 업로드
- [ ] 블로그 글 제목, 슬러그, 카테고리, 태그 설정
- [ ] 썸네일 이미지 업로드
- [ ] 발행 전 미리보기 확인

---

## 예시 파일 참고

기존 블로그 글을 참고하여 구조를 파악하세요:

- `20260131-freelancer-30percent-truth.html`: 비교 카드, 타임라인, 차트 사용 예시
- `20260112-freelancer-vs-agency.html`: Before/After 비교 구조 예시
- `20260108-kpop.html`: 타임라인, 비교 그리드 예시
- `blog-template-v2.html`: 전체 구조 템플릿

---

## 문의

블로그 작성 중 질문이나 문제가 있으면 개발팀에 문의하세요.

**마지막 업데이트**: 2026년 1월 31일

