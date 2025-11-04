'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NotificationService } from '@/lib/notificationService';
import { useAuth } from '@/hooks/useAuth';
import { appToasts } from '@/lib/toast';

export default function NotificationTest() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSampleNotifications = async () => {
    if (!user) {
      appToasts.error('Please log in to generate notifications');
      return;
    }

    setIsGenerating(true);
    try {
      await NotificationService.createSampleNotifications(user.id);
      appToasts.success('Sample notifications generated! Check the notification bell in the header.');
    } catch (error) {
      appToasts.error('Failed to generate notifications');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearAllNotifications = async () => {
    if (!user) {
      appToasts.error('Please log in to clear notifications');
      return;
    }

    try {
      // In a real app, you'd have a clear all method
      appToasts.info('Clear all functionality would be implemented here');
    } catch (error) {
      appToasts.error('Failed to clear notifications');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notification Test Panel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Test the real-time notification system by generating sample notifications.
            These will appear in the notification bell in the header.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateSampleNotifications}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate Sample Notifications'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearAllNotifications}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Notifications</span>
            </motion.button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Sample Notifications Include:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Payment confirmations and due reminders</li>
              <li>• New site reports and approvals</li>
              <li>• Project updates and progress alerts</li>
              <li>• Assignment notifications</li>
              <li>• Budget and schedule reminders</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">How to Test:</h4>
            <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
              <li>Click "Generate Sample Notifications"</li>
              <li>Watch the notification bell in the header</li>
              <li>Click the bell to see the notification dropdown</li>
              <li>Notifications will appear in real-time</li>
              <li>Click on notifications to mark them as read</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>Notification Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Real-time Updates</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Live notification delivery</li>
                <li>• Unread count updates</li>
                <li>• Instant mark as read</li>
                <li>• Auto-refresh on new notifications</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">User Experience</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Smooth animations</li>
                <li>• Click outside to close</li>
                <li>• Visual read/unread indicators</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




