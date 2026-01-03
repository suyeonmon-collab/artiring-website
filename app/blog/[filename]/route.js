import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { filename } = params;
    
    // 보안: 파일명 검증 (상위 디렉토리 접근 방지)
    if (!filename || filename.includes('..') || filename.includes('/')) {
      return new NextResponse('Invalid filename', { status: 400 });
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

