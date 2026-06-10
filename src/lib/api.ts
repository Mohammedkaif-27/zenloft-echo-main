/**
 * API base URL helper.
 * 
 * In development: Vite proxy forwards /api/* to localhost:3001
 * In production:  Uses VITE_API_URL env var pointing to deployed backend
 */

export const API_BASE = import.meta.env.VITE_API_URL || "";
