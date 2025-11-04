'use client';

import React, { useState, useEffect } from 'react';
import { useRealtime, useRealtimeNotifications, useRealtimePayments, useRealtimeReports } from '@/hooks/useRealtime';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Wifi, WifiOff, Bell, DollarSign, FileText } from 'lucide-react';

export default function RealtimeTest() {
  const { isConnected } = useRealtime();
  const { notifications, unreadCount } = useRealtimeNotifications();
  const { payments } = useRealtimePayments();
  const { reports } = useRealtimeReports();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="w-5 h-5" />
            <span>Realtime Connection Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              <span className="font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {isConnected ? 'Live updates enabled' : 'Using cached data'}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {notifications.length}
            </div>
            <div className="text-sm text-gray-500">
              Total notifications
            </div>
            {notifications.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                Latest: {notifications[0]?.title || 'No title'}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Payments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {payments.length}
            </div>
            <div className="text-sm text-gray-500">
              Total payments
            </div>
            {payments.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                Latest: ₦{payments[0]?.amount?.toLocaleString() || '0'}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {reports.length}
            </div>
            <div className="text-sm text-gray-500">
              Total reports
            </div>
            {reports.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                Latest: {reports[0]?.title || 'No title'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Realtime Data Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Connection Status:</span>
              <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Notifications:</span>
              <span>{notifications.length} ({unreadCount} unread)</span>
            </div>
            <div className="flex justify-between">
              <span>Payments:</span>
              <span>{payments.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Reports:</span>
              <span>{reports.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




