import React from 'react';

interface InlineFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function InlineFlag({ countryCode, size = 'md', className = '' }: InlineFlagProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  };

  const sizeClass = sizeClasses[size];

  // Simple flag representation using colored backgrounds and text
  const getFlagStyle = (code: string) => {
    const styles: { [key: string]: string } = {
      'US': 'bg-gradient-to-b from-red-500 via-white to-blue-600 text-blue-900 font-bold',
      'GB': 'bg-gradient-to-br from-blue-600 via-white to-red-600 text-blue-900 font-bold',
      'DE': 'bg-gradient-to-b from-black via-red-500 to-yellow-400 text-white font-bold',
      'FR': 'bg-gradient-to-r from-blue-600 via-white to-red-600 text-blue-900 font-bold',
      'JP': 'bg-white text-red-600 font-bold',
      'RU': 'bg-gradient-to-b from-white via-blue-600 to-red-600 text-blue-900 font-bold',
      'CA': 'bg-gradient-to-r from-red-600 via-white to-red-600 text-red-900 font-bold',
      'AU': 'bg-gradient-to-br from-blue-600 via-white to-red-600 text-blue-900 font-bold',
      'BR': 'bg-gradient-to-br from-green-600 via-yellow-400 to-blue-600 text-green-900 font-bold',
      'CN': 'bg-gradient-to-b from-red-600 via-yellow-400 to-red-600 text-yellow-900 font-bold'
    };

    return styles[code] || 'bg-gradient-to-br from-slate-100 to-slate-300 text-slate-700 font-semibold';
  };

  return (
    <div className={`inline-flex items-center justify-center ${sizeClass} rounded border border-slate-300 shadow-sm ${getFlagStyle(countryCode)} ${className}`}>
      {countryCode}
    </div>
  );
}
