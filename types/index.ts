export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'supervisor' | 'admin';
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  supervisorId?: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  budget: number;
  spent: number;
  startDate: Date;
  endDate?: Date;
  location: string;
  images?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface SiteReport {
  id: string;
  projectId: string;
  supervisorId: string;
  type: 'daily' | 'weekly' | 'milestone';
  title: string;
  description: string;
  images: string[];
  videos: string[];
  notes: string;
  weather?: string;
  progress: number;
  issues?: string[];
  recommendations?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'professional' | 'executive';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  amount: number;
  paymentId: string;
}

export interface Payment {
  id: string;
  userId: string;
  projectId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'subscription' | 'project' | 'wallet';
  flutterwaveRef: string;
  created_at: Date;
  updated_at: Date;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
  created_at: Date;
  updated_at: Date;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  reference: string;
  createdAt: Date;
}

export interface Analytics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalSpent: number;
  monthlySpending: { month: string; amount: number }[];
  siteVisits: { date: string; count: number }[];
  progressData: { projectId: string; name: string; progress: number }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}
