"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../../types/dashboard';
import DashboardNav from '../../../components/dashboard/DashboardNav';
import Templates from '../../../components/dashboard/Templates';
import TutorialGuide, { useTutorial } from '../../../components/dashboard/TutorialGuide';
import PulsingBorderShader from '@/components/PulsingBorderShader';
import { apiClient } from '@/lib/api';

export default function DashboardTemplatesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Tutorial state management
  const { showTutorial, startTutorial, closeTutorial, completeTutorial } = useTutorial();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
        
        {/* Floating Bubbles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-violet-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-300/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-300/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-indigo-300/35 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-violet-300/25 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-purple-300/30 rounded-full animate-pulse delay-750"></div>
        
        {/* Large Gradient Blobs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-300/20 to-purple-300/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-rose-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300/10 to-violet-300/10 rounded-full blur-3xl"></div>
      </div>
      <div className="pointer-events-none absolute right-[5%] bottom-[5%] z-0">
        <PulsingBorderShader />
      </div> 
       <div className="pointer-events-none absolute right-[60%] bottom-[30%] z-0">
        <PulsingBorderShader />
      </div> 
      <DashboardNav 
        user={user} 
        activeTab="templates" 
        onLogout={handleLogout}
        onStartTutorial={startTutorial}
      >
        <div className="p-6 h-full">
          <Templates />
        </div>
      </DashboardNav>

      {/* Tutorial Guide */}
      <TutorialGuide
        isVisible={showTutorial}
        onClose={closeTutorial}
        onComplete={completeTutorial}
      />
    </>
  );
}
