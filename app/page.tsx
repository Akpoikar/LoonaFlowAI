import Image from "next/image";
import PulsingBorderShader from "../components/PulsingBorderShader";
import Hero from "../components/Hero";
import Journey from "../components/Journey";
import Coverage from "../components/Coverage";
import SearchAnyBusiness from "../components/SearchAnyBusiness";
import ROICalculator from "../components/ROICalculator";
import SocialProof from "../components/SocialProof";
import Comparison from "../components/Comparison";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import TutorialButton from "../components/TutorialButton";
import MobileNavMenu from "../components/MobileNavMenu";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-60 w-60 rounded-full bg-gradient-to-br from-purple-200/35 to-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-[15%] left-[15%] h-96 w-96 rounded-full bg-gradient-to-br from-violet-200/40 to-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-gradient-to-br from-cyan-200/35 to-blue-200/25 blur-3xl" />
      <div className="pointer-events-none absolute top-[70%] left-[5%] h-64 w-64 rounded-full bg-gradient-to-br from-pink-200/45 to-rose-200/35 blur-3xl" />

      {/* Glowing pulsing circles */}
      <div className="pointer-events-none absolute right-[2%] top-[5%] z-0">
        <PulsingBorderShader />
      </div>
      <div className="pointer-events-none absolute left-[2%] bottom-[5%] z-0">
        <PulsingBorderShader />
      </div>
      <div className="pointer-events-none absolute left-[0%] top-[0%] z-0">
        <PulsingBorderShader />
      </div>

      {/* Main glass panel */}
      <div className="relative z-10 mx-auto mt-6 sm:mt-10 mb-10 w-[min(1400px,95vw)] sm:w-[min(1400px,92vw)] rounded-2xl sm:rounded-3xl bg-white/8 backdrop-blur-[2px] ring-1 ring-white/80 shadow-[0_25px_80px_rgba(31,38,135,0.12)]">
        <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12">
          {/* Navbar */}
          <nav className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
            <Logo size="lg" />

            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-sm">
              <a href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
                Pricing
              </a>
              <a href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">
                Contact
              </a>
              <a href="/articles" className="text-slate-700 hover:text-slate-900 transition-colors">
                Articles
              </a>
              <a href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">
                Sign in
              </a>
              <TutorialButton />
              <a
                href="/login"
                className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 text-sm transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile burger menu */}
            <MobileNavMenu />
          </nav>

          <Hero />

          <Journey />

          <Coverage />

          <SearchAnyBusiness />

          <ROICalculator />

          <SocialProof />

          <Comparison />

          <FAQ />

          <Footer />
        </div>
      </div>
    </div>
  );
}
