import React, { useState } from 'react';

interface FlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Flag({ countryCode, size = 'md', className = '' }: FlagProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  };

  const sizeClass = sizeClasses[size];

  // Try multiple flag APIs for better reliability
  const flagApis = [
    `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`,
    `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`,
    `https://restcountries.eu/data/${countryCode.toLowerCase()}.svg`
  ];

  const [currentApiIndex, setCurrentApiIndex] = useState(0);
  const currentFlagUrl = flagApis[currentApiIndex];

  const handleImageError = () => {
    if (currentApiIndex < flagApis.length - 1) {
      // Try next API
      setCurrentApiIndex(currentApiIndex + 1);
    } else {
      // All APIs failed, show fallback
      setImageError(true);
    }
  };

  if (imageError) {
    // Final fallback: styled country code
    return (
      <div className={`inline-flex items-center justify-center ${sizeClass} bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 rounded font-mono font-semibold border border-slate-300 ${className}`}>
        {countryCode}
      </div>
    );
  }

  return (
    <img
      src={currentFlagUrl}
      alt={`${countryCode} flag`}
      className={`${sizeClass} object-cover rounded-sm border border-slate-200 shadow-sm ${className}`}
      onError={handleImageError}
      onLoad={() => setImageError(false)}
    />
  );
}
