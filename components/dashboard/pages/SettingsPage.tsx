'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Bell, 
  Shield,
  CreditCard,
  Globe,
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Upload,
  Trash2,
  Plus,
  Download,
  Camera,
  Image as ImageIcon,
  FileText,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Settings as SettingsIcon,
  Activity,
  Zap,
  Shield as ShieldIcon,
  Key,
  Smartphone,
  Building2,
  DollarSign,
  Copy,
  Monitor,
  Tablet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';
import { useAuth } from '@/hooks/useAuth';
import { appToasts } from '@/lib/toast';
import { supabase } from '@/lib/supabase';
import { StorageService } from '@/lib/storage';
import Image from 'next/image';

interface SettingsPageProps {
  userRole: 'client' | 'supervisor' | 'admin';
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  language: string;
  timezone: string;
}

export default function SettingsPage({ userRole }: SettingsPageProps) {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [userSessions, setUserSessions] = useState<any[]>([]);
  const [billingHistory, setBillingHistory] = useState<any[]>([]);
  const [notifications, setNotifications] = useState({
    siteReports: true,
    paymentUpdates: true,
    projectMilestones: true,
    systemAlerts: true,
    emailDigest: true,
    pushNotifications: true,
    smsAlerts: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'card', last4: '1234', expiry: '12/25', isDefault: true, brand: 'visa' },
    { id: 2, type: 'bank', last4: '5678', expiry: null, isDefault: false, brand: 'gtbank' }
  ]);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [preferences, setPreferences] = useState({
    compactView: false,
    showAnimations: true,
    analyticsTracking: true,
    marketingEmails: false,
    autoSave: true,
    notificationsSound: true,
    keyboardShortcuts: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      bio: '',
      language: 'en',
      timezone: 'WAT'
    }
  });

  const newPassword = watch('newPassword');

  // Real-time connection monitoring
  useEffect(() => {
    const checkConnection = () => {
      setIsRealtimeConnected(navigator.onLine);
    };

    checkConnection();
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  // Load user data and sessions
  useEffect(() => {
    loadUserData();
    loadUserSessions();
    loadBillingHistory();
  }, [user]);

  // Initialize preferences from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('carebuild-dark-mode') === 'true';
    const savedPreferences = localStorage.getItem('carebuild-preferences');
    const savedNotifications = localStorage.getItem('carebuild-notifications');
    
    if (savedDarkMode) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }

    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error parsing saved notifications:', error);
      }
    }
  }, []);

  // Auto-sync every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (preferences.autoSave) {
        syncSettings();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [preferences.autoSave]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (profileImage && profileImage.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Try to load from localStorage first
      const localImage = localStorage.getItem(`profile_image_${user.id}`);
      if (localImage) {
        setProfileImage(localImage);
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        // Only set profile image from database if we don't have a local one
        if (!localImage && data.avatar_url) {
          setProfileImage(data.avatar_url);
        }
        setNotifications(prev => ({ ...prev, ...data.notification_preferences }));
        setTwoFactorEnabled(data.two_factor_enabled || false);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadUserSessions = async () => {
    // Mock data for now - in real app, fetch from API
    setUserSessions([
      {
        id: 1,
        device: 'Windows PC',
        browser: 'Chrome 120.0',
        location: 'Lagos, Nigeria',
        ip: '197.149.90.123',
        lastActive: new Date(),
        isCurrent: true,
        icon: Monitor
      },
      {
        id: 2,
        device: 'iPhone 15 Pro',
        browser: 'Safari 17.0',
        location: 'Abuja, Nigeria',
        ip: '197.149.90.124',
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isCurrent: false,
        icon: Smartphone
      },
      {
        id: 3,
        device: 'iPad Air',
        browser: 'Safari 17.0',
        location: 'Port Harcourt, Nigeria',
        ip: '197.149.90.125',
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isCurrent: false,
        icon: Tablet
      }
    ]);
  };

  const loadBillingHistory = async () => {
    // Mock data for now - in real app, fetch from API
    setBillingHistory([
      {
        id: 1,
        date: '2024-10-25',
        amount: 220000,
        status: 'paid',
        invoice: 'INV-2024-001',
        plan: 'Premium',
        description: 'Monthly subscription'
      },
      {
        id: 2,
        date: '2024-09-25',
        amount: 220000,
        status: 'paid',
        invoice: 'INV-2024-002',
        plan: 'Premium',
        description: 'Monthly subscription'
      },
      {
        id: 3,
        date: '2024-08-25',
        amount: 150000,
        status: 'paid',
        invoice: 'INV-2024-003',
        plan: 'Essential',
        description: 'Monthly subscription'
      }
    ]);
  };

  const syncSettings = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          notification_preferences: notifications,
          preferences: preferences,
          two_factor_enabled: twoFactorEnabled,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        setLastSyncTime(new Date());
      }
    } catch (error) {
      console.error('Error syncing settings:', error);
    }
  };

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('carebuild-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Save dark mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('carebuild-dark-mode', darkMode.toString());
  }, [darkMode]);

  // File upload handler with retry mechanism and fallback to local storage
  const handleFileUpload = async (file: File, retryAttempt: number = 0) => {
    if (!file || !user) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    
    try {
      // Validate file
      if (!StorageService.validateFileSize(file, 2)) {
        appToasts.formError('File size must be less than 2MB');
        setIsUploading(false);
        return;
      }
      
      if (!StorageService.validateFileType(file, ['image/jpeg', 'image/png', 'image/gif', 'image/webp'])) {
        appToasts.formError('Please select a valid image file (JPG, PNG, GIF, or WebP)');
        setIsUploading(false);
        return;
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      let uploadResult;
      let uploadSuccess = false;

      // Try multiple upload methods
      try {
        // Method 1: Try StorageService first
        const uploadPromise = StorageService.uploadAvatar(user.id, file);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Upload timeout')), 30000)
        );
        
        uploadResult = await Promise.race([uploadPromise, timeoutPromise]) as any;
        uploadSuccess = true;
        console.log('StorageService upload successful');
      } catch (storageError) {
        console.warn('StorageService failed, trying direct Supabase upload:', storageError);
        
        try {
          // Method 2: Direct Supabase storage upload
          const fileExt = file.name.split('.').pop();
          const fileName = `avatar-${user.id}-${Date.now()}.${fileExt}`;
          
          const { data, error } = await supabase.storage
            .from('carebuild-files')
            .upload(`avatars/${fileName}`, file, {
              cacheControl: '3600',
              upsert: true
            });

          if (error) throw error;

          const { data: { publicUrl } } = supabase.storage
            .from('carebuild-files')
            .getPublicUrl(`avatars/${fileName}`);

          uploadResult = { url: publicUrl };
          uploadSuccess = true;
          console.log('Direct Supabase upload successful');
        } catch (directError) {
          console.warn('Direct Supabase upload failed, using local storage fallback:', directError);
          
          // Method 3: Fallback to local storage (temporary solution)
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            uploadResult = { url: dataUrl };
            uploadSuccess = true;
            console.log('Local storage fallback successful');
          };
          reader.readAsDataURL(file);
          
          // Wait for file reader to complete
          await new Promise((resolve) => {
            reader.onloadend = resolve;
          });
        }
      }
      
      if (!uploadSuccess || !uploadResult?.url) {
        throw new Error('All upload methods failed');
      }

      // Update profile in database (only if we have a real URL, not data URL)
      if (!uploadResult.url.startsWith('data:')) {
        try {
          const { error: updateError } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              avatar_url: uploadResult.url,
              updated_at: new Date().toISOString()
            });

          if (updateError) {
            console.error('Database update error:', updateError);
            // Don't throw error, continue with local storage
          }
        } catch (dbError) {
          console.warn('Database update failed, using local storage:', dbError);
        }

        // Update auth user metadata (only if we have a real URL)
        try {
          const { error: authError } = await supabase.auth.updateUser({
            data: {
              avatar_url: uploadResult.url
            }
          });

          if (authError) {
            console.warn('Auth metadata update failed:', authError);
          }
        } catch (authError) {
          console.warn('Auth update failed:', authError);
        }
      }

      // Store in localStorage as backup
      localStorage.setItem(`profile_image_${user.id}`, uploadResult.url);
      
      setProfileImage(uploadResult.url);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        appToasts.fileUploaded('Profile picture');
      }, 500);

    } catch (error: any) {
      console.error('Upload error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Unable to upload image. Please try a different image or check your connection.';
      let shouldRetry = false;
      
      if (error.message?.includes('JWT') || error.message?.includes('auth')) {
        errorMessage = 'Session expired. Please sign in again.';
      } else if (error.message?.includes('storage') || error.message?.includes('bucket')) {
        errorMessage = 'Storage service temporarily unavailable. Your image has been saved locally.';
        shouldRetry = retryAttempt < 1;
      } else if (error.message?.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
        shouldRetry = retryAttempt < 2;
      } else if (error.message?.includes('size')) {
        errorMessage = 'File too large. Please select a smaller image (max 2MB).';
      } else if (error.message?.includes('type')) {
        errorMessage = 'Invalid file type. Please select an image file (JPG, PNG, GIF, or WebP).';
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Upload timeout. Please try again.';
        shouldRetry = retryAttempt < 1;
      } else if (error.message?.includes('permission') || error.message?.includes('unauthorized')) {
        errorMessage = 'Permission denied. Please contact support if this continues.';
      }
      
      setUploadError(errorMessage);
      
      // Retry logic
      if (shouldRetry) {
        console.log(`Retrying upload (attempt ${retryAttempt + 1})`);
        setTimeout(() => {
          handleFileUpload(file, retryAttempt + 1);
        }, 1000 * (retryAttempt + 1)); // Exponential backoff
        return;
      }
      
      appToasts.formError(errorMessage);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Form submission handlers
  const onProfileSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: data.name,
          email: data.email,
          phone: data.phone,
          bio: data.bio,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Update auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          phone: data.phone,
          bio: data.bio
        }
      });

      if (authError) throw authError;

      appToasts.profileUpdated();
      setLastSyncTime(new Date());
    } catch (error: any) {
      console.error('Profile update error:', error);
      appToasts.profileUpdateError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: FormData) => {
    if (data.newPassword !== data.confirmPassword) {
      appToasts.formError('password confirmation');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) throw error;

      appToasts.saved();
      reset({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLastSyncTime(new Date());
    } catch (error: any) {
      console.error('Password update error:', error);
      appToasts.serverError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = async (key: string, value: boolean) => {
    const newNotifications = { ...notifications, [key]: value };
    setNotifications(newNotifications);
    
    // Save to localStorage immediately
    localStorage.setItem('carebuild-notifications', JSON.stringify(newNotifications));
    
    // Sync to database
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          notification_preferences: newNotifications,
          updated_at: new Date().toISOString()
        });
      appToasts.saved();
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  const handleTwoFactorToggle = async () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);
    
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          two_factor_enabled: newValue,
          updated_at: new Date().toISOString()
        });
      appToasts.saved();
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Error updating 2FA:', error);
      setTwoFactorEnabled(!newValue); // Revert on error
    }
  };

  const handleDarkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    
    // Apply dark mode to the document
    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('carebuild-dark-mode', newValue.toString());
    appToasts.saved();
  };

  const handlePreferenceChange = async (key: string, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    
    // Save to localStorage immediately
    localStorage.setItem('carebuild-preferences', JSON.stringify(newPreferences));
    
    // Sync to database
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          preferences: newPreferences,
          updated_at: new Date().toISOString()
        });
      appToasts.saved();
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const handleLanguageChange = (language: string) => {
    appToasts.saved();
  };

  const handleTimezoneChange = (timezone: string) => {
    appToasts.saved();
  };

  const resetPreferences = () => {
    setPreferences({
      compactView: false,
      showAnimations: true,
      analyticsTracking: true,
      marketingEmails: false
    });
    setDarkMode(false);
    document.documentElement.classList.remove('dark');
    appToasts.saved();
  };

  const exportPreferences = () => {
    const dataStr = JSON.stringify({
      preferences,
      darkMode,
      language: watch('language'),
      timezone: watch('timezone')
    }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carebuild-preferences.json';
    link.click();
    URL.revokeObjectURL(url);
    appToasts.copied('Settings');
  };

  const addPaymentMethod = () => {
    setShowAddPayment(true);
    appToasts.info('Payment method form opened');
  };

  const handleCardPayment = async (cardData: any) => {
    setIsLoading(true);
    try {
      // Simulate card payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new payment method to the list
      const newMethod = {
        id: Date.now(),
        type: 'card',
        last4: cardData.number.slice(-4),
        expiry: `${cardData.expiryMonth}/${cardData.expiryYear}`,
        isDefault: paymentMethods.length === 0,
        brand: cardData.brand || 'visa'
      };
      
      setPaymentMethods(prev => [...prev, newMethod]);
      setShowAddPayment(false);
      appToasts.saved('Payment method added successfully');
    } catch (error) {
      appToasts.error('Failed to add payment method');
    } finally {
      setIsLoading(false);
    }
  };

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    appToasts.deleted('Payment method');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  const renderProfileSettings = () => (
    <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            {...register('phone', {
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: 'Invalid phone number'
              }
            })}
            type="tel"
            placeholder="+234 801 234 5678"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input
            type="text"
            value={user?.role || ''}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          {...register('bio')}
          rows={4}
          placeholder="Tell us about yourself..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* Profile Picture Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Camera</span>
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF, or WebP. Max size 2MB.</p>
            
            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
              </div>
            )}
            
            {/* Upload Error */}
            {uploadError && !isUploading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-red-700">{uploadError}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setUploadError(null);
                      fileInputRef.current?.click();
                    }}
                    className="text-xs text-red-600 hover:text-red-800 font-medium underline"
                  >
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Upload Success Info */}
            {profileImage && !isUploading && !uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-sm text-green-700">
                    {profileImage.startsWith('data:') 
                      ? 'Image saved locally. Will sync to cloud when connection improves.'
                      : 'Profile picture updated successfully!'
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Create preview immediately
              const previewUrl = URL.createObjectURL(file);
              setProfileImage(previewUrl);
              handleFileUpload(file);
            }
          }}
          className="hidden"
        />
      </div>
    </form>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {/* Real-time Status */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isRealtimeConnected ? 'bg-green-100' : 'bg-red-100'}`}>
              {isRealtimeConnected ? (
                <Wifi className="w-5 h-5 text-green-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {isRealtimeConnected ? 'Real-time Sync Active' : 'Offline Mode'}
              </h4>
              <p className="text-sm text-gray-600">
                {isRealtimeConnected 
                  ? `Last synced: ${lastSyncTime.toLocaleTimeString()}`
                  : 'Changes will sync when connection is restored'
                }
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              syncSettings();
              setLastSyncTime(new Date());
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <span>Email Notifications</span>
        </h3>
        {[
          { key: 'siteReports', label: 'Site visit reports', description: 'Get notified when site reports are submitted', icon: FileText },
          { key: 'paymentUpdates', label: 'Payment updates', description: 'Receive notifications about payment status', icon: CreditCard },
          { key: 'projectMilestones', label: 'Project milestones', description: 'Get updates on project progress milestones', icon: Activity },
          { key: 'systemAlerts', label: 'System alerts', description: 'Important system notifications and updates', icon: AlertCircle },
          { key: 'emailDigest', label: 'Daily digest', description: 'Receive a daily summary of all activities', icon: Calendar }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </motion.div>
          );
        })}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-purple-600" />
          <span>Push Notifications</span>
        </h3>
        {[
          { key: 'pushNotifications', label: 'Mobile Push Notifications', description: 'Receive notifications on your mobile device', icon: Smartphone },
          { key: 'smsAlerts', label: 'SMS Alerts', description: 'Get critical alerts via SMS', icon: Phone }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 5) * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 group-hover:bg-purple-100 rounded-lg transition-colors">
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.label}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onPasswordSubmit)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password *</label>
            <div className="relative">
              <input
                {...register('currentPassword', { required: 'Current password is required' })}
                type={showCurrentPassword ? 'text' : 'password'}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password *</label>
            <div className="relative">
              <input
                {...register('newPassword', { 
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' }
                })}
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password *</label>
            <input
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === newPassword || 'Passwords do not match'
              })}
              type="password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">SMS Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={twoFactorEnabled}
                onChange={handleTwoFactorToggle}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <ShieldIcon className="w-5 h-5 text-green-600" />
          <span>Active Sessions</span>
        </h3>
        <div className="space-y-3">
          {userSessions.map((session, index) => {
            const Icon = session.icon;
            const timeAgo = session.isCurrent 
              ? 'Now' 
              : session.lastActive < new Date(Date.now() - 60 * 60 * 1000)
                ? `${Math.floor((Date.now() - session.lastActive.getTime()) / (60 * 60 * 1000))} hours ago`
                : `${Math.floor((Date.now() - session.lastActive.getTime()) / (60 * 1000))} minutes ago`;

            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{session.device}</h4>
                      <p className="text-sm text-gray-600">{session.browser} • {session.location}</p>
                      <p className="text-xs text-gray-500">IP: {session.ip} • Last active: {timeAgo}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.isCurrent ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setUserSessions(prev => prev.filter(s => s.id !== session.id));
                          appToasts.saved();
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Terminate
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-8">
      {/* Payment Methods Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <span>Payment Methods</span>
        </h3>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">**** **** **** {method.last4}</h4>
                    <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                    {method.isDefault && (
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-2 font-medium">
                        Default Payment Method
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => appToasts.info('Edit payment method')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addPaymentMethod}
            className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-blue-100"
          >
            <Plus className="w-6 h-6" />
            <span className="font-medium">Add New Payment Method</span>
          </motion.button>
        </div>
      </div>

      {/* Bank Transfer Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Building2 className="w-6 h-6 text-green-600" />
          <span>Bank Transfer Details</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Naira Account */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Naira Account</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-white/60 p-4 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Account Name</p>
                <p className="font-semibold text-gray-900 text-lg">Mindvest International Enterprises</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Account Number</p>
                <p className="font-semibold text-gray-900 text-lg">2006354855</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Bank</p>
                <p className="font-semibold text-gray-900 text-lg">Globus Bank</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText('2006354855');
                appToasts.copied('Account Number');
              }}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Account Number</span>
            </motion.button>
          </motion.div>

          {/* Dollar Account */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Dollar Account</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-white/60 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Account Name</p>
                <p className="font-semibold text-gray-900 text-lg">Mindvest International Enterprises</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Account Number</p>
                <p className="font-semibold text-gray-900 text-lg">5000133424</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Bank</p>
                <p className="font-semibold text-gray-900 text-lg">Globus Bank</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText('5000133424');
                appToasts.copied('Account Number');
              }}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Account Number</span>
            </motion.button>
          </motion.div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Important Instructions</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please include your project reference number in the transfer description</li>
                <li>• Send payment confirmation to billing@carebuild.com after transfer</li>
                <li>• Payments are processed within 24-48 hours of confirmation</li>
                <li>• Contact support if you need assistance with bank transfers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Premium Plan</h4>
              <p className="text-sm text-blue-700">₦220,000/month • Next billing: Nov 25, 2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => appToasts.info('Manage subscription')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Manage
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Billing History</span>
        </h3>
        <div className="space-y-3">
          {billingHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
                  <FileText className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p className="text-sm text-gray-600">{item.description} • {item.invoice}</p>
                  <p className="text-xs text-gray-500">{item.plan} Plan</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium text-gray-900">₦{item.amount.toLocaleString()}</p>
                  <p className={`text-sm flex items-center space-x-1 ${
                    item.status === 'paid' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <CheckCircle className="w-3 h-3" />
                    <span className="capitalize">{item.status}</span>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Simulate invoice download
                    const link = document.createElement('a');
                    link.href = `#invoice-${item.invoice}`;
                    link.download = `${item.invoice}.pdf`;
                    link.click();
                    appToasts.fileUploaded('Invoice');
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <form onSubmit={handleSubmit((data) => {
      appToasts.saved();
      console.log('Preferences data:', data);
    })} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select 
              {...register('language')}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select 
              {...register('timezone')}
              onChange={(e) => handleTimezoneChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="WAT">West Africa Time (WAT)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
              <option value="EST">Eastern Time (ET)</option>
              <option value="PST">Pacific Time (PT)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Dark Mode</h4>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={handleDarkModeToggle}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Compact View</h4>
              <p className="text-sm text-gray-600">Use smaller spacing and fonts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.compactView}
                onChange={(e) => handlePreferenceChange('compactView', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Show Animations</h4>
              <p className="text-sm text-gray-600">Enable smooth transitions and animations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.showAnimations}
                onChange={(e) => handlePreferenceChange('showAnimations', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Analytics Tracking</h4>
              <p className="text-sm text-gray-600">Help us improve by sharing usage data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.analyticsTracking}
                onChange={(e) => handlePreferenceChange('analyticsTracking', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Marketing Emails</h4>
              <p className="text-sm text-gray-600">Receive updates about new features and offers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.marketingEmails}
                onChange={(e) => handlePreferenceChange('marketingEmails', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetPreferences}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Reset to Default</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportPreferences}
              className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Settings</span>
            </motion.button>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Check className="w-4 h-4 mr-1" />
            <span>Settings auto-saved</span>
          </div>
        </div>
      </div>
    </form>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'billing': return renderBillingSettings();
      case 'preferences': return renderPreferencesSettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className={`space-y-6 ${preferences.compactView ? 'text-sm' : ''}`}>
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage={userRole === 'admin' ? 'System Settings' : 'Account Settings'} 
        userRole={userRole}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'admin' ? 'System Settings' : 'Account Settings'}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'admin' 
              ? 'Manage system-wide settings and configurations' 
              : 'Manage your account settings and preferences'
            }
          </p>
        </div>
        
        {/* Real-time Status Indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full ${isRealtimeConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span>{isRealtimeConnected ? 'Live Sync' : 'Offline'}</span>
          </div>
          <div className="text-xs text-gray-500">
            Last sync: {lastSyncTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card className={preferences.compactView ? 'p-4' : ''}>
            <CardHeader className={preferences.compactView ? 'pb-4' : ''}>
              <CardTitle className={`flex items-center space-x-2 ${preferences.compactView ? 'text-lg' : ''}`}>
                {tabs.find(tab => tab.id === activeTab)?.icon && (
                  React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, { className: "w-5 h-5 text-blue-600" })
                )}
                <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className={preferences.compactView ? 'pt-0' : ''}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
              
              <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (activeTab === 'profile') {
                      handleSubmit(onProfileSubmit)();
                    } else if (activeTab === 'preferences') {
                      handleSubmit((data) => {
                        appToasts.saved();
                        console.log('Preferences data:', data);
                      })();
                    } else {
                      appToasts.saved();
                    }
                  }}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Method Modal */}
      <AnimatePresence>
        {showAddPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add Payment Method</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddPayment(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const cardData = {
                  number: formData.get('cardNumber') as string,
                  expiryMonth: formData.get('expiryMonth') as string,
                  expiryYear: formData.get('expiryYear') as string,
                  cvv: formData.get('cvv') as string,
                  name: formData.get('cardName') as string,
                  brand: 'visa' // You can detect this based on card number
                };
                handleCardPayment(cardData);
              }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Month</label>
                    <select
                      name="expiryMonth"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Year</label>
                    <select
                      name="expiryYear"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={new Date().getFullYear() + i}>
                          {new Date().getFullYear() + i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="defaultCard"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="defaultCard" className="text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddPayment(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Add Card</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
