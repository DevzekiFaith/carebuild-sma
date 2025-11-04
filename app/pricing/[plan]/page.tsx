'use client';

import React, { useState, use } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, Star, Shield, Clock, Users, BarChart3, Camera, Video, FileText, MapPin, Phone, Mail, Building2, Zap, Award, CreditCard, Lock, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  period: string;
  description: string;
  features: string[];
  addOns: {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
  }[];
  image: string;
  color: string;
  bgColor: string;
  borderColor: string;
  popular: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    monthlyPrice: '₦150,000',
    annualPrice: '₦1,500,000',
    period: 'per month',
    description: 'Perfect for individual contractors and small projects',
    image: '/su11.jpg',
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    popular: false,
    features: [
      'Up to 2 active projects',
      '16 site visits per month',
      'Professional supervision',
      'Monthly progress reports',
      'Photo documentation',
      'Basic analytics dashboard',
      'Email support',
      'Mobile app access'
    ],
    addOns: [
      {
        id: 'premium-support',
        name: 'Premium Support',
        price: '₦15,000',
        description: 'Priority support with 24/7 availability',
        features: ['24/7 phone support', 'Dedicated account manager', 'Priority response time']
      },
      {
        id: 'advanced-analytics',
        name: 'Advanced Analytics',
        price: '₦25,000',
        description: 'Enhanced reporting and insights',
        features: ['Custom reports', 'Predictive analytics', 'Performance insights', 'Export capabilities']
      },
      {
        id: 'drone-imaging',
        name: 'Drone Imaging',
        price: '₦35,000',
        description: 'Aerial photography and video documentation',
        features: ['Monthly drone surveys', 'High-resolution images', 'Video walkthroughs', '3D site mapping']
      }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: '₦220,000',
    annualPrice: '₦2,200,000',
    period: 'per month',
    description: 'Ideal for growing construction companies',
    image: '/su12.jpg',
    color: 'from-[#4B0082] to-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    borderColor: 'border-[#4B0082]',
    popular: true,
    features: [
      'Up to 10 active projects',
      '20 site visits per month',
      'Advanced site supervision',
      'Weekly progress reports',
      'Live video streaming',
      'Advanced analytics',
      'Priority support',
      'Team collaboration tools',
      'Custom reporting',
      'API access'
    ],
    addOns: [
      {
        id: 'virtual-reality',
        name: 'Virtual Reality Tours',
        price: '₦45,000',
        description: 'Immersive VR site walkthroughs',
        features: ['360° VR tours', 'Client presentations', 'Remote site visits', 'VR headset support']
      },
      {
        id: 'ai-insights',
        name: 'AI-Powered Insights',
        price: '₦55,000',
        description: 'Artificial intelligence for project optimization',
        features: ['Risk prediction', 'Schedule optimization', 'Cost forecasting', 'Quality analysis']
      },
      {
        id: 'white-label',
        name: 'White Label Solution',
        price: '₦75,000',
        description: 'Branded platform for your company',
        features: ['Custom branding', 'Your company logo', 'Custom domain', 'Branded reports']
      }
    ]
  },
  {
    id: 'executive',
    name: 'Executive',
    monthlyPrice: '₦350,000',
    annualPrice: '₦3,500,000',
    period: 'per month',
    description: 'Best for large enterprises and developers',
    image: '/su13.jpg',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    borderColor: 'border-indigo-500',
    popular: false,
    features: [
      'Unlimited projects',
      '24 site visits per month',
      'Dedicated project managers',
      'Real-time monitoring',
      'Drone inspections',
      'AI-powered insights',
      'Custom integrations',
      'Advanced security',
      'SLA guarantees',
      'Training & onboarding',
      'Custom development',
      '24/7 phone support'
    ],
    addOns: [
      {
        id: 'custom-integrations',
        name: 'Custom Integrations',
        price: '₦100,000',
        description: 'Integrate with your existing systems',
        features: ['ERP integration', 'Accounting software', 'Project management tools', 'Custom APIs']
      },
      {
        id: 'dedicated-team',
        name: 'Dedicated Team',
        price: '₦200,000',
        description: 'Dedicated CareBuild team for your projects',
        features: ['Dedicated project managers', 'On-site supervisors', 'Technical support team', 'Custom training']
      },
      {
        id: 'compliance-package',
        name: 'Compliance Package',
        price: '₦150,000',
        description: 'Full regulatory compliance support',
        features: ['Safety compliance', 'Environmental regulations', 'Building codes', 'Audit support']
      }
    ]
  }
];

export default function PricingPlanPage({ params }: { params: Promise<{ plan: string }> }) {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'transfer'>('paystack');
  
  const resolvedParams = use(params);
  
  const plan = pricingPlans.find(p => p.id === resolvedParams.plan);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
          <button
            onClick={() => router.push('/pricing')}
            className="bg-[#4B0082] text-white px-6 py-3 rounded-lg"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const basePrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const baseAmount = parseInt(basePrice.replace(/[₦,]/g, ''));
    const addOnAmount = selectedAddOns.reduce((total, addOnId) => {
      const addOn = plan.addOns.find(a => a.id === addOnId);
      return total + (addOn ? parseInt(addOn.price.replace(/[₦,]/g, '')) : 0);
    }, 0);
    return baseAmount + addOnAmount;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'paystack') {
      if (!customerEmail) {
        setShowEmailForm(true);
        return;
      }
      
      setIsProcessing(true);
      try {
        // Prepare payment data
        const paymentData = {
          plan: plan.name,
          billing: isAnnual ? 'annual' : 'monthly',
          addOns: selectedAddOns,
          total: calculateTotal(),
          planId: plan.id,
          monthlyPrice: plan.monthlyPrice,
          annualPrice: plan.annualPrice,
          customerEmail: customerEmail
        };

        // Store payment data in localStorage for after payment processing
        localStorage.setItem('carebuild_payment_data', JSON.stringify(paymentData));

        // Initialize Paystack payment
        await initializePaystackPayment(paymentData);
        
      } catch (error) {
        console.error('Payment initialization failed:', error);
        setIsProcessing(false);
      }
    } else {
      // For bank transfer, just show the transfer details
      // The user will handle the transfer manually
      console.log('Bank transfer selected');
    }
  };

  const initializePaystackPayment = async (paymentData: any) => {
    // Load Paystack script dynamically
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => {
      // @ts-ignore
      const handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: paymentData.customerEmail,
        amount: paymentData.total * 100, // Amount in kobo
        currency: 'NGN',
        ref: `carebuild_${Date.now()}_${paymentData.planId}`,
        metadata: {
          plan_id: paymentData.planId,
          billing_cycle: paymentData.billing,
          add_ons: JSON.stringify(paymentData.addOns),
          plan_name: paymentData.plan
        },
        callback: function(response: any) {
          // Payment successful
          console.log('Payment successful:', response);
          window.location.href = `${window.location.origin}/payment/success?reference=${response.reference}`;
        },
        onClose: function() {
          // Payment cancelled
          console.log('Payment cancelled');
          setIsProcessing(false);
        }
      });
      handler.openIframe();
    };
    document.head.appendChild(script);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#4B0082] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Pricing</span>
            </motion.button>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-900"
            >
              {plan.name} Plan
            </motion.h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border-2 border-gray-100"
        >
          <div className="relative h-80">
            <Image
              src={plan.image}
              alt={plan.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-2">{plan.name}</h2>
              <p className="text-2xl sm:text-3xl opacity-90">{plan.description}</p>
            </div>
            {plan.popular && (
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-[#4B0082] to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>
            )}
          </div>
          
          <div className="p-8">
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-lg font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-[#4B0082]' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: isAnnual ? 32 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
              <span className={`text-lg font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  Save 17%
                </motion.span>
              )}
            </div>

            <div className="flex items-baseline justify-center mb-8">
              <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-gray-900">
                {isAnnual ? plan.annualPrice : plan.monthlyPrice}
              </span>
              <span className="text-3xl sm:text-4xl text-gray-500 ml-2">
                {isAnnual ? '/year' : '/month'}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">Included Features</h3>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-xl sm:text-2xl">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">Why Choose This Plan?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#4B0082] rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xl sm:text-2xl">Trusted & Secure</h4>
                      <p className="text-gray-600 text-lg sm:text-xl">Bank-level security for your projects</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#4B0082] rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xl sm:text-2xl">24/7 Support</h4>
                      <p className="text-gray-600 text-lg sm:text-xl">Round-the-clock assistance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#4B0082] rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xl sm:text-2xl">Advanced Analytics</h4>
                      <p className="text-gray-600 text-lg sm:text-xl">Data-driven insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 text-center">Enhance Your Plan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.addOns.map((addOn, index) => (
              <motion.div
                key={addOn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 ${
                  selectedAddOns.includes(addOn.id) ? 'border-[#4B0082] bg-purple-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">{addOn.name}</h3>
                  <span className="text-3xl sm:text-4xl font-bold text-[#4B0082]">{addOn.price}</span>
                </div>
                <p className="text-gray-600 mb-4 text-lg sm:text-xl">{addOn.description}</p>
                <ul className="space-y-2 mb-6">
                  {addOn.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-base sm:text-lg text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleAddOnToggle(addOn.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    selectedAddOns.includes(addOn.id)
                      ? 'bg-[#4B0082] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedAddOns.includes(addOn.id) ? 'Added to Plan' : 'Add to Plan'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 text-center">Payment Summary</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-xl sm:text-2xl font-medium text-gray-700">{plan.name} Plan</span>
                <span className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
              </div>
              
              {selectedAddOns.map(addOnId => {
                const addOn = plan.addOns.find(a => a.id === addOnId);
                return addOn ? (
                  <div key={addOnId} className="flex justify-between items-center py-2">
                    <span className="text-gray-600 text-lg sm:text-xl">{addOn.name}</span>
                    <span className="text-gray-900 text-lg sm:text-xl">{addOn.price}</span>
                  </div>
                ) : null;
              })}
              
              <div className="flex justify-between items-center py-4 border-t-2 border-gray-300 text-2xl sm:text-3xl font-bold">
                <span>Total</span>
                <span className="text-[#4B0082]">₦{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Collection Modal */}
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Enter Your Email</h3>
              <p className="text-gray-600 mb-6 text-lg sm:text-xl">
                We need your email address to process the payment and send you confirmation details.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowEmailForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (customerEmail) {
                        setShowEmailForm(false);
                        handlePayment();
                      }
                    }}
                    disabled={!customerEmail}
                    className="flex-1 px-4 py-3 bg-[#4B0082] text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Payment Method Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 text-center">Choose Payment Method</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Paystack Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentMethod('paystack')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'paystack' 
                    ? 'border-[#4B0082] bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#4B0082] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Online Payment</h3>
                  <p className="text-gray-600 text-lg sm:text-xl mb-4">Pay instantly with card via Paystack</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span>Secure & Instant</span>
                  </div>
                </div>
              </motion.div>

              {/* Bank Transfer Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentMethod('transfer')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'transfer' 
                    ? 'border-[#4B0082] bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#4B0082] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bank Transfer</h3>
                  <p className="text-gray-600 text-lg sm:text-xl mb-4">Transfer directly to our bank account</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Traditional & Reliable</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bank Transfer Details */}
            {paymentMethod === 'transfer' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200"
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Bank Transfer Details</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Naira Account */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <span className="text-lg sm:text-2xl font-bold text-green-600">₦</span>
                      </div>
                      <h4 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">Naira Account</h4>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Account Name:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold break-words">Mindvest International Enterprises</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Account Number:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold font-mono">2006354855</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Bank Name:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold">Globus Bank</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Currency:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold">NGN (Naira)</span>
                      </div>
                    </div>
                  </div>

                  {/* Dollar Account */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <span className="text-lg sm:text-2xl font-bold text-blue-600">$</span>
                      </div>
                      <h4 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">Dollar Account</h4>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Account Name:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold break-words">Mindvest International Enterprises</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Account Number:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold font-mono">5000133424</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Bank Name:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold">Globus Bank</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                        <span className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-0">Currency:</span>
                        <span className="text-gray-900 text-sm sm:text-base lg:text-lg font-semibold">USD (Dollar)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-yellow-600 font-bold text-sm sm:text-base">!</span>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-800 mb-2">Important Instructions</h4>
                      <ul className="text-yellow-700 text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2">
                        <li>• Please include your email address in the transfer reference</li>
                        <li>• Send payment confirmation to: hello@carebuildsma.com</li>
                        <li>• Your subscription will be activated within 24 hours</li>
                        <li>• Contact us if you need assistance with the transfer</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Contact */}
                <div className="mt-4 sm:mt-6 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800">Quick WhatsApp Confirmation</h4>
                  </div>
                  <p className="text-green-700 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                    For faster payment confirmation and immediate assistance, contact us directly on WhatsApp:
                  </p>
                  <motion.a
                    href={`https://wa.me/2348012345678?text=${encodeURIComponent(`Hi, I just made a bank transfer for the ${plan.name} plan (₦${calculateTotal().toLocaleString()}). Please confirm my payment and activate my subscription.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 sm:space-x-3 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>Message on WhatsApp</span>
                  </motion.a>
                  <p className="text-green-600 text-xs sm:text-sm lg:text-base mt-2 sm:mt-3">
                    📱 Click to send a pre-filled message with your payment details
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Payment CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#4B0082] to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-2xl sm:text-3xl mb-8 opacity-90">
            Join thousands of satisfied clients who trust CareBuild SMA for their construction projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-white text-[#4B0082] px-8 py-4 rounded-xl font-semibold text-xl sm:text-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#4B0082] border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : paymentMethod === 'paystack' ? (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Pay Now - ₦{calculateTotal().toLocaleString()}</span>
                </>
              ) : (
                <>
                  <Building2 className="w-5 h-5" />
                  <span>Get Bank Details - ₦{calculateTotal().toLocaleString()}</span>
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-xl sm:text-2xl hover:bg-white hover:text-[#4B0082] transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Contact Sales</span>
            </motion.button>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-2 text-base sm:text-lg opacity-80">
            <Lock className="w-4 h-4" />
            <span>
              {paymentMethod === 'paystack' 
                ? 'Secure payment powered by Paystack' 
                : 'Secure bank transfer to verified account'
              }
            </span>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}