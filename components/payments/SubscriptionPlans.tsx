'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { subscriptionPlans } from '@/lib/subscription-data';
import { initializePayment } from '@/lib/flutterwave';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';
import { appToasts } from '@/lib/toast';

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const getPlanIcon = (priority: string) => {
    switch (priority) {
      case 'basic':
        return <Zap className="w-6 h-6" />;
      case 'professional':
        return <Star className="w-6 h-6" />;
      case 'executive':
        return <Crown className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  const getPlanColor = (priority: string) => {
    switch (priority) {
      case 'basic':
        return 'border-blue-200 bg-blue-50';
      case 'professional':
        return 'border-purple-200 bg-purple-50';
      case 'executive':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const handleSubscribe = async (plan: typeof subscriptionPlans[0]) => {
    if (!user) {
      appToasts.error('Please log in to subscribe');
      return;
    }

    setIsLoading(true);
    try {
      const txRef = `carebuild_${plan.id}_${Date.now()}`;
      
      const paymentData = {
        amount: plan.price,
        currency: plan.currency,
        email: user.email,
        name: user.name,
        phone: '+2348000000000', // You might want to collect this from user
        tx_ref: txRef,
        meta: {
          planId: plan.id,
          userId: user.id,
          planName: plan.name,
        },
      };

      const response = await initializePayment(paymentData);
      
      if (response.status === 'success') {
        // Redirect to Flutterwave payment page
        window.location.href = response.data.link;
      } else {
        appToasts.paymentFailed('Failed to initialize payment');
      }
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      appToasts.paymentFailed(error.message || 'Payment initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Choose Your Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Select the perfect plan for your site management needs. All plans include our core features with different levels of access and support.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptionPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${selectedPlan === plan.id ? 'scale-105' : ''}`}
          >
            {plan.priority === 'professional' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <Card 
              className={`h-full transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-purple-500 shadow-xl' 
                  : 'hover:shadow-lg'
              }`}
            >
              <CardHeader className={`text-center pb-4 ${getPlanColor(plan.priority)}`}>
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.priority === 'basic' ? 'bg-blue-100 text-blue-600' :
                    plan.priority === 'professional' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {getPlanIcon(plan.priority)}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + featureIndex * 0.05 }}
                      className="flex items-center space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSubscribe(plan)}
                  className="w-full"
                  variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Subscribe Now'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-600 mb-4">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <span>✓ Secure payments</span>
          <span>✓ 24/7 support</span>
          <span>✓ Cancel anytime</span>
        </div>
      </motion.div>
    </div>
  );
}
