"use client";

import { useState, useEffect } from 'react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  hasImage: boolean;
  imagePath?: string;
}

interface LandingTutorialProps {
  isVisible: boolean;
  onClose: () => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Add your email account",
    description: "Go to Settings → Email Accounts and connect an email. This will be used to send your outreach campaigns.",
    hasImage: true,
    imagePath: "/images/tutorial/step1-email-config.png"
  },
  {
    id: 2,
    title: "Create your first email template",
    description: "Head to the Email Templates section and click 'Create Template'. Write engaging messages that will be sent to your leads.",
    hasImage: true,
    imagePath: "/images/tutorial/step2-email-templates.png"
  },
  {
    id: 3,
    title: "Set up a new campaign",
    description: "Go to Campaigns, click 'New Campaign', choose your settings, and get ready to launch.",
    hasImage: true,
    imagePath: "/images/tutorial/step3-create-campaign.png"
  },
  {
    id: 4,
    title: "Find businesses with the Scrape button",
    description: "Use the AI-powered scraper to pull in businesses that match your criteria. This will fill your campaign with leads.",
    hasImage: true,
    imagePath: "/images/tutorial/step4-scrape-businesses.png"
  },
  {
    id: 5,
    title: "Export your leads",
    description: "Click the Download button to export campaign results and leads as a CSV file for future use.",
    hasImage: true,
    imagePath: "/images/tutorial/step5-download-csv.png"
  },
  {
    id: 6,
    title: "Start sending your emails",
    description: "Once scraping is done, click 'Send' to launch your outreach emails to the selected businesses.",
    hasImage: true,
    imagePath: "/images/tutorial/step6-send-emails.png"
  },
  {
    id: 7,
    title: "Track your results",
    description: "Open the Dashboard to monitor campaign performance, see replies, and analyze engagement with your emails.",
    hasImage: true,
    imagePath: "/images/tutorial/step7-dashboard-analytics.png"
  },
  {
    id: 8,
    title: "You're ready to go 🚀",
    description: "Congrats! Setup is complete. Start generating leads and growing your business with LoonaFlow AI.",
    hasImage: false
  }
];

export default function LandingTutorial({ isVisible, onClose }: LandingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
      setIsAnimating(false);
      // Add body scroll lock
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      onClose();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  if (!isVisible) return null;

  const currentStepData = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">LoonaFlow AI Tutorial</h1>
              <p className="text-violet-100 text-sm lg:text-base">
                Step {currentStep + 1} of {tutorialSteps.length}
              </p>
            </div>
            <button
              onClick={skipTutorial}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 overflow-y-auto max-h-[70vh]">
          <div 
            className={`transition-all duration-200 ease-in-out ${
              isAnimating 
                ? 'opacity-0 scale-95' 
                : 'opacity-100 scale-100'
            }`}
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                {currentStepData.id}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                {currentStepData.title}
              </h2>
              <p className="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                {currentStepData.description}
              </p>
            </div>

            {/* Image Section */}
            {currentStepData.hasImage && (
              <div className="mb-8">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200">
                  <div className="relative">
                    <img
                      src={currentStepData.imagePath}
                      alt={`Tutorial step ${currentStepData.id} screenshot`}
                      className="w-full h-auto rounded-xl shadow-lg border border-slate-200 transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'block';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="hidden text-center py-16">
                      <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-slate-500 text-base mb-3">
                        Screenshot will be displayed here
                      </p>
                      <p className="text-slate-400 text-sm">
                        Upload your screenshot to: {currentStepData.imagePath}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-slate-50 px-6 lg:px-8 py-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <button
              onClick={previousStep}
              disabled={isFirstStep || isAnimating}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isFirstStep || isAnimating
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 hover:shadow-md'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={skipTutorial}
                className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium"
              >
                Skip Tutorial
              </button>
              <button
                onClick={nextStep}
                disabled={isAnimating}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLastStep ? 'Get Started!' : 'Next Step'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
