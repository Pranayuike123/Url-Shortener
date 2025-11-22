import { pool } from '@/lib/database';

export async function GET() {
  try {
    // Test connection
    const timeResult = await pool.query('SELECT NOW()');
    
    // Test table creation
    await pool.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        last_clicked TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    return Response.json({ 
      success: true, 
      message: 'Database connected and table created',
      time: timeResult.rows[0].now 
    });
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      error: 'Database connection failed',
      details: error.message 
    }, { status: 500 });
  }
}