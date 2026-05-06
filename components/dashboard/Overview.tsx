"use client";

import { useState, useEffect } from 'react';
import { User, Campaign } from '../../types/dashboard';
import { apiClient, DashboardStats } from '@/lib/api';
import Modal from '../Modal';

interface OverviewProps {
  user: User;
  campaigns: Campaign[];
  onTabChange: (tab: string) => void;
  hasEmailConfig?: boolean;
}

export default function Overview({ user, campaigns, onTabChange, hasEmailConfig = false }: OverviewProps) {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [templateCount, setTemplateCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);
  const [emailConfigured, setEmailConfigured] = useState(hasEmailConfig);
  const [showEmailSetupModal, setShowEmailSetupModal] = useState(false);
  const [isCreatingEmailConfig, setIsCreatingEmailConfig] = useState(false);
  const [emailConfigError, setEmailConfigError] = useState('');
  const [emailFormData, setEmailFormData] = useState({
    name: '',
    smtpServer: '',
    smtpPort: 587,
    emailAddress: '',
    emailPassword: '',
    isDefault: true
  });

  useEffect(() => {
    setEmailConfigured(hasEmailConfig);
  }, [hasEmailConfig]);

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

  useEffect(() => {
    const loadWorkflowCounts = async () => {
      try {
        const [templatesResult, campaignsResult] = await Promise.all([
          apiClient.getTemplates(),
          apiClient.getCampaigns(),
        ]);

        const templatesData = (templatesResult?.data as any)?.data || templatesResult?.data || [];
        const campaignsData = (campaignsResult?.data as any)?.data || campaignsResult?.data || [];

        if (Array.isArray(templatesData)) {
          setTemplateCount(templatesData.length);
        }

        if (Array.isArray(campaignsData)) {
          setCampaignCount(campaignsData.length);
        }
      } catch (error) {
        setTemplateCount(0);
        setCampaignCount(0);
      }
    };

    loadWorkflowCounts();
  }, []);

  const handleEmailInputChange = (field: string, value: string | number | boolean) => {
    setEmailFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateEmailConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingEmailConfig(true);
    setEmailConfigError('');

    try {
      const result = await apiClient.createEmailConfig(emailFormData);
      if (result.error) {
        setEmailConfigError(result.error);
        return;
      }

      setEmailConfigured(true);
      setShowEmailSetupModal(false);
      setEmailFormData({
        name: '',
        smtpServer: '',
        smtpPort: 587,
        emailAddress: '',
        emailPassword: '',
        isDefault: true
      });
    } catch (error) {
      setEmailConfigError('Failed to create email configuration');
    } finally {
      setIsCreatingEmailConfig(false);
    }
  };

  const totalCampaigns = typeof dashboardStats?.campaigns.total === 'number' ? dashboardStats.campaigns.total : campaignCount;
  const hasTemplates = templateCount > 0;

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

      {/* Workflow Progress */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Get started in 3 steps</h3>
            <p className="text-sm text-slate-600">Complete setup, prepare your message, then launch your first campaign.</p>
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-700 bg-violet-100 rounded-full px-3 py-1 self-start sm:self-auto">
            {`${[emailConfigured, hasTemplates, totalCampaigns > 0].filter(Boolean).length}/3 completed`}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`rounded-2xl border p-5 ${emailConfigured ? 'border-emerald-200 bg-emerald-50/60' : 'border-amber-200 bg-amber-50/60'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Step 1</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${emailConfigured ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {emailConfigured ? 'Done' : 'Required'}
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Set up your email account</h4>
            <p className="text-sm text-slate-700 mb-4">
              Connect the inbox you want to send from so campaigns can run.
            </p>
            <button
              onClick={() => {
                if (emailConfigured) {
                  onTabChange('settings');
                  return;
                }
                setShowEmailSetupModal(true);
              }}
              className={`w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                emailConfigured ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {emailConfigured ? 'Manage Email Configuration' : 'Set Up Email On Dashboard'}
            </button>
          </div>

          <div className={`rounded-2xl border p-5 ${hasTemplates ? 'border-emerald-200 bg-emerald-50/60' : 'border-violet-200 bg-violet-50/60'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Step 2</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${hasTemplates ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700'}`}>
                {hasTemplates ? `${templateCount} template${templateCount > 1 ? 's' : ''}` : 'Pending'}
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Create email template</h4>
            <p className="text-sm text-slate-700 mb-4">
              Write your outreach once, then reuse it across campaigns.
            </p>
            <button
              onClick={() => onTabChange('templates')}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors"
            >
              {hasTemplates ? 'Manage Templates' : 'Create Template'}
            </button>
          </div>

          <div className={`rounded-2xl border p-5 ${totalCampaigns > 0 ? 'border-emerald-200 bg-emerald-50/60' : 'border-indigo-200 bg-indigo-50/60'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Step 3</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${totalCampaigns > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                {totalCampaigns > 0 ? `${totalCampaigns} campaign${totalCampaigns > 1 ? 's' : ''}` : 'Pending'}
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Launch your campaign</h4>
            <p className="text-sm text-slate-700 mb-4">
              Choose businesses, pick your template, and start sending.
            </p>
            <button
              onClick={() => onTabChange('campaigns')}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              {totalCampaigns > 0 ? 'Open Campaigns' : 'Create Campaign'}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showEmailSetupModal}
        onClose={() => setShowEmailSetupModal(false)}
        title="Quick Email Setup"
        size="lg"
      >
        <form onSubmit={handleCreateEmailConfig} className="space-y-5">
          {emailConfigError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {emailConfigError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Configuration Name *</label>
            <input
              type="text"
              required
              value={emailFormData.name}
              onChange={(e) => handleEmailInputChange('name', e.target.value)}
              placeholder="e.g., Gmail Outreach"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Server *</label>
              <input
                type="text"
                required
                value={emailFormData.smtpServer}
                onChange={(e) => handleEmailInputChange('smtpServer', e.target.value)}
                placeholder="smtp.gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Port *</label>
              <input
                type="number"
                required
                value={emailFormData.smtpPort}
                onChange={(e) => handleEmailInputChange('smtpPort', parseInt(e.target.value, 10) || 587)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={emailFormData.emailAddress}
              onChange={(e) => handleEmailInputChange('emailAddress', e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Password *</label>
            <input
              type="password"
              required
              value={emailFormData.emailPassword}
              onChange={(e) => handleEmailInputChange('emailPassword', e.target.value)}
              placeholder="App password or SMTP password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowEmailSetupModal(false)}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingEmailConfig}
              className="flex-1 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingEmailConfig ? 'Saving...' : 'Save & Continue'}
            </button>
          </div>
        </form>
      </Modal>

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
                    totalCampaigns
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

