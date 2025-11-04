import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eozonxkvtuwvfaacqjum.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvem9ueGt2dHV3dmZhYWNxanVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDUxNTcsImV4cCI6MjA3NjkyMTE1N30.7aW_lLTZ_TCODOR2qCMWjs_-TvWJE-tw47HP8gksLbU';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Export individual services for compatibility
export const auth = supabase.auth;
export const db = supabase;
export const storage = supabase.storage;

export default supabase;
