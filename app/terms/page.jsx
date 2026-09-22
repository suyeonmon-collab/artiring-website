import Link from 'next/link';
import SupportNav from '@/components/support/SupportNav';

export const metadata = {
  title: '이용약관 - 아티링',
  description:
    'Meowmo(뮤모) 서비스 이용약관. 위치 기반 카드 수집, 안전수칙, 확률형 카드, 장애 보상 기준을 안내합니다.',
};

const EFFECTIVE_DATE = '2026년 10월 22일';

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container-narrow">
        <header className="mb-8">
          <Link
            href="/support"
            className="inline-flex items-center text-sm text-[var(--color-gray-700)] hover:text-[var(--color-gray-900)] transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            고객센터로 돌아가기
          </Link>
          <h1 className="font-accent text-3xl md:text-4xl tracking-tight text-[var(--color-gray-900)]">
            이용약관
          </h1>
          <p className="mt-2 text-sm text-[var(--color-gray-500)]">
            시행일: {EFFECTIVE_DATE}
          </p>
          <p className="mt-3 text-[15px] text-[var(--color-gray-700)] leading-relaxed">
            Meowmo(뮤모) 앱 내 약관과 동일한 내용입니다.
          </p>
        </header>

        <SupportNav current="/support/notices" />

        <div className="space-y-10 text-[15px] text-[var(--color-gray-700)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제1조 (목적)
            </h2>
            <p>
              본 약관은 임수연(이하 &ldquo;회사&rdquo;)가 제공하는 Meowmo 서비스(이하 &ldquo;서비스&rdquo;)의
              이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임사항을 정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제2조 (정의)
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>&ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는 회원을 말합니다.</li>
              <li>
                &ldquo;스팟&rdquo;이란 작가·상점 등 파트너가 캐릭터 카드를 노출·배포하는 오프라인 장소를
                말합니다.
              </li>
              <li>
                &ldquo;캐릭터 카드&rdquo;란 이용자가 스팟 방문 또는 이벤트 참여를 통해 수집하는 서비스 내
                디지털 아이템을 말합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제3조 (약관의 효력 및 변경)
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다.</li>
              <li>
                회사는 관계 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시
                적용일자 7일 전(이용자에게 불리한 변경은 30일 전)부터 공지합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제4조 (서비스의 제공 및 변경)
            </h2>
            <p>
              회사는 위치 기반 캐릭터 카드 수집, 스팟 탐색, 쿠폰 발급·사용 등의 기능을 제공하며,
              운영상·기술상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제5조 (회원가입 및 탈퇴)
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>이용자는 카카오 계정 연동을 통해 간편하게 가입할 수 있습니다.</li>
              <li>
                이용자는 언제든지 앱 내 &ldquo;내 정보 &gt; 고객센터 &gt; 계정관리&rdquo;에서 탈퇴할 수
                있으며, 탈퇴 시 문의·삭제 요청 데이터를 포함해 관련 법령이 정한 경우를 제외한
                개인정보는 즉시 파기됩니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제6조 (이용자의 의무)
            </h2>
            <p className="mb-3">이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                가짜 GPS(Mock Location), 자동화 도구 등을 이용해 실제 위치를 조작하여 캐릭터
                카드·쿠폰을 부정하게 수집하는 행위
              </li>
              <li>타인의 계정을 도용하거나 서비스 정보를 무단으로 수집·복제·배포하는 행위</li>
              <li>서비스의 정상적인 운영을 방해하는 행위(과도한 반복 요청 등)</li>
              <li>쿠폰을 부정한 방법으로 발급·사용하거나 재판매하는 행위</li>
              <li>부정한 목적으로 다수의 계정을 생성·이용하는 행위</li>
              <li>스팟을 허위로 위험·사유지 등으로 신고하는 행위</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제7조 (서비스 이용제한)
            </h2>
            <p>
              회사는 이용자가 제6조를 위반하거나 서비스 운영을 방해한 경우, 사전 통지 후(긴급한
              경우 사후 통지) 서비스 이용을 제한할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제8조 (저작권)
            </h2>
            <p>
              서비스 내 캐릭터 카드 이미지 등 콘텐츠에 대한 저작권은 회사 또는 각 스팟(작가)
              파트너에게 있으며, 이용자는 회사의 사전 동의 없이 이를 영리 목적으로 복제·배포할 수
              없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제9조 (면책조항)
            </h2>
            <p>
              회사는 천재지변, 통신장애 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이
              면제됩니다. 오프라인 스팟 방문 과정에서 발생한 이용자의 안전사고에 대해 회사는
              책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제10조 (분쟁해결)
            </h2>
            <p>
              서비스 이용과 관련하여 분쟁이 발생한 경우, 회사와 이용자는 상호 협의하여 해결하도록
              노력하며, 협의가 되지 않을 경우 관련 법령 및 상관례에 따릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제11조 (위치정보 이용 시 안전수칙 및 스팟 신고)
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                이용자는 서비스 이용 중 이동하는 차량 등을 운전하면서 앱을 조작해서는 안 되며,
                반드시 안전한 장소에 정지한 상태에서 이용해야 합니다.
              </li>
              <li>
                스팟이 사유지, 차도 인근, 공사장, 인적이 드문 심야 장소 등 위험하다고 판단되는
                경우 방문하지 말고 앱 내 신고 기능을 이용해 주시기 바랍니다.
              </li>
              <li>
                회사는 신고된 스팟을 확인하여 위험하다고 판단되는 경우 즉시 비활성화하는 등 안전
                확보를 위해 노력하며, 서로 다른 이용자의 신고가 일정 건수 이상 누적된 스팟은
                자동으로 비활성화될 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제12조 (확률형 카드 정보 공개)
            </h2>
            <p>
              회사는 스팟에서 등장하는 캐릭터 카드의 등급별 확률을 서비스 내 및 회사 홈페이지에
              공개하며, 관련 법령(확률형 아이템 정보공개 제도)을 준수합니다. 확률은 운영 정책에
              따라 변경될 수 있으며, 변경 시 사전에 공지합니다.
            </p>
            <p className="mt-2 text-sm text-[var(--color-gray-500)]">
              ※ 등급별 확률표는 확정 후{' '}
              <Link href="/support/notices" className="text-[var(--color-secondary-blue)] hover:underline">
                고객센터 공지
              </Link>
              에 게시합니다. 앱 내 표시와 함께 적용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              제13조 (서비스 장애 시 보상)
            </h2>
            <p>
              회사는 서비스 장애를 자동으로 감지하는 시스템을 운영하며, 장애가 일정 시간 이상
              지속된 경우 그 지속 시간에 따라 이용자에게 게임 재화를 보상으로 지급할 수 있습니다.
              구체적인 보상 기준은 공지사항을 통해 안내합니다. 천재지변, 불가항력 등 회사의
              귀책사유가 아닌 경우에는 보상 대상에서 제외될 수 있습니다.
            </p>
            <p className="mt-2 text-sm text-[var(--color-gray-500)]">
              ※ 장애 등급별 보상 기준표는 확정 후{' '}
              <Link href="/support/notices" className="text-[var(--color-secondary-blue)] hover:underline">
                고객센터 공지
              </Link>
              에 사전 게시합니다.
            </p>
          </section>

          <section className="pt-4 border-t border-[var(--color-gray-300)]">
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">부칙</h2>
            <p>본 약관은 {EFFECTIVE_DATE}부터 시행합니다.</p>
            <p className="mt-3">
              문의:{' '}
              <a
                href="mailto:sy@artiring.com"
                className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
              >
                sy@artiring.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
