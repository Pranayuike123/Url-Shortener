import { NextRequest, NextResponse } from 'next/server';
import { getLinkByCode, incrementClickCount } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    
    // ✅ 'await' add karo
    const link = await getLinkByCode(code);
    
    if (!link) {
      return new Response('Link not found', { 
        status: 404,
        statusText: 'Not Found'
      });
    }

    // ✅ 'await' add karo
    await incrementClickCount(code);
    return NextResponse.redirect(link.target_url);
    
  } catch (error) {
    return new Response('Server error', { status: 500 });
  }
}