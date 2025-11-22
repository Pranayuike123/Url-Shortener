import { NextRequest, NextResponse } from 'next/server';
import { addLink, getAllLinks } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { url, customCode } = await request.json();
    
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    try {
      const newLink = await addLink(url, customCode); 
      return NextResponse.json(newLink);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const links = await getAllLinks(); 
  return NextResponse.json(links);
}