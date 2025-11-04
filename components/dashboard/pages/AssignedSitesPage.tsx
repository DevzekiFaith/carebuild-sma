'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MoreVertical,
  TrendingUp,
  Users,
  Star,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';
import Image from 'next/image';

export default function AssignedSitesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedSite, setSelectedSite] = useState(null);

  const mockSites = [
    {
      id: 1,
      name: 'Luxury Villa Alpha',
      location: 'Victoria Island, Lagos',
      status: 'active',
      lastVisit: '2024-10-25',
      nextVisit: '2024-10-27',
      progress: 65,
      client: 'Mrs. Sarah Johnson',
      image: '/su3.jpg',
      reports: 12,
      issues: 0,
      budget: 25000000,
      spent: 16250000,
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      priority: 'high',
      completionDate: '2024-12-15',
      weather: 'sunny',
      temperature: '32°C'
    },
    {
      id: 2,
      name: 'Commercial Complex Beta',
      location: 'Ikoyi, Lagos',
      status: 'active',
      lastVisit: '2024-10-24',
      nextVisit: '2024-10-26',
      progress: 25,
      client: 'ABC Properties Ltd',
      image: '/su4.jpg',
      reports: 8,
      issues: 1,
      budget: 50000000,
      spent: 12500000,
      team: ['Sarah Wilson', 'David Brown'],
      priority: 'medium',
      completionDate: '2025-06-30',
      weather: 'cloudy',
      temperature: '28°C'
    },
    {
      id: 3,
      name: 'Residential Estate Gamma',
      location: 'Lekki, Lagos',
      status: 'completed',
      lastVisit: '2024-01-30',
      nextVisit: null,
      progress: 100,
      client: 'Greenfield Developers',
      image: '/su6.jpg',
      reports: 24,
      issues: 0,
      budget: 15000000,
      spent: 15000000,
      team: ['Alex Green', 'Lisa White'],
      priority: 'low',
      completionDate: '2024-01-30',
      weather: 'sunny',
      temperature: '30°C'
    },
    {
      id: 4,
      name: 'Office Tower Delta',
      location: 'Abuja, FCT',
      status: 'on-hold',
      lastVisit: '2024-10-20',
      nextVisit: '2024-11-01',
      progress: 40,
      client: 'Capital Builders',
      image: '/su7.jpg',
      reports: 15,
      issues: 3,
      budget: 75000000,
      spent: 30000000,
      team: ['Robert Lee', 'Emma Davis'],
      priority: 'high',
      completionDate: '2025-03-15',
      weather: 'rainy',
      temperature: '26°C'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      default: return '🌤️';
    }
  };

  const filteredSites = mockSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || site.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedSites = [...filteredSites].sort((a, b) => {
    switch (sortBy) {
      case 'progress': return b.progress - a.progress;
      case 'name': return a.name.localeCompare(b.name);
      case 'priority': return a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage="My Assigned Sites" 
      />

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 rounded-3xl mx-4 sm:mx-6 mb-8"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32" />
        
        <div className="relative p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                My Assigned Sites
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl"
              >
                Manage your construction sites with real-time monitoring, progress tracking, and comprehensive reporting tools.
              </motion.p>
              
              {/* Quick Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/90 font-medium">{mockSites.filter(s => s.status === 'active').length} Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  <span className="text-white/90 font-medium">{mockSites.filter(s => s.status === 'completed').length} Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <span className="text-white/90 font-medium">{mockSites.reduce((sum, s) => sum + s.issues, 0)} Issues</span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Report</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Quick Photo</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-4 sm:mx-6 mb-8"
      >
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sites, clients, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="progress">Sort by Progress</option>
                  <option value="name">Sort by Name</option>
                  <option value="priority">Sort by Priority</option>
                </select>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mx-4 sm:mx-6 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Total Sites', 
              value: mockSites.length, 
              icon: MapPin, 
              color: 'text-blue-600', 
              bgColor: 'bg-blue-50',
              change: '+2 this month',
              trend: 'up'
            },
            { 
              title: 'Active Projects', 
              value: mockSites.filter(s => s.status === 'active').length, 
              icon: CheckCircle, 
              color: 'text-green-600', 
              bgColor: 'bg-green-50',
              change: '3 in progress',
              trend: 'stable'
            },
            { 
              title: 'Reports Submitted', 
              value: mockSites.reduce((sum, s) => sum + s.reports, 0), 
              icon: FileText, 
              color: 'text-purple-600', 
              bgColor: 'bg-purple-50',
              change: '+12 this week',
              trend: 'up'
            },
            { 
              title: 'Pending Issues', 
              value: mockSites.reduce((sum, s) => sum + s.issues, 0), 
              icon: AlertCircle, 
              color: 'text-red-600', 
              bgColor: 'bg-red-50',
              change: '2 need attention',
              trend: 'down'
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{stat.change}</span>
                      <div className={`flex items-center space-x-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Sites Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mx-4 sm:mx-6"
      >
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {sortedSites.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm">
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={site.image}
                        alt={site.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Status and Priority Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(site.status)}`}>
                          {site.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(site.priority)}`}>
                          {site.priority} priority
                        </span>
                      </div>

                      {/* Weather Info */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getWeatherIcon(site.weather)}</span>
                          <span className="text-sm font-medium text-gray-700">{site.temperature}</span>
                        </div>
                      </div>

                      {/* Progress Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between text-white text-sm mb-2">
                          <span>Progress</span>
                          <span className="font-semibold">{site.progress}%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${site.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      {/* Site Info */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {site.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{site.location}</span>
                        </div>
                        <p className="text-sm text-gray-600">Client: {site.client}</p>
                      </div>

                      {/* Budget Info */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Budget</span>
                          <span className="font-semibold">₦{(site.budget / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Spent</span>
                          <span className="font-semibold text-purple-600">₦{(site.spent / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(site.spent / site.budget) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Team and Stats */}
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            <span>Team ({site.team.length})</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FileText className="w-4 h-4 mr-2" />
                            <span>{site.reports} reports</span>
                          </div>
                        </div>
                        
                        {site.issues > 0 && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            <span>{site.issues} issues need attention</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Report</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {sortedSites.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        {/* Site Image */}
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={site.image}
                            alt={site.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Site Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {site.name}
                              </h3>
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{site.location}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(site.status)}`}>
                                {site.status}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(site.priority)}`}>
                                {site.priority}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Client:</span> {site.client}
                            </div>
                            <div>
                              <span className="font-medium">Progress:</span> {site.progress}%
                            </div>
                            <div>
                              <span className="font-medium">Reports:</span> {site.reports}
                            </div>
                            <div>
                              <span className="font-medium">Team:</span> {site.team.length} members
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${site.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300"
                          >
                            Report
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all duration-300"
                          >
                            View
                          </motion.button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {sortedSites.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No sites found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Clear Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
