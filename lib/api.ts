import { DatabaseService } from './database';
import { StorageService } from './storage';
import { supabase } from './supabase';

export class ApiService {
  // Authentication API
  static async signUp(email: string, password: string, name: string, role: 'client' | 'supervisor') {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          }
        }
      });

      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  // User API
  static async getUserProfile(userId: string) {
    return await DatabaseService.getUserProfile(userId);
  }

  static async updateUserProfile(userId: string, updates: any) {
    return await DatabaseService.updateUserProfile(userId, updates);
  }

  static async uploadUserAvatar(userId: string, file: File) {
    try {
      const result = await StorageService.uploadAvatar(userId, file);
      
      // Update user profile with new avatar URL
      const success = await DatabaseService.updateUserProfile(userId, {
        avatar_url: result.url
      });

      if (success) {
        return { success: true, avatarUrl: result.url };
      } else {
        return { success: false, error: 'Failed to update profile' };
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      return { success: false, error: error.message };
    }
  }

  // Projects API
  static async getProjects(userId: string, userRole: string) {
    return await DatabaseService.getProjects(userId, userRole);
  }

  static async createProject(projectData: any) {
    return await DatabaseService.createProject(projectData);
  }

  static async updateProject(projectId: string, updates: any) {
    return await DatabaseService.updateProject(projectId, updates);
  }

  static async deleteProject(projectId: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Delete project error:', error);
      return { success: false, error: error.message };
    }
  }

  // Site Reports API
  static async getSiteReports(userId: string, userRole: string) {
    return await DatabaseService.getSiteReports(userId, userRole);
  }

  static async createSiteReport(reportData: any) {
    return await DatabaseService.createSiteReport(reportData);
  }

  static async updateSiteReport(reportId: string, updates: any) {
    return await DatabaseService.updateSiteReport(reportId, updates);
  }

  static async uploadReportMedia(reportId: string, files: File[]) {
    try {
      const results = await StorageService.uploadReportMedia(files, reportId, 'image');
      
      // Save media references to database
      const mediaData = results.map(result => ({
        report_id: reportId,
        file_url: result.url,
        file_type: result.type,
        created_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('report_media')
        .insert(mediaData);

      if (error) throw error;
      return { success: true, media: results };
    } catch (error) {
      console.error('Report media upload error:', error);
      return { success: false, error: error.message };
    }
  }

  // Payments API
  static async getPayments(userId: string, userRole: string) {
    return await DatabaseService.getPayments(userId, userRole);
  }

  static async createPayment(paymentData: any) {
    return await DatabaseService.createPayment(paymentData);
  }

  static async updatePayment(paymentId: string, updates: any) {
    return await DatabaseService.updatePayment(paymentId, updates);
  }

  static async processPayment(paymentData: any) {
    try {
      // Create payment record
      const payment = await DatabaseService.createPayment({
        ...paymentData,
        status: 'pending',
        created_at: new Date().toISOString()
      });

      if (!payment) {
        return { success: false, error: 'Failed to create payment record' };
      }

      // In a real implementation, you would integrate with Flutterwave here
      // For now, we'll simulate a successful payment
      const success = await DatabaseService.updatePayment(payment.id, {
        status: 'completed',
        transaction_id: `TXN_${Date.now()}`,
        updated_at: new Date().toISOString()
      });

      if (success) {
        // Update wallet balance if it's a wallet top-up
        if (paymentData.type === 'wallet_topup') {
          await DatabaseService.updateWalletBalance(
            paymentData.user_id, 
            parseFloat(paymentData.amount), 
            'credit'
          );
        }

        return { success: true, payment };
      } else {
        return { success: false, error: 'Failed to process payment' };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, error: error.message };
    }
  }

  // Wallet API
  static async getWallet(userId: string) {
    return await DatabaseService.getWallet(userId);
  }

  static async addFunds(userId: string, amount: number, paymentMethod: string) {
    try {
      // Create payment record
      const payment = await this.processPayment({
        user_id: userId,
        amount: amount,
        type: 'wallet_topup',
        payment_method: paymentMethod,
        reference: `WALLET_${Date.now()}`,
        description: 'Wallet top-up'
      });

      if (payment.success) {
        return { success: true, payment: payment.payment };
      } else {
        return { success: false, error: payment.error };
      }
    } catch (error) {
      console.error('Add funds error:', error);
      return { success: false, error: error.message };
    }
  }

  static async withdrawFunds(userId: string, amount: number) {
    try {
      // Check if user has sufficient balance
      const wallet = await DatabaseService.getWallet(userId);
      if (!wallet || wallet.balance < amount) {
        return { success: false, error: 'Insufficient balance' };
      }

      // Create withdrawal payment record
      const payment = await DatabaseService.createPayment({
        user_id: userId,
        amount: amount,
        type: 'withdrawal',
        payment_method: 'bank_transfer',
        status: 'pending',
        reference: `WITHDRAWAL_${Date.now()}`,
        description: 'Wallet withdrawal'
      });

      if (payment) {
        // Update wallet balance
        await DatabaseService.updateWalletBalance(userId, amount, 'debit');
        return { success: true, payment };
      } else {
        return { success: false, error: 'Failed to process withdrawal' };
      }
    } catch (error) {
      console.error('Withdraw funds error:', error);
      return { success: false, error: error.message };
    }
  }

  // Notifications API
  static async getNotifications(userId: string) {
    return await DatabaseService.getNotifications(userId);
  }

  static async markNotificationAsRead(notificationId: string) {
    return await DatabaseService.markNotificationAsRead(notificationId);
  }

  static async createNotification(userId: string, title: string, message: string, type: string = 'info') {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title,
          message,
          type,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, notification: data };
    } catch (error) {
      console.error('Create notification error:', error);
      return { success: false, error: error.message };
    }
  }

  // User Preferences API
  static async getUserPreferences(userId: string) {
    return await DatabaseService.getUserPreferences(userId);
  }

  static async updateUserPreferences(userId: string, preferences: any) {
    return await DatabaseService.updateUserPreferences(userId, preferences);
  }

  // File Upload API
  static async uploadFile(file: File, path: string, options?: any) {
    try {
      const result = await StorageService.uploadFile(file, path, options);
      return { success: true, file: result };
    } catch (error) {
      console.error('File upload error:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteFile(path: string) {
    try {
      await StorageService.deleteFile(path);
      return { success: true };
    } catch (error) {
      console.error('File delete error:', error);
      return { success: false, error: error.message };
    }
  }

  // Analytics API
  static async getDashboardStats(userId: string, userRole: string) {
    try {
      const [projects, payments, reports] = await Promise.all([
        DatabaseService.getProjects(userId, userRole),
        DatabaseService.getPayments(userId, userRole),
        DatabaseService.getSiteReports(userId, userRole)
      ]);

      const stats = {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'active').length,
        totalPayments: payments.length,
        completedPayments: payments.filter(p => p.status === 'completed').length,
        totalRevenue: payments
          .filter(p => p.status === 'completed')
          .reduce((sum, p) => sum + parseFloat(p.amount), 0),
        totalReports: reports.length,
        pendingReports: reports.filter(r => r.status === 'pending').length
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return { success: false, error: error.message };
    }
  }

  // Search API
  static async search(query: string, userId: string, userRole: string) {
    try {
      const [projects, payments, reports] = await Promise.all([
        DatabaseService.getProjects(userId, userRole),
        DatabaseService.getPayments(userId, userRole),
        DatabaseService.getSiteReports(userId, userRole)
      ]);

      const searchResults = {
        projects: projects.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        ),
        payments: payments.filter(p => 
          p.reference.toLowerCase().includes(query.toLowerCase()) ||
          (p.project?.name || '').toLowerCase().includes(query.toLowerCase())
        ),
        reports: reports.filter(r => 
          (r.project?.name || '').toLowerCase().includes(query.toLowerCase())
        )
      };

      return { success: true, results: searchResults };
    } catch (error) {
      console.error('Search error:', error);
      return { success: false, error: error.message };
    }
  }
}

