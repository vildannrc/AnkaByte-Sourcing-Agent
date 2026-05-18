import db from '../db.js';

// GET - Risk analizlerini getir
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const riskLevel = searchParams.get('risk_level');

  let query = `
    SELECT r.*, s.location, s.contact
    FROM risk_analizi_db r
    JOIN suppliers s ON r.supplier_id = s.id
  `;

  const conditions = [];
  const params = [];

  if (category) {
    conditions.push('r.category = ?');
    params.push(category);
  }

  if (riskLevel) {
    conditions.push('r.risk_level = ?');
    params.push(riskLevel);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY r.created_at DESC';

  const analysis = db.prepare(query).all(...params);

  return Response.json({
    total: analysis.length,
    category: category || 'all',
    risk_level: riskLevel || 'all',
    analysis: analysis
  });
}

// POST - Yeni risk analizi ekle (manuel)
export async function POST(request) {
  const body = await request.json();

  const stmt = db.prepare(`
    INSERT INTO risk_analizi_db (supplier_id, supplier_name, category, risk_level, risk_reason, recommendation, analyzed_price, price_score, quality_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    body.supplier_id,
    body.supplier_name,
    body.category,
    body.risk_level,
    body.risk_reason,
    body.recommendation,
    body.analyzed_price,
    body.price_score,
    body.quality_score
  );

  return Response.json({
    id: result.lastInsertRowid,
    message: 'Risk analizi başarıyla eklendi'
  }, { status: 201 });
}