"use client";

import Link from 'next/link';
import { User } from '../../types/dashboard';
import Logo from '../Logo';

interface DashboardNavProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onStartTutorial: () => void;
  children?: React.ReactNode;
}

export default function DashboardNav({ user, activeTab, onTabChange, onLogout, onStartTutorial, children }: DashboardNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'templates', label: 'Email Templates', icon: '✉️' },
    { id: 'campaigns', label: 'Campaigns', icon: '🚀' },
    { id: 'subscription', label: 'Subscription', icon: '💳' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-xl border-r border-white/50 flex flex-col shadow-2xl shadow-purple-500/10">
        {/* Logo */}
        <div className="p-8 border-b border-white/30 bg-gradient-to-r from-violet-50/50 to-purple-50/50">
          <Link href="/dashboard" className="text-slate-900">
            <Logo />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                data-tutorial={`${item.id}-tab`}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/25'
                    : 'text-slate-700 hover:bg-white/60 hover:text-slate-900'
                }`}
              >
                <span className="text-xl">
                  {item.icon}
                </span>
                <span className="font-semibold text-lg">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-6 border-t border-white/30 bg-gradient-to-r from-slate-50/50 to-gray-50/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-lg font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 font-medium">{user.subscription.plan} Plan</p>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded-xl transition-colors font-medium"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header Bar */}
        <header className="bg-white/40 backdrop-blur-xl border-b border-white/30 px-8 py-6 shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                {navItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p className="text-slate-600 font-medium">
                {activeTab === 'dashboard' && 'Welcome to your LoonaFlow AI dashboard'}
                {activeTab === 'templates' && 'Create and manage email templates'}
                {activeTab === 'campaigns' && 'Launch and track your campaigns'}
                {activeTab === 'subscription' && 'Manage your subscription and billing'}
                {activeTab === 'settings' && 'Manage your account settings'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onStartTutorial}
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-200"
              >
                Tutorial
              </button>
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer">
                <span className="text-xl">🔔</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
