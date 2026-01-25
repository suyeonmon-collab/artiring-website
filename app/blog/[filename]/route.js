import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 외부 이미지 URL 제거 함수 (403 오류 방지)
function removeExternalImageUrls(htmlContent) {
  const externalDomains = [
    'postfiles.pstatic.net',
    'dthumb-phinf.pstatic.net',
    'cdninstagram.com',
    'scontent-icn2-1.cdninstagram.com',
    'scontent-',
    'pstatic.net',
    'blogpfthumb.pstatic.net',
    'blogfiles.naver.net',
  ];
  
  let hasExternalImages = false;
  let cleanedContent = htmlContent;
  
  // 외부 이미지 URL 감지
  externalDomains.forEach(domain => {
    const escapedDomain = domain.replace(/\./g, '\\.').replace(/\-/g, '\\-');
    const regex = new RegExp(escapedDomain, 'i');
    
    if (regex.test(cleanedContent)) {
      hasExternalImages = true;
    }
  });
  
  // 외부 이미지 URL 제거
  if (hasExternalImages) {
    externalDomains.forEach(domain => {
      const escapedDomain = domain.replace(/\./g, '\\.').replace(/\-/g, '\\-');
      
      // 패턴 1: <img src="https://domain..." ...> (일반적인 형태)
      cleanedContent = cleanedContent.replace(
        new RegExp(`<img[^>]*src=["'][^"']*${escapedDomain}[^"']*["'][^>]*>`, 'gi'),
        '<!-- 외부 이미지 제거됨 (403 오류 방지) -->'
      );
      
      // 패턴 2: <img src='https://domain...' ...> (작은따옴표)
      cleanedContent = cleanedContent.replace(
        new RegExp(`<img[^>]*src=['"][^'"]*${escapedDomain}[^'"]*['"][^>]*>`, 'gi'),
        '<!-- 외부 이미지 제거됨 (403 오류 방지) -->'
      );
      
      // 패턴 3: background-image나 style 속성에 포함된 경우
      cleanedContent = cleanedContent.replace(
        new RegExp(`background-image[^;]*url\\(["']?[^"')]*${escapedDomain}[^"')]*["']?\\)`, 'gi'),
        'background-image: none; /* 외부 이미지 제거됨 */'
      );
      
      // 패턴 4: style 속성 전체에서 제거
      cleanedContent = cleanedContent.replace(
        new RegExp(`style=["'][^"']*${escapedDomain}[^"']*["']`, 'gi'),
        (match) => {
          return match.replace(
            new RegExp(`[^;]*url\\(["']?[^"')]*${escapedDomain}[^"')]*["']?\\)[^;]*;?`, 'gi'),
            ''
          );
        }
      );
      
      // 패턴 5: URL 인코딩된 형태도 제거 (예: %22https%3A%2F%2F...)
      cleanedContent = cleanedContent.replace(
        new RegExp(`%22https%3A%2F%2F[^%]*${escapedDomain}[^%]*%22`, 'gi'),
        ''
      );
    });
  }
  
  return cleanedContent;
}

export async function GET(request, { params }) {
  try {
    const { filename } = await params;
    const requestUrl = new URL(request.url);
    const urlParam = requestUrl.searchParams.get('url');
    
    // proxy 경로인 경우 URL 파라미터로 처리
    if (filename === 'proxy' && urlParam) {
      try {
        const decodedUrl = decodeURIComponent(urlParam);
        const response = await fetch(decodedUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
        });
        
        if (!response.ok) {
          return new NextResponse('File not found', { status: 404 });
        }
        
        const fileContent = await response.text();
        
        // HTML 파일로 응답 (CSP 헤더 제거 및 수정)
        return new NextResponse(fileContent, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            // CSP 헤더를 완화하여 인라인 스타일과 스크립트 허용
            'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net;",
          },
        });
      } catch (error) {
        console.error('Error fetching from Supabase Storage:', error);
        return new NextResponse('Error fetching file', { status: 500 });
      }
    }
    
    // 보안: 파일명 검증 (상위 디렉토리 접근 방지)
    if (!filename || filename.includes('..') || filename.includes('/')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }
    
    // 파일명이 Supabase Storage 파일명 형식인지 확인 (타임스탬프_파일명.html)
    // 예: 1767443802071_20260110-ai-designer-future.html
    const isSupabaseStorageFile = /^\d+_[^/]+\.html$/.test(filename);
    
    if (isSupabaseStorageFile) {
      // Supabase Storage URL 생성
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxyjcawijvzhdvoxdpbv.supabase.co';
      const bucketName = 'blog-html';
      const storageUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filename}`;
      
      try {
        const response = await fetch(storageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
        });
        
        if (!response.ok) {
          return new NextResponse('File not found in Supabase Storage', { status: 404 });
        }
        
        const fileContent = await response.text();
        
        // HTML 파일로 응답 (CSP 헤더 제거 및 수정)
        return new NextResponse(fileContent, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            // CSP 헤더를 완화하여 인라인 스타일과 스크립트 허용
            'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net;",
          },
        });
      } catch (error) {
        console.error('Error fetching from Supabase Storage:', error);
        return new NextResponse('Error fetching file', { status: 500 });
      }
    }
    
    // public/blog 폴더에서 파일 읽기
    const filePath = join(process.cwd(), 'public', 'blog', filename);
    
    try {
      let fileContent = await readFile(filePath, 'utf-8');
      
      console.log(`✅ File found in public/blog: ${filename}`);
      
      // 외부 이미지 URL 제거 (403 오류 방지)
      fileContent = removeExternalImageUrls(fileContent);
      
      // HTML 파일로 응답 (CSP 헤더 추가)
      return new NextResponse(fileContent, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          // CSP 헤더를 완화하여 인라인 스타일과 스크립트 허용
          'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net;",
        },
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`❌ File not found: ${filename} in public/blog folder`);
        console.error(`   File path: ${filePath}`);
        console.error(`   Current working directory: ${process.cwd()}`);
        
        // Supabase Storage에도 확인해보기 (파일명이 다를 수 있음)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxyjcawijvzhdvoxdpbv.supabase.co';
        const bucketName = 'blog-html';
        
        // Supabase Storage에서 파일명 패턴으로 검색 시도
        try {
          // 먼저 원본 파일명으로 시도
          const storageUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filename}`;
          console.log(`🔍 Checking Supabase Storage: ${storageUrl}`);
          
          const response = await fetch(storageUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0',
            },
          });
          
          if (response.ok) {
            console.log(`✅ File found in Supabase Storage: ${filename}`);
            let fileContent = await response.text();
            
            // 외부 이미지 URL 제거 (403 오류 방지)
            fileContent = removeExternalImageUrls(fileContent);
            
            return new NextResponse(fileContent, {
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; img-src 'self' data: https:; font-src 'self' data: https://cdn.jsdelivr.net;",
              },
            });
          } else {
            console.error(`❌ File not found in Supabase Storage: ${filename} (${response.status})`);
          }
        } catch (storageError) {
          console.error('❌ Error checking Supabase Storage:', storageError);
        }
        
        return new NextResponse(`File not found: ${filename}`, { status: 404 });
      }
      console.error('❌ Error reading file:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error serving blog HTML file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

