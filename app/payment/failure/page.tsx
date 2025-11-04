'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Footer from '@/components/Footer';

export default function PaymentFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get Paystack response parameters
    const reference = searchParams.get('reference');
    const status = searchParams.get('status');
    const message = searchParams.get('message');
    
    console.log('Payment Reference:', reference);
    console.log('Payment Status:', status);
    console.log('Payment Message:', message);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden text-center"
        >
          {/* Failure Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 px-8 py-12 text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
            <p className="text-xl opacity-90">
              We couldn't process your payment at this time
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What happened?</h2>
              <p className="text-gray-600 mb-6">
                Your payment could not be processed. This might be due to insufficient funds, 
                incorrect card details, or network issues.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Common reasons for payment failure:</h3>
                <ul className="text-yellow-700 text-sm space-y-1 text-left">
                  <li>• Insufficient funds in your account</li>
                  <li>• Incorrect card details or expiry date</li>
                  <li>• Network connectivity issues</li>
                  <li>• Card not authorized for online transactions</li>
                  <li>• Bank security restrictions</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="flex-1 bg-[#4B0082] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/pricing')}
                className="flex-1 border-2 border-[#4B0082] text-[#4B0082] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#4B0082] hover:text-white transition-all flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Pricing</span>
              </motion.button>
            </div>

            {/* Support */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Need help? Contact our support team
              </p>
              <button
                onClick={() => router.push('/contact')}
                className="text-[#4B0082] hover:underline font-medium"
              >
                Get Support →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
