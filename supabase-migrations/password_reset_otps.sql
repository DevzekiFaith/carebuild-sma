-- Password Reset OTPs Table
-- This table stores OTP codes for password reset verification

CREATE TABLE IF NOT EXISTS public.password_reset_otps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  phone TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_otps_user_id ON public.password_reset_otps(user_id);
CREATE INDEX IF NOT EXISTS idx_otps_phone ON public.password_reset_otps(phone);
CREATE INDEX IF NOT EXISTS idx_otps_expires ON public.password_reset_otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_otps_verified ON public.password_reset_otps(verified);

-- Create composite index for quick lookups
CREATE INDEX IF NOT EXISTS idx_otps_user_phone ON public.password_reset_otps(user_id, phone);

-- Enable Row Level Security
ALTER TABLE public.password_reset_otps ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only access their own OTPs (for verification)
CREATE POLICY "Users can view their own OTPs" ON public.password_reset_otps
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy: Service role can manage all OTPs (for API operations)
CREATE POLICY "Service role can manage all OTPs" ON public.password_reset_otps
  FOR ALL USING (true);

-- Function to automatically clean up expired OTPs (optional - can be run periodically)
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM public.password_reset_otps
  WHERE expires_at < NOW() OR (verified = true AND created_at < NOW() - INTERVAL '1 hour');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Create a trigger or scheduled job to run cleanup
-- This can be done via Supabase dashboard or cron job



