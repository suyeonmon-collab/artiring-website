import { createClient } from '@supabase/supabase-js';

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function createBaseClient(key) {
  return createClient(getSupabaseUrl(), key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/** 사전예약 INSERT/count RPC용 — anon 키만 사용 (앱 service role 미사용) */
export function createServerSupabaseClient() {
  const url = getSupabaseUrl();
  const key = getAnonKey();

  if (!url || !key) {
    throw new Error('Supabase credentials are not configured');
  }

  return createBaseClient(key);
}
