'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Globe,
  Sparkles,
  Calendar,
  User,
  FileText,
  X,
  Menu
} from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Contact method handlers
  const handleCallUs = () => {
    window.open('tel:+2348012345678', '_self');
  };

  const handleEmailUs = () => {
    window.open('mailto:hello@carebuildsma.com?subject=Inquiry from CareBuild SMA Website&body=Hello CareBuild SMA team,%0D%0A%0D%0AI would like to inquire about your services.%0D%0A%0D%0APlease contact me at your earliest convenience.%0D%0A%0D%0AThank you!', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello CareBuild SMA team! I'm interested in your construction supervision services. Could you please provide more information?");
    window.open(`https://wa.me/2348012345678?text=${message}`, '_blank');
  };

  const handleLiveChat = () => {
    // Create a modal for live chat
    const chatModal = document.createElement('div');
    chatModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    chatModal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Live Chat</h3>
          <p class="text-gray-600 mb-6">Our live chat is currently being set up. In the meantime, you can reach us through:</p>
          <div class="space-y-3">
            <button onclick="window.open('tel:+2348012345678', '_self')" class="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">
              📞 Call +234 801 234 5678
            </button>
            <button onclick="window.open('mailto:hello@carebuildsma.com', '_self')" class="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
              📧 Email hello@carebuildsma.com
            </button>
            <button onclick="window.open('https://wa.me/2348012345678?text=Hello CareBuild SMA team! I\\'m interested in your construction supervision services.', '_blank')" class="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
              💬 WhatsApp Chat
            </button>
            <button onclick="this.closest('.fixed').remove()" class="w-full py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(chatModal);
    
    // Close modal when clicking outside
    chatModal.addEventListener('click', (e) => {
      if (e.target === chatModal) {
        chatModal.remove();
      }
    });
  };

  const handleScheduleMeeting = () => {
    // Create a modal for meeting scheduler
    const meetingModal = document.createElement('div');
    meetingModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    meetingModal.innerHTML = `
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Schedule Meeting</h3>
          <p class="text-gray-600 mb-6">Book your free 30-minute consultation call with our team:</p>
          <div class="space-y-3">
            <button onclick="window.open('tel:+2348012345678', '_self')" class="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">
              📞 Call to Schedule
            </button>
            <button onclick="window.open('mailto:hello@carebuildsma.com?subject=Schedule Consultation&body=Hello,%0D%0A%0D%0AI would like to schedule a free 30-minute consultation call.%0D%0A%0D%0APlease let me know your available times.%0D%0A%0D%0AThank you!', '_self')" class="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
              📧 Email to Schedule
            </button>
            <button onclick="window.open('https://wa.me/2348012345678?text=Hello! I would like to schedule a free 30-minute consultation call.', '_blank')" class="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
              💬 WhatsApp to Schedule
            </button>
            <button onclick="this.closest('.fixed').remove()" class="w-full py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(meetingModal);
    
    // Close modal when clicking outside
    meetingModal.addEventListener('click', (e) => {
      if (e.target === meetingModal) {
        meetingModal.remove();
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: '',
        budget: '',
        timeline: ''
      });
    }, 3000);
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
              <a href="/about" className="text-gray-600 hover:text-[#4B0082] transition-colors font-medium text-sm xl:text-base">About</a>
              <a href="/contact" className="text-[#4B0082] font-medium text-sm xl:text-base">Contact</a>
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
            <a href="/about" className="block text-gray-600 hover:text-[#4B0082] transition-colors font-medium py-3 px-2 rounded-lg hover:bg-gray-50 text-base sm:text-lg">About</a>
            <a href="/contact" className="block text-[#4B0082] font-medium py-3 px-2 rounded-lg hover:bg-gray-50 text-base sm:text-lg">Contact</a>
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
              <span>Get in Touch</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Let's Build Something
              <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto"
            >
              Ready to start your construction project? Get in touch with our team 
              of experts and let's discuss how we can help bring your vision to life.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-gray-900 mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the communication method that works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: "Call Us",
                description: "Speak directly with our team",
                contact: "+234 801 234 5678",
                action: "Call Now",
                color: "from-green-500 to-emerald-500",
                handler: handleCallUs
              },
              {
                icon: Mail,
                title: "Email Us",
                description: "Send us a detailed message",
                contact: "hello@carebuildsma.com",
                action: "Send Email",
                color: "from-blue-500 to-indigo-500",
                handler: handleEmailUs
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                description: "Chat with us in real-time",
                contact: "Available 24/7",
                action: "Start Chat",
                color: "from-purple-500 to-pink-500",
                handler: handleLiveChat
              },
              {
                icon: Calendar,
                title: "Schedule Meeting",
                description: "Book a consultation call",
                contact: "Free 30-min consultation",
                action: "Book Now",
                color: "from-orange-500 to-red-500",
                handler: handleScheduleMeeting
              }
            ].map((method, index) => (
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
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  {method.title === "Call Us" ? (
                    <button 
                      onClick={handleCallUs}
                      className="text-[#4B0082] font-semibold mb-6 hover:text-purple-700 transition-colors cursor-pointer"
                    >
                      {method.contact}
                    </button>
                  ) : method.title === "Email Us" ? (
                    <button 
                      onClick={handleEmailUs}
                      className="text-[#4B0082] font-semibold mb-6 hover:text-purple-700 transition-colors cursor-pointer"
                    >
                      {method.contact}
                    </button>
                  ) : (
                    <p className="text-[#4B0082] font-semibold mb-6">{method.contact}</p>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={method.handler}
                    className={`w-full py-3 bg-gradient-to-r ${method.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300`}
                  >
                    {method.action}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-b from-purple-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="+234 801 234 5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Type
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select project type</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                          <option value="infrastructure">Infrastructure</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-50m">Under ₦50M</option>
                          <option value="50m-100m">₦50M - ₦100M</option>
                          <option value="100m-500m">₦100M - ₦500M</option>
                          <option value="500m-1b">₦500M - ₦1B</option>
                          <option value="over-1b">Over ₦1B</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-3months">1-3 months</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="6-12months">6-12 months</option>
                        <option value="over-12months">Over 12 months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  We're here to help you with your construction project. Reach out to us 
                  through any of the channels below, and we'll respond promptly.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Office Address",
                    details: [
                      "123 Victoria Island",
                      "Lagos, Nigeria 101241",
                      "West Africa"
                    ],
                    color: "text-red-500"
                  },
                  {
                    icon: Phone,
                    title: "Phone Numbers",
                    details: [
                      "+234 801 234 5678",
                      "+234 802 345 6789",
                      "Mon-Fri: 8AM-6PM"
                    ],
                    color: "text-green-500"
                  },
                  {
                    icon: Mail,
                    title: "Email Address",
                    details: [
                      "hello@carebuildsma.com",
                      "support@carebuildsma.com",
                      "projects@carebuildsma.com"
                    ],
                    color: "text-blue-500"
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    details: [
                      "Monday - Friday: 8:00 AM - 6:00 PM",
                      "Saturday: 9:00 AM - 4:00 PM",
                      "Sunday: Closed"
                    ],
                    color: "text-purple-500"
                  }
                ].map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`p-3 bg-gray-100 rounded-xl ${info.color}`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h4>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Response Guarantee</h4>
                <p className="text-gray-600 mb-4">
                  We respond to all inquiries within 24 hours during business days. 
                  For urgent matters, call us directly.
                </p>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">24/7 Emergency Support Available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can you start a new project?",
                answer: "We can typically start a new project within 1-2 weeks of contract signing, depending on project complexity and current workload."
              },
              {
                question: "Do you work on projects outside Lagos?",
                answer: "Yes, we work across Nigeria and other African countries. We have teams in major cities and can travel for larger projects."
              },
              {
                question: "What types of projects do you handle?",
                answer: "We handle residential, commercial, industrial, and infrastructure projects of all sizes, from small renovations to large-scale developments."
              },
              {
                question: "How do you ensure quality control?",
                answer: "We use a combination of experienced supervisors, real-time monitoring technology, and regular quality checkpoints throughout the project lifecycle."
              },
              {
                question: "What are your payment terms?",
                answer: "We offer flexible subscription plans to suit different project needs. View our detailed pricing and payment options.",
                action: "View Pricing Plans",
                actionLink: "/pricing"
              },
              {
                question: "Do you provide project updates?",
                answer: "Yes, we provide regular updates through our platform, including photos, videos, progress reports, and real-time notifications."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                {faq.action && faq.actionLink && (
                  <motion.a
                    href={faq.actionLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <span>{faq.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            className="text-center"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Don't wait any longer. Contact us today and let's discuss how we can 
              help bring your construction vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact-form"
                className="px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 group"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+2348012345678"
                className="px-10 py-4 border-2 border-white text-white font-semibold text-lg rounded-2xl hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center space-x-3 group"
              >
                <Phone className="w-6 h-6" />
                <span>Call Now</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        <span className="hidden sm:block font-semibold">WhatsApp</span>
      </motion.button>
    </div>
  );
}
