# 🦅 ANKABYTE — Tedarik Ajanı (E-Ticaret Pro v1.3)

> **BTK Hackathon 2026** — AnkaByte Ekibi Yapay zeka destekli tedarikçi risk yönetim dashboard'u

---

## 📌 Proje Özeti ve Çözülen Problem

Günümüz e-ticaret dünyasında mağazaların kârlılık marjını tehdit eden en büyük unsurlar; tedarikçi kaynaklı plansız maliyet artışları, kusurlu ürün sevkiyatları ve lojistik gecikmeleridir. **Tedarik Ajanı**, çok katmanlı e-ticaret operasyonlarında kârlılığı korumak adına tedarikçilerin maliyet, kalite ve lojistik performanslarını anlık olarak denetleyen ve zarar ettiren firmaları otonom olarak engelleyen yapay zeka tabanlı bir risk yönetim dashboard'udur.

---

## 🚀 Temel Özellikler ve Faydalar

1. **Otonom Risk Analiz Motoru (Phoenix Engine):** Veritabanındaki 93 küresel ve yerel tedarikçiyi asenkron olarak tarar. Fiyat kararsızlığı, hatalı ürün payı ve lojistik gecikme endekslerini yapay zeka mimarisiyle puanlar.

2. **Canlı Ajan Operasyon Akışı (Agentic Autonomy):** Tehdit skoru 75 ve üzeri olan firmaları otonom olarak tespit eder. Canlı akış panelinde yeni engellenen firmaları kırmızı tehlike (danger), risk sınırından kurtulan kurumsal firmaları ise yeşil onay (success) loglarıyla kategoriye özel otonom gerekçeler üreterek listeler.

3. **Kullanıcı Dostu Kurumsal Dashboard:** Büyük ölçekli e-ticaret markalarının (SaaS) doğrudan yayına alabileceği nitelikte, anlaşılır istatistik kartları ve dinamik kategori Türkçeleştirme motoru barındırır.

---

## 🛠️ Kullanılan Teknolojiler

- **Frontend Mimarisi:** Next.js (React Framework), Tailwind CSS (Siberpunk / Dark Mode UI)
- **Backend Altyapısı:** Node.js, Express API
- **Veri Yönetimi:** SQLite Database (sourcing.db)
- **Yapay Zeka Mimarisi:** LLM Hybrid Agentic RAG Architecture (Simüle Otonom Ajan Motoru)

---

## 🗄️ Veritabanı Mimarisi

suppliers (93 kayıt)
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

## 🖥️ Dağıtım Durumu

"Proje şu an **yerel geliştirme ortamında (localhost)** bir sandbox olarak çalışmaktadır. SQLite veritabanı senkronizasyonuyla **tam fonksiyonel (fully-functional)** olarak çalışan bir **Stand-alone MVP**dir. Ürün, henüz canlı ortama (production) alınmamış olup, bulut altyapısına taşınmaya hazır ve ölçeklenebilir bir mimariyle geliştirilmiştir; bu aşamada test ve sandbox ortamında eksiksiz biçimde işlev göstermektedir."

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

*Made with ❤️ by AnkaByte — BTK Hackathon 2026*