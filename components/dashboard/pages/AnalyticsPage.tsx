'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';

interface AnalyticsPageProps {
  userRole: 'client' | 'supervisor' | 'admin';
}

export default function AnalyticsPage({ userRole }: AnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState('30d');

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const getAnalyticsData = () => {
    switch (userRole) {
      case 'client':
        return {
          title: 'Project Analytics',
          description: 'Track your project performance and progress',
          metrics: [
            { title: 'Project Progress', value: '78%', change: '+5%', trend: 'up', icon: TrendingUp },
            { title: 'Budget Utilization', value: '65%', change: '+2%', trend: 'up', icon: DollarSign },
            { title: 'Site Visits', value: '24', change: '+3', trend: 'up', icon: Calendar },
            { title: 'Reports Received', value: '18', change: '+2', trend: 'up', icon: CheckCircle }
          ]
        };
      case 'supervisor':
        return {
          title: 'Performance Analytics',
          description: 'Monitor your site supervision performance',
          metrics: [
            { title: 'Sites Managed', value: '4', change: '+1', trend: 'up', icon: Users },
            { title: 'Reports Submitted', value: '28', change: '+5', trend: 'up', icon: CheckCircle },
            { title: 'Average Rating', value: '4.8', change: '+0.2', trend: 'up', icon: TrendingUp },
            { title: 'Earnings', value: '₦196K', change: '+₦28K', trend: 'up', icon: DollarSign }
          ]
        };
      case 'admin':
        return {
          title: 'Platform Analytics',
          description: 'Comprehensive platform performance metrics',
          metrics: [
            { title: 'Total Revenue', value: '₦2.4M', change: '+15%', trend: 'up', icon: DollarSign },
            { title: 'Active Projects', value: '24', change: '+3', trend: 'up', icon: Users },
            { title: 'Supervisors', value: '8', change: '+1', trend: 'up', icon: Users },
            { title: 'Client Satisfaction', value: '94%', change: '+2%', trend: 'up', icon: TrendingUp }
          ]
        };
      default:
        return {
          title: 'Analytics',
          description: 'View your performance metrics',
          metrics: []
        };
    }
  };

  const analyticsData = getAnalyticsData();

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage={analyticsData.title} 
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{analyticsData.title}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">{analyticsData.description}</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                timeRange === range.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {analyticsData.metrics.map((metric, index) => {
          const TrendIcon = getTrendIcon(metric.trend);
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-xl bg-blue-50`}>
                      <metric.icon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className={`flex items-center space-x-1 text-xs sm:text-sm ${getTrendColor(metric.trend)}`}>
                      <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span>Progress Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: 'Foundation', progress: 100, color: 'bg-green-500' },
                  { name: 'Structure', progress: 85, color: 'bg-blue-500' },
                  { name: 'Roofing', progress: 60, color: 'bg-yellow-500' },
                  { name: 'Finishing', progress: 30, color: 'bg-purple-500' }
                ].map((item, index) => (
                  <div key={index} className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-medium text-gray-700">{item.name}</span>
                      <span className="text-gray-600">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className={`h-1.5 sm:h-2 rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span>Activity Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: 'Site Visits', value: 24, color: 'bg-blue-500' },
                  { name: 'Reports', value: 18, color: 'bg-green-500' },
                  { name: 'Photos', value: 156, color: 'bg-purple-500' },
                  { name: 'Videos', value: 12, color: 'bg-yellow-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${item.color}`}></div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">On-time Delivery</span>
                  <span className="font-semibold text-green-600 text-xs sm:text-sm">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Quality Score</span>
                  <span className="font-semibold text-blue-600 text-xs sm:text-sm">4.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Client Satisfaction</span>
                  <span className="font-semibold text-purple-600 text-xs sm:text-sm">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Budget Adherence</span>
                  <span className="font-semibold text-emerald-600 text-xs sm:text-sm">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                {[
                  { action: 'Site visit completed', time: '2 hours ago', type: 'success' },
                  { action: 'Report submitted', time: '4 hours ago', type: 'info' },
                  { action: 'Payment received', time: '1 day ago', type: 'success' },
                  { action: 'Material delivered', time: '2 days ago', type: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <p className="font-medium text-gray-900 text-xs sm:text-sm">Export Report</p>
                  <p className="text-xs text-gray-500">Download analytics data</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                  <p className="font-medium text-gray-900 text-xs sm:text-sm">Schedule Report</p>
                  <p className="text-xs text-gray-500">Set up automated reports</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                >
                  <p className="font-medium text-gray-900 text-xs sm:text-sm">Share Dashboard</p>
                  <p className="text-xs text-gray-500">Share with team members</p>
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
