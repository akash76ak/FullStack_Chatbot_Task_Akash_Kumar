import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database;

export const initDB = async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
};

export const getDB = () => db;