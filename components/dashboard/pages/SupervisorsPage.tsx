'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Navigation,
  BarChart3,
  Clock,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';
import Image from 'next/image';

interface SupervisorsPageProps {
  userRole: 'client' | 'supervisor' | 'admin';
}

export default function SupervisorsPage({ userRole }: SupervisorsPageProps) {
  const mockSupervisors = [
    {
      id: 1,
      name: 'John Adebayo',
      email: 'john.adebayo@carebuild.com',
      phone: '+234 801 234 5678',
      location: 'Lagos, Nigeria',
      rating: 4.8,
      projects: 3,
      status: 'active',
      joinDate: '2023-01-15',
      avatar: '/su5.jpg',
      specialties: ['Residential', 'Commercial'],
      experience: '5 years'
    },
    {
      id: 2,
      name: 'Mary Okonkwo',
      email: 'mary.okonkwo@carebuild.com',
      phone: '+234 802 345 6789',
      location: 'Abuja, Nigeria',
      rating: 4.9,
      projects: 2,
      status: 'active',
      joinDate: '2023-03-20',
      avatar: '/su5.jpg',
      specialties: ['Commercial', 'Industrial'],
      experience: '7 years'
    },
    {
      id: 3,
      name: 'David Okafor',
      email: 'david.okafor@carebuild.com',
      phone: '+234 803 456 7890',
      location: 'Port Harcourt, Nigeria',
      rating: 4.7,
      projects: 4,
      status: 'active',
      joinDate: '2022-11-10',
      avatar: '/su5.jpg',
      specialties: ['Residential', 'Infrastructure'],
      experience: '6 years'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (userRole !== 'admin') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center py-8 sm:py-12">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-sm sm:text-base text-gray-600">Only administrators can view supervisor management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage="Supervisor Management" 
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Supervisor Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage supervisors, assignments, and performance</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Add Supervisor</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
        {[
          { title: 'Total Supervisors', value: mockSupervisors.length, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { title: 'Active', value: mockSupervisors.filter(s => s.status === 'active').length, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
          { title: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
          { title: 'Total Projects', value: mockSupervisors.reduce((sum, s) => sum + s.projects, 0), icon: MapPin, color: 'text-purple-600', bgColor: 'bg-purple-50' },
          { title: 'Geolocation Active', value: '12', icon: Navigation, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
          { title: 'Performance Score', value: '92%', icon: Target, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
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
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Supervisors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {mockSupervisors.map((supervisor, index) => (
          <motion.div
            key={supervisor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={supervisor.avatar}
                      alt={supervisor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{supervisor.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(supervisor.status)} flex-shrink-0 ml-2`}>
                        {supervisor.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mb-1 sm:mb-2">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{supervisor.rating}</span>
                      <span className="text-xs sm:text-sm text-gray-600">({supervisor.experience})</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="truncate">{supervisor.location}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="truncate">{supervisor.email}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="truncate">{supervisor.phone}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>Joined: {new Date(supervisor.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {supervisor.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-gray-900">{supervisor.projects}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Active Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-gray-900">{supervisor.rating}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Geolocation & Performance */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Location</div>
                      <div className="text-xs text-gray-600">Lagos, Nigeria</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Performance</div>
                      <div className="text-xs text-gray-600">92% Score</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Assign Project
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
