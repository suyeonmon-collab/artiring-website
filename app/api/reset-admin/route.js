export const runtime = 'nodejs';

import { createServerClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

// POST - 관리자 비밀번호 재설정 (초기 설정용)
export async function POST() {
  try {
    const supabase = createServerClient();
    
    const adminEmail = 'admin@artiring.com';
    const adminPassword = 'artiring2024!';
    
    // bcrypt 해시 생성
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    
    // 기존 관리자 업데이트
    const { data, error } = await supabase
      .from('blog_admins')
      .update({ password_hash: passwordHash })
      .eq('email', adminEmail)
      .select('id, email, name')
      .single();
    
    if (error) {
      // 관리자가 없으면 새로 생성
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
      
      if (insertError) throw insertError;
      
      return Response.json({
        success: true,
        message: '관리자 계정이 생성되었습니다.',
        credentials: {
          email: adminEmail,
          password: adminPassword
        }
      });
    }
    
    return Response.json({
      success: true,
      message: '관리자 비밀번호가 재설정되었습니다.',
      credentials: {
        email: adminEmail,
        password: adminPassword
      }
    });
    
  } catch (error) {
    console.error('Reset admin error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}







