import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

// Import routes
import chatRouter from "./routes/chat.js";
import pricingRouter from "./routes/pricing.js";

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

// Middleware — CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:8080",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api/chat", chatRouter);
app.use("/api/pricing", pricingRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 ZenLoft API Server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Chat:   POST http://localhost:${PORT}/api/chat`);
  console.log(`   Pricing: GET http://localhost:${PORT}/api/pricing\n`);
});
