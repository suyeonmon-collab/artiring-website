import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabase = createServerClient();
    
    // 테이블 목록 확인
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      // information_schema 접근 실패 시 직접 테이블 확인
      const results = {};
      
      // blog_posts 테이블 확인
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('id')
        .limit(1);
      results.blog_posts = postsError ? `Error: ${postsError.message}` : 'OK';
      
      // blog_categories 테이블 확인
      const { data: categories, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('id')
        .limit(1);
      results.blog_categories = categoriesError ? `Error: ${categoriesError.message}` : 'OK';
      
      // blog_tags 테이블 확인
      const { data: tags, error: tagsError } = await supabase
        .from('blog_tags')
        .select('id')
        .limit(1);
      results.blog_tags = tagsError ? `Error: ${tagsError.message}` : 'OK';
      
      // users 테이블 확인
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      results.users = usersError ? `Error: ${usersError.message}` : 'OK';
      
      // blog_admins 테이블 확인
      const { data: admins, error: adminsError } = await supabase
        .from('blog_admins')
        .select('id')
        .limit(1);
      results.blog_admins = adminsError ? `Error: ${adminsError.message}` : 'OK';
      
      return NextResponse.json({
        success: true,
        message: 'Supabase 연결 성공!',
        tables: results
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase 연결 성공!',
      tables: tables?.map(t => t.table_name) || []
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Supabase 연결 실패',
      error: error.message
    }, { status: 500 });
  }
}

