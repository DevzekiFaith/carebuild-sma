'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';
import Image from 'next/image';

interface ProjectsPageProps {
  userRole: 'client' | 'supervisor' | 'admin';
}

export default function ProjectsPage({ userRole }: ProjectsPageProps) {
  const mockProjects = [
    {
      id: 1,
      name: 'Luxury Villa Alpha',
      location: 'Victoria Island, Lagos',
      status: 'active',
      progress: 65,
      budget: 15000000,
      spent: 9750000,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      supervisor: 'John Adebayo',
      client: 'Mrs. Sarah Johnson',
      image: '/su3.jpg'
    },
    {
      id: 2,
      name: 'Commercial Complex Beta',
      location: 'Ikoyi, Lagos',
      status: 'planning',
      progress: 25,
      budget: 25000000,
      spent: 6250000,
      startDate: '2024-03-01',
      endDate: '2024-12-15',
      supervisor: 'Mary Okonkwo',
      client: 'ABC Properties Ltd',
      image: '/su4.jpg'
    },
    {
      id: 3,
      name: 'Residential Estate Gamma',
      location: 'Lekki, Lagos',
      status: 'completed',
      progress: 100,
      budget: 8000000,
      spent: 8000000,
      startDate: '2023-08-01',
      endDate: '2024-01-30',
      supervisor: 'David Okafor',
      client: 'Greenfield Developers',
      image: '/su6.jpg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <TrendingUp className="w-4 h-4" />;
      case 'planning': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage={userRole === 'admin' ? 'All Projects' : 'My Projects'} 
        userRole={userRole}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'admin' ? 'All Projects' : 'My Projects'}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'admin' 
              ? 'Manage and oversee all construction projects' 
              : 'Track your construction projects and progress'
            }
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Add New Project
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Projects', value: mockProjects.length, icon: FolderOpen, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { title: 'Active Projects', value: mockProjects.filter(p => p.status === 'active').length, icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
          { title: 'Total Budget', value: '₦48M', icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
          { title: 'Completion Rate', value: '78%', icon: CheckCircle, color: 'text-purple-600', bgColor: 'bg-purple-50' },
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status}</span>
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Budget Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-semibold text-gray-900">₦{(project.budget / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Spent</p>
                      <p className="font-semibold text-gray-900">₦{(project.spent / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Supervisor: {project.supervisor}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Navigate to project details
                        const event = new CustomEvent('tabChange', { detail: 'reports' });
                        window.dispatchEvent(event);
                        // You could also open a modal or navigate to a detailed view
                        alert(`Viewing details for ${project.name}`);
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Navigate to reports for this project
                        const event = new CustomEvent('tabChange', { detail: 'reports' });
                        window.dispatchEvent(event);
                        alert(`Viewing reports for ${project.name}`);
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Reports
                    </motion.button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
