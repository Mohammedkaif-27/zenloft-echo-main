import { Router } from "express";
import { detectCountry, getLocalizedPricing } from "../services/geoPricing.js";

const router = Router();

/**
 * GET /api/pricing
 * 
 * Fallback chain:
 *  1. Auto-detect location → visitor's local currency
 *  2. Location fails → USD
 *  3. Exchange rate fails → INR (emergency)
 *
 * Accepts optional ?country=XX override for testing
 */
router.get("/", async (req, res) => {
  try {
    const countryOverride = (req.query.country as string)?.toUpperCase();

    let countryCode: string | null = countryOverride || null;
    let countryName: string | null = null;

    if (!countryOverride) {
      // Auto-detect from IP
      const clientIp =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress;

      const geo = await detectCountry(clientIp || undefined);
      if (geo) {
        countryCode = geo.countryCode;
        countryName = geo.countryName;
      }
    }

    const pricing = await getLocalizedPricing(countryCode, countryName);
    res.json(pricing);
  } catch (err) {
    console.error("Pricing route error:", err);
    res.status(500).json({ error: "Failed to fetch pricing" });
  }
});

export default router;
