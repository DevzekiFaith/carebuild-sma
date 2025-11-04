'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, CreditCard, Shield } from 'lucide-react';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get payment data from localStorage
    const storedPaymentData = localStorage.getItem('carebuild_payment_data');
    if (storedPaymentData) {
      setPaymentData(JSON.parse(storedPaymentData));
    }

    // Get Paystack response parameters
    const reference = searchParams.get('reference');
    const status = searchParams.get('status');
    const transaction_id = searchParams.get('transaction_id');

    console.log('Payment Reference:', reference);
    console.log('Payment Status:', status);
    console.log('Transaction ID:', transaction_id);

    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Redirect to signin after 5 seconds
    setTimeout(() => {
      router.push('/auth/login');
    }, 5000);

  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-[#4B0082] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h2>
          <p className="text-gray-600">Please wait while we verify your payment</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-xl opacity-90">
              Your CareBuild SMA subscription has been activated
            </p>
          </div>

          {/* Payment Details */}
          <div className="p-8">
            {paymentData && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Details</h2>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Plan</h3>
                      <p className="text-gray-700">{paymentData.plan}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Billing</h3>
                      <p className="text-gray-700 capitalize">{paymentData.billing}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Amount Paid</h3>
                      <p className="text-2xl font-bold text-[#4B0082]">₦{paymentData.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Add-ons</h3>
                      <p className="text-gray-700">
                        {paymentData.addOns.length > 0 
                          ? `${paymentData.addOns.length} selected` 
                          : 'None selected'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sign in to your account</h3>
                    <p className="text-gray-600">Access your dashboard and start managing your projects</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Set up your first project</h3>
                    <p className="text-gray-600">Create your construction project and invite your team</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Start monitoring</h3>
                    <p className="text-gray-600">Begin receiving real-time updates and progress reports</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-[#4B0082] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
                  <p className="text-gray-600 text-sm">
                    Your payment was processed securely through Paystack. 
                    You will receive a confirmation email shortly with your receipt and subscription details.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/auth/login')}
                className="flex-1 bg-[#4B0082] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Go to Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="flex-1 border-2 border-[#4B0082] text-[#4B0082] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#4B0082] hover:text-white transition-all"
              >
                Back to Home
              </motion.button>
            </div>

            {/* Auto-redirect notice */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                You will be automatically redirected to the sign-in page in a few seconds...
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
