'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Share2,
  RefreshCw,
  User,
  Building2,
  DollarSign,
  FileText,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import NavigationButtons from '@/components/dashboard/NavigationButtons';
import Footer from '@/components/Footer';
import { appToasts } from '@/lib/toast';
import { useAuth } from '@/hooks/useAuth';
import { DatabaseService } from '@/lib/database';

// Mock data for a single payment
const mockPaymentDetails = {
  id: 1,
  projectName: 'Luxury Villa Alpha',
  projectId: 'PROJ-001',
  amount: 150000,
  type: 'subscription',
  status: 'completed',
  date: '2024-10-25',
  time: '10:30 AM',
  method: 'Bank Transfer',
  reference: 'CB-2024-001',
  transactionId: 'TXN_001_2024',
  gateway: 'Flutterwave',
  fees: 4500,
  netAmount: 145500,
  description: 'Monthly subscription payment for Essential plan',
  client: {
    name: 'Mrs. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+2347011223344',
    company: 'Johnson Holdings'
  },
  supervisor: {
    name: 'John Adebayo',
    email: 'john.adebayo@carebuild.com',
    phone: '+2348012345678',
    role: 'Senior Supervisor'
  },
  invoiceUrl: '/invoices/CB-2024-001.pdf',
  receiptUrl: '/receipts/CB-2024-001.pdf',
  bankDetails: {
    bankName: 'Access Bank',
    accountNumber: '1234567890',
    accountName: 'CareBuild SMA Ltd'
  },
  paymentBreakdown: {
    subscription: 150000,
    platformFee: 4500,
    processingFee: 0,
    total: 150000
  },
  timeline: [
    { status: 'initiated', timestamp: '2024-10-25 10:25 AM', description: 'Payment initiated by client' },
    { status: 'processing', timestamp: '2024-10-25 10:26 AM', description: 'Payment processing via Flutterwave' },
    { status: 'completed', timestamp: '2024-10-25 10:30 AM', description: 'Payment completed successfully' }
  ]
};

export default function PaymentDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useAuth();
  const [payment, setPayment] = useState<typeof mockPaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPaymentDetails(id as string);
    }
  }, [id]);

  const loadPaymentDetails = async (paymentId: string) => {
    setLoading(true);
    try {
      // For now, we'll use mock data but structure it to match database schema
      // In production, you'd fetch from DatabaseService.getPaymentById(paymentId)
      const fetchedPayment = { 
        ...mockPaymentDetails, 
        id: paymentId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setPayment(fetchedPayment);
    } catch (error) {
      console.error('Error loading payment details:', error);
      appToasts.serverError();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Payment Details...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Payment not found.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleDownload = (url: string, fileName: string) => {
    // In a real app, you'd handle secure file downloads
    window.open(url, '_blank');
    appToasts.fileUploaded(fileName);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `CareBuild SMA Payment: ${payment.projectName}`,
        text: `Payment details for ${payment.projectName} (Ref: ${payment.reference})`,
        url: window.location.href,
      }).then(() => {
        appToasts.saved();
      }).catch((error) => {
        appToasts.serverError();
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      appToasts.copied('Payment link');
    }
  };

  const handleRetryPayment = () => {
    router.push(`/payments/${payment.id}/retry`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4 sm:p-6">
        <NavigationButtons 
          currentPage={`Payment: ${payment.reference}`} 
          showHome={false} 
          onBack={() => router.push('/dashboard?tab=payments')}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b pb-4">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{payment.projectName}</h1>
              <p className="text-gray-600 text-sm sm:text-base">Payment Reference: {payment.reference}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload(payment.invoiceUrl, `Invoice_${payment.reference}.pdf`)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </motion.button>
              {payment.status === 'failed' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetryPayment}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Payment</span>
                </motion.button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Details */}
              <section className="border-b pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Payment Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Date: {new Date(payment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Time: {payment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Method: {payment.method}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="capitalize">{payment.status}</span>
                    </span>
                  </div>
                </div>
              </section>

              {/* Payment Breakdown */}
              <section className="border-b pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Payment Breakdown</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subscription Fee</span>
                      <span className="font-semibold">₦{payment.paymentBreakdown.subscription.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-semibold">₦{payment.paymentBreakdown.platformFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-semibold">₦{payment.paymentBreakdown.processingFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₦{payment.paymentBreakdown.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Timeline */}
              <section className="border-b pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Payment Timeline</h2>
                <div className="space-y-4">
                  {payment.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          {getStatusIcon(event.status)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{event.description}</p>
                        <p className="text-sm text-gray-600">{event.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bank Details */}
              {payment.status === 'completed' && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Bank Details</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Bank Name:</strong> {payment.bankDetails.bankName}</p>
                      <p><strong>Account Number:</strong> {payment.bankDetails.accountNumber}</p>
                      <p><strong>Account Name:</strong> {payment.bankDetails.accountName}</p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-8">
              {/* Payment Summary */}
              <section className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Payment Summary</span>
                </h3>
                <div className="space-y-2 text-blue-700 text-sm">
                  <p><strong>Amount:</strong> ₦{payment.amount.toLocaleString()}</p>
                  <p><strong>Type:</strong> {payment.type}</p>
                  <p><strong>Gateway:</strong> {payment.gateway}</p>
                  <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
                </div>
              </section>

              {/* Client Details */}
              <section className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Client Details</span>
                </h3>
                <div className="space-y-2 text-green-700 text-sm">
                  <p><strong>Name:</strong> {payment.client.name}</p>
                  <p><strong>Company:</strong> {payment.client.company}</p>
                  <p><strong>Email:</strong> {payment.client.email}</p>
                  <p><strong>Phone:</strong> {payment.client.phone}</p>
                </div>
              </section>

              {/* Project Details */}
              <section className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
                <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Project Details</span>
                </h3>
                <div className="space-y-2 text-purple-700 text-sm">
                  <p><strong>Project:</strong> {payment.projectName}</p>
                  <p><strong>Project ID:</strong> {payment.projectId}</p>
                  <p><strong>Description:</strong> {payment.description}</p>
                </div>
              </section>

              {/* Supervisor Details */}
              <section className="bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-100">
                <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Supervisor Details</span>
                </h3>
                <div className="space-y-2 text-orange-700 text-sm">
                  <p><strong>Name:</strong> {payment.supervisor.name}</p>
                  <p><strong>Role:</strong> {payment.supervisor.role}</p>
                  <p><strong>Email:</strong> {payment.supervisor.email}</p>
                  <p><strong>Phone:</strong> {payment.supervisor.phone}</p>
                </div>
              </section>

              {/* Documents */}
              <section className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Documents</span>
                </h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownload(payment.invoiceUrl, `Invoice_${payment.reference}.pdf`)}
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-white hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium text-gray-800">Invoice</span>
                    </div>
                    <Download className="w-4 h-4 text-gray-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownload(payment.receiptUrl, `Receipt_${payment.reference}.pdf`)}
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-white hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-800">Receipt</span>
                    </div>
                    <Download className="w-4 h-4 text-gray-500" />
                  </motion.button>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
