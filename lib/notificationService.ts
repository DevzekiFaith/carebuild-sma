import { supabase } from './supabase';

export interface NotificationData {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'payment' | 'report' | 'project';
  user_id: string;
  metadata?: any;
}

export class NotificationService {
  // Create a new notification
  static async createNotification(data: NotificationData) {
    try {
      const { data: notification, error } = await supabase
        .from('notifications')
        .insert([{
          title: data.title,
          message: data.message,
          type: data.type,
          user_id: data.user_id,
          metadata: data.metadata || {},
          is_read: false,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      return null;
    }
  }

  // Create sample notifications for testing
  static async createSampleNotifications(userId: string) {
    const sampleNotifications = [
      {
        title: 'Payment Received',
        message: 'Your payment of ₦150,000 for Luxury Villa Alpha has been processed successfully.',
        type: 'payment' as const,
        user_id: userId,
        metadata: { amount: 150000, project: 'Luxury Villa Alpha' }
      },
      {
        title: 'New Site Report',
        message: 'John Adebayo has submitted a daily site report for Lekki Office Complex.',
        type: 'report' as const,
        user_id: userId,
        metadata: { supervisor: 'John Adebayo', project: 'Lekki Office Complex' }
      },
      {
        title: 'Project Update',
        message: 'Foundation work for Victoria Island Tower has reached 75% completion.',
        type: 'project' as const,
        user_id: userId,
        metadata: { project: 'Victoria Island Tower', progress: 75 }
      },
      {
        title: 'Payment Due',
        message: 'Your monthly subscription payment of ₦220,000 is due in 3 days.',
        type: 'warning' as const,
        user_id: userId,
        metadata: { amount: 220000, due_date: '2024-11-01' }
      },
      {
        title: 'Report Approved',
        message: 'Your weekly site report for Marina Heights has been approved by the client.',
        type: 'success' as const,
        user_id: userId,
        metadata: { project: 'Marina Heights', report_type: 'weekly' }
      },
      {
        title: 'New Assignment',
        message: 'You have been assigned to supervise the Ikoyi Residential Project.',
        type: 'info' as const,
        user_id: userId,
        metadata: { project: 'Ikoyi Residential Project', location: 'Ikoyi' }
      },
      {
        title: 'Budget Alert',
        message: 'Project budget for Banana Island Villa is 85% utilized. Consider reviewing expenses.',
        type: 'warning' as const,
        user_id: userId,
        metadata: { project: 'Banana Island Villa', budget_used: 85 }
      },
      {
        title: 'Schedule Reminder',
        message: 'Site visit scheduled for tomorrow at 9:00 AM for Lekki Phase 1 Project.',
        type: 'info' as const,
        user_id: userId,
        metadata: { project: 'Lekki Phase 1 Project', time: '09:00', date: '2024-10-27' }
      }
    ];

    // Create notifications with delays to simulate real-time updates
    for (let i = 0; i < sampleNotifications.length; i++) {
      setTimeout(async () => {
        await this.createNotification(sampleNotifications[i]);
      }, i * 2000); // 2 seconds between each notification
    }
  }

  // Get notifications for a user
  static async getNotifications(userId: string, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  // Mark notification as read
  static async markAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // Mark all notifications as read
  static async markAllAsRead(userId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  // Delete notification
  static async deleteNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  }

  // Get unread count
  static async getUnreadCount(userId: string) {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }
}




