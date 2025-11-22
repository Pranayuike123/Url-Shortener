import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function initDB() {
  const client = await pool.connect();
  try {
    // Check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'links'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      // Create table if it doesn't exist
      await client.query(`
        CREATE TABLE links (
          id SERIAL PRIMARY KEY,
          code VARCHAR(8) UNIQUE NOT NULL,
          target_url TEXT NOT NULL,
          clicks INTEGER DEFAULT 0,
          last_clicked TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW()
        );
        
        CREATE INDEX idx_code ON links(code);
      `);
      console.log('✅ Table created successfully');
    } else {
      console.log('✅ Table already exists');
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  } finally {
    client.release();
  }
}

export { pool };