'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Camera, 
  Video, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Share2,
  Edit,
  Trash2,
  User,
  Building2,
  Cloud,
  Sun,
  CloudRain,
  FileText
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const reportId = params.id;

  // Mock data - in real app, this would be fetched based on reportId
  const mockReport = {
    id: reportId,
    projectName: 'Luxury Villa Alpha',
    supervisor: 'John Adebayo',
    supervisorEmail: 'john.adebayo@carebuild.com',
    supervisorPhone: '+234 801 234 5678',
    date: '2024-10-25',
    time: '14:30',
    type: 'daily',
    status: 'submitted',
    weather: 'Sunny',
    temperature: '32°C',
    humidity: '65%',
    windSpeed: '12 km/h',
    progress: 'Foundation work completed',
    progressPercentage: 85,
    images: [
      { url: '/su3.jpg', caption: 'Foundation concrete pouring', timestamp: '14:30' },
      { url: '/su4.jpg', caption: 'Steel reinforcement installation', timestamp: '15:45' },
      { url: '/su6.jpg', caption: 'Quality inspection in progress', timestamp: '16:20' }
    ],
    videos: [
      { url: '/su7.jpg', caption: 'Site walkthrough video', duration: '2:30', timestamp: '14:15' }
    ],
    notes: 'Excellent progress on foundation. All materials delivered on time. Quality inspection passed with flying colors. Weather conditions were perfect for concrete work.',
    client: 'Mrs. Sarah Johnson',
    clientEmail: 'sarah.johnson@email.com',
    clientPhone: '+234 802 345 6789',
    location: 'Victoria Island, Lagos',
    coordinates: '6.4281° N, 3.4219° E',
    materialsUsed: [
      { name: 'Concrete Mix', quantity: '50 bags', supplier: 'Dangote Cement' },
      { name: 'Steel Reinforcement', quantity: '2 tons', supplier: 'African Steel' },
      { name: 'Formwork', quantity: '100 sqm', supplier: 'Local Supplier' }
    ],
    workersPresent: [
      { name: 'Adebola Ojo', role: 'Foreman', hours: 8 },
      { name: 'Chinedu Nwosu', role: 'Concrete Specialist', hours: 8 },
      { name: 'Fatima Ibrahim', role: 'Quality Inspector', hours: 6 }
    ],
    issues: [
      { 
        type: 'Minor', 
        description: 'Small delay in material delivery', 
        resolved: true, 
        resolution: 'Materials arrived 30 minutes late but work continued as planned' 
      }
    ],
    nextSteps: [
      'Complete foundation curing process',
      'Begin structural framework installation',
      'Schedule next inspection for next week'
    ],
    attachments: [
      { name: 'Site Report.pdf', size: '2.3 MB', type: 'PDF' },
      { name: 'Quality Checklist.xlsx', size: '1.1 MB', type: 'Excel' },
      { name: 'Weather Data.csv', size: '0.5 MB', type: 'CSV' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{mockReport.projectName}</h1>
                <p className="text-sm text-gray-500">Site Report #{mockReport.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </motion.button>
              {user?.role === 'supervisor' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-5 h-5 text-gray-600" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{mockReport.projectName}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(mockReport.date).toLocaleDateString()} at {mockReport.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{mockReport.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 border ${getStatusColor(mockReport.status)}`}>
                    {getStatusIcon(mockReport.status)}
                    <span className="capitalize">{mockReport.status}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Weather & Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getWeatherIcon(mockReport.weather)}
                  <span className="ml-2">Weather & Site Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockReport.weather}</div>
                    <div className="text-sm text-gray-600">Condition</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockReport.temperature}</div>
                    <div className="text-sm text-gray-600">Temperature</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockReport.humidity}</div>
                    <div className="text-sm text-gray-600">Humidity</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockReport.windSpeed}</div>
                    <div className="text-sm text-gray-600">Wind Speed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Update */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Update</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Overall Progress</span>
                    <span>{mockReport.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${mockReport.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-gray-700">{mockReport.progress}</p>
              </CardContent>
            </Card>

            {/* Photos & Videos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Photos & Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Photos */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Photos ({mockReport.images.length})</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockReport.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group cursor-pointer"
                        >
                          <div className="relative h-48 rounded-lg overflow-hidden">
                            <Image
                              src={image.url}
                              alt={image.caption}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                              <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900">{image.caption}</p>
                            <p className="text-xs text-gray-500">{image.timestamp}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Videos */}
                  {mockReport.videos.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Videos ({mockReport.videos.length})</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mockReport.videos.map((video, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (index + mockReport.images.length) * 0.1 }}
                            className="relative group cursor-pointer"
                          >
                            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-900">
                              <Image
                                src={video.url}
                                alt={video.caption}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                  <Video className="w-8 h-8 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-900">{video.caption}</p>
                              <p className="text-xs text-gray-500">{video.timestamp}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Supervisor Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{mockReport.notes}</p>
              </CardContent>
            </Card>

            {/* Materials Used */}
            <Card>
              <CardHeader>
                <CardTitle>Materials Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockReport.materialsUsed.map((material, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{material.name}</p>
                        <p className="text-sm text-gray-600">{material.supplier}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{material.quantity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workers Present */}
            <Card>
              <CardHeader>
                <CardTitle>Workers Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockReport.workersPresent.map((worker, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{worker.name}</p>
                          <p className="text-sm text-gray-600">{worker.role}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{worker.hours}h</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Issues & Resolutions */}
            {mockReport.issues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Issues & Resolutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReport.issues.map((issue, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            issue.type === 'Major' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {issue.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            issue.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {issue.resolved ? 'Resolved' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{issue.description}</p>
                        {issue.resolution && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <strong>Resolution:</strong> {issue.resolution}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockReport.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Project Name</label>
                  <p className="text-gray-900">{mockReport.projectName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Report Type</label>
                  <p className="text-gray-900 capitalize">{mockReport.type} Report</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-gray-900">{mockReport.location}</p>
                  <p className="text-xs text-gray-500">{mockReport.coordinates}</p>
                </div>
              </CardContent>
            </Card>

            {/* Supervisor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Supervisor Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{mockReport.supervisor}</p>
                    <p className="text-sm text-gray-600">{mockReport.supervisorEmail}</p>
                    <p className="text-sm text-gray-600">{mockReport.supervisorPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{mockReport.client}</p>
                    <p className="text-sm text-gray-600">{mockReport.clientEmail}</p>
                    <p className="text-sm text-gray-600">{mockReport.clientPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockReport.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-900">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Report
                </motion.button>
                {user?.role === 'admin' && mockReport.status === 'pending' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Report
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Reject Report
                    </motion.button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
