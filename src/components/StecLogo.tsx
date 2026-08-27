import React from 'react';

interface StecLogoProps {
  className?: string;
  customLogoUrl?: string | null;
  size?: number;
  primaryColor?: string; // Blue
  secondaryColor?: string; // Maroon Red
}

export const StecLogo: React.FC<StecLogoProps> = ({
  className = "w-10 h-10",
  customLogoUrl,
  size = 48,
  primaryColor = "#184E9E",
  secondaryColor = "#801424"
}) => {
  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="Uploaded Brand Logo"
        className={`object-contain rounded-full border border-zinc-300 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // High-fidelity vector rendition of STEC Seal
  return (
    <svg
      viewBox="0 0 200 200"
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Drop Shadow */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
        
        {/* Globe Gradient */}
        <radialGradient id="globeGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="60%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#0B254E" />
        </radialGradient>

        {/* Gold Triangle Gradient */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1B8" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6D1F" />
        </linearGradient>

        {/* Circular Text Paths */}
        <path
          id="textPathTop"
          d="M 22,100 A 78,78 0 1,1 178,100"
          fill="none"
        />
        <path
          id="textPathBottom"
          d="M 178,100 A 78,78 0 0,1 22,100"
          fill="none"
        />
      </defs>

      {/* Outer Border with 3D Ring */}
      <circle cx="100" cy="100" r="98" fill="#500B16" />
      <circle cx="100" cy="100" r="95" fill={secondaryColor} stroke="#E2B842" strokeWidth="1.5" />
      
      {/* Outer Circular Ring Text */}
      <text fill="#FFFFFF" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1.2">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          ★ SCIENCE AND TECHNOLOGY EDUCATION CENTER ★
        </textPath>
      </text>
      
      <text fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2.5">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          ★ LAPU-LAPU CITY ★
        </textPath>
      </text>

      {/* Inner Globe Border & Atmosphere */}
      <circle cx="100" cy="100" r="70" fill="url(#globeGrad)" stroke="#E2B842" strokeWidth="2.5" />

      {/* Stylized Earth Continents */}
      <g fill="#A3C77D" opacity="0.65">
        <path d="M 50,75 Q 65,60 85,70 Q 90,85 75,95 Q 60,95 50,75 Z" />
        <path d="M 115,65 Q 140,55 150,75 Q 145,95 130,90 Q 115,85 115,65 Z" />
        <path d="M 65,115 Q 85,110 95,125 Q 90,145 75,140 Q 60,135 65,115 Z" />
        <path d="M 120,115 Q 145,120 140,140 Q 125,145 115,130 Z" />
      </g>

      {/* Central Golden Triangle */}
      <polygon
        points="100,28 42,145 158,145"
        fill="url(#goldGrad)"
        stroke="#594410"
        strokeWidth="1.5"
        filter="url(#shadow)"
      />

      {/* White Dove at Triangle Peak */}
      <g transform="translate(100, 32) scale(0.65)">
        <path
          d="M 0,-5 C -8,-15 -22,-12 -28,-3 C -18,-2 -10,4 -5,8 C -10,14 -12,22 0,16 C 12,22 10,14 5,8 C 10,4 18,-2 28,-3 C 22,-12 8,-15 0,-5 Z"
          fill="#FFFFFF"
          stroke="#333333"
          strokeWidth="0.8"
        />
        <circle cx="0" cy="-2" r="3" fill="#FFFFFF" />
      </g>

      {/* Computer / Tech Monitor */}
      <g transform="translate(100, 68) scale(0.7)">
        <rect x="-16" y="-14" width="32" height="22" rx="2" fill="#E5E7EB" stroke="#374151" strokeWidth="1.2" />
        <rect x="-13" y="-11" width="26" height="16" rx="1" fill="#1F2937" />
        {/* Screen Graphic / Atom inside Monitor */}
        <circle cx="0" cy="-3" r="3" fill="#38BDF8" />
        <ellipse cx="0" cy="-3" rx="7" ry="2.5" fill="none" stroke="#F59E0B" strokeWidth="0.8" transform="rotate(30 0 -3)" />
        <path d="M -4,8 L 4,8 L 6,13 L -6,13 Z" fill="#9CA3AF" />
        <rect x="-12" y="13" width="24" height="2.5" rx="1" fill="#4B5563" />
      </g>

      {/* Gear & Human Head with Atom in Center */}
      <g transform="translate(100, 105) scale(0.75)">
        {/* Gear */}
        <circle cx="0" cy="0" r="18" fill="#374151" stroke="#1F2937" strokeWidth="1" />
        <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
        {/* Head profile / science symbols */}
        <path
          d="M -7,-10 C -2,-12 6,-10 8,-4 C 10,-1 8,4 6,7 C 5,10 7,12 8,13 L -8,13 C -8,9 -7,5 -9,1 C -10,-4 -8,-8 -7,-10 Z"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="0.8"
        />
        {/* Center Atom with colored orbits */}
        <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="none" stroke="#EF4444" strokeWidth="1" transform="rotate(30)" />
        <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="none" stroke="#3B82F6" strokeWidth="1" transform="rotate(-30)" />
        <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="none" stroke="#10B981" strokeWidth="1" transform="rotate(90)" />
        <circle cx="0" cy="0" r="2" fill="#F59E0B" />
      </g>

      {/* Oscilloscope Wave (Left of gear) */}
      <path
        d="M 52,106 Q 55,98 58,106 T 64,106 T 70,106"
        fill="none"
        stroke="#DC2626"
        strokeWidth="2.5"
      />

      {/* Beakers & Test Tubes (Right of gear) */}
      <g transform="translate(136, 104) scale(0.55)">
        <path d="M -8,12 L -5,0 L -2,0 L -2,12 Z" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="1.2" />
        <path d="M 0,12 L 0,3 L 3,3 L 3,12 Z" fill="#10B981" stroke="#065F46" strokeWidth="1.2" />
        <path d="M 6,12 L 8,-3 L 13,-3 L 15,12 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
      </g>

      {/* Open Book with Philippine Flag Colors at Base */}
      <g transform="translate(100, 136) scale(0.85)">
        {/* Book Base / Spreads */}
        <path
          d="M -36,8 C -18,2 -6,3 0,7 C 6,3 18,2 36,8 L 34,14 C 18,8 6,9 0,13 C -6,9 -18,8 -34,14 Z"
          fill="#FFFFFF"
          stroke="#1F2937"
          strokeWidth="1.2"
        />
        {/* Left Page (Philippine Flag Motif) */}
        <path
          d="M -34,7 C -18,1 -6,2 0,6 L 0,1 C -6,-3 -18,-4 -34,2 Z"
          fill="#1D4ED8"
        />
        <path
          d="M -34,2 C -18,-4 -6,-3 0,1 L 0,-4 C -6,-8 -18,-9 -34,-3 Z"
          fill="#DC2626"
        />
        {/* Right Page (Graduates / Scholars silhouette) */}
        <path
          d="M 0,6 C 6,2 18,1 34,7 L 34,2 C 18,-4 6,-3 0,1 Z"
          fill="#F8FAFC"
        />
        <circle cx="16" cy="0" r="2.5" fill="#1E3A8A" />
        <path d="M 12,6 L 16,1 L 20,6 Z" fill="#1E3A8A" />
      </g>
    </svg>
  );
};
