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

    let phone, resetToken, newPassword;
    try {
      const body = await request.json();
      phone = body.phone;
      resetToken = body.resetToken;
      newPassword = body.newPassword;
    } catch (parseError) {
      return jsonResponse(
        { error: 'Invalid request body. Please provide valid data.' },
        400
      );
    }

    if (!phone || !resetToken || !newPassword) {
      return jsonResponse(
        { error: 'Phone number, reset token, and new password are required' },
        400
      );
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return jsonResponse(
        { error: 'Password must be at least 6 characters long' },
        400
      );
    }

    // Normalize phone number
    const normalizedPhone = phone.replace(/[\s\-\(\)]/g, '').replace(/^\+/, '');

    // Find user by phone number
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .ilike('phone', `%${normalizedPhone}%`)
      .single();

    if (userError || !user) {
      return jsonResponse(
        { error: 'User not found' },
        404
      );
    }

    // Verify reset token (decode and check if it's valid)
    try {
      const decoded = Buffer.from(resetToken, 'base64').toString('utf-8');
      const [userId, timestamp] = decoded.split(':');
      
      // Check if token is for this user
      if (userId !== user.id) {
        return jsonResponse(
          { error: 'Invalid reset token' },
          400
        );
      }

      // Check if token is not too old (15 minutes)
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      if (now - tokenTime > 15 * 60 * 1000) {
        return jsonResponse(
          { error: 'Reset token has expired. Please start over.' },
          400
        );
      }
    } catch (error) {
      return jsonResponse(
        { error: 'Invalid reset token format' },
        400
      );
    }

    // Update password using Supabase Admin API
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Password update error:', updateError);
      return jsonResponse(
        { error: 'Failed to reset password. Please try again.' },
        500
      );
    }

    // Clean up used OTPs (optional)
    await supabaseAdmin
      .from('password_reset_otps')
      .delete()
      .eq('user_id', user.id)
      .eq('verified', true);

    return jsonResponse({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error: any) {
    console.error('Reset password error:', error);
    return jsonResponse(
      { error: 'Internal server error' },
      500
    );
  }
}

