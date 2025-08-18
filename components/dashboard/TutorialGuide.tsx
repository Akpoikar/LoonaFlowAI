"use client";

import { useState, useEffect, useRef } from 'react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialGuideProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'templates',
    title: 'Step 1: Create Email Template',
    content: 'Start by creating or selecting an email template that will be used for your outreach campaigns.',
    target: 'templates-tab',
    position: 'bottom'
  },
  {
    id: 'campaigns',
    title: 'Step 2: Launch Campaign',
    content: 'Create a new campaign by selecting your target category, location, and maximum results.',
    target: 'campaigns-tab',
    position: 'bottom'
  }
];

export default function TutorialGuide({ isVisible, onClose, onComplete }: TutorialGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      setIsActive(true);
      setCurrentStep(0);
      // Add body scroll lock
      document.body.style.overflow = 'hidden';
    } else {
      setIsActive(false);
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  useEffect(() => {
    if (isActive && currentStep < tutorialSteps.length) {
      highlightTarget();
    }
  }, [currentStep, isActive]);

  const highlightTarget = () => {
    const step = tutorialSteps[currentStep];
    const targetElement = document.querySelector(`[data-tutorial="${step.target}"]`);
    
    if (targetElement && tooltipRef.current) {
      const rect = targetElement.getBoundingClientRect();
      const tooltip = tooltipRef.current;
      
      // Position tooltip based on step position
      let top = rect.bottom + 10;
      let left = rect.left + (rect.width / 2);
      
      if (step.position === 'top') {
        top = rect.top - tooltip.offsetHeight - 10;
      } else if (step.position === 'left') {
        left = rect.left - tooltip.offsetWidth - 10;
        top = rect.top + (rect.height / 2);
      } else if (step.position === 'right') {
        left = rect.right + 10;
        top = rect.top + (rect.height / 2);
      }
      
      // Ensure tooltip stays within viewport
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 20;
      }
      if (left < 20) {
        left = 20;
      }
      if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 20;
      }
      if (top < 20) {
        top = 20;
      }
      
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    onComplete();
    onClose();
  };

  const skipTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    onComplete();
    onClose();
  };

  if (!isVisible) return null;

  const currentStepData = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={skipTutorial}
      />
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-purple-200 max-w-sm p-6"
      >
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {currentStep + 1}
            </div>
            <span className="text-sm text-slate-500">
              {currentStep + 1} of {tutorialSteps.length}
            </span>
          </div>
          <button
            onClick={skipTutorial}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {currentStepData.content}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={previousStep}
            disabled={currentStep === 0}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={skipTutorial}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Skip Tutorial
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
            >
              {isLastStep ? 'Got it!' : 'Next'}
            </button>
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute w-4 h-4 bg-white border-l border-b border-purple-200 transform rotate-45 -top-2 left-1/2 -translate-x-1/2" />
      </div>
    </>
  );
}

// Hook to manage tutorial state
export function useTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('tutorialCompleted') === 'true';
    setTutorialCompleted(completed);
    
    // Show tutorial automatically for first-time users
    if (!completed) {
      setShowTutorial(true);
    }
  }, []);

  const startTutorial = () => {
    setShowTutorial(true);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
  };

  const completeTutorial = () => {
    setTutorialCompleted(true);
  };

  return {
    showTutorial,
    tutorialCompleted,
    startTutorial,
    closeTutorial,
    completeTutorial
  };
}
