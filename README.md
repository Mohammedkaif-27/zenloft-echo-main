<div align="center">

# ⚡ ZENLOFT · STUDIO

### Premium Digital Agency — AI-Powered Website Platform

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-zenloftstudio.online-00E5FF?style=for-the-badge)](https://zenloftstudio.online)
[![Backend API](https://img.shields.io/badge/⚙️_API-Render-46E3B7?style=for-the-badge)](https://zenloft-api.onrender.com/api/health)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-FF6B35?logo=data&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white)

</div>

---

## 🎯 About

**ZenLoft Studio** is a production-grade, full-stack digital agency platform built for real client acquisition. It features an AI-powered chatbot with RAG-based knowledge retrieval, geo-adaptive dynamic pricing, real-time lead capture with Supabase persistence, and a premium dark-themed UI with 3D visuals, glassmorphism, and micro-animations.

> **Live at:** [zenloftstudio.online](https://zenloftstudio.online)

---

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────┐     ┌────────────────────────────────┐
│         NETLIFY (CDN)           │     │        RENDER.COM              │
│    zenloftstudio.online         │     │   zenloft-api.onrender.com     │
│                                 │     │                                │
│  React + Vite (Static Build)    │────▶│  Express API Server            │
│  • Landing, Works, Services     │ API │  • POST /api/chat  (Groq AI)   │
│  • AI Chat Widget (Frontend)    │     │  • GET  /api/pricing (Geo)     │
│  • Contact Form (Supabase)      │     │  • GET  /api/health            │
└─────────────┬───────────────────┘     └────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│          SUPABASE               │
│    (PostgreSQL + Auth)          │
│                                 │
│  • contacts — form submissions  │
│  • leads    — chatbot captures  │
└─────────────────────────────────┘
```

| Service | Platform | URL | Cost |
|---------|----------|-----|------|
| **Frontend** | Netlify | [zenloftstudio.online](https://zenloftstudio.online) | Free |
| **Backend API** | Render | [zenloft-api.onrender.com](https://zenloft-api.onrender.com/api/health) | Free |
| **Database** | Supabase | PostgreSQL (managed) | Free |
| **AI Model** | Groq | Llama 3.1 8B Instant | Free |
| **Currency API** | ExchangeRate API | exchangerate-api.com | Free |

---

## ✨ Key Features

### 🤖 AI Chatbot (RAG + LLM)
- **Groq-powered** conversational assistant using Llama 3.1 8B Instant
- **RAG pipeline** — semantic keyword search across a structured knowledge base
- **Dual-tier fallback** — LLM backend → client-side RAG (zero downtime)
- **Lead capture** — detects buying intent and triggers inline forms
- **Speech-to-text** — voice input via Web Speech API
- **Pricing injection** — live geo-converted prices embedded in chat responses

### 💰 Dynamic Geo-Pricing
- Auto-detects visitor location via IP geolocation (ipapi.co → ipinfo.io fallback)
- Converts INR base prices to 15+ local currencies in real-time
- Exchange rates cached for 6 hours for performance
- 3-tier fallback: Local Currency → USD → INR (guaranteed display)

### 📬 Lead Generation Pipeline
- **Contact form** → Supabase `contacts` table
- **Chatbot intent detection** → Supabase `leads` table
- **Graceful degradation** — works without Supabase (simulates success locally)

### 🎨 Premium UI/UX
- Dark theme with glassmorphism and neon accents
- Framer Motion page transitions and micro-animations
- Three.js particle system on hero section
- Custom cursor with interaction feedback
- Ambient background audio (toggleable)
- Fully responsive (mobile, tablet, desktop)
- Smooth scroll with Lenis

---

## 🔍 SEO & Performance

### Search Engine Optimization
- **JSON-LD structured data** — `ProfessionalService`, `WebSite`, `FAQPage` schemas
- **Open Graph + Twitter Cards** — optimized social sharing metadata
- **Dynamic meta tags** — per-page title, description, and canonical URL via `useSEO` hook
- **XML Sitemap** — 30+ indexed URLs (pages, services, projects)
- **robots.txt** — configured with sitemap reference and API exclusion
- **Semantic HTML5** — proper heading hierarchy and landmark elements

### Performance
- **Code splitting** — manual chunks (React, Three.js, Supabase, UI vendor)
- **Immutable asset caching** — `max-age=31536000` for hashed JS/CSS/images/fonts
- **Font optimization** — `display=swap` + `preconnect` for Google Fonts & Fontshare
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- **Lazy loading** — route-based code splitting via React Router

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Three.js + R3F | 3D particle hero |
| Radix UI | Accessible primitives |
| Supabase JS | Database client |
| Lucide React | Icon system |
| React Router 6 | Client-side routing |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express 4 | HTTP server |
| TypeScript (tsx) | Type-safe server |
| Groq SDK | LLM inference (Llama 3.1) |
| Custom RAG | Knowledge retrieval engine |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Netlify | Frontend hosting + CDN |
| Render | Backend API hosting |
| Supabase | PostgreSQL database |
| Groq Cloud | AI model inference |
| ExchangeRate API | Currency conversion |

---

## 📁 Project Structure

```
zenloft-echo/
├── public/                        # Static assets
│   ├── og-image.png               # Social sharing image
│   ├── sitemap.xml                # XML sitemap (30+ URLs)
│   ├── robots.txt                 # Crawler directives
│   ├── _redirects                 # Netlify SPA routing
│   └── site.webmanifest           # PWA manifest
│
├── server/                        # Backend API (deployed to Render)
│   ├── data/
│   │   ├── knowledge.json         # RAG knowledge base (19 chunks)
│   │   └── pricing.json           # Base INR pricing data
│   ├── routes/
│   │   ├── chat.ts                # POST /api/chat
│   │   └── pricing.ts             # GET  /api/pricing
│   ├── services/
│   │   ├── gemini.ts              # Groq AI + system prompt
│   │   ├── geoPricing.ts          # IP geolocation + currency
│   │   └── rag.ts                 # Semantic search engine
│   ├── index.ts                   # Express entry point
│   └── package.json
│
├── src/                           # Frontend React app (deployed to Netlify)
│   ├── components/
│   │   ├── ChatWidget.tsx         # AI chatbot widget
│   │   ├── ContactSection.tsx     # Contact form → Supabase
│   │   ├── HeroSection.tsx        # Hero with 3D particles
│   │   ├── ServicesSection.tsx    # Services showcase
│   │   ├── ProjectsSection.tsx   # Portfolio grid
│   │   └── Navigation.tsx         # Header + sound toggle
│   ├── hooks/
│   │   ├── useChatBot.ts          # Chat logic + lead detection
│   │   ├── usePricing.ts          # Geo-pricing with fallbacks
│   │   ├── useVoice.ts            # Speech-to-text
│   │   └── useSEO.ts              # Dynamic meta tags
│   ├── lib/
│   │   ├── api.ts                 # API base URL config
│   │   ├── supabase.ts            # Supabase client + helpers
│   │   ├── chatSearch.ts          # Client-side RAG fallback
│   │   └── ambient-sound.ts       # Audio controller
│   ├── data/
│   │   ├── knowledgeBase.ts       # Client-side knowledge (fallback)
│   │   ├── projectsData.ts        # 20 portfolio case studies
│   │   └── servicesData.ts        # 6 service categories
│   └── pages/                     # Route pages
│
├── index.html                     # Entry HTML + JSON-LD schemas
├── netlify.toml                   # Netlify build + headers config
├── vite.config.ts                 # Vite config + proxy + chunks
├── tailwind.config.ts             # Tailwind theme config
└── .gitignore
```

---

## 🚀 Local Development

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone & Install

```bash
git clone https://github.com/Mohammedkaif-27/zenloft-echo-main.git
cd zenloft-echo-main

# Frontend dependencies
npm install

# Backend dependencies
cd server && npm install && cd ..
```

### 2. Environment Variables

**Backend** — create `server/.env`:
```env
GROQ_API_KEY=your_groq_api_key
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
PORT=3001
```

**Frontend** — create `.env` (root):
```env
VITE_API_URL=                          # Leave empty for local dev (uses Vite proxy)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

> 🔑 Get free API keys:
> - Groq → [console.groq.com](https://console.groq.com)
> - ExchangeRate → [exchangerate-api.com](https://www.exchangerate-api.com)
> - Supabase → [supabase.com](https://supabase.com)

### 3. Run (Two Terminals)

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
npm run dev
```

Open **http://localhost:8080** — the frontend auto-proxies `/api/*` to the backend.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check → `{ status: "ok" }` |
| `POST` | `/api/chat` | AI chat with RAG context |
| `GET` | `/api/pricing` | Auto-detected geo pricing |
| `GET` | `/api/pricing?country=US` | Override country (testing) |

---

## 📊 System Flows

### AI Chat Pipeline
```
User Message → RAG Keyword Search → Top 3 Knowledge Chunks
     ↓
Pricing Query? → Inject live geo-converted prices
     ↓
Groq API (Llama 3.1 8B) + System Prompt + Context
     ↓
Response with [PRICING] blocks → PricingCard UI
     ↓
Buying Intent Detected? → Trigger Lead Capture Form → Supabase
```

### Geo-Pricing Pipeline
```
Page Load → GET /api/pricing
     ↓
IP Detection: ipapi.co → ipinfo.io (fallback)
     ↓
Country → Currency Mapping (15+ currencies)
     ↓
ExchangeRate API (6h cache) → Convert INR → Local
     ↓
Frontend: Display prices in visitor's currency
     ↓
Fallback: USD → INR (guaranteed)
```

---

## 🔐 Environment Variables Reference

### Backend (Render)

| Variable | Required | Description |
|----------|:--------:|-------------|
| `GROQ_API_KEY` | ✅ | Groq API key for AI chat |
| `EXCHANGE_RATE_API_KEY` | ✅ | Currency conversion API key |
| `PORT` | ❌ | Server port (default: 3001) |
| `FRONTEND_URL` | ❌ | Production frontend URL (CORS) |

### Frontend (Netlify)

| Variable | Required | Description |
|----------|:--------:|-------------|
| `VITE_API_URL` | ✅ | Backend API URL (Render) |
| `VITE_SUPABASE_URL` | ❌ | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ❌ | Supabase anonymous key |

---

## 📄 Pages & Routes

| Route | Page | SEO |
|-------|------|-----|
| `/` | Home — Hero, Services, Portfolio, CTA | ✅ Full meta + JSON-LD |
| `/works` | Portfolio — 20 case studies | ✅ Dynamic meta |
| `/works/:slug` | Project detail — individual case study | ✅ Per-project meta |
| `/services` | Services overview — 6 categories | ✅ Dynamic meta |
| `/services/:slug` | Service detail — pricing, features | ✅ Per-service meta |
| `/contact` | Contact form + map | ✅ Dynamic meta |
| `/privacy` | Privacy policy | ✅ Dynamic meta |
| `/terms` | Terms of service | ✅ Dynamic meta |

---

## 📜 License

This project is private and proprietary to ZenLoft Studio. All rights reserved.

---

<div align="center">

**Built with precision by [ZenLoft Studio](https://zenloftstudio.online)**

Founded by **Mohammed Kaif** & **Soha Kousar**  **Co-Founders · ZenLoft Studio**

📧 zenloftstudio@gmail.com · 📞 +91 9705407470 · 💬 WhatsApp: +91 8520030086

[![Instagram](https://img.shields.io/badge/@zenloftstudio-E4405F?logo=instagram&logoColor=white)](https://instagram.com/zenloftstudio)
[![GitHub](https://img.shields.io/badge/Mohammedkaif--27-181717?logo=github&logoColor=white)](https://github.com/Mohammedkaif-27)

</div>
