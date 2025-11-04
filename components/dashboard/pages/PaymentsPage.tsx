'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Wallet,
  Eye,
  Download,
  Plus,
  Filter,
  Search,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import NavigationButtons from '../NavigationButtons';
import { useAuth } from '@/hooks/useAuth';
import { DatabaseService } from '@/lib/database';
import { appToasts } from '@/lib/toast';
import { useRealtimePayments } from '@/hooks/useRealtime';

interface PaymentsPageProps {
  userRole: 'client' | 'supervisor' | 'admin';
}

export default function PaymentsPage({ userRole }: PaymentsPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [payments, setPayments] = useState<any[]>([]);
  const [wallet, setWallet] = useState<any>(null);
  const { payments: realtimePayments } = useRealtimePayments();
  const [filters, setFilters] = useState({
    dateRange: 'all',
    amountRange: 'all',
    status: 'all'
  });

  // Load data on component mount
  useEffect(() => {
    if (user) {
      loadPayments();
      loadWallet();
    }
  }, [user]);

  // Use realtime payments when available
  useEffect(() => {
    if (realtimePayments && realtimePayments.length > 0) {
      setPayments(realtimePayments);
    }
  }, [realtimePayments]);

  const loadPayments = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await DatabaseService.getPayments(user.id, userRole);
      setPayments(data);
    } catch (error) {
      console.error('Error loading payments:', error);
      appToasts.serverError();
    } finally {
      setIsLoading(false);
    }
  };

  const loadWallet = async () => {
    if (!user || userRole !== 'client') return;
    
    try {
      const data = await DatabaseService.getWallet(user.id);
      setWallet(data);
    } catch (error) {
      console.error('Error loading wallet:', error);
    }
  };

  // Functional handlers
  const handleViewDetails = (paymentId: number) => {
    router.push(`/payments/${paymentId}`);
  };

  const handleMarkAsPaid = async (paymentId: string) => {
    setIsLoading(true);
    try {
      const success = await DatabaseService.updatePayment(paymentId, { 
        status: 'completed',
        updated_at: new Date().toISOString()
      });
      
      if (success) {
        appToasts.paymentSuccess(payment.amount);
        loadPayments(); // Reload payments
      } else {
        appToasts.serverError();
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      appToasts.serverError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReceipt = (payment: any) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = payment.invoiceUrl;
    link.download = `receipt-${payment.reference}.pdf`;
    link.click();
    appToasts.fileUploaded('Receipt');
  };

  const handleMakePayment = () => {
    // Navigate to payment gateway or open payment modal
    router.push('/payments/new');
  };

  const handleAddFunds = () => {
    router.push('/payments/wallet/add-funds');
  };

  const handleWithdraw = () => {
    router.push('/payments/wallet/withdraw');
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await loadPayments();
      await loadWallet();
      appToasts.dataRefreshed();
    } catch (error) {
      console.error('Error refreshing data:', error);
      appToasts.serverError();
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'subscription': return 'bg-blue-100 text-blue-800';
      case 'addon': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Payments' },
    { id: 'subscription', label: 'Subscriptions' },
    { id: 'addon', label: 'Add-ons' },
    { id: 'pending', label: 'Pending' }
  ];

  const filteredPayments = payments.filter(payment => {
    // Tab filtering
    if (activeTab !== 'all' && activeTab !== 'pending') {
      if (payment.type !== activeTab) return false;
    } else if (activeTab === 'pending') {
      if (payment.status !== 'pending') return false;
    }

    // Search filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (payment.project?.name || '').toLowerCase().includes(searchLower) ||
        payment.reference.toLowerCase().includes(searchLower) ||
        (payment.user?.name || '').toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filtering
    if (filters.status !== 'all' && payment.status !== filters.status) {
      return false;
    }

    // Amount range filtering
    if (filters.amountRange !== 'all') {
      switch (filters.amountRange) {
        case 'low':
          if (payment.amount >= 100000) return false;
          break;
        case 'medium':
          if (payment.amount < 100000 || payment.amount >= 300000) return false;
          break;
        case 'high':
          if (payment.amount < 300000) return false;
          break;
      }
    }

    return true;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <NavigationButtons 
        currentPage={userRole === 'admin' ? 'Payment Management' : 'Payments & Billing'} 
      />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'admin' ? 'Payment Management' : 'Payments & Billing'}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === 'admin' 
              ? 'Manage all payments, subscriptions, and billing across the platform' 
              : 'View your payment history and manage billing information'
            }
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {userRole === 'client' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMakePayment}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Make Payment</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isLoading}
            className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </motion.button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search payments by project, reference, client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-lg space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
              <select
                value={filters.amountRange}
                onChange={(e) => setFilters(prev => ({ ...prev, amountRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Amounts</option>
                <option value="low">Under ₦100K</option>
                <option value="medium">₦100K - ₦300K</option>
                <option value="high">Over ₦300K</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {[
          { title: 'Total Revenue', value: `₦${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
          { title: 'Pending Payments', value: `₦${(pendingAmount / 1000).toFixed(0)}K`, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
          { title: 'Completed', value: payments.filter(p => p.status === 'completed').length, icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { title: 'This Month', value: '₦1.2M', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' },
          { title: 'Active Subscriptions', value: '24', icon: CreditCard, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
          { title: 'Payment Tracking', value: '98%', icon: BarChart3, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
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

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{payment.project?.name || 'No Project'}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(payment.type)}`}>
                        {payment.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span className="capitalize">{payment.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(payment.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        <span>{payment.payment_method}</span>
                      </div>
                      <div className="flex items-center">
                        <span>Ref: {payment.reference}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ₦{parseFloat(payment.amount).toLocaleString()}
                    </div>
                    {userRole === 'admin' && (
                      <div className="text-sm text-gray-600">
                        <p>Client: {payment.user?.name || 'Unknown'}</p>
                        <p>Project: {payment.project?.name || 'No Project'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewDetails(payment.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.button>
                  {payment.status === 'pending' && userRole === 'admin' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMarkAsPaid(payment.id)}
                      disabled={isLoading}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark as Paid</span>
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownloadReceipt(payment)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Receipt</span>
                  </motion.button>
                  {payment.status === 'failed' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(`/payments/${payment.id}/retry`)}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Retry Payment</span>
                    </motion.button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Wallet Section for Clients */}
      {userRole === 'client' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-blue-600" />
                <span>CareBuild Wallet</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₦{wallet ? parseFloat(wallet.balance).toLocaleString() : '0'}
                  </div>
                  <div className="text-sm text-gray-600">Available Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₦{payments.filter(p => p.type === 'subscription' && p.status === 'completed').length > 0 
                      ? parseFloat(payments.filter(p => p.type === 'subscription' && p.status === 'completed')[0].amount).toLocaleString()
                      : '0'}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Subscription</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₦{payments.filter(p => p.type === 'addon' && p.status === 'completed').reduce((sum, p) => sum + parseFloat(p.amount), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Add-on Credits</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddFunds}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Funds</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWithdraw}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Withdraw</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/payments/wallet/history')}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Transaction History</span>
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
