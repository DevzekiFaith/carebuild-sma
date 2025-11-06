'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Shield, Clock, Sparkles, Eye, EyeOff, Phone, MessageCircle, RefreshCw, Lock } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

interface ForgotPasswordFormData {
  phone: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

type Step = 'phone' | 'otp' | 'reset' | 'success';

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpData, setOtpData] = useState<{ phone: string; expiresAt: string } | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ForgotPasswordFormData>();

  const phoneValue = watch('phone');
  const otpValue = watch('otp');
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  // Auto-focus phone input on mount
  useEffect(() => {
    if (step === 'phone') {
      const phoneInput = document.getElementById('phone');
      if (phoneInput) {
        phoneInput.focus();
      }
    }
  }, [step]);

  // Generate OTP
  const handleGenerateOTP = async (phone: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        console.error('Response status:', response.status);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        
        // Try to extract error message from HTML if possible
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          throw new Error('API endpoint returned an error page. Please check if the API route exists and is properly configured.');
        }
        
        throw new Error(`Server returned an invalid response (${response.status}). Please try again.`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate OTP');
      }

      setOtpData({
        phone: data.phone,
        expiresAt: data.expiresAt
      });
      setStep('otp');
    } catch (error: any) {
      console.error('Generate OTP error:', error);
      setError(error.message || 'Failed to generate OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneValue, otp }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response. Please try again.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      setResetToken(data.resetToken);
      setStep('reset');
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (newPassword: string) => {
    if (!resetToken) {
      setError('Reset token is missing. Please start over.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneValue,
          resetToken,
          newPassword,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response. Please try again.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setStep('success');
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate WhatsApp link - OTP will be sent automatically via WhatsApp
  const getWhatsAppLink = () => {
    // Replace with your actual WhatsApp support number (format: country code + number without + or spaces)
    // Example: For Nigeria (+234 801 234 5678), use: 2348012345678
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347014441418';
    const message = `Hi, I need password reset for my account.\nPhone: ${phoneValue}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Form submission handlers
  const onPhoneSubmit = async (data: ForgotPasswordFormData) => {
    await handleGenerateOTP(data.phone);
  };

  const onOTPSubmit = async (data: ForgotPasswordFormData) => {
    if (!data.otp) return;
    await handleVerifyOTP(data.otp);
  };

  const onResetSubmit = async (data: ForgotPasswordFormData) => {
    if (!data.newPassword || !data.confirmPassword) return;
    if (data.newPassword !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    await handleResetPassword(data.newPassword);
  };

  // Success Step
  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full blur-xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="relative mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Password Reset Successful! ✅
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Your password has been successfully reset. You can now sign in with your new password.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/auth/login'}
              className="w-full bg-gradient-to-r from-[#4B0082] to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </motion.button>
          </motion.div>
        </div>

        <div className="lg:w-1/2 bg-gradient-to-br from-[#4B0082] via-purple-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-white relative z-10"
          >
            <Shield className="w-20 h-20 text-white mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-4">Password Reset Complete</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Your account is now secure with your new password. Remember to keep it safe!
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // OTP Step
  if (step === 'otp' && otpData) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-white via-gray-50 to-purple-50">
        <div className="lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full relative z-10"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center mb-6"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl mr-4">
                  <Image
                    src="/su5.jpg"
                    alt="CareBuild SMA Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-gray-900">CareBuild</h1>
                  <p className="text-sm text-gray-500 font-medium">SMA Platform</p>
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                OTP Sent! 📱
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                We've sent a 6-digit OTP code to your WhatsApp number: <strong>{otpData.phone}</strong>. Please check your WhatsApp and enter the code below.
              </p>
            </div>

            {/* WhatsApp Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 shadow-xl"
            >
              <div className="flex items-center justify-center space-x-3 text-white">
                <MessageCircle className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-semibold">OTP Sent via WhatsApp</p>
                  <p className="text-sm text-white/90 mt-1">
                    Check your WhatsApp messages for the 6-digit code
                  </p>
                </div>
              </div>
            </motion.div>

            {/* OTP Verification Form */}
            <form onSubmit={handleSubmit(onOTPSubmit)} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP Code
                </label>
                <input
                  {...register('otp', {
                    required: 'OTP is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'OTP must be 6 digits'
                    }
                  })}
                  type="text"
                  id="otp"
                  maxLength={6}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-[#4B0082] transition-all duration-200 bg-white/80 backdrop-blur-sm text-center text-2xl tracking-widest font-bold"
                  placeholder="000000"
                  autoComplete="off"
                />
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600">{errors.otp.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#4B0082] to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Verify OTP</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => handleGenerateOTP(phoneValue)}
                className="text-[#4B0082] hover:text-purple-700 font-semibold flex items-center justify-center space-x-2 mx-auto transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Resend OTP</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setStep('phone');
                  setOtpData(null);
                  setError(null);
                }}
                className="text-gray-600 hover:text-gray-900 font-semibold flex items-center justify-center space-x-2 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 bg-gradient-to-br from-[#4B0082] via-purple-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-white relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
            >
              <MessageCircle className="w-20 h-20 text-white" />
            </motion.div>

            <h2 className="text-4xl font-bold mb-6">WhatsApp Verification</h2>

            <p className="text-white/90 text-lg leading-relaxed mb-8">
              We've sent a 6-digit OTP code to your WhatsApp. Check your messages and enter the code to verify your identity.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-center space-x-3 text-white/80">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure Verification</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/80">
                <Clock className="w-5 h-5" />
                <span className="text-sm">10-minute OTP Expiry</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/80">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">Instant WhatsApp Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Reset Password Step
  if (step === 'reset') {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-white via-gray-50 to-purple-50">
        <div className="lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full relative z-10"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Set New Password 🔐
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Enter your new password below. Make sure it's strong and secure.
              </p>
            </div>

            <form onSubmit={handleSubmit(onResetSubmit)} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('newPassword', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    className="w-full pl-10 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-[#4B0082] transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === newPassword || 'Passwords do not match'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className="w-full pl-10 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-[#4B0082] transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#4B0082] to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Reset Password</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setStep('otp');
                  setError(null);
                }}
                className="text-gray-600 hover:text-gray-900 font-semibold flex items-center justify-center space-x-2 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 bg-gradient-to-br from-[#4B0082] via-purple-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-white relative z-10"
          >
            <Shield className="w-20 h-20 text-white mx-auto mb-8" />
            <h2 className="text-4xl font-bold mb-6">Create New Password</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Choose a strong password that you'll remember. Make sure it's at least 6 characters long.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Phone Step (Initial)
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-white via-gray-50 to-purple-50">
      <div className="lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl mr-4">
                <Image
                  src="/su5.jpg"
                  alt="CareBuild SMA Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">CareBuild</h1>
                <p className="text-sm text-gray-500 font-medium">SMA Platform</p>
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Forgot Password? 🔐
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Enter your phone number and we'll send a 6-digit OTP code to your WhatsApp to verify your identity and reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onPhoneSubmit)} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#4B0082] transition-colors" />
                </div>
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[\d\s\-\+\(\)]+$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  type="tel"
                  id="phone"
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-[#4B0082] transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="+234 801 234 5678"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#4B0082] to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Generating OTP...</span>
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  <span>Generate OTP</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="text-[#4B0082] hover:text-purple-700 font-semibold flex items-center justify-center space-x-2 mx-auto transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="lg:w-1/2 bg-gradient-to-br from-[#4B0082] via-purple-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-white relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
          >
            <Shield className="w-20 h-20 text-white" />
          </motion.div>

          <h2 className="text-4xl font-bold mb-6">Secure Password Reset</h2>

          <p className="text-white/90 text-lg leading-relaxed mb-8">
            We'll help you get back into your account quickly and securely using WhatsApp verification.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-center space-x-3 text-white/80">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Bank-level Security</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/80">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">WhatsApp Verification</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm">10-minute OTP Expiry</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
