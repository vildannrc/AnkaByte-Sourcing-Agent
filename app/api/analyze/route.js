import db from '../db.js';
import { createGeminiClient, getGeminiApiKey, isTooManyRequestsError } from '../../lib/gemini.js';

let geminiClient;
function getGeminiClient() {
  if (!geminiClient) {
    geminiClient = createGeminiClient();
  }
  return geminiClient;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { category, product } = body;

    // Veritabanından tedarikçileri çek
    let suppliers;
    if (category) {
      suppliers = db.prepare('SELECT * FROM suppliers WHERE category = ?').all(category);
    } else {
      suppliers = db.prepare('SELECT * FROM suppliers').all();
    }

    if (suppliers.length === 0) {
      return Response.json({ error: 'Bu kategoride tedarikçi bulunamadı' }, { status: 404 });
    }

    const key = getGeminiApiKey();
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });

    const prompt = `
    Aşağıdaki tedarikçi verilerini analiz et ve fahiş fiyatlı olanları tespit et.
    ${product ? `Ürün: ${product}` : ''}

    Tedarikçi verileri:
    ${suppliers.slice(0, 10).map(s =>
      `- ${s.name} (${s.location}): ${s.price_tl} TL, Fiyat skoru: ${s.price_score}/10, Kalite skoru: ${s.quality_score}/10`
    ).join('\n')}

    Her tedarikçi için JSON formatinda döndür:
    [{"name": "Tedarikçi Adi", "risk_level": "low/medium/high", "risk_reason": "neden", "recommendation": "tavsiye"}, ...]
    Sadece JSON döndür, başka hiçbir şey yazma.
    `;

    let text;
    try {
      const result = await model.generateContent(prompt);
      text = await result.response.text();
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

    // JSON parse et
    let analysis;
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch {
      analysis = suppliers.slice(0, 10).map(s => ({
        name: s.name,
        risk_level: s.price_score < 3 ? 'high' : s.price_score < 6 ? 'medium' : 'low',
        risk_reason: s.price_score < 3 ? 'Fahiş fiyat tespit edildi' : 'Normal fiyat aralığı',
        recommendation: s.price_score < 3 ? 'Bu tedarikçiden kaçinin' : 'Güvenli seçenek'
      }));
    }

    // Tedarikçi verilerini analiz ile birleştir
    const enrichedSuppliers = suppliers.map(supplier => {
      const analysisData = analysis.find(a => a.name === supplier.name) || {
        risk_level: supplier.price_score < 3 ? 'high' : 'low',
        risk_reason: 'Analiz edilemedi',
        recommendation: 'Manuel kontrol gerekli'
      };
      return { ...supplier, ...analysisData };
    });

    return Response.json({
      category: category || 'all',
      product: product || '',
      total_suppliers: suppliers.length,
      analyzed_suppliers: enrichedSuppliers,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analyze API hatası:', error);
    return Response.json({
      error: 'Analiz sırasında hata oluştu',
      details: error.message
    }, { status: 500 });
  }
}