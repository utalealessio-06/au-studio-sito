import { createClient } from "@supabase/supabase-js";

// Le credenziali vanno in .env.local (vedi il template nella root del progetto).
// Finché non sono impostate il client resta `null` e il sito usa i dati mock
// di lib/products.js, così build e sviluppo funzionano anche senza Supabase.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
