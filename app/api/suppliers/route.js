import db from '../db.js';

// GET - Tüm tedarikçileri getir
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let suppliers;
  if (category) {
    suppliers = db.prepare('SELECT * FROM suppliers WHERE category = ?').all(category);
  } else {
    suppliers = db.prepare('SELECT * FROM suppliers').all();
  }

  return Response.json(suppliers);
}

// POST - Yeni tedarikçi ekle
export async function POST(request) {
  const body = await request.json();

  const stmt = db.prepare(`
    INSERT INTO suppliers (name, category, location, price_score, quality_score, contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    body.name,
    body.category,
    body.location,
    body.price_score,
    body.quality_score,
    body.contact
  );

  return Response.json({ id: result.lastInsertRowid, ...body }, { status: 201 });
}