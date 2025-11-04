'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Play,
  Filter,
  Search,
  Navigation,
  Phone,
  Mail,
  User,
  Building2,
  Timer,
  Target,
  TrendingUp,
  Zap,
  Star,
  Shield,
  Camera,
  FileText,
  BarChart3,
  Activity,
  X,
  Sparkles,
  ArrowRight,
  CalendarDays,
  Users,
  MapPinIcon,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Settings,
  Bell,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Info,
  Grid3X3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { appToasts } from '@/lib/toast';
import { useRealtime } from '@/hooks/useRealtime';

interface ScheduleItem {
  id: string;
  project_name: string;
  location: string;
  visit_date: string;
  visit_time: string;
  duration: number;
  visit_type: 'site-visit' | 'meeting' | 'inspection' | 'delivery';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  client_name: string;
  client_phone?: string;
  client_email?: string;
  notes?: string;
  supervisor_id: string;
  project_id: string;
  created_at: string;
  updated_at: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  weather_condition?: string;
  equipment_needed?: string[];
  estimated_cost?: number;
  actual_cost?: number;
  photos?: string[];
  report_id?: string;
  is_recurring: boolean;
  recurrence_pattern?: 'daily' | 'weekly' | 'monthly';
  reminder_sent: boolean;
  check_in_time?: string;
  check_out_time?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export default function SchedulePage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'calendar' | 'timeline'>('list');
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'all'>('today');

  // Form data for add/edit modal
  const [formData, setFormData] = useState({
    project_name: '',
    client_name: '',
    client_phone: '',
    location: '',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '09:00',
    duration: 60,
    visit_type: 'site-visit' as 'site-visit' | 'meeting' | 'inspection' | 'delivery',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    notes: '',
    status: 'scheduled' as 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled'
  });

  // Load schedule data
  useEffect(() => {
    loadSchedule();
  }, [user]);

  const loadSchedule = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // For now, use mock data to prevent server errors
      // In production, this would connect to Supabase
      const mockData: ScheduleItem[] = [
        {
          id: '1',
          project_name: 'Luxury Villa Alpha',
          location: 'Victoria Island, Lagos',
          visit_date: new Date().toISOString().split('T')[0],
          visit_time: '09:00',
          duration: 120,
          visit_type: 'site-visit',
          status: 'scheduled',
          client_name: 'Mrs. Sarah Johnson',
          client_phone: '+234 801 234 5678',
          client_email: 'sarah.johnson@email.com',
          notes: 'Foundation inspection and progress review',
          supervisor_id: user.id,
          project_id: 'proj-1',
          priority: 'high',
          weather_condition: 'Sunny',
          equipment_needed: ['Camera', 'Measuring tape', 'Safety helmet'],
          estimated_cost: 50000,
          actual_cost: 0,
          photos: [],
          is_recurring: false,
          reminder_sent: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          project_name: 'Commercial Complex Beta',
          location: 'Ikoyi, Lagos',
          visit_date: new Date().toISOString().split('T')[0], // Changed to today
          visit_time: '14:00',
          duration: 180,
          visit_type: 'inspection',
          status: 'completed', // Changed to completed
          client_name: 'ABC Properties Ltd',
          client_phone: '+234 802 345 6789',
          client_email: 'contact@abcproperties.com',
          notes: 'Material delivery verification and quality check',
          supervisor_id: user.id,
          project_id: 'proj-2',
          priority: 'medium',
          weather_condition: 'Partly cloudy',
          equipment_needed: ['Camera', 'Quality checklist'],
          estimated_cost: 75000,
          actual_cost: 0,
          photos: [],
          is_recurring: false,
          reminder_sent: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          project_name: 'Residential Estate Gamma',
          location: 'Lekki, Lagos',
          visit_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          visit_time: '10:00',
          duration: 60,
          visit_type: 'meeting',
          status: 'completed',
          client_name: 'Greenfield Developers',
          client_phone: '+234 803 456 7890',
          client_email: 'info@greenfield.com',
          notes: 'Project completion review meeting',
          supervisor_id: user.id,
          project_id: 'proj-3',
          priority: 'low',
          weather_condition: 'Clear',
          equipment_needed: ['Notebook', 'Pen'],
          estimated_cost: 25000,
          actual_cost: 25000,
          photos: [],
          is_recurring: false,
          reminder_sent: true,
          check_in_time: new Date(Date.now() - 86400000).toISOString(),
          check_out_time: new Date(Date.now() - 86400000 + 3600000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          project_name: 'Residential Block Gamma',
          location: 'Lekki Phase 1, Lagos',
          visit_date: new Date().toISOString().split('T')[0],
          visit_time: '11:30',
          duration: 90,
          visit_type: 'site-visit',
          status: 'in-progress',
          client_name: 'Mr. David Wilson',
          client_phone: '+234 804 567 8901',
          client_email: 'david.wilson@email.com',
          notes: 'Ongoing construction monitoring and safety inspection',
          supervisor_id: user.id,
          project_id: 'proj-4',
          priority: 'medium',
          weather_condition: 'Partly Cloudy',
          equipment_needed: ['Safety vest', 'Hard hat', 'Measuring tools'],
          estimated_cost: 35000,
          actual_cost: 0,
          photos: [],
          is_recurring: false,
          reminder_sent: true,
          check_in_time: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          project_name: 'Office Building Delta',
          location: 'Banana Island, Lagos',
          visit_date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
          visit_time: '16:00',
          duration: 120,
          visit_type: 'meeting',
          status: 'scheduled',
          client_name: 'Corporate Holdings Ltd',
          client_phone: '+234 805 678 9012',
          client_email: 'admin@corporateholdings.com',
          notes: 'Project kickoff meeting and timeline discussion',
          supervisor_id: user.id,
          project_id: 'proj-5',
          priority: 'high',
          weather_condition: 'Sunny',
          equipment_needed: ['Presentation materials', 'Laptop'],
          estimated_cost: 75000,
          actual_cost: 0,
          photos: [],
          is_recurring: false,
          reminder_sent: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      setSchedule(mockData);
    } catch (error) {
      console.error('Error loading schedule:', error);
      appToasts.serverError();
    } finally {
      setIsLoading(false);
    }
  };

  const createScheduleItem = async (itemData: Partial<ScheduleItem>) => {
    try {
      const newItem: ScheduleItem = {
        id: Date.now().toString(),
        project_name: itemData.project_name || 'New Project',
        location: itemData.location || 'Location TBD',
        visit_date: itemData.visit_date || new Date().toISOString().split('T')[0],
        visit_time: itemData.visit_time || '09:00',
        duration: itemData.duration || 60,
        visit_type: itemData.visit_type || 'site-visit',
        status: 'scheduled',
        client_name: itemData.client_name || 'Client TBD',
        client_phone: itemData.client_phone,
        client_email: itemData.client_email,
        notes: itemData.notes,
        supervisor_id: user?.id || '',
        project_id: itemData.project_id || 'proj-new',
        priority: itemData.priority || 'medium',
        weather_condition: itemData.weather_condition,
        equipment_needed: itemData.equipment_needed || [],
        estimated_cost: itemData.estimated_cost || 0,
        actual_cost: 0,
        photos: [],
        is_recurring: false,
        reminder_sent: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setSchedule(prev => [...prev, newItem]);
      appToasts.saved();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error creating schedule item:', error);
      appToasts.serverError();
    }
  };

  const updateScheduleItem = async (id: string, updates: Partial<ScheduleItem>) => {
    try {
      setSchedule(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updated_at: new Date().toISOString() }
          : item
      ));
      appToasts.saved();
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating schedule item:', error);
      appToasts.serverError();
    }
  };

  const deleteScheduleItem = async (id: string) => {
    try {
      setSchedule(prev => prev.filter(item => item.id !== id));
      appToasts.deleted('Schedule item');
    } catch (error) {
      console.error('Error deleting schedule item:', error);
      appToasts.serverError();
    }
  };

  const markAsCompleted = async (id: string) => {
    try {
      setSchedule(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              status: 'completed', 
              check_out_time: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          : item
      ));
      appToasts.saved();
    } catch (error) {
      console.error('Error marking as completed:', error);
      appToasts.serverError();
    }
  };

  const startVisit = async (id: string) => {
    try {
      setSchedule(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              status: 'in-progress', 
              check_in_time: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          : item
      ));
      appToasts.saved();
    } catch (error) {
      console.error('Error starting visit:', error);
      appToasts.serverError();
    }
  };

  const rescheduleVisit = async (id: string, newDate: string, newTime: string) => {
    try {
      setSchedule(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              visit_date: newDate, 
              visit_time: newTime, 
              status: 'rescheduled',
              updated_at: new Date().toISOString()
            }
          : item
      ));
      appToasts.saved();
    } catch (error) {
      console.error('Error rescheduling visit:', error);
      appToasts.serverError();
    }
  };

  // Handle form submission for add/edit modal
  const handleSubmitSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const scheduleData: Partial<ScheduleItem> = {
        ...formData,
        supervisor_id: user?.id || '',
        project_id: `project_${Date.now()}`, // Generate a temporary project ID
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_recurring: false,
        reminder_sent: false
      };

      if (editingItem) {
        await updateScheduleItem(editingItem.id, scheduleData);
        appToasts.saved();
      } else {
        await createScheduleItem(scheduleData);
        appToasts.saved();
      }

      // Reset form and close modal
      setFormData({
        project_name: '',
        client_name: '',
        client_phone: '',
        location: '',
        visit_date: new Date().toISOString().split('T')[0],
        visit_time: '09:00',
        duration: 60,
        visit_type: 'site-visit',
        priority: 'medium',
        notes: '',
        status: 'scheduled'
      });
      setShowAddModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving schedule:', error);
      appToasts.serverError();
    }
  };

  // Handle edit button click
  const handleEditClick = (item: ScheduleItem) => {
    setFormData({
      project_name: item.project_name,
      client_name: item.client_name,
      client_phone: item.client_phone || '',
      location: item.location,
      visit_date: item.visit_date,
      visit_time: item.visit_time,
      duration: item.duration,
      visit_type: item.visit_type,
      priority: item.priority,
      notes: item.notes || '',
      status: item.status
    });
    setEditingItem(item);
    setShowAddModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'site-visit': return 'bg-purple-100 text-purple-800';
      case 'meeting': return 'bg-orange-100 text-orange-800';
      case 'inspection': return 'bg-green-100 text-green-800';
      case 'delivery': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Play className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      case 'rescheduled': return <RefreshCw className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="w-3 h-3" />;
      case 'high': return <TrendingUp className="w-3 h-3" />;
      case 'medium': return <Target className="w-3 h-3" />;
      case 'low': return <Star className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  // Filter and search logic
  const filteredSchedule = schedule.filter(item => {
    const matchesSearch = item.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.visit_type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const todaySchedule = filteredSchedule.filter(item => item.visit_date === selectedDate);
  const upcomingSchedule = filteredSchedule.filter(item => item.visit_date > selectedDate);
  const pastSchedule = filteredSchedule.filter(item => item.visit_date < selectedDate);

  // Get schedule based on active tab
  const getDisplaySchedule = () => {
    switch (activeTab) {
      case 'today':
        return todaySchedule;
      case 'upcoming':
        return upcomingSchedule;
      case 'all':
        return filteredSchedule;
      default:
        return filteredSchedule;
    }
  };

  const displaySchedule = getDisplaySchedule();

  const getStats = () => {
    const total = filteredSchedule.length;
    const today = todaySchedule.length;
    const completed = filteredSchedule.filter(s => s.status === 'completed').length;
    const inProgress = filteredSchedule.filter(s => s.status === 'in-progress').length;
    const pending = filteredSchedule.filter(s => s.status === 'scheduled').length;
    const overdue = filteredSchedule.filter(s => 
      s.status === 'scheduled' && 
      new Date(s.visit_date) < new Date() && 
      s.visit_date !== selectedDate
    ).length;

    return { total, today, completed, inProgress, pending, overdue };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage="Visit Schedule" 
        userRole={user?.role}
      />

      {/* Modern Header - Mobile Responsive */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4B0082] via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0">
              <div className="text-white">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Visit Schedule
                      </h1>
                      <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                    Streamline your construction site management with intelligent scheduling and real-time tracking.
                  </p>
                  
                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-xl">
                          <Calendar className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{schedule.length}</div>
                          <div className="text-sm text-white/70">Total Visits</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-xl">
                          <CheckCircle className="w-6 h-6 text-green-300" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{schedule.filter(item => item.status === 'completed').length}</div>
                          <div className="text-sm text-white/70">Completed</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500/20 rounded-xl">
                          <Clock className="w-6 h-6 text-orange-300" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{schedule.filter(item => item.status === 'scheduled').length}</div>
                          <div className="text-sm text-white/70">Scheduled</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
        
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Plus className="w-6 h-6" />
                    <span className="text-lg">Schedule Visit</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="group px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Filter className="w-6 h-6" />
                    <span className="text-lg">Filters</span>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Stats Dashboard - Mobile Responsive */}
      <div className="px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4"
          >
            {/* Today's Visits - Featured Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group sm:col-span-2 lg:col-span-1"
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full translate-y-6 sm:translate-y-8 -translate-x-6 sm:-translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">{stats.today}</div>
                      <div className="text-blue-100 text-xs sm:text-sm font-medium">+2 from yesterday</div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm sm:text-base lg:text-lg">Today's Visits</div>
                  <div className="mt-1 sm:mt-2 flex items-center text-blue-100 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full animate-pulse mr-1 sm:mr-2"></div>
                    <span>Live updates</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* In Progress - Active Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stats.inProgress}</div>
                      <div className="text-amber-100 text-xs sm:text-sm font-medium">Active visits</div>
      </div>
                  </div>
                  <div className="text-white font-semibold text-sm sm:text-base">In Progress</div>
                  <div className="mt-1 sm:mt-2 flex items-center text-amber-100 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse mr-1 sm:mr-2"></div>
                    <span>Ongoing</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Completed - Success Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stats.completed}</div>
                      <div className="text-emerald-100 text-xs sm:text-sm font-medium">This month</div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm sm:text-base">Completed</div>
                  <div className="mt-1 sm:mt-2 flex items-center text-emerald-100 text-xs sm:text-sm">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>Success rate</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pending - Warning Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stats.pending}</div>
                      <div className="text-orange-100 text-xs sm:text-sm font-medium">Scheduled</div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm sm:text-base">Pending</div>
                  <div className="mt-1 sm:mt-2 flex items-center text-orange-100 text-xs sm:text-sm">
                    <Timer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>Awaiting</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Overdue - Alert Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stats.overdue}</div>
                      <div className="text-red-100 text-xs sm:text-sm font-medium">Needs attention</div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm sm:text-base">Overdue</div>
                  <div className="mt-1 sm:mt-2 flex items-center text-red-100 text-xs sm:text-sm">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>Urgent</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Total Visits - Summary Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stats.total}</div>
                      <div className="text-purple-100 text-xs sm:text-sm font-medium">All time</div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm sm:text-base">Total Visits</div>
                  <div className="mt-1 sm:mt-2 flex items-center text-purple-100 text-xs sm:text-sm">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>Overview</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modern Search and Controls */}
      <div className="px-4 sm:px-6 mt-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="space-y-6">
              {/* Enhanced Search Bar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-500 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search visits, clients, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 text-base font-medium transition-all duration-300"
                  />
                </div>
              </div>

              {/* Enhanced Controls */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Tab Navigation */}
                <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-2 shadow-inner">
                  {[
                    { key: 'today', label: 'Today', icon: CalendarDays, color: 'from-blue-500 to-cyan-500' },
                    { key: 'upcoming', label: 'Upcoming', icon: Clock, color: 'from-orange-500 to-red-500' },
                    { key: 'all', label: 'All Visits', icon: BarChart3, color: 'from-purple-500 to-pink-500' }
                  ].map(({ key, label, icon: Icon, color }) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(key as any)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                        activeTab === key
                          ? `bg-gradient-to-r ${color} text-white shadow-lg`
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-2 shadow-inner">
                  {[
                    { mode: 'list', icon: BarChart3, label: 'List', color: 'from-blue-500 to-cyan-500' },
                    { mode: 'grid', icon: Grid3X3, label: 'Grid', color: 'from-green-500 to-emerald-500' },
                    { mode: 'calendar', icon: Calendar, label: 'Calendar', color: 'from-purple-500 to-pink-500' },
                    { mode: 'timeline', icon: Activity, label: 'Timeline', color: 'from-orange-500 to-red-500' }
                  ].map(({ mode, icon: Icon, label, color }) => (
                    <motion.button
                      key={mode}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode(mode as any)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                        viewMode === mode
                          ? `bg-gradient-to-r ${color} text-white shadow-lg`
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Enhanced Filter Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
                    showFilters 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                  }`}
                >
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    showFilters 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100' 
                      : 'bg-gradient-to-r from-gray-200 to-gray-300 opacity-0 group-hover:opacity-100'
                  }`}></div>
                  <div className="relative flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                    {showFilters && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082] bg-white/50 backdrop-blur-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rescheduled">Rescheduled</option>
                      </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Visit Type</label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082] bg-white/50 backdrop-blur-sm"
                      >
                        <option value="all">All Types</option>
                        <option value="site-visit">Site Visit</option>
                        <option value="meeting">Meeting</option>
                        <option value="inspection">Inspection</option>
                        <option value="delivery">Delivery</option>
                      </select>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Date Range</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082] bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
                    <div className="mt-4 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSearchTerm('');
                          setFilterStatus('all');
                          setFilterType('all');
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear Filters</span>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>
      </div>

      {/* Loading State - Mobile Responsive */}
      {isLoading && (
        <div className="px-4 sm:px-6 mt-6 sm:mt-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-20"
            >
              <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-[#4B0082]/20 border-t-[#4B0082] rounded-full mx-auto mb-4"
          />
                <p className="text-gray-600 text-lg">Loading your schedule...</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Modern Schedule Display - Mobile Responsive */}
      {!isLoading && (
        <div className="px-4 sm:px-6 mt-6 sm:mt-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Calendar View */}
              {viewMode === 'calendar' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-r from-[#4B0082] to-purple-600">
                    <div className="flex items-center space-x-3 text-white">
                      <Calendar className="w-6 h-6" />
                      <div>
                        <h3 className="text-xl font-bold">Calendar View</h3>
                        <p className="text-white/80">Visual schedule overview</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - date.getDay() + i);
                        const dateStr = date.toISOString().split('T')[0];
                        const dayVisits = schedule.filter(item => item.visit_date === dateStr);
                        const isToday = dateStr === new Date().toISOString().split('T')[0];
                        const isCurrentMonth = date.getMonth() === new Date().getMonth();
                        
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
                              isToday 
                                ? 'bg-[#4B0082]/10 border-[#4B0082] shadow-lg' 
                                : isCurrentMonth 
                                  ? 'bg-white border-gray-200 hover:border-[#4B0082]/50 hover:shadow-md' 
                                  : 'bg-gray-50 border-gray-100'
                            }`}
                          >
                            <div className={`text-sm font-medium ${
                              isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {date.getDate()}
                            </div>
                            {dayVisits.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {dayVisits.slice(0, 2).map(visit => (
                                  <div
                                    key={visit.id}
                                    className={`text-xs px-2 py-1 rounded-lg text-white truncate ${
                                      visit.priority === 'urgent' ? 'bg-red-500' :
                                      visit.priority === 'high' ? 'bg-orange-500' :
                                      visit.priority === 'medium' ? 'bg-blue-500' :
                                      'bg-green-500'
                                    }`}
                                  >
                                    {visit.visit_time} {visit.project_name}
                                  </div>
                                ))}
                                {dayVisits.length > 2 && (
                                  <div className="text-xs text-gray-500">
                                    +{dayVisits.length - 2} more
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                      </div>
                    </div>
                </motion.div>
              )}

              {/* Timeline View */}
              {viewMode === 'timeline' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500">
                    <div className="flex items-center space-x-3 text-white">
                      <Activity className="w-6 h-6" />
                      <div>
                        <h3 className="text-xl font-bold">Timeline View</h3>
                        <p className="text-white/80">Chronological schedule</p>
                    </div>
                    </div>
                  </div>
                  <div className="p-6">
                  <div className="space-y-4">
                      {displaySchedule
                        .sort((a, b) => new Date(a.visit_date + 'T' + a.visit_time).getTime() - new Date(b.visit_date + 'T' + b.visit_time).getTime())
                        .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                            className="group flex items-center space-x-4 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:border-[#4B0082]/30"
                          >
                            <div className="flex-shrink-0">
                              <div className={`w-4 h-4 rounded-full ${
                                item.priority === 'urgent' ? 'bg-red-500' :
                                item.priority === 'high' ? 'bg-orange-500' :
                                item.priority === 'medium' ? 'bg-blue-500' :
                                'bg-green-500'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-gray-900 truncate group-hover:text-[#4B0082] transition-colors">
                                {item.project_name}
                              </h4>
                                <span className="text-sm text-gray-500">
                                  {new Date(item.visit_date).toLocaleDateString()} at {item.visit_time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {item.location} • {item.client_name}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="space-y-8">
                  {/* Visit Cards Grid - Modern Glass Design */}
                  {displaySchedule.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {displaySchedule.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                          whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                          className="group relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                          }}
                        >
                          {/* Animated Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                          
                          {/* Status Indicator */}
                          <div className="absolute top-4 right-4 z-10">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${getStatusColor(item.status)}`}
                            >
                              <div className="flex items-center gap-1">
                                {getStatusIcon(item.status)}
                                <span className="capitalize">{item.status}</span>
                              </div>
                            </motion.div>
                          </div>

                          {/* Card Content */}
                          <div className="relative z-10 space-y-4">
                            {/* Header */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
                                {item.project_name}
                              </h3>
                              <p className="text-sm text-gray-600 font-medium">{item.client_name}</p>
                            </div>

                            {/* Priority and Type */}
                            <div className="flex flex-wrap gap-2">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${getPriorityColor(item.priority)}`}
                              >
                                <div className="flex items-center gap-1">
                                  {getPriorityIcon(item.priority)}
                                  <span className="capitalize">{item.priority}</span>
                                </div>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${getTypeColor(item.visit_type)}`}
                              >
                                <span className="capitalize">{item.visit_type.replace('-', ' ')}</span>
                              </motion.div>
                            </div>
                          </div>

                          {/* Details Section - Mobile Optimized */}
                          <div className="relative z-10 space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                            {/* Time Information */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-blue-100/50">
                              <div className="flex items-center">
                                <div className="p-1 sm:p-1.5 bg-blue-100 rounded-md sm:rounded-lg mr-2 sm:mr-3">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-bold text-gray-900">{item.visit_time}</div>
                                  <div className="text-xs text-gray-500">{item.duration} min</div>
                                </div>
                              </div>
                            </div>

                            {/* Date Information */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-green-100/50">
                              <div className="flex items-center">
                                <div className="p-1 sm:p-1.5 bg-green-100 rounded-md sm:rounded-lg mr-2 sm:mr-3">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-bold text-gray-900">{new Date(item.visit_date).toLocaleDateString()}</div>
                                  <div className="text-xs text-gray-500">Visit Date</div>
                                </div>
                              </div>
                            </div>

                            {/* Location Information */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-purple-100/50">
                              <div className="flex items-start">
                                <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md sm:rounded-lg mr-2 sm:mr-3 mt-0.5">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-gray-900 truncate">{item.location}</div>
                                  <div className="text-xs text-gray-500">Location</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Notes Section - Mobile Optimized */}
                          {item.notes && (
                            <motion.div 
                              whileHover={{ scale: 1.01 }}
                              className="relative z-10 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 p-2 sm:p-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4 border border-amber-100/50"
                            >
                              <div className="flex items-start">
                                <div className="p-1 sm:p-1.5 bg-amber-100 rounded-md sm:rounded-lg mr-2 sm:mr-3 mt-0.5">
                                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-amber-900 mb-1">Notes</div>
                                  <p className="text-xs text-amber-800 leading-relaxed line-clamp-2">{item.notes}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Action Buttons - Mobile Optimized */}
                          <div className="relative z-10 flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200/50">
                            <div className="flex space-x-1 sm:space-x-2">
                              {item.status === 'scheduled' && (
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => startVisit(item.id)}
                                  className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md sm:rounded-lg hover:shadow-lg transition-all duration-300 text-xs font-semibold"
                                >
                                  <Play className="w-3 h-3" />
                                  <span className="hidden xs:inline">Start</span>
                                </motion.button>
                              )}

                              {item.status === 'in-progress' && (
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => markAsCompleted(item.id)}
                                  className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md sm:rounded-lg hover:shadow-lg transition-all duration-300 text-xs font-semibold"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  <span className="hidden xs:inline">Complete</span>
                                </motion.button>
                              )}
                            </div>

                            <div className="flex space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEditClick(item)}
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-[#4B0082] hover:bg-[#4B0082]/10 rounded-md sm:rounded-lg transition-all duration-300"
                                title="Edit Visit"
                              >
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteScheduleItem(item.id)}
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md sm:rounded-lg transition-all duration-300"
                                title="Delete Visit"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Floating Action Indicator */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-2 h-2 bg-[#4B0082] rounded-full animate-pulse"></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-20"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-[#4B0082]/10 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-12 h-12 text-[#4B0082]" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">No visits found</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        {searchTerm || filterStatus !== 'all' || filterType !== 'all' 
                          ? 'Try adjusting your search or filters to find what you\'re looking for'
                          : 'Schedule your first visit to get started with managing your site visits'
                        }
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddModal(true)}
                        className="px-8 py-4 bg-gradient-to-r from-[#4B0082] to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <Plus className="w-5 h-5 inline mr-2" />
                        Schedule Visit
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Modern Visit Cards - List View */}
              {viewMode === 'list' && (
                <div className="space-y-6">
                  {/* Visit Cards Grid - Redesigned */}
                  {displaySchedule.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                      {displaySchedule.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -12, scale: 1.02 }}
                          className="group relative bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-[#4B0082]/40 overflow-hidden"
                        >
                          {/* Animated Background Elements */}
                          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#4B0082]/5 to-purple-100/30 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700"></div>
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/20 to-indigo-100/30 rounded-full translate-y-16 -translate-x-16 group-hover:scale-125 transition-transform duration-700"></div>
                          
                          {/* Status Indicator Bar */}
                          <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-3xl ${
                            item.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                            item.status === 'in-progress' ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                            item.status === 'scheduled' ? 'bg-gradient-to-r from-purple-400 to-indigo-500' :
                            'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}></div>

                          {/* Card Header - Mobile Optimized */}
                          <div className="relative z-10 mb-6 sm:mb-8">
                            <div className="flex items-start justify-between mb-4 sm:mb-6">
                              <div className="flex-1 min-w-0 pr-3 sm:pr-4">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#4B0082] transition-colors duration-300 mb-2 leading-tight">
                                  {item.project_name}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium">{item.client_name}</p>
                              </div>
                              <div className="flex-shrink-0">
                                <motion.div
                                  whileHover={{ rotate: 5, scale: 1.05 }}
                                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(item.status)} shadow-lg`}
                                >
                                  <div className="flex items-center">
                                    {getStatusIcon(item.status)}
                                    <span className="ml-1 sm:ml-2 capitalize">{item.status}</span>
                                  </div>
                                </motion.div>
                              </div>
                            </div>

                            {/* Priority and Type - Mobile Optimized */}
                            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border shadow-sm ${getPriorityColor(item.priority)}`}
                              >
                                <div className="flex items-center">
                                  {getPriorityIcon(item.priority)}
                                  <span className="ml-1 sm:ml-2 capitalize">{item.priority}</span>
                                </div>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${getTypeColor(item.visit_type)}`}
                              >
                                <span className="capitalize">{item.visit_type.replace('-', ' ')}</span>
                              </motion.div>
                            </div>
                          </div>

                          {/* Details Section - Redesigned with Better Spacing */}
                          <div className="relative z-10 space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                            {/* Time Information */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100/50">
                              <div className="flex items-center mb-3 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
                                  <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">Visit Time</h4>
                                  <p className="text-xs text-gray-600">Schedule details</p>
                                </div>
                              </div>
                              <div className="ml-12 sm:ml-16">
                                <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.visit_time}</div>
                                <div className="text-xs text-gray-500">Duration: {item.duration} minutes</div>
                              </div>
                            </div>

                            {/* Date Information */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-green-100/50">
                              <div className="flex items-center mb-3 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
                                  <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">Visit Date</h4>
                                  <p className="text-xs text-gray-600">Scheduled date</p>
                                </div>
                              </div>
                              <div className="ml-12 sm:ml-16">
                                <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">{new Date(item.visit_date).toLocaleDateString()}</div>
                                <div className="text-xs text-gray-500">Full day availability</div>
                              </div>
                            </div>

                            {/* Location Information */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-100/50">
                              <div className="flex items-start mb-3 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-purple-100 rounded-lg sm:rounded-xl mr-3 sm:mr-4 mt-1">
                                  <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                                </div>
                                <div>
                                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">Location</h4>
                                  <p className="text-xs text-gray-600">Site address</p>
                                </div>
                              </div>
                              <div className="ml-12 sm:ml-16">
                                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-2">{item.location}</div>
                                <div className="text-xs text-gray-500">Click to view on map</div>
                              </div>
                            </div>
                          </div>

                          {/* Notes Section - Redesigned */}
                          {item.notes && (
                            <motion.div 
                              whileHover={{ scale: 1.01 }}
                              className="relative z-10 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 p-6 rounded-2xl mb-8 border border-amber-100/50"
                            >
                              <div className="flex items-start mb-4">
                                <div className="p-3 bg-amber-100 rounded-xl mr-4 mt-1">
                                  <FileText className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                  <h4 className="text-base font-semibold text-amber-900">Notes</h4>
                                  <p className="text-xs text-amber-700">Additional information</p>
                                </div>
                              </div>
                              <div className="ml-16">
                                <p className="text-xs text-amber-800 leading-relaxed">{item.notes}</p>
                              </div>
                            </motion.div>
                          )}

                          {/* Action Buttons - Redesigned */}
                          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-gray-200/50">
                            <div className="flex space-x-3">
                              {item.status === 'scheduled' && (
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => startVisit(item.id)}
                                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                                >
                                  <Play className="w-5 h-5" />
                                  <span>Start Visit</span>
                                </motion.button>
                              )}

                              {item.status === 'in-progress' && (
                                <motion.button
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => markAsCompleted(item.id)}
                                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                  <span>Mark Complete</span>
                                </motion.button>
                              )}
                            </div>

                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEditClick(item)}
                                className="p-3 text-gray-400 hover:text-[#4B0082] hover:bg-[#4B0082]/10 rounded-xl transition-all duration-300"
                                title="Edit Visit"
                              >
                                <Edit className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteScheduleItem(item.id)}
                                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                                title="Delete Visit"
                              >
                                <Trash2 className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Floating Action Indicator */}
                          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-3 h-3 bg-[#4B0082] rounded-full animate-pulse"></div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                  ) : (
                    /* Empty State */
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-20"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-[#4B0082]/10 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-12 h-12 text-[#4B0082]" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">No visits found</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        {searchTerm || filterStatus !== 'all' || filterType !== 'all' 
                          ? 'Try adjusting your search or filters to find what you\'re looking for'
                          : 'Schedule your first visit to get started with managing your site visits'
                        }
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddModal(true)}
                        className="px-8 py-4 bg-gradient-to-r from-[#4B0082] to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <Plus className="w-5 h-5 inline mr-2" />
                        Schedule Visit
                      </motion.button>
            </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Modern Add/Edit Schedule Modal */}
      <AnimatePresence>
        {showAddModal && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-gray-200/50 bg-gradient-to-r from-[#4B0082] to-purple-600">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                      <div>
                      <h2 className="text-2xl font-bold text-white">
                        {editingItem ? 'Edit Visit' : 'Schedule New Visit'}
                      </h2>
                      <p className="text-white/80 text-sm">
                        {editingItem ? 'Update visit details' : 'Create a new site visit'}
                      </p>
                      </div>
                    </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingItem(null);
                    }}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                              </div>
                            </div>

              <div className="p-8">
                <form onSubmit={handleSubmitSchedule} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={formData.project_name}
                        onChange={(e) => setFormData({...formData, project_name: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                        placeholder="Enter project name"
                        required
                      />
                          </div>

                    {/* Client Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        value={formData.client_name}
                        onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                        placeholder="Enter client name"
                        required
                      />
                            </div>

                    {/* Client Phone */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Client Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.client_phone || ''}
                        onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                        placeholder="Enter phone number"
                      />
                            </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                        placeholder="Enter site location"
                        required
                      />
                            </div>

                    {/* Visit Date */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Visit Date *
                      </label>
                      <input
                        type="date"
                        value={formData.visit_date}
                        onChange={(e) => setFormData({...formData, visit_date: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900"
                        required
                      />
                          </div>

                    {/* Visit Time */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Visit Time *
                      </label>
                      <input
                        type="time"
                        value={formData.visit_time}
                        onChange={(e) => setFormData({...formData, visit_time: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900"
                        required
                      />
                            </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Duration (minutes) *
                      </label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                        placeholder="60"
                        min="15"
                        max="480"
                        required
                      />
                    </div>

                    {/* Visit Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Visit Type *
                      </label>
                      <select
                        value={formData.visit_type}
                        onChange={(e) => setFormData({...formData, visit_type: e.target.value as any})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900"
                        required
                      >
                        <option value="site-visit">Site Visit</option>
                        <option value="meeting">Meeting</option>
                        <option value="inspection">Inspection</option>
                        <option value="delivery">Delivery</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Priority *
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900"
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Notes
                      </label>
                      <textarea
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4B0082] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500"
                        placeholder="Additional notes or special instructions..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200/50">
                              <motion.button
                      type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowAddModal(false);
                        setEditingItem(null);
                      }}
                      className="px-8 py-4 border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                              </motion.button>
                              <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-[#4B0082] to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                              >
                      {editingItem ? 'Update Visit' : 'Schedule Visit'}
                              </motion.button>
                            </div>
                </form>
                        </div>
                      </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}
