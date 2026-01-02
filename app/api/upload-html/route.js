export const runtime = 'nodejs';

import { createServerClient } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['text/html', 'application/xhtml+xml'];

// POST - HTML 파일 업로드 및 블로그 포스트 자동 생성
export async function POST(request) {
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
    const fileContent = buffer.toString('utf-8');

    // 5. 파일명 생성 (원본 파일명 사용, 중복 방지)
    const originalName = file.name.replace(/[^a-zA-Z0-9가-힣._-]/g, '_');
    const timestamp = Date.now();
    const fileName = `${timestamp}_${originalName}`;

    // 6. public/blog 폴더에 저장
    const blogDir = join(process.cwd(), 'public', 'blog');
    await mkdir(blogDir, { recursive: true });
    
    const filePath = join(blogDir, fileName);
    await writeFile(filePath, buffer);

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

      // 업데이트된 내용 저장
      await writeFile(filePath, updatedContent, 'utf-8');
    }

    // 8. 날짜로 제목 생성
    const now = new Date();
    const dateTitle = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일`;

    // 9. 슬러그 생성
    const slug = `blog-${timestamp}`;

    // 10. 블로그 포스트 자동 생성
    const { data: adminData } = await supabase
      .from('blog_admins')
      .select('id')
      .eq('email', admin.email || admin.userId)
      .single();

    if (!adminData) {
      return Response.json({ error: 'Admin not found' }, { status: 404 });
    }

    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        title: dateTitle,
        slug: slug,
        content_html: '', // iframe 사용 시 빈 값
        html_file: fileName, // HTML 파일명
        summary: '', // 나중에 수정 가능
        status: 'draft', // 초기값은 draft
        author_id: adminData.id
      })
      .select()
      .single();

    if (postError) {
      console.error('Post creation error:', postError);
      return Response.json({ 
        error: '블로그 포스트 생성에 실패했습니다.',
        details: postError.message 
      }, { status: 500 });
    }

    return Response.json({ 
      success: true,
      post: post,
      fileName: fileName,
      message: 'HTML 파일이 업로드되고 블로그 포스트가 생성되었습니다.'
    });

  } catch (error) {
    console.error('Upload HTML error:', error);
    return Response.json({ 
      error: error.message || 'HTML 파일 업로드에 실패했습니다.',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

