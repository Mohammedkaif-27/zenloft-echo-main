<div align="center">

# ⚡ ZenLoft Studio

**Premium Digital Agency — Website, AI Chatbot & Dynamic Pricing Platform**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-FF6B35?logo=data&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## Overview

ZenLoft Studio is a production-grade agency website featuring:

- **AI Chatbot** — Powered by Groq (Llama 3.1 8B) with RAG-based knowledge retrieval
- **Dynamic Pricing** — Auto-detects visitor location and converts INR pricing to local currency
- **Voice Input** — Speech-to-text via Web Speech API (microphone)
- **Ambient Sound** — Toggleable background audio experience
- **Lead Capture** — Intent-based lead forms triggered naturally in conversation
- **Premium UI** — Dark theme, glassmorphism, Framer Motion animations

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express, TypeScript (tsx) |
| **AI Model** | Groq SDK → Llama 3.1 8B Instant |
| **Geolocation** | ipapi.co → ipinfo.io (fallback chain) |
| **Currency** | ExchangeRate API (free tier, 6h cache) |
| **3D** | Three.js, React Three Fiber |

---

## Project Structure

```
zenloft-echo/
├── public/                  # Static assets (images, audio)
│   └── ambient-music.mp3    # Background audio file
├── server/                  # Backend API server
│   ├── data/
│   │   └── pricing.json     # Base INR pricing data
│   ├── routes/
│   │   ├── chat.ts          # POST /api/chat
│   │   └── pricing.ts       # GET  /api/pricing
│   ├── services/
│   │   ├── gemini.ts        # Groq AI chat service + RAG
│   │   ├── geoPricing.ts    # Geolocation + currency conversion
│   │   └── rag.ts           # Knowledge retrieval engine
│   ├── .env                 # API keys (not committed)
│   ├── index.ts             # Express server entry
│   └── package.json
├── src/                     # Frontend React app
│   ├── components/
│   │   ├── ChatWidget.tsx    # AI chatbot UI
│   │   ├── Navigation.tsx    # Top nav + sound toggle
│   │   └── ui/
│   │       ├── AssistantAvatar.tsx
│   │       └── PricingCard.tsx
│   ├── hooks/
│   │   ├── useChatBot.ts    # Chat state management
│   │   ├── usePricing.ts    # Location-based pricing hook
│   │   └── useVoice.ts      # Speech-to-text hook
│   ├── lib/
│   │   └── ambient-sound.ts # Audio playback controller
│   └── data/
│       └── knowledgeBase.ts  # RAG knowledge chunks
├── .gitignore
├── package.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the Repository

```bash
git clone https://github.com/Mohammedkaif-27/zenloft-echo-main
cd zenloft-echo
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create the file `server/.env`:

```env
# Groq API (required for AI chat)
GROQ_API_KEY="your_groq_api_key_here"

# ExchangeRate API (free tier: https://www.exchangerate-api.com/)
EXCHANGE_RATE_API_KEY="your_exchange_rate_api_key_here"

# Server port
PORT=3001
```

> Get your free Groq API key at [console.groq.com](https://console.groq.com)
> Get your free ExchangeRate API key at [exchangerate-api.com](https://www.exchangerate-api.com/)

---

## Running the Application

You need **two terminals** — one for the frontend, one for the backend.

### Terminal 1 — Backend API Server

```bash
cd server
npm run dev
```

The backend starts on `http://localhost:3001` with hot-reload via `tsx watch`.

### Terminal 2 — Frontend Dev Server

```bash
npm run dev
```

The frontend starts on `http://localhost:8080` and proxies `/api/*` requests to the backend.

### Open in Browser

```
http://localhost:8080
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/chat` | AI chat (Groq + RAG) |
| `GET` | `/api/pricing` | Location-based pricing |
| `GET` | `/api/pricing?country=US` | Override country for testing |

---

## Dynamic Pricing Flow

```
Visitor loads page
       ↓
Frontend calls GET /api/pricing
       ↓
Backend detects IP → ipapi.co / ipinfo.io
       ↓
Maps country → currency (USD, EUR, GBP, etc.)
       ↓
Fetches live exchange rates (cached 6 hours)
       ↓
Converts INR base prices → local currency
       ↓
Returns pricing with symbol, rate, and fallback info
```

**Fallback Chain:**
1. ✅ Local currency (geolocation success)
2. ⚠️ USD (geolocation failed)
3. 🔴 INR (exchange rate API also failed)

---

## AI Chat Architecture

```
User message
       ↓
RAG: Semantic search in knowledgeBase.ts
       ↓
If pricing query → inject live converted prices
       ↓
Groq API (llama-3.1-8b-instant) + system prompt
       ↓
Response with [PRICING] blocks → PricingCard UI
       ↓
Intent detection → Lead capture form
```

---

## Production Build

```bash
npm run build
npm run preview
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Groq API key for AI chat |
| `EXCHANGE_RATE_API_KEY` | Yes | ExchangeRate API key for currency conversion |
| `PORT` | No | Backend port (default: 3001) |

---

## License

This project is private and proprietary to ZenLoft Studio.

---

<div align="center">

**Built with precision by [ZenLoft Studio](https://zenloftstudio.online)** · Founded by **Mohammed Kaif**

</div>
