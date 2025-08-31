"use client";

import { useState, useEffect } from 'react';
import { User, Campaign } from '../../types/dashboard';
import { apiClient, DashboardStats } from '@/lib/api';

interface OverviewProps {
  user: User;
  campaigns: Campaign[];
  onTabChange: (tab: string) => void;
}

export default function Overview({ user, campaigns, onTabChange }: OverviewProps) {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const result = await apiClient.getDashboardStats();
        if (result.data) {
          console.log('Dashboard stats response:', result.data);
          setDashboardStats(result.data as DashboardStats);
        }
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    loadDashboardStats();
  }, []);

  const runningCampaigns = campaigns.filter(c => c.status === 'sending emails in progress');
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leadsCount, 0);
  const totalEmailsSent = campaigns.reduce((sum, c) => sum + c.emailsSent, 0);
  const avgOpenRate = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length 
    : 0;
  const avgReplyRate = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length 
    : 0;

  return (
    <div className="space-y-6 sm:space-y-8 h-full overflow-y-auto px-4 sm:px-6">
      {/* Welcome Message */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.name || 'there'} 👋
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Ready to launch your next campaign?
            </p>
          </div>
          <div className="text-3xl sm:text-4xl">🚀</div>
        </div>
      </div>

      {/* Email Setup Notification */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg text-blue-600">📧</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
              Set up your email inbox
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4">
              To send emails through campaigns, you'll need to configure your email settings first. This ensures your emails are delivered properly and tracked correctly.
            </p>
            <button 
              onClick={() => onTabChange('settings')}
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Go to Settings
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Workflow Progress */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Your Workflow</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Mobile: Stack vertically, Desktop: Horizontal flow */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                1
              </div>
              <span className="text-sm font-medium text-slate-700">Create Template</span>
            </div>
            <div className="hidden sm:block w-8 h-1 bg-violet-200 rounded-full"></div>
            <div className="sm:hidden w-1 h-8 bg-violet-200 rounded-full ml-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                2
              </div>
              <span className="text-sm font-medium text-slate-700">Launch Campaign</span>
            </div>
            <div className="hidden sm:block w-8 h-1 bg-violet-200 rounded-full"></div>
            <div className="sm:hidden w-1 h-8 bg-violet-200 rounded-full ml-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                3
              </div>
              <span className="text-sm font-medium text-slate-700">Track Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign and Geographic Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Campaign Stats */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Campaign Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600">Total Campaigns</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  {isLoadingStats ? (
                    <div className="animate-pulse bg-slate-200 h-6 w-12 rounded"></div>
                  ) : (
                    typeof dashboardStats?.campaigns.total === 'number' ? dashboardStats.campaigns.total : campaigns.length
                  )}
                </p>
              </div>
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">🚀</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-600">Completed</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  {isLoadingStats ? (
                    <div className="animate-pulse bg-slate-200 h-6 w-12 rounded"></div>
                  ) : (
                    typeof dashboardStats?.campaigns.completed === 'number' ? dashboardStats.campaigns.completed : 0
                  )}
                </p>
                {dashboardStats?.campaigns.completionRate && (
                  <p className="text-xs text-slate-500">{dashboardStats.campaigns.completionRate}</p>
                )}
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Places Scraped */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Businesses Scraped</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                {isLoadingStats ? (
                  <div className="animate-pulse bg-slate-200 h-6 w-12 rounded"></div>
                ) : (
                  typeof dashboardStats?.scrapedPlaces?.total === 'number' ? dashboardStats.scrapedPlaces.total : 0
                )}
              </p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-sm">🌍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Performance Section */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Email Performance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Side - Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-white/30 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Emails</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isLoadingStats ? (
                    <div className="animate-pulse bg-slate-200 h-8 w-16 rounded"></div>
                  ) : (
                    typeof dashboardStats?.campaignEmails?.sent === 'number' ? dashboardStats.campaignEmails.sent : 0
                  )}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl">📧</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-white/30 rounded-xl">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Seen/Replied</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isLoadingStats ? (
                    <div className="animate-pulse bg-slate-200 h-8 w-16 rounded"></div>
                  ) : (
                    typeof dashboardStats?.campaignEmails?.seen === 'number' ? dashboardStats.campaignEmails.seen : 0
                  )}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-orange-500 font-medium">🔜 Coming Soon</span>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl">📤</span>
              </div>
            </div>
          </div>

          {/* Right Side - Chart and Percentages */}
          {dashboardStats && (
            <div className="space-y-4">
              {/* Chart */}
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    {/* Sent emails segment (full circle) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="8"
                      strokeDasharray="251.2 251.2"
                      strokeLinecap="round"
                    />
                    {/* Seen emails segment (overlay) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${(dashboardStats.campaignEmails.seen / Math.max(dashboardStats.campaignEmails.sent, 1)) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-slate-900">
                        {dashboardStats.campaignEmails.sent && dashboardStats.campaignEmails.seen
                          ? `${Math.round((dashboardStats.campaignEmails.seen / dashboardStats.campaignEmails.sent) * 100)}%`
                          : '0%'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                      
              {/* Legend */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-violet-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">Sent: {dashboardStats.campaignEmails.sent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">Seen/Replied: {dashboardStats.campaignEmails.seen}</span>
                  <span className="text-xs text-orange-500">🔜</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

