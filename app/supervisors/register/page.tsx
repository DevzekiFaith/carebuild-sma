'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  X,
  Menu,
  Lock,
  Star,
  Award,
  Building2,
  AlertCircle,
  Clock,
  Upload,
  Copy,
  DollarSign,
  MessageCircle,
  FileText,
  Download
} from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

interface SupervisorFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Professional Information
  experience: string;
  certifications: string;
  specialization: string;
  currentJob: string;
  
  // Location & Availability
  location: string;
  preferredAreas: string[];
  availability: string;
  
  // Plan Selection
  selectedPlan: string;
  paymentMethod: 'paystack' | 'transfer';
  
  // Terms & Conditions
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}

export default function SupervisorRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [paymentConfirmationData, setPaymentConfirmationData] = useState({
    reference: '',
    amount: '',
    bankName: '',
    transferDate: '',
    status: 'pending'
  });
  const [formData, setFormData] = useState<SupervisorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    experience: '',
    certifications: '',
    specialization: '',
    currentJob: '',
    location: '',
    preferredAreas: [],
    availability: '',
    selectedPlan: searchParams?.get('plan') || 'comprehensive',
    paymentMethod: 'paystack',
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const supervisorPlans = [
    {
      id: "comprehensive",
      name: "Comprehensive Supervisor Program",
      trainingFee: "₦25,000",
      renewalFee: "₦15,000",
      renewalPeriod: "quarterly",
      description: "One-time training payment with quarterly renewal to continue working",
      features: [
        "Complete training suite (Safety, Quality, Project Management, Documentation)",
        "Professional certification program",
        "Priority visit assignments",
        "Phone & email support",
        "Performance analytics dashboard",
        "Mobile app access",
        "Advanced reporting tools",
        "Commission-based earnings (5-10% per visit)",
        "Flexible schedule options",
        "Location-based assignments",
        "Quarterly performance reviews",
        "Continuous professional development"
      ],
      color: "from-purple-500 to-indigo-500",
      popular: true
    }
  ];

  const specializations = [
    "Residential Construction",
    "Commercial Construction",
    "Infrastructure Projects",
    "Renovation & Remodeling",
    "Industrial Construction",
    "Green Building",
    "Project Management",
    "Quality Control"
  ];

  const preferredAreas = [
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Kano",
    "Ibadan",
    "Enugu",
    "Kaduna",
    "Benin",
    "Jos",
    "Ilorin"
  ];

  const handleInputChange = (field: keyof SupervisorFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas.filter(a => a !== area)
        : [...prev.preferredAreas, area]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTotal = () => {
    const selectedPlan = supervisorPlans.find(plan => plan.id === formData.selectedPlan);
    if (!selectedPlan) return 0;
    
    // Only training fee for initial registration
    const trainingFee = parseInt(selectedPlan.trainingFee.replace(/[₦,]/g, ''));
    return trainingFee;
  };

  const initializePaystackPayment = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => {
        const handler = (window as any).PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: formData.email,
          amount: calculateTotal() * 100, // Convert to kobo
          currency: 'NGN',
          ref: `SUP_${Date.now()}`,
          metadata: {
            custom_fields: [
              {
                display_name: "Supervisor Plan",
                variable_name: "plan",
                value: formData.selectedPlan
              },
              {
                display_name: "Registration Type",
                variable_name: "type",
                value: "supervisor_registration"
              }
            ]
          },
          callback: (response: any) => {
            console.log('Payment successful:', response);
            // Redirect to success page
            router.push(`/payment/success?reference=${response.reference}&status=${response.status}&transaction_id=${response.transaction}`);
          },
          onClose: () => {
            console.log('Payment window closed');
            setIsProcessing(false);
          }
        });
        handler.openIframe();
        resolve(true);
      };
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);

    try {
      if (formData.paymentMethod === 'paystack') {
        await initializePaystackPayment();
      } else {
        // For bank transfer, show confirmation modal
        handlePaymentConfirmation();
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handlePaymentConfirmation = () => {
    try {
      // Generate a unique reference number
      const reference = `SUP_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      
      const totalAmount = calculateTotal();
      
      setPaymentConfirmationData({
        reference,
        amount: `₦${totalAmount.toLocaleString()}`,
        bankName: 'Globus Bank',
        transferDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'pending'
      });
      
      setShowPaymentConfirmation(true);
    } catch (error) {
      console.error('Error initializing payment confirmation:', error);
      alert('Failed to initialize payment confirmation. Please try again.');
    }
  };

  const submitPaymentConfirmation = async (confirmationData: any) => {
    setIsProcessing(true);
    const referenceToUse = confirmationData.reference || paymentConfirmationData.reference;
    
    try {
      // Simulate API call to submit payment confirmation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update status to confirmed
      setPaymentConfirmationData(prev => ({ ...prev, status: 'confirmed' }));
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push(`/payment/success?reference=${referenceToUse}&status=confirmed&type=supervisor_registration`);
      }, 3000);
      
    } catch (error) {
      console.error('Confirmation submission error:', error);
      alert('Failed to submit confirmation. Please try again.');
      setIsProcessing(false);
    }
  };

  const selectedPlan = supervisorPlans.find(plan => plan.id === formData.selectedPlan);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
              <motion.a
                href="/supervisors"
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                Supervisor Program
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                About
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                Contact
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/login')}
                  className="px-4 xl:px-6 py-2 xl:py-2.5 text-gray-700 font-medium hover:text-[#4B0082] transition-colors text-sm xl:text-base"
                >
                  Login
                </motion.button>
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
            </motion.div>
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
                    href="/supervisors"
                    onClick={() => setShowMobileMenu(false)}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">Supervisor Program</span>
                  </motion.a>

                  <motion.a
                    href="/about"
                    onClick={() => setShowMobileMenu(false)}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-900">About</span>
                  </motion.a>

                  <motion.a
                    href="/contact"
                    onClick={() => setShowMobileMenu(false)}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-900">Contact</span>
                  </motion.a>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Account</h3>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      router.push('/auth/login');
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm"
                  >
                    <ArrowRight className="w-5 h-5" />
                    <span>Login</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-24 sm:pt-28 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-100 text-[#4B0082] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <User className="w-4 h-4" />
              <span>Supervisor Registration</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Join Our
              <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                Professional Team
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete your registration to start earning ₦50,000+ monthly as a certified construction supervisor.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep 
                      ? 'bg-[#4B0082] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-[#4B0082]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Step {currentStep} of 4: {
                  currentStep === 1 ? 'Personal Information' :
                  currentStep === 2 ? 'Professional Details' :
                  currentStep === 3 ? 'Plan Selection' :
                  'Payment & Confirmation'
                }
              </p>
            </div>
          </motion.div>

          {/* Form Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Professional Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                      >
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years</option>
                        <option value="2-3">2-3 years</option>
                        <option value="4-5">4-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Job Title</label>
                      <input
                        type="text"
                        value={formData.currentJob}
                        onChange={(e) => handleInputChange('currentJob', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                        placeholder="e.g., Site Supervisor, Project Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
                      <select
                        value={formData.specialization}
                        onChange={(e) => handleInputChange('specialization', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                      >
                        <option value="">Select your specialization</option>
                        {specializations.map((spec) => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                      <textarea
                        value={formData.certifications}
                        onChange={(e) => handleInputChange('certifications', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                        rows={3}
                        placeholder="List any relevant certifications (e.g., PMP, OSHA, etc.)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                        placeholder="Enter your current location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Work Areas</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {preferredAreas.map((area) => (
                          <label key={area} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.preferredAreas.includes(area)}
                              onChange={() => handleAreaToggle(area)}
                              className="w-4 h-4 text-[#4B0082] border-gray-300 rounded focus:ring-[#4B0082] focus:ring-2"
                            />
                            <span className="text-sm text-gray-700">{area}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                      <select
                        value={formData.availability}
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
                      >
                        <option value="">Select availability</option>
                        <option value="full-time">Full-time (40+ hours/week)</option>
                        <option value="part-time">Part-time (20-39 hours/week)</option>
                        <option value="flexible">Flexible (as needed)</option>
                        <option value="weekends">Weekends only</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Plan Selection */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
                  <div className="max-w-2xl mx-auto">
                    {supervisorPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        whileHover={{ scale: 1.02 }}
                        className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                          formData.selectedPlan === plan.id
                            ? 'border-[#4B0082] bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('selectedPlan', plan.id)}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <div className="bg-[#4B0082] text-white px-4 py-1 rounded-full text-xs font-semibold">
                              Most Popular
                            </div>
                          </div>
                        )}
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                          
                          {/* Training Fee */}
                          <div className="mb-3">
                            <div className="text-sm text-gray-500 mb-1">One-Time Training Fee</div>
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-xl font-bold text-gray-400 line-through">₦50,000</span>
                              <span className="text-3xl font-bold text-gray-900">{plan.trainingFee}</span>
                            </div>
                            <div className="text-xs text-green-600 font-semibold mt-1">50% Off Launch Price!</div>
                          </div>
                          
                          {/* Renewal Fee */}
                          <div className="mb-4 bg-purple-50 rounded-lg p-3">
                            <div className="text-sm text-gray-500 mb-1">Quarterly Renewal</div>
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-lg font-bold text-gray-400 line-through">₦25,000</span>
                              <span className="text-xl font-bold text-[#4B0082]">{plan.renewalFee}</span>
                            </div>
                            <span className="text-gray-500 ml-2 text-sm">every 3 months</span>
                            <div className="text-xs text-green-600 font-semibold mt-1">40% More Affordable!</div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                          
                          {/* Savings Summary */}
                          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="text-center">
                              <div className="text-xs text-green-700 font-semibold mb-1">Total First Year Savings</div>
                              <div className="text-sm font-bold text-green-800">₦65,000</div>
                              <div className="text-xs text-green-600">43% off original pricing</div>
                            </div>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-2">
                            {plan.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Payment & Confirmation */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Payment & Confirmation</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInputChange('paymentMethod', 'paystack')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === 'paystack' 
                            ? 'border-[#4B0082] bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-[#4B0082] rounded-xl flex items-center justify-center mx-auto mb-3">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">Online Payment</h4>
                          <p className="text-sm text-gray-600">Pay instantly with card via Paystack</p>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInputChange('paymentMethod', 'transfer')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === 'transfer' 
                            ? 'border-[#4B0082] bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">Bank Transfer</h4>
                          <p className="text-sm text-gray-600">Transfer to our bank account</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Selected Plan:</span>
                        <span className="font-semibold">{selectedPlan?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Training Fee:</span>
                        <span className="font-semibold">{selectedPlan?.trainingFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quarterly Renewal:</span>
                        <span className="font-semibold">{selectedPlan?.renewalFee}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                          <span className="text-lg font-bold text-[#4B0082]">₦{calculateTotal().toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">* Quarterly renewal starts after 3 months</p>
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer Details */}
                  {formData.paymentMethod === 'transfer' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900">Bank Transfer Details</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Naira Account */}
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">₦</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Naira Account</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">Account Name:</span>
                              <span className="text-sm font-semibold text-gray-900">Mindvest International Enterprises</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">Account Number:</span>
                              <span className="text-sm font-semibold text-gray-900 font-mono">2006354855</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">Bank Name:</span>
                              <span className="text-sm font-semibold text-gray-900">Globus Bank</span>
                            </div>
                          </div>
                        </div>

                        {/* Dollar Account */}
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">$</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Dollar Account</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">Account Name:</span>
                              <span className="text-sm font-semibold text-gray-900">Mindvest International Enterprises</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">Account Number:</span>
                              <span className="text-sm font-semibold text-gray-900 font-mono">5000133424</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-600">Bank Name:</span>
                              <span className="text-sm font-semibold text-gray-900">Globus Bank</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Important Instructions */}
                      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <AlertCircle className="w-6 h-6 text-yellow-600" />
                          <h4 className="text-lg font-semibold text-yellow-800">Important Instructions</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-yellow-700">
                          <li className="flex items-start space-x-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>Use your full name as the transfer reference</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>Send payment confirmation to: hello@carebuildsma.com</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>Your account will be activated within 24 hours</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>Contact us if you need assistance: +234 801 234 5678</span>
                          </li>
                        </ul>
                      </div>

                      {/* WhatsApp Contact */}
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-green-800">Quick WhatsApp Confirmation</h4>
                        </div>
                        <p className="text-green-700 text-sm mb-3">
                          For faster payment confirmation and immediate assistance, contact us directly on WhatsApp:
                        </p>
                        <a
                          href={`https://wa.me/2348012345678?text=${encodeURIComponent(`Hi, I just made a bank transfer for the Comprehensive Supervisor Program training fee (₦${calculateTotal().toLocaleString()}). Please confirm my payment and activate my supervisor account.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                          <span>Message on WhatsApp</span>
                        </a>
                        <p className="text-green-600 text-xs mt-2">
                          📱 Click to send a pre-filled message with your payment details
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Terms & Conditions */}
                  <div className="space-y-4 mb-6">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="w-5 h-5 text-[#4B0082] border-gray-300 rounded focus:ring-[#4B0082] focus:ring-2 mt-0.5"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the <a href="#" className="text-[#4B0082] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#4B0082] hover:underline">Privacy Policy</a> *
                      </span>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToMarketing}
                        onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                        className="w-5 h-5 text-[#4B0082] border-gray-300 rounded focus:ring-[#4B0082] focus:ring-2 mt-0.5"
                      />
                      <span className="text-sm text-gray-600">
                        I would like to receive updates and marketing communications from CareBuild SMA
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </motion.button>

                {currentStep < 4 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePayment}
                    disabled={isProcessing || !formData.agreeToTerms}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                      isProcessing || !formData.agreeToTerms
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#4B0082] text-white hover:shadow-lg'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bank Transfer Confirmation Modal */}
      <AnimatePresence>
        {showPaymentConfirmation && paymentConfirmationData.reference && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Payment Confirmation Required</h2>
                    <p className="text-gray-600 mt-1">Complete your bank transfer and confirm payment</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPaymentConfirmation(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Bank Details */}
                <div className="space-y-6">
                  {/* Payment Reference */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Payment Reference</h3>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-blue-100">
                      <p className="text-2xl font-mono font-bold text-blue-600 text-center">
                        {paymentConfirmationData.reference || 'Generating...'}
                      </p>
                      <p className="text-sm text-gray-600 text-center mt-2">
                        Use this reference for your bank transfer
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (paymentConfirmationData.reference) {
                          navigator.clipboard.writeText(paymentConfirmationData.reference);
                          alert('Reference copied to clipboard!');
                        }
                      }}
                      disabled={!paymentConfirmationData.reference}
                      className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Reference</span>
                    </motion.button>
                  </div>

                  {/* Bank Transfer Details */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Bank Transfer Details</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4 border border-green-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600">Account Name</span>
                          <span className="text-sm font-semibold text-gray-900">Mindvest International Enterprises</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600">Account Number</span>
                          <span className="text-lg font-bold text-gray-900 font-mono">2006354855</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Bank Name</span>
                          <span className="text-sm font-semibold text-gray-900">Globus Bank</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-green-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Amount to Transfer</span>
                          <span className="text-2xl font-bold text-green-600">{paymentConfirmationData.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                      <h4 className="text-lg font-bold text-yellow-800">Important Instructions</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-yellow-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>Use the payment reference as transfer description</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>Transfer the exact amount: <strong>{paymentConfirmationData.amount}</strong></span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>Keep your bank transfer receipt for reference</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>Account activation takes 24-48 hours after confirmation</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Confirmation Form */}
                <div className="space-y-6">
                  {/* Status Indicator */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Payment Status</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${paymentConfirmationData.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                      <span className={`font-semibold ${paymentConfirmationData.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {paymentConfirmationData.status === 'confirmed' ? 'Payment Confirmed' : 'Awaiting Confirmation'}
                      </span>
                    </div>
                  </div>

                  {/* Confirmation Form */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Confirm Your Payment</h3>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formDataObj = new FormData(e.target as HTMLFormElement);
                      const confirmationData = {
                        reference: paymentConfirmationData.reference || `SUP_${Date.now()}`,
                        amount: formDataObj.get('amount') as string,
                        bankName: formDataObj.get('bankName') as string,
                        transferDate: formDataObj.get('transferDate') as string,
                        receiptNumber: formDataObj.get('receiptNumber') as string,
                        additionalNotes: formDataObj.get('additionalNotes') as string
                      };
                      submitPaymentConfirmation(confirmationData);
                    }} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount Transferred</label>
                        <input
                          type="text"
                          name="amount"
                          defaultValue={paymentConfirmationData.amount || `₦${calculateTotal().toLocaleString()}`}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Used</label>
                        <select
                          name="bankName"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select your bank</option>
                          <option value="Access Bank">Access Bank</option>
                          <option value="First Bank">First Bank</option>
                          <option value="GTBank">GTBank</option>
                          <option value="UBA">UBA</option>
                          <option value="Zenith Bank">Zenith Bank</option>
                          <option value="Globus Bank">Globus Bank</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Date & Time</label>
                        <input
                          type="datetime-local"
                          name="transferDate"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Receipt Number (Optional)</label>
                        <input
                          type="text"
                          name="receiptNumber"
                          placeholder="Enter your bank receipt number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                        <textarea
                          name="additionalNotes"
                          rows={3}
                          placeholder="Any additional information about your transfer..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Confirming Payment...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span>Confirm Payment</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>

                  {/* Contact Support */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">+234 801 234 5678</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">hello@carebuildsma.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        <a 
                          href={`https://wa.me/2348012345678?text=${encodeURIComponent(`Hi, I need help with my supervisor registration payment confirmation.${paymentConfirmationData.reference ? ` Reference: ${paymentConfirmationData.reference}` : ''}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          WhatsApp Support
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
