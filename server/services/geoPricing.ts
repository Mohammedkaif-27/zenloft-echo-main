/**
 * Geolocation + Currency Conversion Service
 * 
 * Priority:
 *  1. Visitor's local currency (when location detection succeeds)
 *  2. USD fallback (when location detection fails)
 *  3. INR emergency fallback (when both location + exchange rate APIs fail)
 *
 * Uses ipapi.co (primary) → ipinfo.io (fallback) for geolocation
 * Uses ExchangeRate API for live INR conversion with 6-hour caching
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load pricing data
const pricingData = JSON.parse(
  readFileSync(join(__dirname, "../data/pricing.json"), "utf-8")
);

// ── Currency symbol map ──
const currencySymbols: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", AED: "د.إ",
  CAD: "C$", AUD: "A$", JPY: "¥", SGD: "S$", MYR: "RM",
  SAR: "﷼", KWD: "د.ك", BDT: "৳", PKR: "₨", LKR: "Rs",
  NPR: "रू", PHP: "₱", THB: "฿", IDR: "Rp", KRW: "₩",
  TRY: "₺", BRL: "R$", MXN: "MX$", ZAR: "R", NGN: "₦",
  NZD: "NZ$", CHF: "CHF", SEK: "kr", NOK: "kr", DKK: "kr",
  PLN: "zł", CZK: "Kč", HUF: "Ft", RON: "lei", BGN: "лв",
  HRK: "kn", RUB: "₽", UAH: "₴", EGP: "E£", QAR: "QR",
  OMR: "OMR", BHD: "BD", JOD: "JD", IQD: "د.ع",
};

// ── Country to currency mapping ──
const countryCurrency: Record<string, string> = {
  US: "USD", GB: "GBP", DE: "EUR", FR: "EUR", IT: "EUR",
  ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", IE: "EUR",
  PT: "EUR", FI: "EUR", GR: "EUR", SK: "EUR", SI: "EUR",
  EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR",
  LU: "EUR", IN: "INR", AE: "AED", SA: "SAR", KW: "KWD",
  CA: "CAD", AU: "AUD", JP: "JPY", SG: "SGD", MY: "MYR",
  BD: "BDT", PK: "PKR", LK: "LKR", NP: "NPR", PH: "PHP",
  TH: "THB", ID: "IDR", KR: "KRW", TR: "TRY", BR: "BRL",
  MX: "MXN", ZA: "ZAR", NG: "NGN", NZ: "NZD", CH: "CHF",
  SE: "SEK", NO: "NOK", DK: "DKK", PL: "PLN", CZ: "CZK",
  HU: "HUF", RO: "RON", BG: "BGN", HR: "HRK", RU: "RUB",
  UA: "UAH", EG: "EGP", QA: "QAR", OM: "OMR", BH: "BHD",
  JO: "JOD", IQ: "IQD",
};

// ── Country name mapping ──
const countryNames: Record<string, string> = {
  US: "United States", GB: "United Kingdom", DE: "Germany", FR: "France",
  IT: "Italy", ES: "Spain", NL: "Netherlands", BE: "Belgium", AT: "Austria",
  IE: "Ireland", PT: "Portugal", FI: "Finland", GR: "Greece", IN: "India",
  AE: "United Arab Emirates", SA: "Saudi Arabia", KW: "Kuwait", CA: "Canada",
  AU: "Australia", JP: "Japan", SG: "Singapore", MY: "Malaysia", BD: "Bangladesh",
  PK: "Pakistan", LK: "Sri Lanka", NP: "Nepal", PH: "Philippines", TH: "Thailand",
  ID: "Indonesia", KR: "South Korea", TR: "Turkey", BR: "Brazil", MX: "Mexico",
  ZA: "South Africa", NG: "Nigeria", NZ: "New Zealand", CH: "Switzerland",
  SE: "Sweden", NO: "Norway", DK: "Denmark", PL: "Poland", CZ: "Czech Republic",
  HU: "Hungary", RO: "Romania", BG: "Bulgaria", RU: "Russia", UA: "Ukraine",
  EG: "Egypt", QA: "Qatar", OM: "Oman", BH: "Bahrain", JO: "Jordan", IQ: "Iraq",
};

// ── Exchange rate cache (6 hours) ──
let rateCache: { rates: Record<string, number>; fetchedAt: number } | null = null;
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

/**
 * Detect visitor's country using ipapi.co → ipinfo.io fallback chain
 * When no clientIp is provided (localhost), calls the API without an IP
 * so it detects the server's public IP (works with VPNs)
 */
export async function detectCountry(
  clientIp?: string
): Promise<{ countryCode: string; countryName: string; city: string } | null> {
  
  // Determine if the request is from localhost
  const isLocal = !clientIp || clientIp === "::1" || clientIp === "127.0.0.1" || clientIp === "::ffff:127.0.0.1";

  // ── Attempt 1: ipapi.co (free, no key, 1000 req/day) ──
  try {
    // For localhost: call without IP to detect server's public IP (VPN-aware)
    // For production: use the actual client IP
    const url = isLocal
      ? "https://ipapi.co/json/"
      : `https://ipapi.co/${clientIp}/json/`;

    console.log(`🌍 [GEO] Calling ipapi.co... (${isLocal ? "public IP mode" : `IP: ${clientIp}`})`);
    
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data.country_code && !data.error) {
        const code = data.country_code.toUpperCase();
        const result = {
          countryCode: code,
          countryName: data.country_name || countryNames[code] || code,
          city: data.city || "Unknown",
        };
        console.log(`✅ [GEO] Detected Country: ${result.countryName}`);
        console.log(`✅ [GEO] Detected Country Code: ${result.countryCode}`);
        console.log(`✅ [GEO] Detected City: ${result.city}`);
        console.log(`✅ [GEO] Detected Currency: ${countryCurrency[code] || "USD"}`);
        return result;
      } else {
        console.warn(`⚠️ [GEO] ipapi.co returned error:`, data.error || data.reason || "unknown");
      }
    } else {
      console.warn(`⚠️ [GEO] ipapi.co HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn("⚠️ [GEO] ipapi.co failed:", (err as Error).message);
  }

  // ── Attempt 2: ipinfo.io (free, no key, 50k req/month) ──
  try {
    const url = isLocal
      ? "https://ipinfo.io/json"
      : `https://ipinfo.io/${clientIp}/json`;

    console.log(`🌍 [GEO] Falling back to ipinfo.io...`);

    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data.country) {
        const code = data.country.toUpperCase();
        const result = {
          countryCode: code,
          countryName: countryNames[code] || data.region || code,
          city: data.city || "Unknown",
        };
        console.log(`✅ [GEO] Detected Country: ${result.countryName} (via ipinfo.io)`);
        console.log(`✅ [GEO] Detected Currency: ${countryCurrency[code] || "USD"}`);
        console.log(`✅ [GEO] Detected City: ${result.city}`);
        return result;
      }
    }
  } catch (err) {
    console.warn("⚠️ [GEO] ipinfo.io also failed:", (err as Error).message);
  }

  // ── All detection failed ──
  console.error("❌ [GEO] All geolocation services failed. Will fall back to USD.");
  return null;
}

/**
 * Fetch live exchange rates (INR base) from ExchangeRate API
 * Cached for 6 hours to minimize API calls
 */
async function fetchExchangeRates(): Promise<Record<string, number> | null> {
  // Return cache if fresh
  if (rateCache && Date.now() - rateCache.fetchedAt < CACHE_DURATION) {
    console.log("💱 [RATES] Using cached exchange rates");
    return rateCache.rates;
  }

  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (apiKey && apiKey !== "YOUR_EXCHANGE_RATE_API_KEY_HERE") {
    try {
      console.log("💱 [RATES] Fetching live exchange rates from ExchangeRate API...");
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`,
        { signal: AbortSignal.timeout(8000) }
      );
      const data = await res.json();
      if (data.result === "success" && data.conversion_rates) {
        rateCache = { rates: data.conversion_rates, fetchedAt: Date.now() };
        console.log("✅ [RATES] Exchange rates refreshed successfully");
        console.log(`   USD: ${data.conversion_rates.USD}, EUR: ${data.conversion_rates.EUR}, GBP: ${data.conversion_rates.GBP}`);
        return data.conversion_rates;
      } else {
        console.warn("⚠️ [RATES] API returned non-success:", data.result);
      }
    } catch (err) {
      console.warn("⚠️ [RATES] ExchangeRate API failed:", (err as Error).message);
    }
  } else {
    console.warn("⚠️ [RATES] No ExchangeRate API key configured");
  }

  // If we have stale cache, use it rather than failing
  if (rateCache) {
    console.warn("⚠️ [RATES] Using stale exchange rate cache");
    return rateCache.rates;
  }

  // No cache, no API — return null to signal total failure
  console.error("❌ [RATES] No exchange rates available (no cache, no API)");
  return null;
}

export interface LocalizedPricing {
  country: string;
  countryName: string;
  city: string;
  currency: string;
  symbol: string;
  rate: number;
  services: Record<string, any>;
  fallbackMode: "none" | "usd" | "inr";
  fallbackMessage: string | null;
}

/**
 * Get full pricing in the visitor's local currency
 *
 * Fallback chain:
 *  1. Local currency (location detected)
 *  2. USD (location failed, exchange rates available)
 *  3. INR (everything failed — emergency fallback)
 */
export async function getLocalizedPricing(
  countryCode?: string | null,
  countryName?: string | null,
  city?: string | null
): Promise<LocalizedPricing> {
  const rates = await fetchExchangeRates();

  let currency: string;
  let symbol: string;
  let rate: number;
  let fallbackMode: "none" | "usd" | "inr" = "none";
  let fallbackMessage: string | null = null;
  let resolvedCountry: string;
  let resolvedCountryName: string;
  let resolvedCity: string;

  if (countryCode) {
    // ── Priority 1: Visitor's local currency ──
    currency = countryCurrency[countryCode] || "USD";
    symbol = currencySymbols[currency] || currency;
    resolvedCountry = countryCode;
    resolvedCountryName = countryName || countryNames[countryCode] || countryCode;
    resolvedCity = city || "Unknown";

    if (rates && rates[currency]) {
      rate = rates[currency];
      console.log(`💰 [PRICING] ${resolvedCountryName} → ${currency} ${symbol} (rate: ${rate})`);
    } else if (rates && rates["USD"]) {
      // Exchange rate for specific currency unavailable — use USD
      currency = "USD";
      symbol = "$";
      rate = rates["USD"];
      fallbackMode = "usd";
      fallbackMessage = "Pricing shown in USD. Final pricing depends on project requirements.";
      console.warn(`⚠️ [PRICING] No rate for ${countryCurrency[countryCode]}, falling back to USD`);
    } else {
      // No exchange rates at all — emergency INR fallback
      currency = "INR";
      symbol = "₹";
      rate = 1;
      fallbackMode = "inr";
      fallbackMessage = "Showing base INR pricing.";
      console.error("❌ [PRICING] Emergency INR fallback — no exchange rates available");
    }
  } else {
    // ── Priority 2: Location failed → default to USD ──
    resolvedCountry = "US";
    resolvedCountryName = "Unknown";
    resolvedCity = "Unknown";

    if (rates && rates["USD"]) {
      currency = "USD";
      symbol = "$";
      rate = rates["USD"];
      fallbackMode = "usd";
      fallbackMessage = "Pricing shown in USD because location information is unavailable.";
      console.warn("⚠️ [PRICING] Location unknown → USD fallback");
    } else {
      // ── Priority 3: Everything failed → emergency INR fallback ──
      currency = "INR";
      symbol = "₹";
      rate = 1;
      fallbackMode = "inr";
      fallbackMessage = "Showing base INR pricing.";
      console.error("❌ [PRICING] Emergency INR fallback — no location, no exchange rates");
    }
  }

  // Build converted pricing catalog
  const convertedServices: Record<string, any> = {};

  for (const [key, service] of Object.entries(pricingData.services) as any[]) {
    convertedServices[key] = {
      name: service.name,
      packages: service.packages.map((pkg: any) => ({
        ...pkg,
        minLocal: Math.round(pkg.minINR * rate),
        maxLocal: Math.round(pkg.maxINR * rate),
        currency,
        symbol,
      })),
    };
  }

  // Log final converted prices for debug
  console.log(`\n📋 [PRICING] Final pricing for ${resolvedCountryName} (${currency} ${symbol}):`);
  for (const [, service] of Object.entries(convertedServices) as any[]) {
    for (const pkg of service.packages) {
      console.log(`   ${pkg.name}: ${pkg.symbol}${pkg.minLocal.toLocaleString()} – ${pkg.symbol}${pkg.maxLocal.toLocaleString()}`);
    }
  }
  console.log("");

  return {
    country: resolvedCountry,
    countryName: resolvedCountryName!,
    city: resolvedCity,
    currency,
    symbol,
    rate,
    services: convertedServices,
    fallbackMode,
    fallbackMessage,
  };
}
