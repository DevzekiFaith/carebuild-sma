'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from './NavigationButtons';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

interface OverviewProps {
  userRole: 'client' | 'supervisor' | 'admin';
}

export default function Overview({ userRole }: OverviewProps) {
  // Mock data - in real app, this would come from your store/API
  const mockData = {
    client: {
      totalProjects: 3,
      activeProjects: 2,
      completedProjects: 1,
      totalSpent: 2500000,
      pendingReports: 5,
      upcomingVisits: 2,
    },
    supervisor: {
      assignedSites: 4,
      reportsSubmitted: 12,
      pendingReports: 3,
      upcomingVisits: 5,
      totalSites: 4,
      completedReports: 9,
    },
    admin: {
      totalProjects: 15,
      activeProjects: 8,
      totalSupervisors: 5,
      totalClients: 12,
      totalRevenue: 15000000,
      pendingApprovals: 7,
    }
  };

  const data = mockData[userRole];

  const getStats = () => {
    switch (userRole) {
      case 'client':
        return [
          {
            title: 'Active Projects',
            value: data.activeProjects,
            icon: FolderOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Total Spent',
            value: formatCurrency(data.totalSpent),
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Pending Reports',
            value: data.pendingReports,
            icon: FileText,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
          },
          {
            title: 'Upcoming Visits',
            value: data.upcomingVisits,
            icon: Calendar,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
          },
        ];
      case 'supervisor':
        return [
          {
            title: 'Assigned Sites',
            value: data.assignedSites,
            icon: FolderOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Reports Submitted',
            value: data.reportsSubmitted,
            icon: FileText,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Pending Reports',
            value: data.pendingReports,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
          },
          {
            title: 'Upcoming Visits',
            value: data.upcomingVisits,
            icon: Calendar,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
          },
        ];
      case 'admin':
        return [
          {
            title: 'Total Projects',
            value: data.totalProjects,
            icon: FolderOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Active Projects',
            value: data.activeProjects,
            icon: TrendingUp,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Total Supervisors',
            value: data.totalSupervisors,
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
          },
          {
            title: 'Total Revenue',
            value: formatCurrency(data.totalRevenue),
            icon: DollarSign,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
          },
        ];
      default:
        return [];
    }
  };

  const stats = getStats();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage="Dashboard Overview" 
        showHome={false}
        userRole={userRole}
      />

      {/* Welcome Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4 sm:p-6 lg:p-8 text-white"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                Welcome back, {userRole === 'client' ? 'Client' : userRole === 'supervisor' ? 'Supervisor' : 'Admin'}!
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-blue-100 mb-4 sm:mb-6">
                {userRole === 'client' && "Track your construction projects and stay updated with progress."}
                {userRole === 'supervisor' && "Manage your assigned sites and submit reports efficiently."}
                {userRole === 'admin' && "Oversee all platform operations and manage resources."}
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // This will be handled by the parent component's tab switching
                    const event = new CustomEvent('tabChange', { detail: 'projects' });
                    window.dispatchEvent(event);
                  }}
                  className="bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  View Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const event = new CustomEvent('tabChange', { detail: 'reports' });
                    window.dispatchEvent(event);
                  }}
                  className="border border-white/30 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base"
                >
                  Quick Actions
                </motion.button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative w-64 h-64 rounded-full overflow-hidden">
                <Image
                  src="/su7.jpg"
                  alt="Construction Site"
                  fill
                  className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 truncate">{stat.value}</p>
                    <div className="flex items-center text-xs sm:text-sm text-green-600">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">+12% from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                  </div>
                </div>
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Recent Activity</span>
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { action: 'New site report submitted', time: '2 hours ago', type: 'success', project: 'Project Alpha' },
                  { action: 'Payment received', time: '4 hours ago', type: 'success', project: 'Project Beta' },
                  { action: 'Site visit scheduled', time: '1 day ago', type: 'info', project: 'Project Gamma' },
                  { action: 'Budget approval pending', time: '2 days ago', type: 'warning', project: 'Project Delta' },
                  { action: 'Material delivery completed', time: '3 days ago', type: 'success', project: 'Project Alpha' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.project} • {activity.time}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <span>Quick Actions</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {userRole === 'client' && (
                  <>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const event = new CustomEvent('tabChange', { detail: 'projects' });
                        window.dispatchEvent(event);
                      }}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FolderOpen className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">View Project Progress</p>
                          <p className="text-sm text-gray-500">Check latest updates</p>
                        </div>
                      </div>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const event = new CustomEvent('tabChange', { detail: 'payments' });
                        window.dispatchEvent(event);
                      }}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Make Payment</p>
                          <p className="text-sm text-gray-500">Pay for services</p>
                        </div>
                      </div>
                    </motion.button>
                  </>
                )}
                {userRole === 'supervisor' && (
                  <>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const event = new CustomEvent('tabChange', { detail: 'reports' });
                        window.dispatchEvent(event);
                      }}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Submit Site Report</p>
                          <p className="text-sm text-gray-500">Upload daily/weekly report</p>
                        </div>
                      </div>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const event = new CustomEvent('tabChange', { detail: 'schedule' });
                        window.dispatchEvent(event);
                      }}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Schedule Site Visit</p>
                          <p className="text-sm text-gray-500">Plan next visit</p>
                        </div>
                      </div>
                    </motion.button>
                  </>
                )}
                {userRole === 'admin' && (
                  <>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const event = new CustomEvent('tabChange', { detail: 'supervisors' });
                        window.dispatchEvent(event);
                      }}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Assign Supervisor</p>
                          <p className="text-sm text-gray-500">Assign to new project</p>
                        </div>
                      </div>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const event = new CustomEvent('tabChange', { detail: 'analytics' });
                        window.dispatchEvent(event);
                      }}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <BarChart3 className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">View Analytics</p>
                          <p className="text-sm text-gray-500">Check platform metrics</p>
                        </div>
                      </div>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
