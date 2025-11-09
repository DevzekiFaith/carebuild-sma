/**
 * Type-safe helper functions for Supabase operations
 */

import { supabaseAdmin } from './supabase-admin';
import type { PasswordResetOTPInsert, PasswordResetOTPUpdate } from '@/types';

/**
 * Type-safe insert for password_reset_otps table
 */
export async function insertPasswordResetOTP(data: PasswordResetOTPInsert) {
  return await (supabaseAdmin.from('password_reset_otps') as any).insert(data);
}

/**
 * Type-safe update for password_reset_otps table
 */
export async function updatePasswordResetOTP(id: string, data: PasswordResetOTPUpdate) {
  return await (supabaseAdmin.from('password_reset_otps') as any).update(data).eq('id', id);
}

/**
 * Type-safe select for password_reset_otps table
 */
export async function selectPasswordResetOTP(filters: {
  user_id?: string;
  otp_code?: string;
  verified?: boolean;
  expires_at?: string;
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
}) {
  let query = (supabaseAdmin.from('password_reset_otps') as any).select('*');
  
  if (filters.user_id) {
    query = query.eq('user_id', filters.user_id);
  }
  if (filters.otp_code) {
    query = query.eq('otp_code', filters.otp_code);
  }
  if (filters.verified !== undefined) {
    query = query.eq('verified', filters.verified);
  }
  if (filters.expires_at) {
    query = query.gte('expires_at', filters.expires_at);
  }
  if (filters.orderBy) {
    query = query.order(filters.orderBy, { ascending: filters.ascending ?? false });
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  
  return await query;
}

/**
 * Type-safe delete for password_reset_otps table
 */
export async function deletePasswordResetOTP(filters: {
  user_id?: string;
  verified?: boolean;
}) {
  let query = (supabaseAdmin.from('password_reset_otps') as any).delete();
  
  if (filters.user_id) {
    query = query.eq('user_id', filters.user_id);
  }
  if (filters.verified !== undefined) {
    query = query.eq('verified', filters.verified);
  }
  
  return await query;
}

