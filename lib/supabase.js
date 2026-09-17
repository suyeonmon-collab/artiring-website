import { createClient } from '@supabase/supabase-js';

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function createBaseClient(key) {
  return createClient(getSupabaseUrl(), key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function hasServiceRoleKey() {
  return Boolean(getSupabaseUrl() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function createServiceRoleClient() {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase service role credentials are not configured');
  }

  return createBaseClient(key);
}

/** INSERT 등 RLS 허용 작업용 — service role 우선, 없으면 anon(서버 전용) */
export function createServerSupabaseClient() {
  const url = getSupabaseUrl();
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not configured');
  }

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error('Supabase credentials are not configured');
  }

  return createBaseClient(key);
}
