'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useRealtime } from '@/hooks/useRealtime';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
import ProjectsPage from './pages/ProjectsPage';
import AssignedSitesPage from './pages/AssignedSitesPage';
import ReportsPage from './pages/ReportsPage';
import PaymentsPage from './pages/PaymentsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SupervisorsPage from './pages/SupervisorsPage';
import SchedulePage from './pages/SchedulePage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import Footer from '@/components/Footer';
import { appToasts } from '@/lib/toast';
import RealtimeTest from '@/components/RealtimeTest';
import NotificationTest from '@/components/NotificationTest';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { isConnected } = useRealtime();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    // Listen for tab change events from child components
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('tabChange', handleTabChange as EventListener);
    
    return () => {
      window.removeEventListener('tabChange', handleTabChange as EventListener);
    };
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Dashboard Overview';
      case 'projects':
        return user.role === 'admin' ? 'All Projects' : 'My Projects';
      case 'assigned-sites':
        return 'Assigned Sites';
      case 'reports':
        return user.role === 'supervisor' ? 'Submit Reports' : 'Site Reports';
      case 'payments':
        return 'Payments';
      case 'analytics':
        return 'Analytics';
      case 'supervisors':
        return 'Supervisors';
      case 'schedule':
        return 'Schedule';
      case 'notifications':
        return 'Notifications';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    switch (activeTab) {
      case 'overview':
        return <Overview userRole={user.role} />;
      case 'projects':
        return <ProjectsPage userRole={user.role} />;
      case 'assigned-sites':
        return <AssignedSitesPage />;
      case 'reports':
        return <ReportsPage userRole={user.role} />;
      case 'payments':
        return <PaymentsPage userRole={user.role} />;
      case 'analytics':
        return <AnalyticsPage userRole={user.role} />;
      case 'supervisors':
        return <SupervisorsPage userRole={user.role} />;
      case 'schedule':
        return <SchedulePage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage userRole={user.role} />;
      case 'realtime-test':
        return <RealtimeTest />;
      case 'notification-test':
        return <NotificationTest />;
      default:
        return <Overview userRole={user.role} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Main Layout Container */}
      <div className="flex flex-1 h-full">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full">
          <Header
            title={getPageTitle()}
            onMenuToggle={() => {}}
            isMenuOpen={false}
            isRealtimeConnected={isConnected}
          />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 h-full">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
