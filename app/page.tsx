'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Building2, Shield, Users, TrendingUp, ArrowRight, Star, CheckCircle, Play, Sparkles, Zap, Award, Globe, Heart, Target, BarChart3, Camera, Video, FileText, Clock, MapPin, Phone, Mail, ChevronRight, ArrowUpRight, X, Menu } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function Home() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle navigation clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // Handle demo button click
  const handleDemoClick = () => {
    setShowDemoModal(true);
  };

  // Handle get started button click
  const handleGetStarted = () => {
    router.push('/pricing');
  };

  // Handle pricing plan click
  const handlePricingPlan = (planId: string) => {
    router.push(`/pricing/${planId}`);
  };

  // Handle pricing button click
  const handlePricingClick = () => {
    scrollToSection('pricing');
  };

  useEffect(() => {
    setShowLanding(true);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#4B0082]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-white mb-2">CareBuild SMA</h2>
          <p className="text-white/80">Loading your construction management platform...</p>
        </motion.div>
      </div>
    );
  }

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
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                Features
              </motion.a>
              <motion.a
                href="#pricing"
                onClick={(e) => handleNavClick(e, 'pricing')}
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                Pricing
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
                href="/supervisors"
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium cursor-pointer text-sm xl:text-base"
              >
                Become Supervisor
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                {user ? (
                  // Show dashboard access for authenticated users
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/auth/login')}
                      className="px-6 xl:px-8 py-2 xl:py-2.5 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md border border-gray-200/50 text-[#4B0082] font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-white/90 hover:to-white/70 transition-all duration-300 flex items-center space-x-2 text-sm xl:text-base"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        // Sign out and stay on home page
                        await signOut();
                      }}
                      className="px-6 xl:px-8 py-2 xl:py-2.5 bg-[#4B0082] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm xl:text-base"
                    >
                      <span>Sign Out</span>
                      <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
                    </motion.button>
                  </>
                ) : (
                  // Show login/signup for unauthenticated users
                  <>
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
                      onClick={() => router.push('/pricing')}
                      className="px-6 xl:px-8 py-2 xl:py-2.5 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md border border-gray-200/50 text-[#4B0082] font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-white/90 hover:to-white/70 transition-all duration-300 flex items-center space-x-2 text-sm xl:text-base"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
                    </motion.button>
                  </>
                )}
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
                    href="#features"
                    onClick={(e) => {
                      handleNavClick(e, 'features');
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">Features</span>
                  </motion.a>

                  <motion.a
                    href="#pricing"
                    onClick={(e) => {
                      handleNavClick(e, 'pricing');
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">Pricing</span>
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
                    href="/supervisors"
                    onClick={() => setShowMobileMenu(false)}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <ArrowRight className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="font-medium text-gray-900">Become Supervisor</span>
                  </motion.a>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Account</h3>

                  {user ? (
                    // Show dashboard access for authenticated users
                    <>
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
                        <span>Get Started</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={async () => {
                          await signOut();
                          setShowMobileMenu(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#4B0082] to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        <ArrowRight className="w-5 h-5" />
                        <span>Sign Out</span>
                      </motion.button>
                    </>
                  ) : (
                    // Show login/signup for unauthenticated users
                    <>
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
                          router.push('/pricing');
                          setShowMobileMenu(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#4B0082] to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        <ArrowRight className="w-5 h-5" />
                        <span>Get Started</span>
                      </motion.button>
                    </>
                  )}
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
                <Sparkles className="w-4 h-4" />
                <span>Africa's #1 Construction Management Platform</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Trust & Care for
                <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                  Every Build
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              >
                Africa's most trusted technology-driven site management agency ensuring quality,
                transparency, and accountability on every construction site.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4B0082]">100+</div>
                  <div className="text-base sm:text-lg text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-indigo-600">98%</div>
                  <div className="text-base sm:text-lg text-gray-600">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4B0082]">24/7</div>
                  <div className="text-base sm:text-lg text-gray-600">Support Available</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => {
                    console.log('Button clicked');
                    router.push('/pricing');
                  }}
                  className="px-8 py-4 bg-[#4B0082] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDemoClick}
                  className="px-8 py-4 border-2 border-[#4B0082] text-[#4B0082] font-semibold rounded-2xl hover:bg-[#4B0082] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
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
                    src="/su11.jpg"
                    alt="CareBuild SMA Professional Team Collaboration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      <span className="text-sm font-medium text-gray-700">Live Project</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Lagos Residential Complex</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-[#4B0082]" />
                      <span className="text-sm font-medium text-gray-700">Progress: 85%</span>
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-purple-50/30">
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
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                Build with Confidence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need to manage construction projects successfully.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                image: "/su3.jpg",
                title: "Professional Supervision",
                description: "Trained supervisors ensure quality, progress tracking, and adherence to design specifications.",
                features: ["Quality Control", "Progress Tracking", "Design Compliance", "Safety Monitoring"],
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Globe,
                image: "/su4.jpg",
                title: "Virtual Oversight",
                description: "Live video walkthroughs, drone imaging, and cost tracking dashboards for diaspora clients.",
                features: ["Live Streaming", "Drone Imaging", "Cost Tracking", "Remote Monitoring"],
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: BarChart3,
                image: "/su6.jpg",
                title: "AI-Driven Analytics",
                description: "Performance insights, schedule efficiency, and budget variance reporting.",
                features: ["Performance Insights", "Schedule Optimization", "Budget Analysis", "Predictive Analytics"],
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Users,
                image: "/su7.jpg",
                title: "Advanced Management",
                description: "Comprehensive platform handling subscriptions, assignments, payment tracking, and supervisor performance.",
                features: ["Subscription Management", "Assignment Tracking", "Payment Monitoring", "Geolocation & Performance Metrics"],
                color: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Icon */}
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-lg rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    Featured
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#4B0082] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 + idx * 0.05 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('features')}
                    className={`w-full py-3 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group`}
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-[#4B0082]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-purple-50/30 to-white">
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
              <span>Transparent Pricing</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Choose Your
              <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed to scale with your construction projects.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                id: "starter",
                name: "Essential",
                price: "₦150,000",
                period: "per month",
                visits: "16 visits/month",
                description: "Perfect for single-site owners",
                features: [
                  "Professional Supervision",
                  "Progress Reports",
                  "Photo Documentation",
                  "Basic Analytics",
                  "Email Support"
                ],
                color: "from-gray-500 to-gray-600",
                popular: false
              },
              {
                id: "professional",
                name: "Premium",
                price: "₦220,000",
                period: "per month",
                visits: "20 visits/month",
                description: "Ideal for developers (2-3 sites)",
                features: [
                  "Everything in Essential",
                  "Live Video Streaming",
                  "Advanced Analytics",
                  "Priority Support",
                  "Custom Reports",
                  "Team Collaboration"
                ],
                color: "from-purple-500 to-indigo-500",
                popular: true
              },
              {
                id: "enterprise",
                name: "Executive",
                price: "₦350,000",
                period: "per month",
                visits: "24 visits/month",
                description: "Best for diaspora & corporates",
                features: [
                  "Everything in Premium",
                  "Drone Inspections",
                  "AI-Powered Insights",
                  "Dedicated Manager",
                  "Custom Integrations",
                  "24/7 Phone Support"
                ],
                color: "from-indigo-500 to-purple-500",
                popular: false
              }
            ].map((plan, index) => (
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
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-[#4B0082] font-semibold mb-2">{plan.visits}</p>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
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
                      onClick={() => handlePricingPlan(plan.id)}
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
            <p className="text-gray-600 mb-4">All plans include 30-day money-back guarantee</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No setup fees</span>
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

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Heart className="w-4 h-4" />
              <span>Success Stories</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Trusted by
              <span className="block bg-[#4B0082] bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped construction companies across Africa achieve their goals.
            </p>
          </motion.div>

          {/* Success Stories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-80">
                <Image
                  src="/su13.jpg"
                  alt="Professional Construction Team Collaboration"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
                >
                  <div className="text-2xl font-bold text-[#4B0082]">100+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
                >
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">On Time</div>
                </motion.div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Lagos Residential Complex</h3>
                <p className="text-gray-600 mb-4">
                  "CareBuild SMA helped us complete our 500-unit residential project 3 months ahead of schedule while maintaining the highest quality standards."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#4B0082] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">John Doe</div>
                    <div className="text-sm text-gray-500">CEO, Lagos Developers</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-80">
                <Image
                  src="/su14.jpg"
                  alt="Construction Site Planning and Execution"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
                >
                  <div className="text-2xl font-bold text-indigo-600">50+</div>
                  <div className="text-sm text-gray-600">Experts</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
                >
                  <div className="text-2xl font-bold text-green-600">100+</div>
                  <div className="text-sm text-gray-600">Quality</div>
                </motion.div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Abuja Office Complex</h3>
                <p className="text-gray-600 mb-4">
                  "The AI-powered analytics and real-time monitoring helped us optimize our construction process and reduce costs by 15%."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#4B0082] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Miller</div>
                    <div className="text-sm text-gray-500">Project Manager, Abuja Builders</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "100+", label: "Projects Completed", icon: Target },
              { number: "98%", label: "Client Satisfaction", icon: Heart },
              { number: "50+", label: "Expert Supervisors", icon: TrendingUp },
              { number: "24/7", label: "Support Available", icon: Clock }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-[#4B0082] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
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
              <Sparkles className="w-5 h-5" />
              <span>Ready to Transform Your Construction Projects?</span>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-white mb-6">
              Start Building with
              <span className="block">Confidence Today</span>
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied clients who trust CareBuild SMA for their construction projects.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {user ? (
                // Show dashboard access for authenticated users
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/dashboard')}
                  className="px-10 py-4 bg-white text-[#4B0082] font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 group"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                // Show signup for unauthenticated users
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="px-10 py-4 bg-white text-[#4B0082] font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoClick}
                className="px-10 py-4 border-2 border-white text-white font-semibold text-lg rounded-2xl hover:bg-white hover:text-[#4B0082] transition-all duration-300 flex items-center space-x-3 group"
              >
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
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
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleGetStarted}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#4B0082] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
      >
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Get Started
        </span>
      </motion.button>

      {/* Demo Modal */}
      {showDemoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDemoModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">CareBuild SMA Demo</h3>
                <p className="text-gray-600">See how our platform works in action</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDemoModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </motion.button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="aspect-video bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 bg-[#4B0082] rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Demo Video Coming Soon</h4>
                  <p className="text-gray-600 mb-4">We're preparing an amazing demo video to show you our platform in action.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted}
                    className="px-6 py-3 bg-[#4B0082] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Get Started Instead
                  </motion.button>
                </div>
              </div>

              {/* Demo Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Shield, title: "Real-time Monitoring", desc: "Live project updates" },
                  { icon: BarChart3, title: "Analytics Dashboard", desc: "Performance insights" },
                  { icon: Camera, title: "Photo Documentation", desc: "Visual progress tracking" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-xl text-center"
                  >
                    <feature.icon className="w-8 h-8 text-[#4B0082] mx-auto mb-2" />
                    <h5 className="font-semibold text-gray-900 mb-1">{feature.title}</h5>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Customer Served Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, -20, 20, -20, 20, 0],
              y: [0, -10, 10, -10, 10, 0],
              rotate: [0, 5, -5, 5, -5, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, 20, -20, 20, -20, 0],
              y: [0, 10, -10, 10, -10, 0],
              rotate: [0, -5, 5, -5, 5, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-indigo-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -15, 15, -15, 15, 0],
              y: [0, -15, 15, -15, 15, 0],
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-pink-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 lg:mb-8"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Our Growing Community</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-4 sm:mb-6">
              Customers Served
            </h2>
          </motion.div>

          {/* Customer Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
            {[
              {
                number: "100+",
                label: "Served",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
                delay: 0.3
              },
              {
                number: "10,000+",
                label: "Customers Reached",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-500",
                delay: 0.4
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.15,
                  rotate: index % 2 === 0 ? 5 : -5,
                  y: -15
                }}
                animate={{
                  x: index % 2 === 0 
                    ? [0, 10, -10, 10, -10, 0]
                    : [0, -10, 10, -10, 10, 0],
                  y: [0, -8, 8, -8, 8, 0]
                }}
                transition={{
                  opacity: { delay: stat.delay, duration: 0.8 },
                  scale: { delay: stat.delay, duration: 0.8 },
                  default: { delay: stat.delay, duration: 0.8 },
                  x: {
                    duration: 8 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  },
                  y: {
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  }
                }}
                className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 20 + index * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`}
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 25 + index * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className={`absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-gradient-to-tr ${stat.color} opacity-10 rounded-full blur-xl`}
                />

                {/* Statistics Content */}
                <div className="relative z-10 text-center p-4 sm:p-6 md:p-8 lg:p-12">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex p-3 sm:p-4 bg-gradient-to-r ${stat.color} rounded-xl sm:rounded-2xl shadow-2xl mb-4 sm:mb-6`}
                  >
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: stat.delay + 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-3 sm:mb-4"
                  >
                    {stat.number}
                  </motion.h3>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Shine Effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 sm:mt-12 lg:mt-16 text-center"
          >
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm md:text-base">Trusted by Industry Leaders</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="text-xs sm:text-sm md:text-base">Award-Winning Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm md:text-base">Secure & Reliable</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
