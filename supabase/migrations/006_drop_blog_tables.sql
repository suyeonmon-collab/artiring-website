-- 블로그/기록 기능 제거 (Supabase Dashboard에서 직접 실행)
DROP TABLE IF EXISTS post_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Storage 버킷 post-images, thumbnails는 Dashboard > Storage에서 수동 삭제
