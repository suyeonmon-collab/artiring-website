-- =====================================================
-- 002_users.sql - Users 테이블
-- =====================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- updated_at 트리거
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 인증된 사용자는 자신의 정보만 조회 가능
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- 초기 관리자 데이터 (실제 사용 시 이메일 변경 필요)
-- INSERT INTO users (email, name, role) 
-- VALUES ('admin@artiring.com', '관리자', 'admin');







