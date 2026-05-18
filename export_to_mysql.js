const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(process.cwd(), 'sourcing.db'));

// Function to get all table names
function getTableNames() {
  const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");
  return stmt.all().map(row => row.name);
}

// Function to get CREATE TABLE statements
function getCreateTableStatements() {
  const tables = getTableNames();
  const statements = [];

  for (const table of tables) {
    // Skip SQLite internal tables
    if (table === 'sqlite_sequence') continue;

    const stmt = db.prepare(`SELECT sql FROM sqlite_master WHERE type='table' AND name=?`);
    const result = stmt.get(table);
    if (result && result.sql) {
      // Convert SQLite syntax to MySQL syntax
      let sql = result.sql;

      // Replace AUTOINCREMENT with AUTO_INCREMENT
      sql = sql.replace(/AUTOINCREMENT/g, 'AUTO_INCREMENT');

      // Replace INTEGER PRIMARY KEY with INT PRIMARY KEY AUTO_INCREMENT for MySQL
      sql = sql.replace(/id INTEGER PRIMARY KEY AUTOINCREMENT/g, 'id INT PRIMARY KEY AUTO_INCREMENT');
      sql = sql.replace(/INTEGER PRIMARY KEY AUTO_INCREMENT/g, 'INT PRIMARY KEY AUTO_INCREMENT');

      statements.push(sql);
    }
  }

  return statements;
}

// Function to get INSERT statements for all data
function getInsertStatements() {
  const tables = getTableNames();
  const statements = [];

  for (const table of tables) {
    const stmt = db.prepare(`SELECT * FROM ${table}`);
    const rows = stmt.all();

    if (rows.length > 0) {
      // Get column names
      const columnStmt = db.prepare(`PRAGMA table_info(${table})`);
      const columns = columnStmt.all().map(col => col.name);

      for (const row of rows) {
        const values = columns.map(col => {
          const value = row[col];
          if (value === null) return 'NULL';
          if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
          return value;
        });

        statements.push(`INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')});`);
      }
    }
  }

  return statements;
}

// Generate the complete SQL dump
function generateSQLDump() {
  const createStatements = getCreateTableStatements();
  const insertStatements = getInsertStatements();

  let dump = '-- MySQL Dump from SQLite\n';
  dump += '-- Generated on ' + new Date().toISOString() + '\n\n';

  dump += 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n';
  dump += 'SET AUTOCOMMIT = 0;\n';
  dump += 'START TRANSACTION;\n\n';

  // Add CREATE TABLE statements
  for (const stmt of createStatements) {
    dump += stmt + ';\n\n';
  }

  // Add INSERT statements
  for (const stmt of insertStatements) {
    dump += stmt + '\n';
  }

  dump += '\nCOMMIT;\n';

  return dump;
}

// Write the dump to file
const dump = generateSQLDump();
fs.writeFileSync('mysql_dump.sql', dump);

console.log('MySQL dump created: mysql_dump.sql');

db.close();