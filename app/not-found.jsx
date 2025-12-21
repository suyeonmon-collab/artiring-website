import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-[var(--color-point)]">404</h1>
        <p className="mt-4 text-xl font-medium">페이지를 찾을 수 없습니다</p>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            홈으로 돌아가기
          </Link>
          <Link href="/records" className="btn btn-secondary">
            기록 보기
          </Link>
        </div>
      </div>
    </div>
  );
}





