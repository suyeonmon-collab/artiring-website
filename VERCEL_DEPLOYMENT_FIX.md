# Vercel 배포 문제 해결 가이드

## 문제
Vercel이 오래된 커밋(`342a92f`)을 배포하고 있습니다.
최신 커밋(`e6b8d89` 또는 `5c8e68b`)이 배포되지 않고 있습니다.

## 해결 방법

### 방법 1: Vercel 대시보드에서 수동 재배포 (권장)

1. **Vercel 대시보드 접속**
   - https://vercel.com/suyeonmon-collabs-projects/artiring

2. **Deployments 탭으로 이동**

3. **최신 배포 선택**
   - 배포 목록에서 가장 최근 배포를 찾습니다

4. **재배포 실행**
   - 배포 카드 우측 상단의 "..." 메뉴 클릭
   - "Redeploy" 선택
   - **중요**: "Use existing Build Cache" 체크박스를 **해제**
   - "Redeploy" 버튼 클릭

5. **배포 확인**
   - 배포 로그에서 커밋 해시 확인
   - `e6b8d89` 또는 `5c8e68b`가 표시되어야 합니다
   - `342a92f`가 아닌지 확인

### 방법 2: 빌드 캐시 클리어

1. **Settings → General → Build & Development Settings**
2. **"Clear Build Cache"** 버튼 클릭
3. 새 배포 트리거

### 방법 3: Git 연동 재설정

1. **Settings → Git**
2. GitHub 연동 상태 확인
3. 문제가 있으면 "Disconnect" 후 다시 연결

## 확인 사항

### 최신 커밋 정보
- 최신 커밋 해시: `e6b8d89`
- 포함된 변경사항:
  - Next.js 14.2.35 업그레이드
  - API routes에 `dynamic = 'force-dynamic'` 추가
  - 빌드 캐시 무효화 설정

### 배포 후 확인
- Next.js 버전: `14.2.35` (경고 없어야 함)
- `dynamic = 'force-dynamic'` 오류 해결 확인
- `/api/auth/session` 엔드포인트 정상 작동 확인

## 참고
- Vercel은 GitHub webhook을 통해 자동 배포됩니다
- webhook이 작동하지 않으면 수동 재배포가 필요합니다
- 빌드 캐시를 클리어하면 최신 소스로 빌드됩니다

