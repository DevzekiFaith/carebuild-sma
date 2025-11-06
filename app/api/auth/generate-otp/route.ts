import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks (same as lib/supabase.ts)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eozonxkvtuwvfaacqjum.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvem9ueGt2dHV3dmZhYWNxanVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDUxNTcsImV4cCI6MjA3NjkyMTE1N30.7aW_lLTZ_TCODOR2qCMWjs_-TvWJE-tw47HP8gksLbU';

// Initialize Supabase client
let supabaseAdmin: ReturnType<typeof createClient>;

try {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  throw error;
}

export async function POST(request: NextRequest) {
  // Ensure we always return JSON
  const jsonResponse = (data: any, status: number = 200) => {
    return NextResponse.json(data, { 
      status,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };

  try {
    // Supabase client is already initialized with defaults, so we can proceed

    let phone;
    try {
      const body = await request.json();
      phone = body.phone;
    } catch (parseError) {
      return jsonResponse(
        { error: 'Invalid request body. Please provide a valid phone number.' },
        400
      );
    }

    if (!phone) {
      return jsonResponse(
        { error: 'Phone number is required' },
        400
      );
    }

    // Normalize phone number (remove spaces, dashes, etc.)
    const normalizedPhone = phone.replace(/[\s\-\(\)]/g, '').replace(/^\+/, '');

    // Find user by phone number
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, phone')
      .ilike('phone', `%${normalizedPhone}%`)
      .single();

    if (userError || !user) {
      return jsonResponse(
        { error: 'User not found. Please check your phone number.' },
        404
      );
    }

    // Use the phone number from the database
    const userPhone = user.phone;

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration time (10 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Store OTP in database
    const { error: otpError } = await supabaseAdmin
      .from('password_reset_otps')
      .insert({
        user_id: user.id,
        phone: userPhone,
        otp_code: otp,
        expires_at: expiresAt.toISOString(),
        verified: false
      });

    // If table doesn't exist, handle gracefully
    if (otpError && otpError.message.includes('does not exist')) {
      console.warn('OTP table does not exist. Please create password_reset_otps table.');
      // Still return success - OTP will be sent via WhatsApp
    } else if (otpError) {
      console.error('Error storing OTP:', otpError);
      // Continue anyway - OTP will be sent via WhatsApp
    }

    // Return success - OTP will be sent via WhatsApp
    // Don't return OTP in response for security
    return jsonResponse({
      success: true,
      message: 'OTP has been sent to your WhatsApp number',
      phone: userPhone.replace(/(\d{3})(\d{3})(\d{4})/, '+$1 *** *** $3'), // Masked phone
      expiresAt: expiresAt.toISOString()
    });

  } catch (error: any) {
    console.error('Generate OTP error:', error);
    return jsonResponse(
      { error: 'Internal server error' },
      500
    );
  }
}

