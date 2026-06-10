/**
 * usePricing — Location-based pricing hook
 * Fetches pricing from backend with 3-tier fallback:
 *  1. Local currency (location detected)
 *  2. USD (location failed)
 *  3. INR (everything failed)
 */

import { useState, useEffect, useCallback } from "react";
import { API_BASE } from "@/lib/api";

export interface PricingPackage {
  name: string;
  minINR: number;
  maxINR: number;
  minLocal: number;
  maxLocal: number;
  unit: string;
  description: string;
  currency: string;
  symbol: string;
}

export interface PricingService {
  name: string;
  packages: PricingPackage[];
}

export interface PricingData {
  country: string;
  countryName: string;
  currency: string;
  symbol: string;
  rate: number;
  services: Record<string, PricingService>;
  fallbackMode: "none" | "usd" | "inr";
  fallbackMessage: string | null;
}

const CACHE_KEY = "zenloft-pricing";
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours (matches server cache)

export function usePricing() {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check cache first
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed._fetchedAt < CACHE_TTL) {
          setPricing(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Ignore cache errors
    }

    // Fetch from backend
    fetch(`${API_BASE}/api/pricing`)
      .then((res) => res.json())
      .then((data: PricingData) => {
        setPricing(data);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, _fetchedAt: Date.now() }));
        } catch { /* ignore */ }
      })
      .catch(() => {
        // Backend unavailable — use INR defaults (emergency fallback)
        setPricing(null);
      })
      .finally(() => setLoading(false));
  }, []);

  /**
   * Format a price range in the user's detected currency
   * Falls back to INR if pricing data is unavailable
   */
  const formatPrice = useCallback(
    (minINR: number, maxINR: number, unit?: string) => {
      const suffix = unit === "month" ? "/mo" : "";

      if (!pricing || pricing.currency === "INR") {
        // INR fallback
        const min = `₹${minINR.toLocaleString("en-IN")}`;
        const max = `₹${maxINR.toLocaleString("en-IN")}`;
        return minINR === maxINR ? `${min}${suffix}` : `${min} – ${max}${suffix}`;
      }

      // Local currency
      const min = `${pricing.symbol}${Math.round(minINR * pricing.rate).toLocaleString()}`;
      const max = `${pricing.symbol}${Math.round(maxINR * pricing.rate).toLocaleString()}`;
      return minINR === maxINR ? `${min}${suffix}` : `${min} – ${max}${suffix}`;
    },
    [pricing]
  );

  return {
    pricing,
    loading,
    formatPrice,
    currency: pricing?.currency || "INR",
    symbol: pricing?.symbol || "₹",
    rate: pricing?.rate || 1,
    countryName: pricing?.countryName || null,
    fallbackMode: pricing?.fallbackMode || "inr",
    fallbackMessage: pricing?.fallbackMessage || null,
  };
}
