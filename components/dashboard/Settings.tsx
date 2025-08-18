"use client";

import { useState } from 'react';
import { User } from '../../types/dashboard';

interface SettingsProps {
  user: User;
}

export default function Settings({ user }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'email', label: 'Email Accounts', icon: '📧' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'api', label: 'API Keys', icon: '🔑' }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white/40 backdrop-blur-md rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {user.plan} Plan
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Email Accounts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Gmail Account</p>
                    <p className="text-sm text-slate-600">Connected • Warm-up active</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Disconnect
                </button>
              </div>
              <button className="w-full px-6 py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-violet-400 hover:text-violet-600 transition-colors">
                + Connect Email Account
              </button>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Billing & Subscription</h3>
            <div className="space-y-4">
              <div className="p-6 bg-white/30 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Current Plan</h4>
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">
                    {user.plan}
                  </span>
                </div>
                <p className="text-slate-600 mb-4">$49/month • Unlimited leads, campaigns, and templates</p>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  Change Plan
                </button>
              </div>
              <div className="p-6 bg-white/30 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-4">Payment Method</h4>
                <div className="flex items-center gap-3">
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
            <h3 className="text-xl font-bold text-slate-900">API Keys</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/30 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">Production API Key</span>
                  <button className="text-violet-600 hover:text-violet-700 text-sm">
                    Regenerate
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-slate-100 rounded text-sm font-mono">
                    lf_live_••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                  </code>
                  <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors">
                    Copy
                  </button>
                </div>
              </div>
              <div className="p-4 bg-white/30 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">Test API Key</span>
                  <button className="text-violet-600 hover:text-violet-700 text-sm">
                    Regenerate
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-slate-100 rounded text-sm font-mono">
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
    </div>
  );
}
