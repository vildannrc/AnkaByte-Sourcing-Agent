# 🦅 ANKABYTE — Tedarik Ajanı (E-Ticaret Pro v1.3)

> **BTK Hackathon 2026** — AnkaByte Ekibi Yapay zeka destekli tedarikçi risk yönetim dashboard'u

---

## 📌 Proje Özeti ve Çözülen Problem

Günümüz e-ticaret dünyasında mağazaların kârlılık marjını tehdit eden en büyük unsurlar; tedarikçi kaynaklı plansız maliyet artışları, kusurlu ürün sevkiyatları ve lojistik gecikmeleridir. **Tedarik Ajanı**, çok katmanlı e-ticaret operasyonlarında kârlılığı korumak adına tedarikçilerin maliyet, kalite ve lojistik performanslarını anlık olarak denetleyen ve zarar ettiren firmaları otonom olarak engelleyen yapay zeka tabanlı bir risk yönetim dashboard'udur.

---

## 🛠️ Kullanılan Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | Next.js (React Framework), Tailwind CSS (Siberpunk / Dark Mode UI) |
| **Backend** | Node.js, Express API |
| **Veri Yönetimi** | SQLite Database (sourcing.db) |
| **Yapay Zeka** | LLM Hybrid Agentic RAG Architecture (Simüle Otonom Ajan Motoru) |

---

## 🚀 Temel Özellikler ve Faydalar

### 1. 🤖 Otonom Risk Analiz Motoru (Phoenix Engine)
Veritabanındaki **93 küresel ve yerel tedarikçiyi** asenkron olarak tarar. Fiyat kararsızlığı, hatalı ürün payı ve lojistik gecikme endekslerini yapay zeka mimarisiyle puanlar.

### 2. ⚡ Canlı Ajan Operasyon Akışı (Agentic Autonomy)
Tehdit skoru **75 ve üzeri** olan firmaları otonom olarak tespit eder. Canlı akış panelinde yeni engellenen firmaları 🔴 **danger**, risk sınırından kurtulan kurumsal firmaları ise 🟢 **success** loglarıyla kategoriye özel otonom gerekçeler üreterek listeler.

### 3. 📊 Kullanıcı Dostu Kurumsal Dashboard
Büyük ölçekli e-ticaret markalarının (SaaS) doğrudan yayına alabileceği nitelikte, anlaşılır istatistik kartları ve dinamik kategori Türkçeleştirme motoru barındırır.

---

## 🗄️ Veritabanı Mimarisi

suppliers (92 kayıt)
- id, name, category, location
- price_tl, price_score, quality_score
- contact

products
- id, supplier_id (FK -> suppliers)
- name, brand, price_tl, stock

reviews
- id, supplier_id (FK -> suppliers)
- rating, comment

searches (arama geçmişi)
- id, query, result, created_at

---

## 📡 API Endpoint'leri

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/suppliers` | Tüm tedarikçileri listele |
| GET | `/api/suppliers?category=electronics` | Kategoriye göre filtrele |
| POST | `/api/suppliers` | Yeni tedarikçi ekle |
| POST | `/api/search` | Tedarikçi ara |
| POST | `/api/analyze` | AI ile risk analizi yap |

---

## 🚀 Kurulum

git clone https://github.com/vildannrc/AnkaByte-Sourcing-Agent.git
cd AnkaByte-Sourcing-Agent
npm install
node app/api/seed.js
npm run dev

---

## 👥 Ekip — AnkaByte

| İsim | Rol |
|------|-----|
| 👤 VİLDAN NUR NARİÇ(https://github.com/vildannrc) | Backend & Veritabanı |
| 👤 BERRAK GÜNDÜZ(https://github.com/berry-jam04)  | Yapay Zeka & API Entegrasyonu |
| 👤 MİSLİNA ÇİÇEKÇİ(https://github.com/mslncckc)   | Frontend & UI/UX |

---

## 🏆 BTK Hackathon 2026

| Kriter | Puan | Yaklaşımımız |
|--------|------|--------------|
| Kullanıcı Değeri | 20p | Gerçek tedarikçi tekelleşme problemini çözüyor |
| Teknik Puan | 20p | 3 ilişkili tablo, REST API, AI entegrasyonu |
| Agentic Yapı | 10p | Çok adımlı otonom AI analiz akışı |
| Yenilikçilik | 10p | Özgün tekelleşme önleme konsepti |
| Kullanıcı Dostu | 10p | Renk kodlu risk seviyeleri ile sezgisel dashboard |
| Takım Çalışması | 10p | 3 üye arasında net rol dağılımı |
| Sunum | 10p | Canlı demo ile gerçek zamanlı ajan operasyonu |

---

*Made with ❤️ by AnkaByte — BTK Hackathon 2026*