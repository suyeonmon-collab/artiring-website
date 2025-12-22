import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// 블로그 관리자 테이블 생성 및 초기 관리자 계정 설정
export async function POST() {
  try {
    const supabase = createServerClient();
    
    // 1. blog_admins 테이블 생성 (없으면)
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS blog_admins (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const { error: createTableError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    // RPC가 없으면 직접 테이블 확인
    const { data: existingAdmin, error: checkError } = await supabase
      .from('blog_admins')
      .select('id, email')
      .limit(1);
    
    // 테이블이 존재하는지 확인
    if (checkError && checkError.code === '42P01') {
      // 테이블이 없음 - Supabase 대시보드에서 직접 생성 필요
      return NextResponse.json({
        success: false,
        message: 'blog_admins 테이블이 없습니다. Supabase 대시보드에서 아래 SQL을 실행해주세요.',
        sql: `
CREATE TABLE blog_admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE blog_admins ENABLE ROW LEVEL SECURITY;

-- 정책 추가 (서비스 역할만 접근 가능)
CREATE POLICY "Service role can do anything" ON blog_admins
  FOR ALL USING (true) WITH CHECK (true);
        `
      });
    }
    
    // 이미 관리자가 있는지 확인
    if (existingAdmin && existingAdmin.length > 0) {
      return NextResponse.json({
        success: false,
        message: '이미 관리자 계정이 존재합니다.',
        admin: { email: existingAdmin[0].email }
      });
    }
    
    // 2. 관리자 계정 생성
    const adminEmail = 'admin@artiring.com';
    const adminPassword = 'artiring2024!';
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    
    const { data: newAdmin, error: insertError } = await supabase
      .from('blog_admins')
      .insert({
        email: adminEmail,
        password_hash: passwordHash,
        name: '관리자',
        role: 'admin'
      })
      .select('id, email, name')
      .single();
    
    if (insertError) {
      throw insertError;
    }
    
    return NextResponse.json({
      success: true,
      message: '관리자 계정이 생성되었습니다!',
      credentials: {
        email: adminEmail,
        password: adminPassword
      },
      warning: '⚠️ 보안을 위해 로그인 후 비밀번호를 변경해주세요!'
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '설정 실패',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createServerClient();
    
    // blog_admins 테이블 확인
    const { data, error } = await supabase
      .from('blog_admins')
      .select('id, email, name')
      .limit(1);
    
    if (error) {
      return NextResponse.json({
        tableExists: false,
        error: error.message,
        hint: 'blog_admins 테이블을 먼저 생성해야 합니다. POST 요청을 보내주세요.'
      });
    }
    
    return NextResponse.json({
      tableExists: true,
      adminExists: data && data.length > 0,
      admin: data?.[0] || null
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}







