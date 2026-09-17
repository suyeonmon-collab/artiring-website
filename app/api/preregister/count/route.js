import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServiceRoleClient();

    const { count, error } = await supabase
      .from('pre_reservations')
      .select('*', { count: 'exact', head: true });

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
