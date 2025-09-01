"use client";

import { useState } from 'react';
import PulsingBorderShader from "../components/PulsingBorderShader";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import SocialProof from "../components/SocialProof";
import Comparison from "../components/Comparison";
import Analytics from "../components/Analytics";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import SEOHead from "../components/SEOHead";
import LandingTutorial from "../components/LandingTutorial";

export default function Page() {
  const [showTutorial, setShowTutorial] = useState(false);

  const handleTutorialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTutorial(true);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
  };
  return (
    <>
      <SEOHead />
      <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Fallback gradient background */}
        <div 
          className="w-full h-full"
          style={{ 
            background: "linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fdf2f8)",
            display: "none"
          }}
        />
      </div>

            {/* Large background blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />

      {/* Additional background gradients */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-60 w-60 rounded-full bg-gradient-to-br from-purple-200/35 to-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-2/3 right-1/3 h-48 w-48 rounded-full bg-gradient-to-br from-yellow-200/25 to-orange-200/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/6 right-1/6 h-56 w-56 rounded-full bg-gradient-to-br from-green-200/20 to-emerald-200/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200/30 to-pink-200/25 blur-3xl" />

      {/* More background blobs */}
      <div className="pointer-events-none absolute top-[15%] left-[15%] h-96 w-96 rounded-full bg-gradient-to-br from-violet-200/40 to-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-gradient-to-br from-cyan-200/35 to-blue-200/25 blur-3xl" />
      <div className="pointer-events-none absolute top-[70%] left-[5%] h-64 w-64 rounded-full bg-gradient-to-br from-pink-200/45 to-rose-200/35 blur-3xl" />
      <div className="pointer-events-none absolute top-[20%] right-[30%] h-88 w-88 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[40%] left-[25%] h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200/35 to-green-200/25 blur-3xl" />
      <div className="pointer-events-none absolute top-[60%] right-[5%] h-56 w-56 rounded-full bg-gradient-to-br from-purple-200/40 to-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-[10%] left-[40%] h-80 w-80 rounded-full bg-gradient-to-br from-sky-200/35 to-cyan-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[20%] right-[25%] h-96 w-96 rounded-full bg-gradient-to-br from-rose-200/40 to-pink-200/30 blur-3xl" />

      {/* 6 glowing circles scattered across the page */}
      <div className="pointer-events-none absolute right-[2%] top-[5%] z-0">
        <PulsingBorderShader />
      </div>
      <div className="pointer-events-none absolute left-[2%] bottom-[5%] z-0">
        <PulsingBorderShader />
      </div>
      <div className="pointer-events-none absolute left-[0%] top-[0%] z-0">
        <PulsingBorderShader />
      </div> 
      <div className="pointer-events-none absolute left-[50%] top-[50%] z-0">
        <PulsingBorderShader />
      </div>
      <div className="pointer-events-none absolute right-[50%] bottom-[50%] z-0">
        <PulsingBorderShader />
      </div> 


     
      {/* Main glass panel */}
      <div className="relative z-10 mx-auto mt-6 sm:mt-10 mb-10 w-[min(1400px,95vw)] sm:w-[min(1400px,92vw)] rounded-2xl sm:rounded-3xl bg-white/8 backdrop-blur-[2px] ring-1 ring-white/80 shadow-[0_25px_80px_rgba(31,38,135,0.12)]">
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl  from-white/20 via-white/5 to-white/10 pointer-events-none"></div>
        <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12">
                           {/* Navbar */}
                 <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
                   <Logo size="lg" />
                   <div className="flex items-center gap-4 sm:gap-6 text-sm">
                     <a href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
                       Pricing
                     </a>
                     <a href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">
                       Contact
                     </a>
                     <a href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">
                       Sign in
                     </a>
                     <button
                       onClick={handleTutorialClick}
                       className="rounded-xl bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 font-medium text-slate-700 border border-slate-300/50 hover:bg-white/30 hover:border-slate-400/50 text-sm transition-all duration-200"
                     >
                       Tutorial
                     </button>
                     <a
                       href="/login"
                       className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 text-sm transition-colors"
                     >
                       Get Started
                     </a>
                   </div>
                 </nav>

          <Hero />

          <HowItWorks />

          {/* <Features /> */}

          <SocialProof />

          <Comparison />

          <Analytics />

          <FAQ />

          {/* <FinalCTA /> */}

          <Footer />
        </div>
      </div>

      {/* Tutorial Modal */}
      <LandingTutorial 
        isVisible={showTutorial}
        onClose={closeTutorial}
      />
    </div>
    </>
  );
}
