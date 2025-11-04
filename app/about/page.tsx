'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Shield, 
  Users, 
  TrendingUp, 
  Award, 
  Globe, 
  Heart, 
  Target, 
  BarChart3, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Camera,
  FileText,
  Zap,
  Sparkles,
  X,
  Menu
} from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
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
              onClick={() => window.location.href = '/'}
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
              <a href="/about" className="text-[#4B0082] font-medium text-sm xl:text-base">About</a>
              <a href="/contact" className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium text-sm xl:text-base">Contact</a>
              <a href="/pricing" className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium text-sm xl:text-base">Pricing</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                <a
                  href="/auth/login"
                  className="px-4 xl:px-6 py-2 xl:py-2.5 text-gray-700 font-medium hover:text-[#4B0082] transition-colors text-sm xl:text-base"
                >
                  Login
                </a>
                <a
                  href="/pricing"
                  className="px-6 xl:px-8 py-2 xl:py-2.5 bg-[#4B0082] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm xl:text-base"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 sm:p-3 text-gray-600 hover:text-[#4B0082] transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Toggle mobile menu"
              >
                {showMobileMenu ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden shadow-lg relative z-50"
            >
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
            <a href="/" className="block text-gray-600 hover:text-[#4B0082] transition-colors font-medium py-3 px-2 rounded-lg hover:bg-gray-50 text-base sm:text-lg">Home</a>
            <a href="/about" className="block text-[#4B0082] font-medium py-3 px-2 rounded-lg hover:bg-gray-50 text-base sm:text-lg">About</a>
            <a href="/contact" className="block text-gray-600 hover:text-[#4B0082] transition-colors font-medium py-3 px-2 rounded-lg hover:bg-gray-50 text-base sm:text-lg">Contact</a>
            <a href="/pricing" className="block text-gray-600 hover:text-[#4B0082] transition-colors font-medium py-3 px-2 rounded-lg hover:bg-gray-50 text-base sm:text-lg">Pricing</a>
            <div className="pt-4 border-t border-gray-200 space-y-3 sm:space-y-4">
              <a href="/auth/login" className="block w-full px-4 sm:px-6 py-3 sm:py-4 text-gray-700 font-medium hover:text-[#4B0082] transition-colors rounded-lg hover:bg-gray-50 text-base sm:text-lg">Login</a>
              <a href="/pricing" className="block w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#4B0082] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center text-base sm:text-lg">Get Started</a>
            </div>
          </div>
        </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>About CareBuild SMA</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Building Africa's Future
              <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                One Project at a Time
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto"
            >
              We are Africa's most trusted technology-driven site management agency, 
              ensuring quality, transparency, and accountability on every construction site.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To revolutionize construction management across Africa by providing 
                technology-driven solutions that ensure quality, transparency, and 
                accountability on every construction site.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that every construction project deserves professional 
                supervision, real-time monitoring, and comprehensive reporting to 
                ensure successful completion and client satisfaction.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Quality Assurance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Transparent Reporting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Real-time Monitoring</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/su6.jpg"
                  alt="CareBuild SMA Mission"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                  <p className="text-white/90 text-lg">
                    To become Africa's leading construction management platform, 
                    empowering developers and clients with cutting-edge technology 
                    and professional expertise.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-purple-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded with a vision to transform construction management across Africa
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                year: "2020",
                title: "The Beginning",
                description: "Founded by construction industry veterans who saw the need for better project management and transparency in African construction projects.",
                icon: Building2,
                color: "from-purple-500 to-indigo-500"
              },
              {
                year: "2021-2022",
                title: "Technology Integration",
                description: "Developed our proprietary platform integrating real-time monitoring, AI analytics, and mobile-first design for construction management.",
                icon: Zap,
                color: "from-indigo-500 to-purple-500"
              },
              {
                year: "2023-Present",
                title: "Expansion & Growth",
                description: "Expanded across major African cities, serving hundreds of clients and managing projects worth over ₦15 billion.",
                icon: TrendingUp,
                color: "from-purple-500 to-pink-500"
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <milestone.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Integrity",
                description: "We maintain the highest ethical standards in all our operations and relationships.",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Heart,
                title: "Care",
                description: "We genuinely care about our clients' success and the quality of their projects.",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: Target,
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service delivery.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Globe,
                title: "Innovation",
                description: "We continuously innovate to provide cutting-edge solutions for our clients.",
                color: "from-purple-500 to-indigo-500"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 h-full text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-white mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Numbers that speak to our commitment and success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "100+", label: "Projects Completed", icon: Building2 },
              { number: "98%", label: "Client Satisfaction", icon: Heart },
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
                <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Join hundreds of satisfied clients who trust CareBuild SMA for their construction projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/pricing"
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 group"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="px-10 py-4 border-2 border-purple-600 text-purple-600 font-semibold text-lg rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center space-x-3 group"
              >
                <span>Contact Us</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
