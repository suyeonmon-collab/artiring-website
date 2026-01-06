export const runtime = 'nodejs';

import { createServerClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const BUCKET_NAME = 'post-images';

// POST - 이미지 업로드 (관리자만)
export async function POST(request) {
  console.log('=== Upload API called ===');
  
  try {
    // 1. 관리자 인증 확인 (쿠키 기반)
    let admin = await getAuthenticatedAdmin();
    console.log('Cookie auth result:', admin ? 'success' : 'failed');

    // 쿠키 인증 실패 시 헤더에서 세션 정보 확인 (fallback)
    if (!admin) {
      const authHeader = request.headers.get('x-admin-session');
      console.log('Auth header present:', !!authHeader);
      
      if (authHeader) {
        try {
          const sessionData = JSON.parse(authHeader);
          console.log('Session data:', { role: sessionData.role, exp: sessionData.exp, now: Date.now() });
          
          if (sessionData.role === 'admin' && sessionData.exp > Date.now()) {
            admin = sessionData;
            console.log('Header auth success');
          }
        } catch (e) {
          console.log('Session header parse error:', e);
        }
      }
    }

    if (!admin) {
      console.log('Upload: Authentication failed - no admin found');
      return Response.json({ error: 'Unauthorized - Please login again' }, { status: 401 });
    }

    if (admin.role !== 'admin') {
      console.log('Upload: Authorization failed - not admin role');
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.log('Auth passed for:', admin.email || admin.userId);

    const supabase = createServerClient();

    // 2. FormData 파싱
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      console.log('No file in request');
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('File received:', { name: file.name, type: file.type, size: file.size });

    // 3. 파일 유효성 검사
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: `파일이 너무 큽니다. 최대 크기: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        { error: `지원하지 않는 파일 형식입니다. 지원 형식: JPEG, PNG, WEBP, GIF` },
        { status: 400 }
      );
    }

    // 4. 파일명 생성
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${ext}`;
    console.log('Generated filename:', fileName);

    // 5. File을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('Buffer size:', buffer.length);

    // 6. 버킷 존재 확인
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    console.log('Available buckets:', buckets?.map(b => b.name));
    
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log('Bucket does not exist, creating:', BUCKET_NAME);
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ALLOWED_TYPES,
        fileSizeLimit: MAX_FILE_SIZE
      });
      
      if (createError) {
        console.error('Bucket creation error:', createError);
        // 버킷이 이미 존재하는 경우 무시
        if (!createError.message?.includes('already exists')) {
          throw createError;
        }
      } else {
        console.log('Bucket created successfully');
      }
    }

    // 7. Supabase Storage에 업로드
    console.log('Uploading to Supabase storage...');
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    console.log('Upload data:', data);

    // 8. 공개 URL 생성
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    console.log('Public URL:', urlData.publicUrl);
    return Response.json({ url: urlData.publicUrl });

  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ 
      error: error.message || '이미지 업로드에 실패했습니다.',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
