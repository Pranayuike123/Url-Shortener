import { initDB } from '@/lib/database';

export async function GET() {
  try {
    await initDB();
    return Response.json({ 
      success: true, 
      message: 'Database table created successfully' 
    });
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      error: 'Failed to create table',
      details: error.message 
    }, { status: 500 });
  }
}