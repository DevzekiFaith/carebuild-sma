'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, ChevronLeft, ChevronRight, RotateCcw, History } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavigationButtonsProps {
  currentPage: string;
  onBack?: () => void;
  onForward?: () => void;
  showHome?: boolean;
  userRole?: 'client' | 'supervisor' | 'admin';
}

interface NavigationHistory {
  page: string;
  timestamp: number;
}

export default function NavigationButtons({ 
  currentPage, 
  onBack, 
  onForward, 
  showHome = true,
  userRole = 'client'
}: NavigationButtonsProps) {
  const router = useRouter();
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  // Dashboard page mapping based on user role
  const getDashboardPages = () => {
    const basePages = ['Dashboard Overview'];
    
    switch (userRole) {
      case 'client':
        return [...basePages, 'My Projects', 'Site Reports', 'Payments & Billing', 'Project Analytics', 'Notifications', 'Account Settings'];
      case 'supervisor':
        return [...basePages, 'My Sites', 'Submit Reports', 'Visit Schedule', 'Performance', 'Notifications', 'Profile Settings'];
      case 'admin':
        return [...basePages, 'All Projects', 'Supervisors', 'Site Reports', 'Payments', 'Analytics', 'Schedule', 'Notifications', 'System Settings'];
      default:
        return basePages;
    }
  };

  const dashboardPages = getDashboardPages();

  // Initialize navigation history
  useEffect(() => {
    const savedHistory = localStorage.getItem('carebuild-navigation-history');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setNavigationHistory(history);
      setCurrentIndex(history.length - 1);
    } else {
      // Initialize with current page
      const initialHistory = [{ page: currentPage, timestamp: Date.now() }];
      setNavigationHistory(initialHistory);
      setCurrentIndex(0);
      localStorage.setItem('carebuild-navigation-history', JSON.stringify(initialHistory));
    }
  }, []);

  // Update history when current page changes
  useEffect(() => {
    if (currentPage && navigationHistory.length > 0) {
      const lastPage = navigationHistory[navigationHistory.length - 1];
      if (lastPage.page !== currentPage) {
        const newHistory = [...navigationHistory, { page: currentPage, timestamp: Date.now() }];
        setNavigationHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
        localStorage.setItem('carebuild-navigation-history', JSON.stringify(newHistory));
      }
    }
  }, [currentPage]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < navigationHistory.length - 1;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (canGoBack) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      const targetPage = navigationHistory[newIndex];
      navigateToPage(targetPage.page);
    }
  };

  const handleForward = () => {
    if (onForward) {
      onForward();
      return;
    }

    if (canGoForward) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      const targetPage = navigationHistory[newIndex];
      navigateToPage(targetPage.page);
    }
  };

  const navigateToPage = (pageName: string) => {
    // Map page names to tab IDs
    const pageToTabMap: { [key: string]: string } = {
      'Dashboard Overview': 'overview',
      'My Projects': 'projects',
      'All Projects': 'projects',
      'My Sites': 'assigned-sites',
      'Site Reports': 'reports',
      'Submit Reports': 'reports',
      'Payments & Billing': 'payments',
      'Payments': 'payments',
      'Project Analytics': 'analytics',
      'Performance': 'analytics',
      'Analytics': 'analytics',
      'Supervisors': 'supervisors',
      'Visit Schedule': 'schedule',
      'Schedule': 'schedule',
      'Notifications': 'notifications',
      'Account Settings': 'settings',
      'Profile Settings': 'settings',
      'System Settings': 'settings'
    };

    const tabId = pageToTabMap[pageName];
    if (tabId) {
      // Dispatch custom event to change tab
      const event = new CustomEvent('tabChange', { detail: tabId });
      window.dispatchEvent(event);
    }
  };

  const handleHome = () => {
    router.push('/dashboard');
  };

  const clearHistory = () => {
    const newHistory = [{ page: currentPage, timestamp: Date.now() }];
    setNavigationHistory(newHistory);
    setCurrentIndex(0);
    localStorage.setItem('carebuild-navigation-history', JSON.stringify(newHistory));
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative mb-6">
      {/* Navigation Controls */}
      <div className="flex items-center space-x-2">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          disabled={!canGoBack}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            canGoBack
              ? 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-md hover:shadow-lg'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
          title={canGoBack ? `Go back to ${navigationHistory[currentIndex - 1]?.page || 'previous page'}` : 'No previous page'}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline font-semibold">Back</span>
        </motion.button>

        {/* Forward Button */}
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleForward}
          disabled={!canGoForward}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
            canGoForward
              ? 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-md hover:shadow-lg'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
          title={canGoForward ? `Go forward to ${navigationHistory[currentIndex + 1]?.page || 'next page'}` : 'No next page'}
        >
          <span className="hidden sm:inline font-semibold">Forward</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>

        {/* History Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-blue-700 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          title="View navigation history"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline font-semibold">History</span>
        </motion.button>

        {/* Home Button */}
        {showHome && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHome}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            title="Go to dashboard"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Dashboard</span>
          </motion.button>
        )}

        {/* Current Page Indicator */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-200 flex items-center space-x-3"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">
              {currentPage}
            </span>
            <div className="text-xs text-gray-500">
              {navigationHistory.length > 0 && formatTime(navigationHistory[currentIndex]?.timestamp || Date.now())}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation History Dropdown */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                  <History className="w-4 h-4" />
                  <span>Navigation History</span>
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearHistory}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Clear history"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* History List */}
            <div className="max-h-64 overflow-y-auto">
              {navigationHistory.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <History className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No navigation history</p>
                </div>
              ) : (
                navigationHistory.map((item, index) => (
                  <motion.div
                    key={`${item.page}-${item.timestamp}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setCurrentIndex(index);
                      navigateToPage(item.page);
                      setShowHistory(false);
                    }}
                    className={`p-3 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      index === currentIndex
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          index === currentIndex ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {item.page}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(item.timestamp)}
                        </p>
                      </div>
                    </div>
                    {index === currentIndex && (
                      <div className="text-blue-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                {navigationHistory.length} page{navigationHistory.length !== 1 ? 's' : ''} in history
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
