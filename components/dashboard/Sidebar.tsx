'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  FolderOpen, 
  FileText, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut,
  Users,
  Calendar,
  Bell
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const clientMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: Home, section: 'main' },
  { id: 'projects', label: 'My Projects', icon: FolderOpen, section: 'main' },
  { id: 'reports', label: 'Site Reports', icon: FileText, section: 'main' },
  { id: 'payments', label: 'Payments & Billing', icon: CreditCard, section: 'main' },
  { id: 'analytics', label: 'Project Analytics', icon: BarChart3, section: 'main' },
  { id: 'notifications', label: 'Notifications', icon: Bell, section: 'secondary' },
  { id: 'settings', label: 'Account Settings', icon: Settings, section: 'secondary' },
];

const supervisorMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: Home, section: 'main' },
  { id: 'assigned-sites', label: 'My Sites', icon: FolderOpen, section: 'main' },
  { id: 'reports', label: 'Submit Reports', icon: FileText, section: 'main' },
  { id: 'schedule', label: 'Visit Schedule', icon: Calendar, section: 'main' },
  { id: 'analytics', label: 'Performance', icon: BarChart3, section: 'main' },
  { id: 'notifications', label: 'Notifications', icon: Bell, section: 'secondary' },
  { id: 'settings', label: 'Profile Settings', icon: Settings, section: 'secondary' },
];

const adminMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: Home, section: 'main' },
  { id: 'projects', label: 'All Projects', icon: FolderOpen, section: 'main' },
  { id: 'supervisors', label: 'Supervisors', icon: Users, section: 'main' },
  { id: 'reports', label: 'All Reports', icon: FileText, section: 'main' },
  { id: 'analytics', label: 'Platform Analytics', icon: BarChart3, section: 'main' },
  { id: 'payments', label: 'Payment Management', icon: CreditCard, section: 'main' },
  { id: 'settings', label: 'System Settings', icon: Settings, section: 'secondary' },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'supervisor':
        return supervisorMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return clientMenuItems;
    }
  };

  const menuItems = getMenuItems();
  const mainItems = menuItems.filter(item => item.section === 'main');
  const secondaryItems = menuItems.filter(item => item.section === 'secondary');

  const handleSignOut = async () => {
    console.log('Sign out button clicked');
    
    try {
      await signOut();
      console.log('Sign out successful');
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if signOut fails, redirect to home page
      window.location.href = '/';
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white shadow-xl border-r border-gray-100 h-full flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/su5.jpg"
              alt="CareBuild SMA Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CareBuild</h1>
            <p className="text-xs text-gray-500 font-medium">SMA Platform</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize font-medium bg-gray-100 px-2 py-1 rounded-full inline-block">{user?.role}</p>
            </div>
          </div>
          
          {/* Sign Out Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked directly');
              handleSignOut();
            }}
            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group cursor-pointer"
            title="Sign Out"
            type="button"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-700" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Main
          </h3>
          <ul className="space-y-1">
            {mainItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      'w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group',
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                    )}
                  >
                    <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700')} />
                    <span className="font-semibold">{item.label}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Secondary Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Account
          </h3>
          <ul className="space-y-1">
            {secondaryItems.length > 0 ? secondaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      'w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group',
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                    )}
                  >
                    <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700')} />
                    <span className="font-semibold">{item.label}</span>
                  </motion.button>
                </li>
              );
            }) : (
              <li className="text-gray-500 text-sm py-2">No account options available</li>
            )}
          </ul>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pt-2">
          <div className="w-1 h-6 bg-gradient-to-b from-gray-300 to-transparent rounded-full opacity-50"></div>
        </div>
      </nav>

    </motion.div>
  );
}
