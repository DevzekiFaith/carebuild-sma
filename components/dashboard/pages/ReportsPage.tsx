'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Upload, 
  Calendar, 
  MapPin, 
  Camera,
  Video,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';
import Image from 'next/image';
import { useRealtimeReports } from '@/hooks/useRealtime';

interface ReportsPageProps {
  userRole: 'client' | 'supervisor' | 'admin';
}

export default function ReportsPage({ userRole }: ReportsPageProps) {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();
  const { reports: realtimeReports } = useRealtimeReports();

  const mockReports = [
    {
      id: 1,
      projectName: 'Luxury Villa Alpha',
      supervisor: 'John Adebayo',
      date: '2024-10-25',
      type: 'daily',
      status: 'submitted',
      weather: 'Sunny',
      progress: 'Foundation work completed',
      images: ['/su3.jpg', '/su4.jpg'],
      notes: 'Excellent progress on foundation. All materials delivered on time.',
      client: 'Mrs. Sarah Johnson'
    },
    {
      id: 2,
      projectName: 'Commercial Complex Beta',
      supervisor: 'Mary Okonkwo',
      date: '2024-10-24',
      type: 'weekly',
      status: 'pending',
      weather: 'Cloudy',
      progress: 'Site preparation ongoing',
      images: ['/su6.jpg'],
      notes: 'Site clearing completed. Awaiting approval for next phase.',
      client: 'ABC Properties Ltd'
    },
    {
      id: 3,
      projectName: 'Residential Estate Gamma',
      supervisor: 'David Okafor',
      date: '2024-10-23',
      type: 'daily',
      status: 'approved',
      weather: 'Rainy',
      progress: 'Roofing work in progress',
      images: ['/su7.jpg', '/su8.jpg'],
      notes: 'Roofing materials quality approved. Work proceeding as scheduled.',
      client: 'Greenfield Developers'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Reports' },
    { id: 'daily', label: 'Daily Reports' },
    { id: 'weekly', label: 'Weekly Reports' },
    { id: 'pending', label: 'Pending Review' }
  ];

  const filteredReports = mockReports.filter(report => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return report.status === 'pending';
    return report.type === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage={userRole === 'supervisor' ? 'Submit Reports' : 'Site Reports'} 
        userRole={userRole}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'supervisor' ? 'Submit Reports' : 'Site Reports'}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'supervisor' 
              ? 'Submit daily and weekly site reports with photos and updates' 
              : 'View and manage all site reports and updates'
            }
          </p>
        </div>
        {userRole === 'supervisor' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Open report submission modal or navigate to form
              alert('Opening report submission form...');
              // You could implement a modal or navigate to a form page
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Submit Report</span>
          </motion.button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Reports', value: mockReports.length, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { title: 'Pending Review', value: mockReports.filter(r => r.status === 'pending').length, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
          { title: 'Approved', value: mockReports.filter(r => r.status === 'approved').length, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
          { title: 'This Week', value: '12', icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-50' },
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
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300"
              onClick={() => router.push(`/reports/${report.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{report.projectName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                        <span className="capitalize">{report.status}</span>
                      </span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{report.weather}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="capitalize">{report.type} report</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>Supervisor: {report.supervisor}</p>
                    {userRole === 'admin' && <p>Client: {report.client}</p>}
                  </div>
                </div>

                {/* Progress Update */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Progress Update</h4>
                  <p className="text-gray-700">{report.progress}</p>
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-700">{report.notes}</p>
                </div>

                {/* Images */}
                {report.images.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Camera className="w-4 h-4 mr-2" />
                      Photos ({report.images.length})
                    </h4>
                    <div className="flex space-x-2">
                      {report.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Report photo ${imgIndex + 1}`}
                            fill
                            className="object-cover cursor-pointer hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/reports/${report.id}`);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Full Report</span>
                  </motion.button>
                  {userRole === 'admin' && report.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Report approved!');
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Downloading report...');
                    }}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Download
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
