import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabase = createServerClient();
    
    // users 테이블 구조 확인
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    // blog_posts 테이블 구조 확인
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
    
    // blog_categories 테이블 구조 확인  
    const { data: categories, error: categoriesError } = await supabase
      .from('blog_categories')
      .select('*')
      .limit(1);
    
    return NextResponse.json({
      users: {
        error: usersError?.message,
        sample: users?.[0] ? Object.keys(users[0]) : 'empty',
        data: users
      },
      blog_posts: {
        error: postsError?.message,
        sample: posts?.[0] ? Object.keys(posts[0]) : 'empty',
        data: posts
      },
      blog_categories: {
        error: categoriesError?.message,
        sample: categories?.[0] ? Object.keys(categories[0]) : 'empty',
        data: categories
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}






