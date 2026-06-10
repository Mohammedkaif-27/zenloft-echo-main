/**
 * Supabase Client
 * Connects to your Supabase project for storing contact form
 * submissions and AI chatbot lead captures.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY env vars. " +
    "Database features will be disabled."
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ── Contact form submission ──
export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  project_type: string;
  budget?: string;
  message: string;
  source: "contact_form";
}

export async function submitContactForm(data: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.warn("⚠️ Supabase not configured — contact form data not saved to database.");
    return { success: true }; // Gracefully degrade
  }

  const { error } = await supabase.from("contacts").insert([{
    name: data.name,
    email: data.email,
    company: data.company || null,
    project_type: data.project_type,
    budget: data.budget || null,
    message: data.message,
    source: data.source,
  }]);

  if (error) {
    console.error("❌ Supabase contact insert error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ── AI chatbot lead capture ──
export interface LeadCapture {
  name: string;
  email: string;
  project_type?: string;
  brief?: string;
  source: "ai_chatbot";
}

export async function submitLeadCapture(data: LeadCapture): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.warn("⚠️ Supabase not configured — lead capture data not saved to database.");
    return { success: true }; // Gracefully degrade
  }

  const { error } = await supabase.from("leads").insert([{
    name: data.name,
    email: data.email,
    project_type: data.project_type || null,
    brief: data.brief || null,
    source: data.source,
  }]);

  if (error) {
    console.error("❌ Supabase lead insert error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
