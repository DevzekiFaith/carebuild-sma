export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  maxProjects: number;
  maxReports: number;
  priority: 'essential' | 'premium' | 'executive';
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  icon: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'essential',
    name: 'Essential Plan',
    price: 150000, // ₦150,000
    currency: 'NGN',
    interval: 'monthly',
    features: [
      '4 site visits per week (16/month)',
      'Professional supervisor assignment',
      'Daily/weekly visual reports',
      'Weather logs & material tracking',
      'Email notifications',
      'Basic analytics dashboard',
      'Mobile app access'
    ],
    maxProjects: 1,
    maxReports: 16,
    priority: 'essential'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 220000, // ₦220,000
    currency: 'NGN',
    interval: 'monthly',
    features: [
      '5 site visits per week (20/month)',
      'Dedicated supervisor team',
      'Advanced reporting & documentation',
      'Live video walkthroughs',
      'Material verification',
      'Priority support',
      'Advanced analytics',
      'Multi-site management (2-3 sites)'
    ],
    maxProjects: 3,
    maxReports: 20,
    priority: 'premium'
  },
  {
    id: 'executive',
    name: 'Executive Plan',
    price: 350000, // ₦350,000
    currency: 'NGN',
    interval: 'monthly',
    features: [
      '6 site visits per week (24/month)',
      'Premium supervisor team',
      'Drone imaging & virtual oversight',
      'AI-driven analytics & insights',
      '24/7 dedicated support',
      'Performance efficiency reports',
      'Cost variance tracking',
      'Unlimited sites',
      'Diaspora client support'
    ],
    maxProjects: -1, // Unlimited
    maxReports: 24,
    priority: 'executive'
  }
];

export const addOns: AddOn[] = [
  {
    id: 'urgent-visit',
    name: 'Urgent Site Visit',
    price: 10000,
    currency: 'NGN',
    description: 'Supervisor visits on-demand within 24hrs',
    icon: '⚡'
  },
  {
    id: 'virtual-supervision',
    name: 'Virtual Supervision',
    price: 20000,
    currency: 'NGN',
    description: 'Live video call from site',
    icon: '📹'
  },
  {
    id: 'material-tracking',
    name: 'Material Tracking',
    price: 10000,
    currency: 'NGN',
    description: 'AI cost variance & usage tracking',
    icon: '📦'
  },
  {
    id: 'drone-inspection',
    name: 'Drone Inspection',
    price: 25000,
    currency: 'NGN',
    description: 'Monthly drone imaging & analysis',
    icon: '🚁'
  },
  {
    id: 'performance-analytics',
    name: 'Performance Analytics',
    price: 20000,
    currency: 'NGN',
    description: 'Advanced project efficiency reports',
    icon: '📊'
  }
];




