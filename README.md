<<<<<<< HEAD
# 🚀 Sourcing Agent - Fahiş Fiyat Tespiti

AI destekli tedarikçi fiyat analizi uygulaması. Gemini AI kullanarak tedarikçilerin fahiş fiyat uygulayıp uygulamadığını tespit eder.

## Özellikler

- ✅ **92 Tedarikçi Verisi**: Elektronik, bilgisayar ve mobil kategorilerinde
- ✅ **AI Fiyat Analizi**: Google Gemini ile akıllı fiyat risk tespiti
- ✅ **Risk Seviyeleri**: Düşük/Orta/Yüksek risk ile renkli gösterim
- ✅ **Kategori Filtreleme**: Kategoriye göre tedarikçi listeleme
- ✅ **Responsive Tasarım**: Mobil uyumlu modern arayüz

## Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Google Gemini API Anahtarı alın:**
   - [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
   - Yeni bir API anahtarı oluşturun

3. **Environment değişkenlerini ayarlayın:**
   `.env.local` dosyasını oluşturun ve API anahtarınızı ekleyin:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

4. **Veritabanını hazırlayın:**
   ```bash
   node app/api/seed.js
   ```

5. **Uygulamayı başlatın:**
   ```bash
   npm run dev
   ```

6. **Tarayıcıda açın:** [http://localhost:3000](http://localhost:3000)

## Kullanım

1. **Kategori Seçin:** Elektronik, bilgisayar veya mobil kategorilerinden birini seçin
2. **Ürün Adı Girin:** Analiz edilecek ürünü belirtin (örn: "Laptop", "Akıllı Telefon")
3. **Tedarikçileri Getirin:** Seçilen kategorideki tedarikçileri listeleyin
4. **AI Analizi Yapın:** Gemini AI ile fiyat risklerini analiz ettirin

## API Endpoints

- `GET /api/suppliers` - Tüm tedarikçileri getir
- `GET /api/suppliers?category=electronics` - Kategoriye göre filtrele
- `POST /api/analyze` - AI fiyat analizi
- `POST /api/search` - Arama loglaması

## Teknoloji Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite (better-sqlite3)
- **AI:** Google Gemini 1.5 Flash
- **Styling:** Tailwind CSS

## Veri Yapısı

### Suppliers Tablosu
```sql
CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  price_score REAL NOT NULL,
  quality_score REAL NOT NULL,
  price_tl REAL NOT NULL,
  contact TEXT
);
```

### Risk Seviyeleri
- 🟢 **Düşük Risk (low)**: Güvenli fiyatlar
- 🟡 **Orta Risk (medium)**: Dikkat edilmesi gereken fiyatlar
- 🔴 **Yüksek Risk (high)**: Fahiş fiyat - kaçınılmalı

## Geliştirme

Kod değişikliklerinden sonra veritabanını yeniden oluşturmak için:
```bash
# Mevcut veritabanını sil
Remove-Item sourcing.db

# Yeniden oluştur
node app/api/seed.js
```

## Dağıtım

Vercel'e dağıtmak için:
```bash
npm run build
vercel --prod
```

**Not:** `.env.local` dosyasındaki API anahtarınızı Vercel environment variables'a eklemeyi unutmayın.
=======
# AnkaByte-Sourcing-Agent
>>>>>>> 7b31aaef360364152fdb2706e3f5611339d2d6c7
