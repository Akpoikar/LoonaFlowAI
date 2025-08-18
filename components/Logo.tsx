"use client";

import { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const imageSizes = {
    sm: { width: 48, height: 48 },
    md: { width: 64, height: 64 },
    lg: { width: 80, height: 80 }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      {!imageError ? (
        <img
          src="/images/logo.png"
          alt="LoonaFlow AI Logo"
          width={imageSizes[size].width}
          height={imageSizes[size].height}
          className="object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <div 
          className="flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl"
          style={{ width: imageSizes[size].width, height: imageSizes[size].height }}
        >
          <span className="text-white font-bold text-lg">LF</span>
        </div>
      )}
      
      {/* Text with Solid Colors and Gradient */}
      <div className={`font-bold ${sizeClasses[size]} flex items-center`}>
        <span className="text-[#8A2BE2]">
          Loona
        </span>
        <span className="text-[rgb(112,104,251)]">
        Flow
        </span>
        <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent ml-1">
          AI
        </span>
      </div>
    </div>
  );
}
