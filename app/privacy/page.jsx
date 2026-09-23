import Link from 'next/link';
import SupportNav from '@/components/support/SupportNav';

export const metadata = {
  title: '개인정보처리방침 - 아티링',
  description:
    'Meowmo(뮤모) 개인정보처리방침. 수집 항목, 이용 목적, 보유기간, 위치정보 보호, 처리 위탁을 안내합니다.',
};

const EFFECTIVE_DATE = '2026년 10월 23일';

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-[var(--color-primary)] mt-1.5 flex-shrink-0" aria-hidden>
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
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
            개인정보처리방침
          </h1>
          <p className="mt-2 text-sm text-[var(--color-gray-500)]">
            시행일: {EFFECTIVE_DATE}
          </p>
          <p className="mt-3 text-[15px] text-[var(--color-gray-700)] leading-relaxed">
            Meowmo(뮤모) 앱 내 개인정보처리방침과 동일한 내용입니다.
          </p>
        </header>

        <SupportNav current="/support/notices" />

        <div className="space-y-10 text-[15px] text-[var(--color-gray-700)] leading-relaxed">
          <p>
            Meowmo(이하 &ldquo;서비스&rdquo;)를 운영하는 임수연(이하 &ldquo;회사&rdquo;)는 이용자의
            개인정보를 소중히 다루며, 「개인정보보호법」과 「위치정보의 보호 및 이용 등에 관한
            법률」(이하 &ldquo;위치정보법&rdquo;)을 준수합니다. 본 방침은 회사가 어떤 개인정보를
            어떤 목적으로 수집·이용·보관하는지 안내합니다.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-4">
              1. 수집하는 개인정보 항목
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-gray-900)] mb-2">
                  가. 카카오 계정 연동 시
                </h3>
                <BulletList
                  items={[
                    '카카오가 제공하는 고유 식별자, 닉네임, 프로필 이미지(카카오 계정 설정에 따라 이메일이 포함될 수 있음)',
                  ]}
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--color-gray-900)] mb-2">
                  나. 서비스 이용 과정에서 자동 수집
                </h3>
                <BulletList
                  items={[
                    'GPS 위치정보(위도·경도) — 캐릭터 카드 수집, 스팟 표시, 참여 장소 설정 시',
                    '서비스 이용기록(카드 수집 이력, 쿠폰 발급·사용 이력, 접속 일시)',
                    '기기 정보(OS 종류, 앱 버전) — 오류 대응 목적',
                    '기기 설치 식별값(install_id) — 로그인 시 자동 수집. 하드웨어 기기 고유번호가 아니라 앱 설치 단위로 생성되는 값으로, 앱을 재설치하거나 데이터를 삭제하면 초기화됩니다. 동일 기기에서의 다중 계정 생성 등 부정 이용 탐지 목적으로만 사용합니다.',
                  ]}
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--color-gray-900)] mb-2">
                  다. 이용자가 직접 등록
                </h3>
                <BulletList
                  items={[
                    '프로필 닉네임·소개글',
                    '캐릭터 카드 이미지, 스팟(작가·상점) 소개 정보 및 위치 인증용 사진(location_photos)',
                    '문의 내용',
                  ]}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              2. 개인정보의 수집 및 이용 목적
            </h2>
            <BulletList
              items={[
                '회원 식별 및 서비스 제공(카카오 로그인, 프로필 관리)',
                '위치 기반 캐릭터 카드 수집·스팟 탐색 기능 제공',
                '쿠폰 발급·사용 처리 및 부정 이용 방지',
                '부정 이용 방지 — 비정상적인 이동 속도(위치 조작 의심) 및 동일 기기의 다중 계정 생성 패턴 탐지',
                '문의 응대 및 공지사항 전달',
                '서비스 품질 개선을 위한 통계 분석(비식별 처리)',
              ]}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              3. 개인정보의 보유 및 이용기간
            </h2>
            <BulletList
              items={[
                '회원 탈퇴 시 지체 없이 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우(전자상거래법상 결제 기록 등) 해당 법령이 정한 기간 동안 보관합니다.',
                '종결된 문의는 종결 처리 후 10일이 지나면 자동으로 영구 삭제됩니다.',
              ]}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              4. 개인정보의 제3자 제공
            </h2>
            <p>
              회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만 법령에 근거가
              있거나 수사기관이 적법한 절차에 따라 요청하는 경우는 예외로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              5. 개인정보 처리 위탁
            </h2>
            <p className="mb-3">서비스 인프라 운영을 위해 아래와 같이 처리를 위탁하고 있습니다.</p>
            <BulletList
              items={[
                'Supabase(데이터베이스·인증·파일 저장): 회원정보, 위치정보, 이미지 등 서비스 데이터 저장',
                '카카오: 소셜 로그인 인증',
                'Anthropic(Claude API): 관리자의 운영 업무 보조(이상탐지 요약, 문의 답변 초안) — 이용자 개인을 식별하는 방식으로 활용하지 않습니다.',
              ]}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              6. 이용자의 권리와 행사방법
            </h2>
            <p>
              이용자는 언제든지 앱 내 &ldquo;내 정보&rdquo; 화면에서 본인의 개인정보를 조회·수정할
              수 있으며, 앱 내 고객센터의 &ldquo;계정관리&rdquo;에서 계정 및 관련 데이터를 즉시
              삭제할 수 있습니다. 삭제 시 문의·삭제 요청 데이터도 바로 파기됩니다. 위치정보의
              이용·제공 현황도 같은 화면에서 확인할 수 있습니다.
            </p>
          </section>

          <section id="location">
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              7. 개인위치정보의 보호(위치정보법 제16조 등)
            </h2>
            <BulletList
              items={[
                '회사는 캐릭터 카드 수집·스팟 표시 등 서비스 제공에 필요한 최소한의 범위에서만 위치정보를 수집·이용합니다.',
                '위치정보는 수집 목적 달성 후 별도로 저장하지 않으며, 서비스 이용기록(수집 이력)에 결합되는 경우 위 3항의 보유기간을 따릅니다.',
                '이용자는 앱 설정에서 위치정보 제공에 대한 동의를 언제든지 철회할 수 있으며, 이 경우 위치 기반 기능(카드 수집 등)의 이용이 제한될 수 있습니다.',
                '개인위치정보의 이용·제공사실 확인자료는 위치정보법에 따라 6개월간 보관됩니다.',
              ]}
            />
            <p className="mt-3 text-sm text-[var(--color-gray-500)]">
              ※ 위치기반서비스사업자 신고(방송통신위원회)는 문서 제출로 별도 이행이 필요합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              8. 개인정보의 안전성 확보조치
            </h2>
            <BulletList
              items={[
                '서버 접근 권한을 최소한의 인원으로 제한하고, 민감한 관리자 기능에는 2단계 인증을 적용합니다.',
                '데이터베이스 접근 정책(RLS)을 통해 이용자는 본인의 데이터만 조회·수정할 수 있습니다.',
                '위치·거리 검증처럼 부정 이용에 취약한 로직은 클라이언트가 아닌 서버에서 재검증합니다.',
              ]}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              9. 개인정보 보호책임자 및 위치정보관리책임자
            </h2>
            <p>
              문의:{' '}
              <a
                href="mailto:sy@artiring.com"
                className="font-semibold text-[var(--color-secondary-blue)] hover:underline"
              >
                sy@artiring.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
              10. 고지의 의무
            </h2>
            <p>본 방침이 변경되는 경우 앱 공지사항을 통해 사전에 고지합니다.</p>
          </section>

          <section className="pt-4 border-t border-[var(--color-gray-300)]">
            <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">부칙</h2>
            <p>본 방침은 {EFFECTIVE_DATE}부터 적용됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
