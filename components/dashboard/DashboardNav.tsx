"use client";

import { useState } from 'react';
import Link from 'next/link';
import { User } from '../../types/dashboard';
import Logo from '../Logo';

interface DashboardNavProps {
  user: User;
  activeTab: string;
  onLogout: () => void;
  onStartTutorial: () => void;
  children?: React.ReactNode;
}

export default function DashboardNav({ user, activeTab, onLogout, onStartTutorial, children }: DashboardNavProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊', href: '/dashboard/overview' },
    { id: 'templates', label: 'Email Templates', icon: '✉️', href: '/dashboard/templates' },
    { id: 'campaigns', label: 'Campaigns', icon: '🚀', href: '/dashboard/campaigns' },
    { id: 'subscription', label: 'Subscription', icon: '💳', href: '/dashboard/subscription' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Hidden on mobile, collapsible on tablet */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-[9999]
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-72 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-xl 
        border-r border-white/50 flex flex-col shadow-2xl shadow-purple-500/10
      `}>
        {/* Logo */}
        <div className="p-4 lg:p-8 border-b border-white/30 bg-gradient-to-r from-violet-50/80 to-purple-50/80">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-slate-900">
              <Logo />
            </Link>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="lg:hidden w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 lg:p-6">
          <div className="space-y-2 lg:space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                data-tutorial={`${item.id}-tab`}
                onClick={closeSidebar}
                className={`w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-left transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/25'
                    : 'text-slate-700 hover:bg-white/80 hover:text-slate-900'
                }`}
              >
                <span className="text-lg lg:text-xl">
                  {item.icon}
                </span>
                <span className="font-semibold text-sm lg:text-lg">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 lg:p-6 border-t border-white/30 bg-gradient-to-r from-white/80 to-white/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-base lg:text-lg font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs lg:text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 font-medium">{user.subscription.plan} Plan</p>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-lg lg:rounded-xl transition-colors font-medium"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="bg-white/40 backdrop-blur-xl border-b border-white/30 px-4 sm:px-6 lg:px-8 py-4 lg:py-6 shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between">
            {/* Left side - Menu button and title */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
           

              {/* Title and description */}
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-3xl font-bold text-slate-900 mb-1">
                  {navItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-sm lg:text-base text-slate-600 font-medium">
                  {activeTab === 'overview' && 'Welcome to your LoonaFlow AI dashboard'}
                  {activeTab === 'templates' && 'Create and manage email templates'}
                  {activeTab === 'campaigns' && 'Launch and track your campaigns'}
                  {activeTab === 'subscription' && 'Manage your subscription and billing'}
                  {activeTab === 'settings' && 'Manage your account settings'}
                  {activeTab === 'contact' && 'Get in touch with our support team'}
                </p>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={onStartTutorial}
                className="rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm font-semibold text-white hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-200"
              >
                Tutorial
              </button>
            </div>
          </div>

          {/* Mobile title (shown below header on small screens) */}
          <div className="sm:hidden mt-3">
            <h1 className="text-lg font-bold text-slate-900 mb-1">
              {navItems.find(item => item.id === activeTab)?.label}
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              {activeTab === 'overview' && 'Welcome to your LoonaFlow AI dashboard'}
              {activeTab === 'templates' && 'Create and manage email templates'}
              {activeTab === 'campaigns' && 'Launch and track your campaigns'}
              {activeTab === 'subscription' && 'Manage your subscription and billing'}
              {activeTab === 'settings' && 'Manage your account settings'}
              {activeTab === 'contact' && 'Get in touch with our support team'}
            </p>
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
