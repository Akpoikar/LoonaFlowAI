"use client";

import { useState } from 'react';
import LandingTutorial from "./LandingTutorial";

export default function TutorialButton() {
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
      <button
        onClick={handleTutorialClick}
        className="rounded-xl bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 font-medium text-slate-700 border border-slate-300/50 hover:bg-white/30 hover:border-slate-400/50 text-sm transition-all duration-200"
      >
        Tutorial
      </button>
      <LandingTutorial isVisible={showTutorial} onClose={closeTutorial} />
    </>
  );
}
