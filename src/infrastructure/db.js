import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite = sqlite3.verbose();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const databasePath = path.resolve(__dirname, '../../blog.db');

const database = new sqlite.Database(databasePath, (error) => {
  if (error) {
    console.error('Database connection error:', error.message);
  } else {
    console.log('Connected to SQL database.');
    setupSchema();
  }
});

function setupSchema() {
  const tableSchema = `
    CREATE TABLE IF NOT EXISTS blog_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      headline TEXT NOT NULL,
      body TEXT NOT NULL,
      contributor TEXT NOT NULL,
      publishDate TEXT NOT NULL,
      topic TEXT NOT NULL,
      tags TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  database.run(tableSchema, (error) => {
    if (error) {
      console.error('Schema initialization error:', error.message);
    } else {
      console.log('Blog entries table ready.');
    }
  });
}

export default database;
