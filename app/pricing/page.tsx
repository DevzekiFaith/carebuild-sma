'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Check, 
  Star, 
  ArrowRight, 
  Shield, 
  Clock, 
  Users, 
  BarChart3, 
  Camera, 
  Video, 
  FileText, 
  Zap, 
  Award,
  Building2,
  TrendingUp,
  Heart,
  Target,
  Globe,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const pricingPlans = [
    {
      id: 'essential',
      name: 'Essential',
      description: 'Perfect for individual contractors and small projects',
      monthlyPrice: '₦150,000',
      annualPrice: '₦1,500,000',
      savings: '17%',
      popular: false,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
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
        'Premium Support (+₦15,000)',
        'Advanced Analytics (+₦25,000)',
        'Drone Imaging (+₦35,000)'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Ideal for growing construction companies',
      monthlyPrice: '₦220,000',
      annualPrice: '₦2,200,000',
      savings: '17%',
      popular: true,
      color: 'from-[#4B0082] to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      borderColor: 'border-[#4B0082]',
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
        'Virtual Reality Tours (+₦45,000)',
        'AI-Powered Insights (+₦55,000)',
        'White Label Solution (+₦75,000)'
      ]
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Best for large enterprises and developers',
      monthlyPrice: '₦350,000',
      annualPrice: '₦3,500,000',
      savings: '17%',
      popular: false,
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      borderColor: 'border-indigo-500',
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
        'Custom Integrations (+₦100,000)',
        'Dedicated Team (+₦200,000)',
        'Compliance Package (+₦150,000)'
      ]
    }
  ];

  const stats = [
    { number: '100+', label: 'Projects Completed', icon: Target },
    { number: '98%', label: 'Client Satisfaction', icon: Heart },
    { number: '50+', label: 'Expert Supervisors', icon: Users },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Property Developer',
      content: 'CareBuild SMA transformed our construction process. The transparency and quality control are unmatched.',
      image: '/pr2.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Diaspora Investor',
      content: 'Being overseas, I needed reliable oversight. CareBuild\'s virtual supervision gave me complete peace of mind.',
      image: '/pr1.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Mobile Responsive Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            >
              <div className="relative">
                <Image
                  src="/su5.jpg"
                  alt="CareBuild SMA Logo"
                  width={32}
                  height={32}
                  className="rounded-lg sm:rounded-xl shadow-lg sm:w-10 sm:h-10"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-[#4B0082] rounded-full"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-[#4B0082] bg-clip-text text-transparent">
                  CareBuild SMA
                </h1>
                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Trust & Care for Every Build</p>
              </div>
          </motion.div>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="/" className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium text-sm xl:text-base">Home</a>
              <a href="/about" className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium text-sm xl:text-base">About</a>
              <a href="/contact" className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium text-sm xl:text-base">Contact</a>
              <a href="/pricing" className="text-[#4B0082] font-medium text-sm xl:text-base">Pricing</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                <a
                  href="/contact"
                  className="px-6 xl:px-8 py-2 xl:py-2.5 bg-[#4B0082] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm xl:text-base"
                >
                  <span>Contact Sales</span>
                  <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
                </a>
              </div>

              {/* Mobile Menu Button */}
          <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 sm:p-3 text-gray-600 hover:text-[#4B0082] transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Toggle mobile menu"
              >
                {showMobileMenu ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ 
                x: 0,
                opacity: 1
              }}
              exit={{ 
                x: '100%', 
                opacity: 0 
              }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                duration: 0.4
              }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl border-l border-gray-200 z-50 lg:hidden overflow-y-auto"
            >
          {/* Menu Header */}
          <div className="bg-gradient-to-r from-[#4B0082] to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/su5.jpg"
                    alt="CareBuild SMA Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">CareBuild SMA</h2>
                  <p className="text-xs text-white/80">Trust & Care for Every Build</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="p-6 space-y-6">
            {/* Navigation Links */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Navigation</h3>
              
              <motion.a
                href="/"
                onClick={() => setShowMobileMenu(false)}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Home</span>
              </motion.a>

              <motion.a
                href="/about"
                onClick={() => setShowMobileMenu(false)}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group"
              >
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-900">About</span>
              </motion.a>

              <motion.a
                href="/contact"
                onClick={() => setShowMobileMenu(false)}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group"
              >
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <ArrowRight className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-900">Contact</span>
              </motion.a>

              <motion.a
                href="/pricing"
                onClick={() => setShowMobileMenu(false)}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300 group"
              >
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <ArrowRight className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-medium text-gray-900">Pricing</span>
              </motion.a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Actions</h3>
              
              <motion.a
                href="/contact"
                onClick={() => setShowMobileMenu(false)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#4B0082] to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Contact Sales</span>
              </motion.a>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">© 2024 CareBuild SMA</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-[#4B0082] transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold">f</span>
                    </div>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#4B0082] transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold">t</span>
                    </div>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#4B0082] transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold">in</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

        {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-blue-50/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-[#4B0082]/10 text-[#4B0082] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              <span>Transparent Pricing</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-[#4B0082] to-purple-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Flexible pricing options designed to scale with your construction projects. 
              Start with what you need, upgrade as you grow.
            </p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-4 mb-12"
            >
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
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-[#4B0082]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-[#4B0082] to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${plan.borderColor} ${plan.bgColor}`}>
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-bold text-gray-900">
                            {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-xl text-gray-500 ml-2">
                            {isAnnual ? '/year' : '/month'}
                          </span>
                        </div>
                        {isAnnual && (
                          <div className="text-green-600 font-medium mt-2">
                            Save {plan.savings} with annual billing
                          </div>
                        )}
                  </div>
                </div>

                    <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * featureIndex }}
                          className="flex items-center space-x-3"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-8">
                      <h4 className="font-semibold text-gray-900 mb-3">Available Add-ons:</h4>
                      {plan.addOns.map((addon, addonIndex) => (
                        <div key={addonIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#4B0082] rounded-full" />
                          <span>{addon}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                        console.log('Navigating to plan:', plan.id);
                        router.push(`/pricing/${plan.id}`);
                      }}
                      className={`w-full py-4 bg-gradient-to-r ${plan.color} text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group`}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Hear from satisfied clients who trust us with their projects</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
          <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
            </div>
                    <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
            </div>
                <p className="text-gray-700 italic leading-relaxed mb-4">"{testimonial.content}"</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
            </div>
          </motion.div>
            ))}
          </div>
        </div>
      </section>

          {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4B0082] to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-white mb-6">
              Ready to Build with Confidence?
              </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied clients who trust CareBuild SMA for their construction projects.
              </p>
            <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/contact')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#4B0082] transition-all"
                >
                  Contact Sales
                </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}