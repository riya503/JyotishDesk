const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'database.sqlite');

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;
  
  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await initSchema(dbInstance);
  return dbInstance;
}

async function initSchema(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      astrologerId TEXT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      dob TEXT,
      tob TEXT,
      pob TEXT,
      problemCategory TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id TEXT PRIMARY KEY,
      clientId TEXT NOT NULL,
      clientName TEXT NOT NULL,
      astrologerId TEXT,
      date TEXT NOT NULL,
      category TEXT,
      notes TEXT,
      aiSummary TEXT,
      status TEXT,
      remedies TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS followups (
      id TEXT PRIMARY KEY,
      clientId TEXT NOT NULL,
      clientName TEXT NOT NULL,
      consultationId TEXT,
      astrologerId TEXT,
      dueDate TEXT NOT NULL,
      status TEXT,
      aiMessage TEXT,
      emailSent INTEGER,
      createdAt TEXT NOT NULL
    );
  `);
}

module.exports = { getDb };
