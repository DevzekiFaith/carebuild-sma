/**
 * Database type definitions for Supabase tables
 * These types match the actual database schema
 */

export interface Database {
  public: {
    Tables: {
      password_reset_otps: {
        Row: {
          id: string;
          user_id: string;
          phone: string;
          otp_code: string;
          expires_at: string;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          phone: string;
          otp_code: string;
          expires_at: string;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          phone?: string;
          otp_code?: string;
          expires_at?: string;
          verified?: boolean;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'client' | 'supervisor' | 'admin';
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          company?: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role: 'client' | 'supervisor' | 'admin';
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'client' | 'supervisor' | 'admin';
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

