"use client";

import { useState, useEffect } from 'react';

interface TutorialGuideProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const TUTORIAL_VIDEO_ID = "F8uHZ1ombr8";

export default function TutorialGuide({ isVisible, onClose, onComplete }: TutorialGuideProps) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const closeTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    onComplete();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10050] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold">LoonaFlow AI Tutorial</h1>
            <button
              onClick={closeTutorial}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="p-6 lg:p-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${TUTORIAL_VIDEO_ID}`}
              title="LoonaFlow AI Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 lg:px-8 py-6 border-t border-slate-200 flex justify-end">
          <button
            onClick={closeTutorial}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook to manage tutorial state
export function useTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('tutorialCompleted') === 'true';
    setTutorialCompleted(completed);
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
