export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { createServerClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['text/html', 'application/xhtml+xml'];
const BUCKET_NAME = 'blog-html';

// PUT - 기존 포스트의 HTML 파일 업데이트
export async function PUT(request) {
  try {
    // 1. 관리자 인증 확인
    let admin = await getAuthenticatedAdmin();
    
    if (!admin) {
      const authHeader = request.headers.get('x-admin-session');
      if (authHeader) {
        try {
          const sessionData = JSON.parse(authHeader);
          if (sessionData.role === 'admin' && sessionData.exp > Date.now()) {
            admin = sessionData;
          }
        } catch (e) {
          // ignore
        }
      }
    }

    if (!admin || admin.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerClient();

    // 2. FormData 파싱
    const formData = await request.formData();
    const file = formData.get('file');
    const postId = formData.get('postId');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!postId) {
      return Response.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // 3. 파일 유효성 검사
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: `파일이 너무 큽니다. 최대 크기: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type) && !file.name.endsWith('.html')) {
      return Response.json(
        { error: 'HTML 파일만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    // 4. 기존 포스트 확인
    const { data: existingPost, error: postError } = await supabase
      .from('blog_posts')
      .select('id, html_file')
      .eq('id', postId)
      .single();

    if (postError || !existingPost) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    // 5. 파일 내용 읽기
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileContent = buffer.toString('utf-8');

    // 6. 파일명 결정 (새 파일명 생성, 기존 URL이 있어도 새로 업로드)
    const originalName = file.name.replace(/[^a-zA-Z0-9가-힣._-]/g, '_');
    const timestamp = Date.now();
    const fileName = `${timestamp}_${originalName}`;

    // 7. HTML 파일에 높이 전달 스크립트 추가 (없는 경우)
    let updatedContent = fileContent;
    if (!updatedContent.includes('iframe-resize')) {
      const scriptToAdd = `
        // iframe 높이 자동 전달 (부모 창에 메시지 전송)
        function sendHeightToParent() {
          if (window.parent !== window) {
            const height = Math.max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.clientHeight,
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight
            );
            window.parent.postMessage({
              type: 'iframe-resize',
              height: height
            }, '*');
          }
        }

        // 초기 높이 전달
        window.addEventListener('load', () => {
          sendHeightToParent();
          setTimeout(sendHeightToParent, 2000);
        });

        // 리사이즈 이벤트 감지
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(sendHeightToParent, 300);
        });

        // MutationObserver로 DOM 변경 감지
        const observer = new MutationObserver(() => {
          sendHeightToParent();
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true
        });
      `;

      // </body> 태그 앞에 스크립트 추가
      if (updatedContent.includes('</body>')) {
        updatedContent = updatedContent.replace('</body>', `<script>${scriptToAdd}</script></body>`);
      } else {
        updatedContent += `<script>${scriptToAdd}</script>`;
      }
    }

    // 8. Supabase Storage에 업로드
    // 버킷 존재 확인 및 생성
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ALLOWED_TYPES,
        fileSizeLimit: MAX_FILE_SIZE
      });
      
      if (createError && !createError.message?.includes('already exists')) {
        console.error('Bucket creation error:', createError);
        throw createError;
      }
    }

    // 업데이트된 HTML 내용을 Buffer로 변환
    const updatedBuffer = Buffer.from(updatedContent, 'utf-8');

    // Supabase Storage에 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, updatedBuffer, {
        contentType: 'text/html',
        cacheControl: '3600',
        upsert: true // 기존 파일 덮어쓰기
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    // 공개 URL 생성
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uploadData.path);

    const publicUrl = urlData.publicUrl;

    // 9. 포스트의 html_file 필드 업데이트 (공개 URL 저장)
    const { data: updatedPost, error: updateError } = await supabase
      .from('blog_posts')
      .update({ html_file: publicUrl })
      .eq('id', postId)
      .select()
      .single();

    if (updateError) {
      console.error('Post update error:', updateError);
      return Response.json({ 
        error: '블로그 포스트 업데이트에 실패했습니다.',
        details: updateError.message 
      }, { status: 500 });
    }

    return Response.json({ 
      success: true,
      post: updatedPost,
      fileName: fileName,
      publicUrl: publicUrl,
      message: 'HTML 파일이 업데이트되었습니다.'
    });

  } catch (error) {
    console.error('Update HTML error:', error);
    return Response.json({ 
      error: error.message || 'HTML 파일 업데이트에 실패했습니다.',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// POST - HTML 파일 업로드 및 블로그 포스트 자동 생성
export async function POST(request) {
  try {
    console.log('=== HTML Upload API called ===');
    
    // 1. 관리자 인증 확인
    let admin = await getAuthenticatedAdmin();
    console.log('Cookie auth result:', admin ? 'success' : 'failed');
    
    if (!admin) {
      const authHeader = request.headers.get('x-admin-session');
      console.log('Auth header present:', !!authHeader);
      
      if (authHeader) {
        try {
          const sessionData = JSON.parse(authHeader);
          console.log('Session data:', { userId: sessionData.userId, role: sessionData.role, exp: sessionData.exp, now: Date.now() });
          
          if (sessionData.role === 'admin' && sessionData.exp > Date.now()) {
            // 세션 데이터에서 admin 정보를 가져오기 위해 DB 조회 필요
            const supabase = createServerClient();
            const { data: adminData, error: adminError } = await supabase
              .from('blog_admins')
              .select('id, email, name, role')
              .eq('id', sessionData.userId)
              .single();
            
            if (adminError || !adminData) {
              console.error('Admin lookup error:', adminError);
              return Response.json({ error: 'Admin not found' }, { status: 401 });
            }
            
            admin = adminData;
            console.log('Header auth success, admin:', admin);
          }
        } catch (e) {
          console.error('Session header parse error:', e);
        }
      }
    }

    if (!admin || admin.role !== 'admin') {
      console.log('Upload: Authentication failed - no admin found');
      return Response.json({ error: 'Unauthorized - Please login again' }, { status: 401 });
    }

    console.log('Auth passed for:', admin.email || admin.id);
    console.log('Admin object:', { id: admin.id, email: admin.email, role: admin.role });

    const supabase = createServerClient();

    // 2. FormData 파싱
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. 파일 유효성 검사
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: `파일이 너무 큽니다. 최대 크기: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type) && !file.name.endsWith('.html')) {
      return Response.json(
        { error: 'HTML 파일만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    // 4. 파일 내용 읽기
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let fileContent = buffer.toString('utf-8');

    // 4-1. 외부 이미지 URL 감지 및 제거 (403 오류 방지)
    const externalDomains = [
      'postfiles.pstatic.net',
      'dthumb-phinf.pstatic.net',
      'cdninstagram.com',
      'scontent-icn2-1.cdninstagram.com'
    ];

    let hasExternalImages = false;
    
    // 외부 이미지 URL이 있는지 확인
    externalDomains.forEach(domain => {
      if (fileContent.includes(domain)) {
        hasExternalImages = true;
        console.log(`⚠️ 외부 이미지 URL 감지됨: ${domain}`);
      }
    });

    // 외부 이미지 URL 제거
    if (hasExternalImages) {
      console.log('⚠️ 외부 이미지 URL 제거 중...');
      
      // <img> 태그에서 외부 URL 제거
      externalDomains.forEach(domain => {
        const escapedDomain = domain.replace(/\./g, '\\.');
        // <img src="https://domain..." 형태 제거
        fileContent = fileContent.replace(
          new RegExp(`<img[^>]*src=["'][^"']*${escapedDomain}[^"']*["'][^>]*>`, 'gi'),
          '<!-- 외부 이미지 제거됨 (403 오류 방지) -->'
        );
        // <img src='https://domain...' 형태 제거
        fileContent = fileContent.replace(
          new RegExp(`<img[^>]*src=['"][^'"]*${escapedDomain}[^'"]*['"][^>]*>`, 'gi'),
          '<!-- 외부 이미지 제거됨 (403 오류 방지) -->'
        );
      });
      
      console.log('✅ 외부 이미지 URL 제거 완료');
    }

    // 5. 파일명 생성 (원본 파일명 사용, 중복 방지)
    const originalName = file.name.replace(/[^a-zA-Z0-9가-힣._-]/g, '_');
    const timestamp = Date.now();
    const fileName = `${timestamp}_${originalName}`;

    // 6. HTML 파일에 높이 전달 스크립트 추가 (없는 경우)
    // fileContent는 이미 외부 이미지가 제거된 상태
    if (!fileContent.includes('iframe-resize')) {
      const scriptToAdd = `
        // iframe 높이 자동 전달 (부모 창에 메시지 전송)
        function sendHeightToParent() {
          if (window.parent !== window) {
            const height = Math.max(
              document.body.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.clientHeight,
              document.documentElement.scrollHeight,
              document.documentElement.offsetHeight
            );
            window.parent.postMessage({
              type: 'iframe-resize',
              height: height
            }, '*');
          }
        }

        // 초기 높이 전달
        window.addEventListener('load', () => {
          sendHeightToParent();
          setTimeout(sendHeightToParent, 2000);
        });

        // 리사이즈 이벤트 감지
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(sendHeightToParent, 300);
        });

        // MutationObserver로 DOM 변경 감지
        const observer = new MutationObserver(() => {
          sendHeightToParent();
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true
        });
      `;

      // </body> 태그 앞에 스크립트 추가
      if (fileContent.includes('</body>')) {
        fileContent = fileContent.replace('</body>', `<script>${scriptToAdd}</script></body>`);
      } else {
        fileContent += `<script>${scriptToAdd}</script>`;
      }
    }

    // 7. Supabase Storage에 업로드
    // 버킷 존재 확인 및 생성
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ALLOWED_TYPES,
        fileSizeLimit: MAX_FILE_SIZE
      });
      
      if (createError && !createError.message?.includes('already exists')) {
        console.error('Bucket creation error:', createError);
        throw createError;
      }
    }

    // 외부 이미지 제거 및 스크립트 추가된 최종 HTML 내용을 Buffer로 변환
    const finalBuffer = Buffer.from(fileContent, 'utf-8');

    // Supabase Storage에 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, finalBuffer, {
        contentType: 'text/html',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    // 공개 URL 생성
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uploadData.path);

    const publicUrl = urlData.publicUrl;

    // 8. 날짜로 제목 생성
    const now = new Date();
    const dateTitle = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일`;

    // 9. 슬러그 생성
    const slug = `blog-${timestamp}`;

    // 10. 블로그 포스트 자동 생성
    // admin 객체는 getAuthenticatedAdmin()에서 { id, email, name, role } 형태로 반환됨
    if (!admin.id) {
      console.error('Admin ID not found in admin object:', admin);
      return Response.json({ error: 'Admin ID not found' }, { status: 400 });
    }

    console.log('Creating blog post with:', {
      title: dateTitle,
      slug: slug,
      html_file: fileName,
      author_id: admin.id
    });

    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        title: dateTitle,
        slug: slug,
        content_html: '', // iframe 사용 시 빈 값
        html_file: publicUrl, // Supabase Storage 공개 URL
        summary: '', // 나중에 수정 가능
        status: 'published', // 자동 생성 시 바로 발행하여 /records 페이지에 표시
        published_at: new Date().toISOString(), // 발행 시간 설정
        author_id: admin.id // admin 객체에 이미 id가 있음
      })
      .select()
      .single();

    if (postError) {
      console.error('❌ Post creation error:', postError);
      console.error('❌ Error details:', {
        message: postError.message,
        code: postError.code,
        details: postError.details,
        hint: postError.hint
      });
      return Response.json({ 
        error: '블로그 포스트 생성에 실패했습니다.',
        details: postError.message,
        code: postError.code,
        hint: postError.hint
      }, { status: 500 });
    }

    if (!post || !post.id) {
      console.error('❌ Post creation failed: No post returned');
      return Response.json({ 
        error: '블로그 포스트 생성에 실패했습니다.',
        details: '포스트가 반환되지 않았습니다.'
      }, { status: 500 });
    }

    console.log('✅ Post created successfully:', {
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: post.status,
      html_file: post.html_file
    });

    return Response.json({ 
      success: true,
      post: post,
      fileName: fileName,
      publicUrl: publicUrl,
      hasExternalImages: hasExternalImages,
      message: hasExternalImages 
        ? 'HTML 파일이 업로드되고 블로그 포스트가 생성되었습니다. (외부 이미지 URL이 제거되었습니다)'
        : 'HTML 파일이 업로드되고 블로그 포스트가 생성되었습니다.'
    });

  } catch (error) {
    console.error('Upload HTML error:', error);
    return Response.json({ 
      error: error.message || 'HTML 파일 업로드에 실패했습니다.',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

