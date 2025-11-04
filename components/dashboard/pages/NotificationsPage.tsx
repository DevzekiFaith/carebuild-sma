'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Trash2,
  CheckCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const mockNotifications = [
    {
      id: 1,
      title: 'New Site Report Submitted',
      message: 'John Adebayo has submitted a daily report for Luxury Villa Alpha project.',
      type: 'success',
      date: '2024-10-25T10:30:00Z',
      read: false,
      project: 'Luxury Villa Alpha'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of ₦150,000 has been received from Mrs. Sarah Johnson.',
      type: 'success',
      date: '2024-10-25T09:15:00Z',
      read: false,
      project: 'Luxury Villa Alpha'
    },
    {
      id: 3,
      title: 'Site Visit Scheduled',
      message: 'Site visit scheduled for Commercial Complex Beta tomorrow at 2:00 PM.',
      type: 'info',
      date: '2024-10-24T16:45:00Z',
      read: true,
      project: 'Commercial Complex Beta'
    },
    {
      id: 4,
      title: 'Material Delivery Issue',
      message: 'Material delivery delayed for Residential Estate Gamma. Expected delivery: 2 days.',
      type: 'warning',
      date: '2024-10-24T14:20:00Z',
      read: true,
      project: 'Residential Estate Gamma'
    },
    {
      id: 5,
      title: 'Project Milestone Reached',
      message: 'Foundation work completed for Luxury Villa Alpha. Progress: 25%.',
      type: 'success',
      date: '2024-10-23T11:00:00Z',
      read: true,
      project: 'Luxury Villa Alpha'
    },
    {
      id: 6,
      title: 'Budget Approval Required',
      message: 'Additional budget approval needed for Commercial Complex Beta project.',
      type: 'warning',
      date: '2024-10-23T08:30:00Z',
      read: true,
      project: 'Commercial Complex Beta'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Notifications' },
    { id: 'unread', label: 'Unread' },
    { id: 'success', label: 'Success' },
    { id: 'warning', label: 'Warnings' }
  ];

  const filteredNotifications = mockNotifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage="Notifications" 
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Stay updated with your project activities and important alerts</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Notifications', value: mockNotifications.length, icon: Bell, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { title: 'Unread', value: unreadCount, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
          { title: 'Success', value: mockNotifications.filter(n => n.type === 'success').length, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
          { title: 'Warnings', value: mockNotifications.filter(n => n.type === 'warning').length, icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-50' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.id === 'unread' && unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! No new notifications to show.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-lg transition-shadow duration-300 ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                            <span className="text-xs text-blue-600 font-medium">{notification.project}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
