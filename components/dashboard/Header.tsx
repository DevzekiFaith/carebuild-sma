'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Wifi, WifiOff, Check, Menu, X, Home, FolderOpen, FileText, BarChart3, CreditCard, Settings, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeNotifications } from '@/hooks/useRealtime';

interface HeaderProps {
  title: string;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  isRealtimeConnected?: boolean;
}

export default function Header({ title, onMenuToggle, isMenuOpen, isRealtimeConnected }: HeaderProps) {
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useRealtimeNotifications();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper functions for mobile menu
  const getMainMenuItems = () => {
    switch (user?.role) {
      case 'supervisor':
        return [
          { id: 'overview', label: 'Dashboard', icon: Home },
          { id: 'assigned-sites', label: 'My Sites', icon: FolderOpen },
          { id: 'reports', label: 'Submit Reports', icon: FileText },
          { id: 'schedule', label: 'Visit Schedule', icon: Calendar },
          { id: 'analytics', label: 'Performance', icon: BarChart3 },
        ];
      case 'admin':
        return [
          { id: 'overview', label: 'Dashboard', icon: Home },
          { id: 'projects', label: 'All Projects', icon: FolderOpen },
          { id: 'supervisors', label: 'Supervisors', icon: Users },
          { id: 'reports', label: 'All Reports', icon: FileText },
          { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
          { id: 'payments', label: 'Payment Management', icon: CreditCard },
        ];
      default: // client
        return [
          { id: 'overview', label: 'Dashboard', icon: Home },
          { id: 'projects', label: 'My Projects', icon: FolderOpen },
          { id: 'reports', label: 'Site Reports', icon: FileText },
          { id: 'payments', label: 'Payments & Billing', icon: CreditCard },
          { id: 'analytics', label: 'Project Analytics', icon: BarChart3 },
        ];
    }
  };

  const getSecondaryMenuItems = () => {
    return [
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { 
        id: 'settings', 
        label: user?.role === 'supervisor' ? 'Profile Settings' : user?.role === 'admin' ? 'System Settings' : 'Account Settings', 
        icon: Settings 
      },
    ];
  };

  const navigateToTab = (tabId: string) => {
    const event = new CustomEvent('tabChange', { detail: tabId });
    window.dispatchEvent(event);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
          </motion.button>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{title}</h1>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              {user?.role === 'client' && "Track your construction projects and stay updated with progress."}
              {user?.role === 'supervisor' && "Manage your assigned sites and submit reports efficiently."}
              {user?.role === 'admin' && "Oversee all platform operations and manage resources."}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48 sm:w-64 text-sm"
            />
          </div>

          {/* Realtime Connection Status */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {isRealtimeConnected ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-xs ${isRealtimeConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isRealtimeConnected ? 'Live' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </span>
              )}
            </motion.button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notifications.slice(0, 10).map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.is_read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                            }`}
                            onClick={() => {
                              if (!notification.is_read) {
                                markAsRead(notification.id);
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                !notification.is_read ? 'bg-blue-500' : 'bg-gray-300'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {notification.title || 'New Notification'}
                                  </h4>
                                  <span className="text-xs text-gray-500">
                                    {new Date(notification.created_at).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {notification.message || notification.description || 'No message available'}
                                </p>
                                {notification.type && (
                                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                    {notification.type}
                                  </span>
                                )}
                              </div>
                              {!notification.is_read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                  <Check className="w-4 h-4 text-gray-500" />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 10 && (
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 truncate max-w-24">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl border-r border-gray-200"
          >
            {/* Mobile Sidebar Content */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CB</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">CareBuild</h2>
                      <p className="text-xs text-white/80">SMA Platform</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* User Info */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize font-medium bg-gray-100 px-2 py-1 rounded-full inline-block">{user?.role}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Main
                  </h3>
                  <ul className="space-y-1">
                    {getMainMenuItems().map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <motion.button
                            whileHover={{ x: 4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              navigateToTab(item.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md"
                          >
                            <Icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                            <span className="font-semibold">{item.label}</span>
                          </motion.button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Secondary Navigation */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Account
                  </h3>
                  <ul className="space-y-1">
                    {getSecondaryMenuItems().map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <motion.button
                            whileHover={{ x: 4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              navigateToTab(item.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md"
                          >
                            <Icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                            <span className="font-semibold">{item.label}</span>
                          </motion.button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center pt-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-gray-300 to-transparent rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
