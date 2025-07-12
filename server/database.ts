import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import path from 'path';

export interface DatabaseSchema {
  ingredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    created_at: string;
  };
}

let db: Kysely<DatabaseSchema>;

export function initializeDatabase() {
  const dataDirectory = process.env.DATA_DIRECTORY || './data';
  const dbPath = path.join(dataDirectory, 'database.sqlite');
  
  console.log('Initializing database at:', dbPath);
  
  const sqliteDb = new Database(dbPath);
  
  db = new Kysely<DatabaseSchema>({
    dialect: new SqliteDialect({
      database: sqliteDb,
    }),
    log: ['query', 'error']
  });
  
  console.log('Database initialized successfully');
  return db;
}

export function getDatabase() {
  if (!db) {
    return initializeDatabase();
  }
  return db;
}
