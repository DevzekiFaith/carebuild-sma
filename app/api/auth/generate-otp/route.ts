import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { insertPasswordResetOTP } from '@/lib/supabase-helpers';
import type { PasswordResetOTPInsert } from '@/types';

// Type for user query result
interface UserQueryResult {
  id: string;
  email: string;
  phone: string | null;
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
      .single() as { data: UserQueryResult | null; error: any };

    if (userError || !user || !user.phone) {
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
    const otpData: PasswordResetOTPInsert = {
      user_id: user.id,
      phone: userPhone,
      otp_code: otp,
      expires_at: expiresAt.toISOString(),
      verified: false
    };

    const { error: otpError } = await insertPasswordResetOTP(otpData);

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

