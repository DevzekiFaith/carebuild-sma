'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Calendar, Filter, Download, Eye, CreditCard, Banknote, Smartphone, Coins } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  category: 'subscription' | 'withdrawal' | 'refund' | 'bonus' | 'addon' | 'transfer';
  amount: number;
  currency: string;
  description: string;
  date: string;
  balance: number;
  method: string;
  reference: string;
}

export default function WalletHistoryPage() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<WalletTransaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockTransactions: WalletTransaction[] = [
      {
        id: '1',
        type: 'debit',
        category: 'subscription',
        amount: 150000,
        currency: 'NGN',
        description: 'Essential Plan Subscription - Monthly',
        date: '2024-01-15T10:30:00Z',
        balance: 350000,
        method: 'Paystack',
        reference: 'SUB_001234567'
      },
      {
        id: '2',
        type: 'debit',
        category: 'withdrawal',
        amount: 50000,
        currency: 'NGN',
        description: 'Bank Transfer Withdrawal',
        date: '2024-01-14T14:20:00Z',
        balance: 500000,
        method: 'Bank Transfer',
        reference: 'WD_001234567'
      },
      {
        id: '3',
        type: 'credit',
        category: 'bonus',
        amount: 10000,
        currency: 'NGN',
        description: 'Referral Bonus - New User Signup',
        date: '2024-01-13T09:15:00Z',
        balance: 550000,
        method: 'System',
        reference: 'BONUS_001234567'
      },
      {
        id: '4',
        type: 'credit',
        category: 'refund',
        amount: 25000,
        currency: 'NGN',
        description: 'Project Cancellation Refund',
        date: '2024-01-12T16:45:00Z',
        balance: 540000,
        method: 'Paystack',
        reference: 'REF_001234567'
      },
      {
        id: '5',
        type: 'debit',
        category: 'addon',
        amount: 15000,
        currency: 'NGN',
        description: 'Premium Support Add-on',
        date: '2024-01-11T11:30:00Z',
        balance: 515000,
        method: 'Paystack',
        reference: 'ADDON_001234567'
      },
      {
        id: '6',
        type: 'credit',
        category: 'transfer',
        amount: 100000,
        currency: 'NGN',
        description: 'Fund Transfer from Main Account',
        date: '2024-01-10T08:00:00Z',
        balance: 500000,
        method: 'Internal Transfer',
        reference: 'TRANSFER_001234567'
      }
    ];

    setTimeout(() => {
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setCurrentBalance(mockTransactions[0]?.balance || 0);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter transactions
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.category === categoryFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, categoryFilter, typeFilter]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'subscription':
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      case 'withdrawal':
        return <Banknote className="w-4 h-4 text-orange-600" />;
      case 'refund':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'bonus':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'addon':
        return <Smartphone className="w-4 h-4 text-purple-600" />;
      case 'transfer':
        return <Coins className="w-4 h-4 text-indigo-600" />;
      default:
        return <Wallet className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  const getTypeIcon = (type: string) => {
    return type === 'credit' ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Type', 'Category', 'Description', 'Amount', 'Balance', 'Method', 'Reference'],
      ...filteredTransactions.map(t => [
        formatDate(t.date),
        t.type,
        t.category,
        t.description,
        formatAmount(t.amount, t.currency),
        formatAmount(t.balance, t.currency),
        t.method,
        t.reference
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallet-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#4B0082] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading Wallet History...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
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
                  <h1 className="text-2xl font-bold text-gray-900">Wallet History</h1>
                  <p className="text-gray-600">Track your wallet balance and transactions</p>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportTransactions}
              className="bg-[#4B0082] text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Current Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#4B0082] to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium opacity-90">Current Wallet Balance</h2>
              <p className="text-3xl font-bold">₦{currentBalance.toLocaleString()}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="subscription">Subscriptions</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="refund">Refunds</option>
              <option value="bonus">Bonuses</option>
              <option value="addon">Add-ons</option>
              <option value="transfer">Transfers</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B0082] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="credit">Credits</option>
              <option value="debit">Debits</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-gray-600">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {getCategoryIcon(transaction.category)}
                          <div>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(transaction.type)}
                              <span className="text-sm font-medium text-gray-900 capitalize">
                                {transaction.category}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-gray-400">
                              {transaction.reference}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${getTypeColor(transaction.type)}`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatAmount(transaction.balance, transaction.currency)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#4B0082] hover:text-purple-700 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
