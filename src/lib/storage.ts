import { pool } from './database';

export async function addLink(url: string, customCode?: string) {
  const code = customCode || generateRandomCode();
  
  if (customCode && !/^[A-Za-z0-9]{6,8}$/.test(customCode)) {
    throw new Error('Code must be 6-8 alphanumeric characters');
  }

  try {
    // ✅ CURRENT TIMESTAMP use karo
    const result = await pool.query(
      `INSERT INTO links (code, target_url, created_at) VALUES ($1, $2, NOW()) RETURNING *`,
      [code, url]
    );
    
    console.log('✅ Link saved to database with current time:', result.rows[0]);
    return result.rows[0];
  } catch (error: any) {
    if (error.code === '23505') {
      throw new Error('Code already exists');
    }
    throw new Error('Database error: ' + error.message);
  }
}

export async function getLinkByCode(code: string) {
  try {
    const result = await pool.query(
      `SELECT * FROM links WHERE code = $1`,
      [code]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching link:', error);
    return null;
  }
}

export async function getAllLinks() {
  try {
    const result = await pool.query(
      `SELECT * FROM links ORDER BY created_at DESC`
    );
    console.log('✅ Links from database:', result.rows.length);
    return result.rows;
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
}

export async function incrementClickCount(code: string) {
  try {
    // ✅ CURRENT TIMESTAMP use karo
    await pool.query(
      `UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1`,
      [code]
    );
    console.log('✅ Click counted with current time for code:', code);
  } catch (error) {
    console.error('Error incrementing clicks:', error);
  }
}

function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}