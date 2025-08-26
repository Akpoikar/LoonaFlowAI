"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../../components/Logo';
import PulsingBorderShader from '@/components/PulsingBorderShader';
import { apiClient } from '@/lib/api';
import SEOHead from '../../components/SEOHead';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result: any = await apiClient.login(formData.email, formData.password);

      if (result.error) {
        setError(result.error);
      } else {
        // Login successful, store user data and redirect
        if (result.data?.user) {
          localStorage.setItem('user', JSON.stringify(result.data.user));
          localStorage.setItem('isAuthenticated', 'true');
        }
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEOHead 
        title="Login to LoonaFlow AI - Access Your Local Business Outreach Dashboard"
        description="Sign in to your LoonaFlow AI account to manage your local business outreach campaigns, leads, and email automation."
        keywords={[
          "loonaflow login",
          "loonaflow ai login",
          "local business outreach login",
          "lead generation login",
          "email automation login",
          "business outreach dashboard"
        ]}
        canonical="https://loonaflow.app/login"
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6 overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute z-0">
        <PulsingBorderShader />
      </div> 
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo size="lg" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-violet-600 hover:text-violet-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-violet-600 hover:text-violet-700 font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
