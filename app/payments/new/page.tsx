'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft, 
  CreditCard, 
  Banknote,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  Calendar,
  DollarSign
} from 'lucide-react';
import NavigationButtons from '@/components/dashboard/NavigationButtons';
import Footer from '@/components/Footer';
import { appToasts } from '@/lib/toast';
import { useAuth } from '@/hooks/useAuth';

interface PaymentFormData {
  projectId: string;
  amount: number;
  paymentMethod: string;
  description: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
  bankCode?: string;
  accountNumber?: string;
  phoneNumber?: string;
}

export default function NewPaymentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card');

  const { register, handleSubmit, formState: { errors }, watch } = useForm<PaymentFormData>({
    defaultValues: {
      projectId: '',
      amount: 0,
      paymentMethod: 'card',
      description: ''
    }
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Verve' },
    { id: 'bank', name: 'Bank Transfer', icon: Banknote, description: 'Direct bank transfer' },
    { id: 'mobile', name: 'Mobile Money', icon: Smartphone, description: 'USSD, Mobile banking' }
  ];

  const mockProjects = [
    { id: 'PROJ-001', name: 'Luxury Villa Alpha', amount: 150000 },
    { id: 'PROJ-002', name: 'Commercial Complex Beta', amount: 220000 },
    { id: 'PROJ-003', name: 'Residential Estate Gamma', amount: 350000 }
  ];

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real app, integrate with Flutterwave here
      appToasts.paymentSuccess(data.amount);
      router.push('/dashboard?tab=payments');
    } catch (error) {
      appToasts.paymentFailed('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedProject = mockProjects.find(p => p.id === watch('projectId'));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4 sm:p-6">
        <NavigationButtons 
          currentPage="Make Payment" 
          showHome={false} 
          onBack={() => router.push('/dashboard?tab=payments')}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto mt-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Make Payment</h1>
              <p className="text-gray-600">Complete your payment securely using any of our supported methods</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Project *</label>
                <select
                  {...register('projectId', { required: 'Please select a project' })}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.projectId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose a project...</option>
                  {mockProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name} - ₦{project.amount.toLocaleString()}
                    </option>
                  ))}
                </select>
                {errors.projectId && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.projectId.message}
                  </p>
                )}
              </div>

              {/* Amount Display */}
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-blue-600">Payment Amount</p>
                        <p className="text-2xl font-bold text-blue-900">₦{selectedProject.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600">Project</p>
                      <p className="font-semibold text-blue-900">{selectedProject.name}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-6 h-6 ${
                            selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <div>
                            <p className={`font-medium ${
                              selectedMethod === method.id ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {method.name}
                            </p>
                            <p className={`text-sm ${
                              selectedMethod === method.id ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Details Forms */}
              {selectedMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                      <input
                        {...register('cardNumber', { 
                          required: 'Card number is required',
                          pattern: {
                            value: /^[0-9\s]{13,19}$/,
                            message: 'Invalid card number'
                          }
                        })}
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                      <input
                        {...register('cardName', { required: 'Cardholder name is required' })}
                        type="text"
                        placeholder="John Doe"
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        {...register('expiryDate', { 
                          required: 'Expiry date is required',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: 'Invalid expiry date (MM/YY)'
                          }
                        })}
                        type="text"
                        placeholder="MM/YY"
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        {...register('cvv', { 
                          required: 'CVV is required',
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: 'Invalid CVV'
                          }
                        })}
                        type="text"
                        placeholder="123"
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedMethod === 'bank' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Bank Transfer Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <p><strong>Bank Name:</strong> Access Bank</p>
                      <p><strong>Account Number:</strong> 1234567890</p>
                      <p><strong>Account Name:</strong> CareBuild SMA Ltd</p>
                      <p><strong>Amount:</strong> ₦{selectedProject?.amount.toLocaleString()}</p>
                      <p><strong>Reference:</strong> {selectedProject?.id}-{Date.now()}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedMethod === 'mobile' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Mobile Money Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      {...register('phoneNumber', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9+\-\s()]{10,}$/,
                          message: 'Invalid phone number'
                        }
                      })}
                      type="tel"
                      placeholder="+234 801 234 5678"
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Optional description for this payment..."
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium">Secure Payment</p>
                    <p>Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Process Payment</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
