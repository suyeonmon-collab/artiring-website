import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { filename } = params;
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
      const fileContent = await readFile(filePath, 'utf-8');
      
      // HTML 파일로 응답
      return new NextResponse(fileContent, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        return new NextResponse('File not found', { status: 404 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error serving blog HTML file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

