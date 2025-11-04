'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, CreditCard, Banknote, AlertCircle, CheckCircle, Info } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

interface WithdrawalFormData {
  amount: string;
  method: 'bank' | 'mobile_money' | 'crypto';
  accountNumber: string;
  bankName: string;
  accountName: string;
  phoneNumber: string;
  provider: string;
  walletAddress: string;
  reason: string;
}

export default function WithdrawalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<WithdrawalFormData>();

  const selectedMethod = watch('method');

  const onSubmit = async (data: WithdrawalFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call - replace with actual withdrawal logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      setIsSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Withdrawal failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Withdrawal Request Submitted
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your withdrawal request has been submitted successfully. 
            You will receive a confirmation email shortly with processing details.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-blue-800 font-medium">Processing Time</p>
                <p className="text-sm text-blue-700">
                  Bank transfers: 1-3 business days<br />
                  Mobile money: 24-48 hours<br />
                  Crypto: 1-6 hours
                </p>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-[#4B0082] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg mr-3">
              <Image
                src="/su5.jpg"
                alt="CareBuild SMA Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CareBuild</h1>
              <p className="text-sm text-gray-500 font-medium">SMA Platform</p>
            </div>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Request Withdrawal
          </h2>
          <p className="text-gray-600">
            Withdraw funds from your CareBuild SMA account
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount (₦)
              </label>
              <div className="relative">
                <input
                  {...register('amount', {
                    required: 'Amount is required',
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Please enter a valid amount'
                    },
                    min: {
                      value: 1000,
                      message: 'Minimum withdrawal amount is ₦1,000'
                    }
                  })}
                  type="number"
                  step="0.01"
                  min="1000"
                  id="amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors"
                  placeholder="Enter amount to withdraw"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Banknote className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            {/* Withdrawal Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Withdrawal Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    {...register('method', { required: 'Please select a withdrawal method' })}
                    type="radio"
                    value="bank"
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all ${
                    selectedMethod === 'bank' 
                      ? 'border-[#4B0082] bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Bank Transfer</p>
                        <p className="text-sm text-gray-500">1-3 business days</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    {...register('method', { required: 'Please select a withdrawal method' })}
                    type="radio"
                    value="mobile_money"
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all ${
                    selectedMethod === 'mobile_money' 
                      ? 'border-[#4B0082] bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Wallet className="w-6 h-6 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Mobile Money</p>
                        <p className="text-sm text-gray-500">24-48 hours</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    {...register('method', { required: 'Please select a withdrawal method' })}
                    type="radio"
                    value="crypto"
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all ${
                    selectedMethod === 'crypto' 
                      ? 'border-[#4B0082] bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">₿</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Cryptocurrency</p>
                        <p className="text-sm text-gray-500">1-6 hours</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              {errors.method && (
                <p className="mt-2 text-sm text-red-600">{errors.method.message}</p>
              )}
            </div>

            {/* Account Details */}
            {selectedMethod === 'bank' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h3>
                
                {/* Account Number */}
                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <input
                    {...register('accountNumber', {
                      required: 'Account number is required',
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: 'Please enter a valid 10-11 digit account number'
                      }
                    })}
                    type="text"
                    id="accountNumber"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors"
                    placeholder="Enter your account number"
                  />
                  {errors.accountNumber && (
                    <p className="mt-2 text-sm text-red-600">{errors.accountNumber.message}</p>
                  )}
                </div>

                {/* Bank Name */}
                <div>
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <select
                    {...register('bankName', {
                      required: 'Bank name is required'
                    })}
                    id="bankName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors"
                  >
                    <option value="">Select your bank</option>
                    <option value="Access Bank">Access Bank</option>
                    <option value="Citibank">Citibank</option>
                    <option value="Diamond Bank">Diamond Bank</option>
                    <option value="Ecobank">Ecobank</option>
                    <option value="Fidelity Bank">Fidelity Bank</option>
                    <option value="First Bank">First Bank</option>
                    <option value="First City Monument Bank">First City Monument Bank</option>
                    <option value="GTBank">GTBank</option>
                    <option value="Heritage Bank">Heritage Bank</option>
                    <option value="Keystone Bank">Keystone Bank</option>
                    <option value="Kuda Bank">Kuda Bank</option>
                    <option value="Opay">Opay</option>
                    <option value="PalmPay">PalmPay</option>
                    <option value="Polaris Bank">Polaris Bank</option>
                    <option value="Providus Bank">Providus Bank</option>
                    <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
                    <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                    <option value="Sterling Bank">Sterling Bank</option>
                    <option value="Suntrust Bank">Suntrust Bank</option>
                    <option value="Union Bank">Union Bank</option>
                    <option value="United Bank for Africa">United Bank for Africa</option>
                    <option value="Unity Bank">Unity Bank</option>
                    <option value="VBank">VBank</option>
                    <option value="Wema Bank">Wema Bank</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                  </select>
                  {errors.bankName && (
                    <p className="mt-2 text-sm text-red-600">{errors.bankName.message}</p>
                  )}
                </div>

                {/* Account Name */}
                <div>
                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Name *
                  </label>
                  <input
                    {...register('accountName', {
                      required: 'Account name is required',
                      minLength: {
                        value: 2,
                        message: 'Account name must be at least 2 characters'
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: 'Account name can only contain letters and spaces'
                      }
                    })}
                    type="text"
                    id="accountName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors"
                    placeholder="Enter account holder's name"
                  />
                  {errors.accountName && (
                    <p className="mt-2 text-sm text-red-600">{errors.accountName.message}</p>
                  )}
                </div>
              </div>
            )}

            {selectedMethod === 'mobile_money' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mobile Money Details</h3>
                
                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^(\+234|234|0)?[789][01]\d{8}$/,
                        message: 'Please enter a valid Nigerian phone number'
                      }
                    })}
                    type="tel"
                    id="phoneNumber"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors"
                    placeholder="08012345678 or +2348012345678"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Provider */}
                <div>
                  <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Money Provider *
                  </label>
                  <select
                    {...register('provider', {
                      required: 'Provider is required'
                    })}
                    id="provider"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors"
                  >
                    <option value="">Select your provider</option>
                    <option value="MTN">MTN Mobile Money</option>
                    <option value="Airtel">Airtel Money</option>
                    <option value="9mobile">9mobile Money</option>
                    <option value="Glo">Glo Money</option>
                    <option value="Opay">Opay</option>
                    <option value="PalmPay">PalmPay</option>
                    <option value="Kuda">Kuda</option>
                    <option value="VBank">VBank</option>
                  </select>
                  {errors.provider && (
                    <p className="mt-2 text-sm text-red-600">{errors.provider.message}</p>
                  )}
                </div>
              </div>
            )}

            {selectedMethod === 'crypto' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cryptocurrency Wallet Details</h3>
                
                {/* Wallet Address */}
                <div>
                  <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Wallet Address *
                  </label>
                  <textarea
                    {...register('walletAddress', {
                      required: 'Wallet address is required',
                      minLength: {
                        value: 26,
                        message: 'Please enter a valid wallet address'
                      },
                      pattern: {
                        value: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^0x[a-fA-F0-9]{40}$/,
                        message: 'Please enter a valid Bitcoin or Ethereum wallet address'
                      }
                    })}
                    id="walletAddress"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors resize-none"
                    placeholder="Enter your Bitcoin or Ethereum wallet address"
                  />
                  {errors.walletAddress && (
                    <p className="mt-2 text-sm text-red-600">{errors.walletAddress.message}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Supported: Bitcoin (BTC) and Ethereum (ETH) addresses
                  </p>
                </div>
              </div>
            )}

            {/* Reason */}
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Withdrawal (Optional)
              </label>
              <textarea
                {...register('reason')}
                id="reason"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent transition-colors resize-none"
                placeholder="Brief reason for withdrawal..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-[#4B0082] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Request...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Request Withdrawal</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="text-[#4B0082] hover:text-purple-700 font-medium flex items-center justify-center space-x-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
}
