import { MotionWrapper } from '@/components/common/MotionWrapper';
import PreReservationForm from '@/components/structure/PreReservationForm';

export const metadata = {
  title: '사전예약',
  description: '뮤모 앱 출시 소식을 가장 먼저 받아보세요.',
};

export default function StructurePage() {
  return (
    <div>
      <section id="preregister" className="page-section">
        <div className="max-w-content mx-auto px-5 md:px-20">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-[var(--color-primary)] mb-3 text-center">뮤모</p>
            <h1 className="font-accent text-2xl md:text-[32px] font-bold text-[var(--color-gray-900)] text-center">
              사전예약 신청
            </h1>
            <p className="mt-4 text-[var(--color-gray-700)] text-center max-w-lg mx-auto leading-relaxed">
              출시 알림을 가장 먼저 받아보세요.
            </p>
            <div className="mt-10 max-w-md mx-auto">
              <PreReservationForm />
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
}
