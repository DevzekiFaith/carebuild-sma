import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export const useRealtime = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Subscribe to real-time updates
    const channel = supabase
      .channel('realtime-updates')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Real-time notification:', payload);
          // Handle notification updates
        }
      )
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payments',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Real-time payment update:', payload);
          // Handle payment updates
        }
      )
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_reports',
          filter: `supervisor_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Real-time report update:', payload);
          // Handle report updates
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { isConnected };
};

// Hook for real-time notifications
export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Load initial notifications
    const loadNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          // If database error, use mock data
          console.log('Using mock notifications due to database error:', error);
          const mockNotifications = [
            {
              id: '1',
              title: 'Welcome to CareBuild SMA!',
              message: 'Your account has been set up successfully. Start by exploring the dashboard.',
              type: 'success',
              is_read: false,
              created_at: new Date().toISOString(),
              user_id: user.id
            },
            {
              id: '2',
              title: 'Payment Received',
              message: 'Your payment of ₦150,000 for Luxury Villa Alpha has been processed successfully.',
              type: 'payment',
              is_read: false,
              created_at: new Date(Date.now() - 3600000).toISOString(),
              user_id: user.id
            },
            {
              id: '3',
              title: 'New Site Report',
              message: 'John Adebayo has submitted a daily site report for Lekki Office Complex.',
              type: 'report',
              is_read: true,
              created_at: new Date(Date.now() - 7200000).toISOString(),
              user_id: user.id
            }
          ];
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => !n.is_read).length);
          return;
        }
        
        setNotifications(data || []);
        setUnreadCount(data?.filter(n => !n.is_read).length || 0);
      } catch (error) {
        console.error('Error loading notifications:', error);
        // Use mock data as fallback
        const mockNotifications = [
          {
            id: '1',
            title: 'Welcome to CareBuild SMA!',
            message: 'Your account has been set up successfully. Start by exploring the dashboard.',
            type: 'success',
            is_read: false,
            created_at: new Date().toISOString(),
            user_id: user.id
          }
        ];
        setNotifications(mockNotifications);
        setUnreadCount(1);
      }
    };

    loadNotifications();

    // Subscribe to real-time notification updates
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNotification = payload.new;
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const updatedNotification = payload.new;
          setNotifications(prev => 
            prev.map(n => n.id === updatedNotification.id ? updatedNotification : n)
          );
          if (updatedNotification.is_read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    try {
      // Try to update in database first
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        console.log('Database update failed, updating local state only:', error);
      }
      
      // Update local state regardless of database result
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Still update local state even if database fails
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = async () => {
    try {
      // Try to update in database first
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user?.id)
        .eq('is_read', false);

      if (error) {
        console.log('Database update failed, updating local state only:', error);
      }
      
      // Update local state regardless of database result
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Still update local state even if database fails
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
      setUnreadCount(0);
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
};

// Hook for real-time payments
export const useRealtimePayments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // Load initial payments
    const loadPayments = async () => {
      try {
        const { data, error } = await supabase
          .from('payments')
          .select(`
            *,
            project:projects(name),
            user:users!payments_user_id_fkey(name, email)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPayments(data || []);
      } catch (error) {
        console.error('Error loading payments:', error);
      }
    };

    loadPayments();

    // Subscribe to real-time payment updates
    const channel = supabase
      .channel('payments')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payments',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Payment update:', payload);
          // Refresh payments when there's an update
          loadPayments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { payments };
};

// Hook for real-time site reports
export const useRealtimeReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // Load initial reports
    const loadReports = async () => {
      try {
        const { data, error } = await supabase
          .from('site_reports')
          .select(`
            *,
            project:projects(name, client_id, supervisor_id),
            supervisor:users!site_reports_supervisor_id_fkey(name, email, avatar_url),
            media:report_media(*)
          `)
          .or(`supervisor_id.eq.${user.id},project.client_id.eq.${user.id}`)
          .order('report_date', { ascending: false });

        if (error) throw error;
        setReports(data || []);
      } catch (error) {
        console.error('Error loading reports:', error);
      }
    };

    loadReports();

    // Subscribe to real-time report updates
    const channel = supabase
      .channel('reports')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_reports'
        },
        (payload) => {
          console.log('Report update:', payload);
          // Refresh reports when there's an update
          loadReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { reports };
};
