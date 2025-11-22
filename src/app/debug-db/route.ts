import { pool } from '@/lib/database';

export async function GET() {
  try {
    // Check if DATABASE_URL is loaded
    const dbUrl = process.env.DATABASE_URL;
    
    // Test connection
    const timeResult = await pool.query('SELECT NOW()');
    
    // Check if links table exists and has data
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'links'
      );
    `);
    
    const dataCheck = await pool.query('SELECT COUNT(*) as count FROM links');
    
    return Response.json({ 
      database_url: dbUrl ? '✅ Loaded' : '❌ Missing',
      connection: '✅ Connected',
      current_time: timeResult.rows[0].now,
      table_exists: tableCheck.rows[0].exists,
      total_records: dataCheck.rows[0].count
    });
    
  } catch (error: any) {
    return Response.json({ 
      success: false,
      error: error.message,
      database_url: process.env.DATABASE_URL ? '✅ Loaded' : '❌ Missing'
    }, { status: 500 });
  }
}