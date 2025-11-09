/**
 * Supabase Admin Client with proper typing
 * This client uses the service role key for admin operations
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eozonxkvtuwvfaacqjum.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvem9ueGt2dHV3dmZhYWNxanVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDUxNTcsImV4cCI6MjA3NjkyMTE1N30.7aW_lLTZ_TCODOR2qCMWjs_-TvWJE-tw47HP8gksLbU';

// Create typed Supabase client
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

