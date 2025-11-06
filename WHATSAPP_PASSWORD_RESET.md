# WhatsApp Password Reset Implementation

## Overview
This implementation allows users to reset their passwords using WhatsApp verification without requiring email. The OTP is displayed on screen and sent via WhatsApp link.

## How It Works

### Flow:
1. **User enters email** on forgot password page
2. **System generates 6-digit OTP** and displays it on screen
3. **User clicks WhatsApp link** which opens WhatsApp with pre-filled message containing OTP
4. **User sends OTP via WhatsApp** to support team
5. **User enters OTP** on website to verify
6. **After verification**, user can set new password
7. **Password reset complete**

## Features

✅ **No Email Required** - Password reset works without email verification  
✅ **WhatsApp Integration** - Direct WhatsApp link with pre-filled message  
✅ **OTP Display** - OTP shown on screen for easy copying  
✅ **Secure Verification** - OTP expires after 10 minutes  
✅ **Phone Number Support** - Optional phone field in signup  
✅ **Automatic Cleanup** - Expired OTPs are automatically cleaned up  

## Setup Instructions

### 1. Database Migration

Run the SQL migration to create the OTP table:

```bash
# In Supabase SQL Editor, run:
carebuild-sma/supabase-migrations/password_reset_otps.sql
```

Or manually create the table:

```sql
CREATE TABLE IF NOT EXISTS public.password_reset_otps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  phone TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
```

### 2. Environment Variables

Add your WhatsApp support number to `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
```

**Format**: Country code + number without `+` or spaces
- Example: For Nigeria (+234 801 234 5678), use: `2348012345678`
- Example: For US (+1 555 123 4567), use: `15551234567`

### 3. Supabase Service Role Key (Optional)

For production, add service role key for admin operations:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Note**: The API routes will fall back to anon key if service role key is not provided.

## API Endpoints

### 1. Generate OTP
**POST** `/api/auth/generate-otp`

Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "otp": "123456",
  "phone": "+234 *** *** 1234",
  "expiresAt": "2024-01-01T12:10:00.000Z"
}
```

### 2. Verify OTP
**POST** `/api/auth/verify-otp`

Request:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "resetToken": "base64_encoded_token",
  "expiresAt": "2024-01-01T12:15:00.000Z"
}
```

### 3. Reset Password
**POST** `/api/auth/reset-password`

Request:
```json
{
  "email": "user@example.com",
  "resetToken": "base64_encoded_token",
  "newPassword": "newpassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## User Flow

### Step 1: Enter Email
- User goes to `/auth/forgot-password`
- Enters email address
- Clicks "Generate OTP"

### Step 2: OTP Display
- System generates 6-digit OTP
- OTP displayed in large, easy-to-read format
- Masked phone number shown (e.g., +234 *** *** 1234)
- WhatsApp button opens chat with pre-filled message

### Step 3: WhatsApp Verification
- User clicks WhatsApp button
- WhatsApp opens with message: "Hi, I need password reset OTP for my account. Email: user@example.com. OTP: 123456"
- User can copy OTP and send to support (or support can verify from message)

### Step 4: Enter OTP
- User enters OTP code on website
- System verifies OTP
- If valid, proceeds to password reset form

### Step 5: Set New Password
- User enters new password
- Confirms new password
- Password is reset
- Success message shown

## Security Features

1. **OTP Expiration**: OTPs expire after 10 minutes
2. **One-Time Use**: Each OTP can only be used once
3. **Reset Token Expiration**: Reset tokens expire after 15 minutes
4. **Password Validation**: Minimum 6 characters required
5. **Phone Masking**: Phone numbers are masked for privacy

## Adding Phone Number During Signup

Users can optionally add their phone number during signup:

1. Go to `/auth/signup`
2. Fill in name, email, password
3. **Optionally** add phone number
4. Phone number is saved to database for future password resets

## Troubleshooting

### OTP Table Doesn't Exist
If you see "OTP table does not exist" error:
1. Run the migration file: `supabase-migrations/password_reset_otps.sql`
2. Or create the table manually using the SQL above

### Phone Number Not Found
If user doesn't have phone number:
1. User needs to add phone number in settings
2. Or contact support to add phone number
3. Alternative: Use email verification as fallback (future enhancement)

### WhatsApp Link Not Working
1. Check `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable
2. Ensure format is correct (no +, no spaces)
3. Test WhatsApp link manually

## Future Enhancements

- [ ] SMS fallback if WhatsApp fails
- [ ] Email fallback if phone not found
- [ ] Automatic OTP sending via WhatsApp Business API
- [ ] Rate limiting for OTP generation
- [ ] Phone number verification during signup
- [ ] OTP resend functionality with cooldown

## Notes

- **WhatsApp Number**: Currently uses environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` or defaults to `2348012345678`
- **OTP Storage**: OTPs are stored in `password_reset_otps` table
- **Fallback**: If OTP table doesn't exist, system still works but OTPs aren't stored (less secure)
- **Production**: For production, always use service role key and ensure OTP table exists

## Support

For issues or questions:
1. Check Supabase logs for API errors
2. Verify database migration ran successfully
3. Check environment variables are set correctly
4. Test WhatsApp link manually



