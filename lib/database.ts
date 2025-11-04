import { supabase } from './supabase';
import { User } from '@/types';

// Database service layer for all Supabase operations

export class DatabaseService {
  // User operations
  static async getUserProfile(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If user doesn't exist in database, return null
        if (error.code === 'PGRST116') {
          console.log('User profile not found in database, will be created on next auth state change');
          return null;
        }
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<User>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  // Project operations
  static async getProjects(userId: string, userRole: string) {
    try {
      let query = supabase
        .from('projects')
        .select(`
          *,
          client:users!projects_client_id_fkey(name, email, avatar_url),
          supervisor:users!projects_supervisor_id_fkey(name, email, avatar_url)
        `);

      if (userRole === 'client') {
        query = query.eq('client_id', userId);
      } else if (userRole === 'supervisor') {
        query = query.eq('supervisor_id', userId);
      }
      // Admin can see all projects

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  static async createProject(projectData: any) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  }

  static async updateProject(projectId: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  }

  // Site reports operations
  static async getSiteReports(userId: string, userRole: string) {
    try {
      let query = supabase
        .from('site_reports')
        .select(`
          *,
          project:projects(name, client_id, supervisor_id),
          supervisor:users!site_reports_supervisor_id_fkey(name, email, avatar_url),
          media:report_media(*)
        `);

      if (userRole === 'client') {
        query = query.eq('project.client_id', userId);
      } else if (userRole === 'supervisor') {
        query = query.eq('supervisor_id', userId);
      }

      const { data, error } = await query.order('report_date', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching site reports:', error);
      return [];
    }
  }

  static async createSiteReport(reportData: any) {
    try {
      const { data, error } = await supabase
        .from('site_reports')
        .insert(reportData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating site report:', error);
      return null;
    }
  }

  static async updateSiteReport(reportId: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('site_reports')
        .update(updates)
        .eq('id', reportId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating site report:', error);
      return null;
    }
  }

  // Payment operations
  static async getPayments(userId: string, userRole: string) {
    try {
      let query = supabase
        .from('payments')
        .select(`
          *,
          project:projects(name),
          user:users!payments_user_id_fkey(name, email)
        `);

      if (userRole !== 'admin') {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  }

  static async createPayment(paymentData: any) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert(paymentData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating payment:', error);
      return null;
    }
  }

  static async updatePayment(paymentId: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .update(updates)
        .eq('id', paymentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating payment:', error);
      return null;
    }
  }

  // Wallet operations
  static async getWallet(userId: string) {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching wallet:', error);
      return null;
    }
  }

  static async updateWalletBalance(userId: string, amount: number, type: 'credit' | 'debit') {
    try {
      // Get current wallet
      const wallet = await this.getWallet(userId);
      if (!wallet) return null;

      const newBalance = type === 'credit' 
        ? wallet.balance + amount 
        : wallet.balance - amount;

      const { data, error } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating wallet balance:', error);
      return null;
    }
  }

  // Subscription operations
  static async getSubscriptions(userId: string) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }
  }

  static async createSubscription(subscriptionData: any) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      return null;
    }
  }

  // Notification operations
  static async getNotifications(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  static async markNotificationAsRead(notificationId: string) {
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

  // User preferences operations
  static async getUserPreferences(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }
  }

  static async updateUserPreferences(userId: string, preferences: any) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: userId,
          ...preferences
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return null;
    }
  }

  // File upload operations
  static async uploadFile(file: File, bucket: string, path: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }

  static async getFileUrl(bucket: string, path: string) {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      return data.publicUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      return null;
    }
  }

  // Real-time subscriptions
  static subscribeToTable(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table },
        callback
      )
      .subscribe();
  }

  static subscribeToUserData(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user_${userId}_data`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  }
}
