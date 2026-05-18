import mysql from 'mysql2/promise';
import { createGeminiClient, getGeminiApiKey, isTooManyRequestsError } from '../../lib/gemini.js';

const db = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

let geminiClient;
function getGeminiClient() {
  if (!geminiClient) {
    geminiClient = createGeminiClient();
  }
  return geminiClient;
}

export async function POST(request) {
  const key = getGeminiApiKey();
  const body = await request.json();
  const { query, category } = body;

  // 1. Veritabanından tedarikçileri çek
  let suppliers;
  if (category) {
    const [rows] = await db.execute(
      'SELECT * FROM suppliers WHERE category = ?', [category]
    );
    suppliers = rows;
  } else {
    const [rows] = await db.execute('SELECT * FROM suppliers');
    suppliers = rows;
  }

  // 2. Gemini'ye gönder
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
  const prompt = `
    Sen bir tedarikçi analiz uzmanısın. 
    Kullanıcının isteği: "${query}"
    Tedarikçiler: ${JSON.stringify(suppliers)}
    
    Şunları yap:
    1. Fahiş fiyatlı tedarikçileri tespit et (price_score 3'ten düşük olanlar)
    2. En iyi 3 alternatif tedarikçiyi öner
    3. Kaç TL tasarruf edileceğini hesapla
    4. Kısa Türkçe analiz yaz
  `;

  let aiAnalysis;
  try {
    const result = await model.generateContent(prompt);
    aiAnalysis = await result.response.text();
  } catch (error) {
    if (isTooManyRequestsError(error)) {
      return Response.json({
        error: 'Too Many Requests. Free tier kotasi dolmuş olabilir. Bir süre bekleyip yeniden deneyin.',
        details: error.message,
        keyPresent: Boolean(key)
      }, { status: 429 });
    }
    throw error;
  }

  // 3. Arama logunu kaydet
  await db.execute(
    'INSERT INTO searches (query, result) VALUES (?, ?)',
    [query, aiAnalysis]
  );

  // 4. Sonucu döndür
  return Response.json({
    query,
    suppliers,
    aiAnalysis,
    overpriced: suppliers.filter(s => s.price_score < 3),
    recommended: suppliers.filter(s => s.price_score >= 8).slice(0, 3)
  });
}