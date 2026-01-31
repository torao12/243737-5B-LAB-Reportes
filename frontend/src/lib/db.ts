import { Pool } from 'pg';

const globalForPg = global as unknown as { pool: Pool };

export const pool =
  globalForPg.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://app_reporter:NextPassword2026@db:5432/actividad_db",
  });

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool;

export const query = (text: string, params?: any[]) => pool.query(text, params);