const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(process.cwd(), 'sourcing.db'));

// Suppliers table
db.exec(`
  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    price_score REAL NOT NULL,
    quality_score REAL NOT NULL,
    price_tl REAL NOT NULL DEFAULT 0,
    contact TEXT
  );

  -- Products table (foreign key → suppliers)
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price_tl REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
  );

  -- Reviews table (foreign key → suppliers)
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER NOT NULL,
    rating REAL NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
  );

  -- Risk analysis table (arkadaşının yaklaşımı)
  CREATE TABLE IF NOT EXISTS risk_analizi_db (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER NOT NULL,
    supplier_name TEXT NOT NULL,
    category TEXT NOT NULL,
    risk_level TEXT NOT NULL, -- 'low', 'medium', 'high'
    risk_reason TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    analyzed_price REAL,
    price_score REAL,
    quality_score REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
  );

  -- Searches log table
  CREATE TABLE IF NOT EXISTS searches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    result TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS risk_analizi_db (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER NOT NULL,
    supplier_name TEXT NOT NULL,
    category TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    risk_reason TEXT,
    recommendation TEXT,
    analyzed_price REAL,
    price_score REAL,
    quality_score REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
  );
`);

module.exports = db;