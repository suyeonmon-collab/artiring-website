import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// 초기 관리자 계정 생성 (한 번만 실행)
export async function POST(request) {
  try {
    const supabase = createServerClient();
    
    // 기존 관리자 확인
    const { data: existingAdmin, error: checkError } = await supabase
      .from('users')
      .select('id, email')
      .eq('role', 'admin')
      .limit(1)
      .single();
    
    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: '이미 관리자 계정이 존재합니다.',
        admin: { email: existingAdmin.email }
      });
    }
    
    // 관리자 계정 생성
    const adminEmail = 'admin@artiring.com';
    const adminPassword = 'artiring2024!';  // 초기 비밀번호
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    
    const { data: newAdmin, error: createError } = await supabase
      .from('users')
      .insert({
        email: adminEmail,
        password_hash: passwordHash,
        name: '관리자',
        role: 'admin'
      })
      .select('id, email, name, role')
      .single();
    
    if (createError) {
      throw createError;
    }
    
    return NextResponse.json({
      success: true,
      message: '관리자 계정이 생성되었습니다.',
      admin: {
        email: adminEmail,
        password: adminPassword,  // 초기 비밀번호 (나중에 변경 필요)
        name: newAdmin.name
      },
      warning: '보안을 위해 로그인 후 비밀번호를 변경해주세요!'
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '관리자 계정 생성 실패',
      error: error.message
    }, { status: 500 });
  }
}

// 관리자 존재 여부 확인
export async function GET() {
  try {
    const supabase = createServerClient();
    
    const { data: admin, error } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('role', 'admin')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return NextResponse.json({
      exists: !!admin,
      admin: admin ? { email: admin.email, name: admin.name } : null
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}













