"use client";

import Link from 'next/link';
import Logo from '../components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
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

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
        </div>

        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300 transform hover:scale-105"
          >
            🏠 Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 transform hover:scale-105"
          >
            ← Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className="text-sm text-slate-500 mb-4">Or try these pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
              Contact Us
            </Link>
            <Link href="/pricing" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
