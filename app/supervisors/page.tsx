'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Play, 
  Shield, 
  BarChart3, 
  Camera, 
  FileText,
  X,
  Menu
} from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function SupervisorsPage() {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const benefits = [
    {
      icon: TrendingUp,
      title: "Earn ₦50,000+ Monthly",
      description: "Flexible earning potential based on your availability and performance"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work when you want, choose assignments that fit your schedule"
    },
    {
      icon: Award,
      title: "Professional Development",
      description: "Continuous training and certification to advance your career"
    },
    {
      icon: MapPin,
      title: "Location-Based Work",
      description: "Get assignments near your location for convenience"
    }
  ];

  const trainingModules = [
    {
      title: "Construction Site Safety",
      description: "Learn essential safety protocols and best practices",
      duration: "2 weeks",
      icon: Shield
    },
    {
      title: "Quality Control & Inspection",
      description: "Master quality assessment techniques and standards",
      duration: "3 weeks",
      icon: CheckCircle
    },
    {
      title: "Project Management",
      description: "Understand project timelines, budgets, and coordination",
      duration: "4 weeks",
      icon: BarChart3
    },
    {
      title: "Documentation & Reporting",
      description: "Learn to create detailed reports and photo documentation",
      duration: "2 weeks",
      icon: FileText
    }
  ];

  const handleRegister = (planId: string) => {
    router.push(`/supervisors/register?plan=${planId}`);
  };

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
                href="/"
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                Home
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
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                Client Pricing
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/supervisors/register')}
                  className="px-6 xl:px-8 py-2 xl:py-2.5 bg-[#4B0082] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm xl:text-base"
                >
                  <span>Join as Supervisor</span>
                  <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
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

                  <motion.a
                    href="/pricing"
                    onClick={() => setShowMobileMenu(false)}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">Client Pricing</span>
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
                  
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      router.push('/supervisors/register');
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#4B0082] to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5" />
                    <span>Join as Supervisor</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-purple-100 text-[#4B0082] px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Users className="w-4 h-4" />
                <span>Join Our Professional Team</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Become a
                <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                  Certified Supervisor
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              >
                Join Africa's leading construction supervision platform. Earn ₦50,000+ monthly while building your professional career.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4B0082]">₦50K+</div>
                  <div className="text-base sm:text-lg text-gray-600">Monthly Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-indigo-600">100+</div>
                  <div className="text-base sm:text-lg text-gray-600">Active Supervisors</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4B0082]">98%</div>
                  <div className="text-base sm:text-lg text-gray-600">Satisfaction Rate</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/supervisors/register')}
                  className="px-8 py-4 bg-[#4B0082] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById('pricing');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border-2 border-[#4B0082] text-[#4B0082] font-semibold rounded-2xl hover:bg-[#4B0082] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <Play className="w-5 h-5" />
                  <span>View Plans</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/su7.jpg"
                    alt="Professional Construction Supervisors"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Floating Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-gray-700">Active Supervisor</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Lagos Construction Site</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-[#4B0082]" />
                      <span className="text-sm font-medium text-gray-700">Earnings: ₦75,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-[#4B0082] h-2 rounded-full w-4/5"></div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-[#4B0082] rounded-full opacity-20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#4B0082] rounded-full opacity-20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-100 text-[#4B0082] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4" />
              <span>Why Join CareBuild SMA?</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Unlock Your
              <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                Earning Potential
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their careers with our comprehensive supervision platform.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#4B0082] to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#4B0082] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="absolute inset-0 bg-[#4B0082]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Modules Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-100 text-[#4B0082] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              <span>Comprehensive Training</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Professional
              <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                Development Program
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive training program equips you with the skills and knowledge needed to excel as a construction supervisor.
            </p>
          </motion.div>

          {/* Training Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4B0082] transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-purple-600 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[#4B0082]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-100 text-[#4B0082] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              <span>Choose Your Plan</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Flexible
              <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                Pricing Plans
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Affordable one-time training investment with manageable quarterly renewal to maintain active supervisor status.
            </p>
          </motion.div>

          {/* Pricing Card */}
          <div className="max-w-2xl mx-auto">
            {supervisorPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
                className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className="bg-[#4B0082] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${plan.popular ? 'border-purple-200' : 'border-gray-100'}`}>
                  {/* Header */}
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    
                    {/* Training Fee */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">One-Time Training Fee</div>
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-2xl font-bold text-gray-400 line-through">₦50,000</span>
                        <span className="text-4xl font-bold text-gray-900">{plan.trainingFee}</span>
                      </div>
                      <div className="text-xs text-green-600 font-semibold mt-1">50% Off Launch Price!</div>
                    </div>
                    
                    {/* Renewal Fee */}
                    <div className="mb-4 bg-purple-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Quarterly Renewal</div>
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-lg font-bold text-gray-400 line-through">₦25,000</span>
                        <span className="text-2xl font-bold text-[#4B0082]">{plan.renewalFee}</span>
                      </div>
                      <span className="text-gray-500 ml-2">every 3 months</span>
                      <div className="text-xs text-green-600 font-semibold mt-1">40% More Affordable!</div>
                    </div>
                    
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                    
                    {/* Savings Summary */}
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-center">
                        <div className="text-sm text-green-700 font-semibold mb-1">Total First Year Savings</div>
                        <div className="text-lg font-bold text-green-800">₦65,000</div>
                        <div className="text-xs text-green-600">43% off original pricing</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-8 pb-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 + idx * 0.05 }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRegister(plan.id)}
                      className={`w-full py-4 bg-gradient-to-r ${plan.color} text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group`}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-[#4B0082]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">All plans include registration fee of ₦25,000</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Flexible payment options</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#4B0082] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#4B0082]/20" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-full text-sm font-medium mb-8"
            >
              <Star className="w-5 h-5" />
              <span>Ready to Start Your Journey?</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-white mb-6">
              Join Africa's Leading
              <span className="block">Supervision Platform</span>
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Start earning ₦50,000+ monthly while building your professional career in construction supervision.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/supervisors/register')}
                className="px-10 py-4 bg-white text-[#4B0082] font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/contact')}
                className="px-10 py-4 border-2 border-white text-white font-semibold text-lg rounded-2xl hover:bg-white hover:text-[#4B0082] transition-all duration-300 flex items-center space-x-3 group"
              >
                <span>Contact Us</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/80"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Flexible schedule</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
