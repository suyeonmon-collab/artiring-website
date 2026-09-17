import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    const { data: count, error } = await supabase.rpc('pre_reservations_count');

    if (error) {
      console.error('[preregister/count] failed:', error);
      return NextResponse.json(
        { error: '신청자 수를 불러오지 못했어요.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch (error) {
    console.error('[preregister/count] unexpected error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했어요.' },
      { status: 500 }
    );
  }
}
