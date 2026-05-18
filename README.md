# 🦅 ANKABYTE — Sourcing Agent (E-Commerce Pro v1.3)

> **BTK Hackathon 2026** — AnkaByte Team  
> AI-powered supplier risk management dashboard for e-commerce operations

---

## 📌 Project Summary & Problem Statement

In today's e-commerce landscape, the greatest threats to store profitability are unplanned cost increases caused by suppliers, defective product shipments, and logistics delays. **Sourcing Agent** is an AI-powered risk management dashboard that continuously monitors suppliers' cost, quality, and logistics performance in multi-layered e-commerce operations — autonomously blocking suppliers that are causing financial damage.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (React Framework), Tailwind CSS (Cyberpunk / Dark Mode UI) |
| **Backend** | Node.js, Express API |
| **Database** | SQLite Database (sourcing.db) |
| **AI Architecture** | LLM Hybrid Agentic RAG Architecture (Simulated Autonomous Agent Engine) |

---

## 🚀 Core Features & Benefits

### 1. 🤖 Autonomous Risk Analysis Engine (Phoenix Engine)
Asynchronously scans **93 global and local suppliers** in the database. Scores price volatility, defective product ratio, and logistics delay indexes through an AI-powered architecture.

### 2. ⚡ Live Agent Operation Flow (Agentic Autonomy)
Autonomously detects suppliers with a threat score of **75 and above**. Displays newly blocked suppliers as 🔴 **danger** and corporate suppliers recovering from risk thresholds as 🟢 **success** logs in the live operations panel — generating category-specific autonomous justifications for each action.

### 3. 📊 Enterprise-Grade User Dashboard
A production-ready dashboard suitable for large-scale e-commerce brands (SaaS), featuring clear statistical cards and a dynamic category localization engine.

---

## 🗄️ Database Architecture

```
suppliers (92 records)
├── id, name, category, location
├── price_tl, price_score, quality_score
└── contact

products
├── id, supplier_id (FK → suppliers)
├── name, brand, price_tl, stock
└── FOREIGN KEY (supplier_id)

reviews
├── id, supplier_id (FK → suppliers)
├── rating, comment
└── FOREIGN KEY (supplier_id)

searches (audit log)
└── id, query, result, created_at
```

---

## 🤖 Agentic Architecture

```
User inputs category + product
        ↓
Suppliers fetched from database
        ↓
AI analyzes supplier risk scores
        ↓
Risk level assigned (low / medium / high)
        ↓
Autonomous blocking of high-risk suppliers
        ↓
Real-time dashboard update with logs
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/suppliers` | List all suppliers |
| GET | `/api/suppliers?category=electronics` | Filter by category |
| POST | `/api/suppliers` | Add new supplier |
| POST | `/api/search` | Search suppliers |
| POST | `/api/analyze` | AI risk analysis |

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/vildannrc/AnkaByte-Sourcing-Agent.git
cd AnkaByte-Sourcing-Agent

# Install dependencies
npm install

# Set environment variables
# Create .env.local and add your API key:
# GEMINI_API_KEY=your_key_here

# Seed the database
node app/api/seed.js

# Start development server
npm run dev
```

---

## 👥 Team — AnkaByte

| Name | Role |
|------|------|
| 👤 VİLDAN NUR NARİÇ(https://github.com/vildannrc)| Backend & Database |
| 👤 BERRAK GÜNDÜZ(https://github.com/berry-jam04) | AI & API Integration |
| 👤 MİSLİNA ÇİÇEKÇİ(https://github.com/mslncckc)  | Frontend & UI/UX |

---

## 🏆 BTK Hackathon 2026

**Evaluation criteria coverage:**

| Criteria | Points | Our Approach |
|----------|--------|--------------|
| User Value | 20p | Solves real supplier monopoly problem |
| Technical Score | 20p | 3 relational tables, REST API, AI integration |
| Agentic Structure | 10p | Multi-step autonomous AI analysis flow |
| Innovation | 10p | Unique anti-monopoly concept |
| User Friendly | 10p | Intuitive dashboard with color-coded risk levels |
| Team Collaboration | 10p | Clear role separation across 3 members |
| Presentation | 10p | Live demo with real-time agent operations |

---

*Made with ❤️ by AnkaByte — BTK Hackathon 2026*