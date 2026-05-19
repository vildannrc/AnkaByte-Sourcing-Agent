const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(process.cwd(), 'sourcing.db'));

// MySQL compatible CREATE TABLE statements
const createTablesSQL = `
-- MySQL Dump from SQLite Database
-- Generated on ${new Date().toISOString()}

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS sourcing_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sourcing_db;

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    price_score DECIMAL(3,1) NOT NULL,
    quality_score DECIMAL(3,1) NOT NULL,
    price_tl DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    contact VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    price_tl DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    PRIMARY KEY (id),
    KEY fk_products_supplier (supplier_id),
    CONSTRAINT fk_products_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT NOT NULL AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY fk_reviews_supplier (supplier_id),
    CONSTRAINT fk_reviews_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Risk analysis table
CREATE TABLE IF NOT EXISTS risk_analizi_db (
    id INT NOT NULL AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    supplier_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    risk_level ENUM('low','medium','high') NOT NULL,
    risk_reason TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    analyzed_price DECIMAL(10,2),
    price_score DECIMAL(3,1),
    quality_score DECIMAL(3,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY fk_risk_supplier (supplier_id),
    CONSTRAINT fk_risk_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Searches table
CREATE TABLE IF NOT EXISTS searches (
    id INT NOT NULL AUTO_INCREMENT,
    query TEXT NOT NULL,
    result TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

// Function to escape SQL values
function escapeSQL(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'string') {
    return "'" + value.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'";
  }
  if (typeof value === 'number') return value.toString();
  return 'NULL';
}

// Function to get all data from a table
function getTableData(tableName) {
  try {
    const stmt = db.prepare(`SELECT * FROM ${tableName}`);
    return stmt.all();
  } catch (error) {
    console.log(`Warning: Could not read table ${tableName}:`, error.message);
    return [];
  }
}

// Function to get column names for a table
function getColumnNames(tableName) {
  try {
    const stmt = db.prepare(`PRAGMA table_info(${tableName})`);
    return stmt.all().map(col => col.name);
  } catch (error) {
    console.log(`Warning: Could not get columns for ${tableName}:`, error.message);
    return [];
  }
}

// Generate INSERT statements
function generateInserts() {
  const tables = ['suppliers', 'products', 'reviews', 'risk_analizi_db', 'searches'];
  let inserts = '';

  for (const table of tables) {
    const data = getTableData(table);
    const columns = getColumnNames(table);

    if (data.length > 0 && columns.length > 0) {
      console.log(`Processing ${data.length} rows for table ${table}`);

      for (const row of data) {
        const values = columns.map(col => escapeSQL(row[col]));
        inserts += `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
      }
      inserts += '\n';
    }
  }

  return inserts;
}

// Generate complete SQL dump
const insertStatements = generateInserts();
const completeSQL = createTablesSQL + '\n-- INSERT DATA --\n' + insertStatements + '\nCOMMIT;\n';

// Write to file
fs.writeFileSync('mysql_dump_v2.sql', completeSQL);

console.log('MySQL dump created successfully: mysql_dump.sql');
console.log('File size:', fs.statSync('mysql_dump.sql').size, 'bytes');

db.close();