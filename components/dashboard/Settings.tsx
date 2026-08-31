"use client";

import { useState, useEffect } from 'react';
import { User } from '../../types/dashboard';
import Modal from '../Modal';
import { apiClient, EmailConfig } from '@/lib/api';

interface SettingsProps {
  user: User;
}

export default function Settings({ user }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([]);
  const [isLoadingEmailConfigs, setIsLoadingEmailConfigs] = useState(true);
  const [emailConfigError, setEmailConfigError] = useState('');
  const [emailFormData, setEmailFormData] = useState({
    name: '',
    smtpServer: '',
    smtpPort: 587,
    emailAddress: '',
    emailPassword: ''
  });
  const [isCreatingEmailConfig, setIsCreatingEmailConfig] = useState(false);

  // Load email configurations
  useEffect(() => {
    if (activeTab === 'email') {
      loadEmailConfigs();
    }
  }, [activeTab]);

  const loadEmailConfigs = async () => {
    try {
      setIsLoadingEmailConfigs(true);
      setEmailConfigError('');
      
      const result: any = await apiClient.getEmailConfigs();
      
      if (result.error) {
        setEmailConfigError(result.error);
      } else if (result.data) {
        const configsArray = result.data.data || (Array.isArray(result.data) ? result.data : []);
        setEmailConfigs(configsArray);
      } else {
        setEmailConfigs([]);
      }
    } catch (error) {
      setEmailConfigError('Failed to load email configurations');
    } finally {
      setIsLoadingEmailConfigs(false);
    }
  };

  const handleEmailInputChange = (field: string, value: string | number | boolean) => {
    setEmailFormData(prev => ({
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
      } else {
        await loadEmailConfigs();
        setShowEmailModal(false);
        setEmailFormData({
          name: '',
          smtpServer: '',
          smtpPort: 587,
          emailAddress: '',
          emailPassword: ''
        });
      }
    } catch (error) {
      setEmailConfigError('Failed to create email configuration');
    } finally {
      setIsCreatingEmailConfig(false);
    }
  };

  const handleDeleteEmailConfig = async (configId: string) => {
    if (!confirm('Are you sure you want to delete this email configuration?')) {
      return;
    }
    
    try {
      const result = await apiClient.deleteEmailConfig(configId);
      if (result.error) {
        setEmailConfigError(result.error);
      } else {
        await loadEmailConfigs();
      }
    } catch (error) {
      setEmailConfigError('Failed to delete email configuration');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'email', label: 'Email Accounts', icon: '📧' },
    // { id: 'billing', label: 'Billing', icon: '💳' },
    // { id: 'api', label: 'API Keys', icon: '🔑' }
  ];

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 bg-white/40 backdrop-blur-md rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-violet-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Profile Settings</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <input
                  type="text"
                  defaultValue={user.company}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Plan</label>
                <div className="px-4 py-3 rounded-xl bg-violet-100 text-violet-800 font-medium">
                  {user.subscription.plan} Plan
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Email Configuration</h3>
            
            {emailConfigError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {emailConfigError}
              </div>
            )}
            
            {isLoadingEmailConfigs ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading email configurations...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {emailConfigs.map((config) => (
                  <div key={config._id || config.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/30 rounded-xl gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">📧</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{config.name}</p>
                        <p className="text-sm text-slate-600">
                          {config.emailAddress} • {config.smtpServer}:{config.smtpPort}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleDeleteEmailConfig(config._id || config.id || '')}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                
                {emailConfigs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📧</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No email configuration yet</h3>
                    <p className="text-slate-600 mb-6">Add an email configuration to start sending emails. You can add as many as you like and choose which one to use per campaign.</p>
                  </div>
                )}

                <button
                  onClick={() => setShowEmailModal(true)}
                  className="w-full px-6 py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-violet-400 hover:text-violet-600 transition-colors"
                >
                  + Add Email Configuration
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Billing & Subscription</h3>
            <div className="space-y-4">
              <div className="p-4 sm:p-6 bg-white/30 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h4 className="font-semibold text-slate-900">Current Plan</h4>
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm font-medium text-center">
                    {user.plan}
                  </span>
                </div>
                <p className="text-slate-600 mb-4">$49/month • Unlimited leads, campaigns, and templates</p>
                <button className="w-full sm:w-auto px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  Change Plan
                </button>
              </div>
              <div className="p-4 sm:p-6 bg-white/30 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-4">Payment Method</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">
                    💳
                  </div>
                  <span className="text-slate-600">•••• •••• •••• 4242</span>
                  <button className="text-violet-600 hover:text-violet-700 text-sm">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">API Keys</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/30 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <span className="font-medium text-slate-900">Production API Key</span>
                  <button className="text-violet-600 hover:text-violet-700 text-sm">
                    Regenerate
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-slate-100 rounded text-sm font-mono break-all">
                    lf_live_••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                  </code>
                  <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors">
                    Copy
                  </button>
                </div>
              </div>
              <div className="p-4 bg-white/30 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <span className="font-medium text-slate-900">Test API Key</span>
                  <button className="text-violet-600 hover:text-violet-700 text-sm">
                    Regenerate
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-slate-100 rounded text-sm font-mono break-all">
                    lf_test_••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                  </code>
                  <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Email Configuration Modal */}
      <Modal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Add Email Configuration"
        size="lg"
      >
        <form onSubmit={handleCreateEmailConfig} className="space-y-6">
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
              placeholder="e.g., Zoho Business, Gmail Marketing"
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
                placeholder="e.g., smtp.zoho.eu, smtp.gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Port *</label>
              <input
                type="number"
                required
                value={emailFormData.smtpPort}
                onChange={(e) => handleEmailInputChange('smtpPort', parseInt(e.target.value))}
                placeholder="587"
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
              placeholder="info@yourdomain.com"
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
              placeholder="Enter your email password or app password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowEmailModal(false)}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingEmailConfig}
              className="flex-1 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingEmailConfig ? 'Creating...' : 'Add Configuration'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
