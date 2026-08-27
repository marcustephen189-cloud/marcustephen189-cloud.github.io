import React from 'react';
import { 
  Share2, 
  Maximize, 
  Minimize, 
  Code, 
  HelpCircle, 
  Palette,
  Sparkles,
  Layers
} from 'lucide-react';
import { FlipbookConfig } from '../types/flipbook';
import { BrandingConfig } from '../types/branding';
import { StecLogo } from './StecLogo';

interface NavbarProps {
  config: FlipbookConfig;
  branding: BrandingConfig;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenShare: () => void;
  onOpenConfig: () => void;
  onOpenBranding: () => void;
  onOpenShortcuts: () => void;
  hasActiveFlipbook: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  branding,
  isFullscreen,
  onToggleFullscreen,
  onOpenShare,
  onOpenConfig,
  onOpenBranding,
  onOpenShortcuts,
  hasActiveFlipbook,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1A1A1A] bg-[#FAF9F6]/95 backdrop-blur-md text-[#1A1A1A]">
      {/* Top micro institutional banner */}
      <div 
        className="w-full px-6 py-1 text-white font-sans text-[9px] uppercase tracking-[0.25em] flex items-center justify-between transition-colors"
        style={{ backgroundColor: branding.secondaryColor }}
      >
        <div className="flex items-center gap-2">
          <span>★ {branding.institutionName} ★</span>
          <span className="hidden md:inline opacity-70">Lapu-Lapu City Official Flipbook Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBranding}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Palette className="h-2.5 w-2.5" /> Customize Branding & Colors
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        
        {/* Left Branding & Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenBranding}
            className="group relative cursor-pointer focus:outline-none transition-transform hover:scale-105"
            title="Click to customize logo & branding"
          >
            <StecLogo
              customLogoUrl={branding.logoUrl}
              size={46}
              primaryColor={branding.primaryColor}
              secondaryColor={branding.secondaryColor}
            />
            <span className="sr-only">Change Logo</span>
          </button>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-2.5">
              <h1 className="font-serif text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1A1A1A] leading-none">
                {branding.siteName}
              </h1>
              
              {hasActiveFlipbook ? (
                <span 
                  className="hidden md:inline-flex items-center gap-1 font-sans text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full text-white font-semibold"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Live Publication
                </span>
              ) : (
                <span 
                  className="hidden md:inline-flex items-center gap-1 font-sans text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full text-white font-semibold"
                  style={{ backgroundColor: branding.secondaryColor }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-ping" />
                  Awaiting Embed Code
                </span>
              )}
            </div>

            <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]/70 truncate max-w-[280px] sm:max-w-md">
              {branding.tagline}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Branding Palette Button */}
          <button
            onClick={onOpenBranding}
            className="inline-flex items-center gap-1.5 border border-[#1A1A1A]/50 bg-white px-3 py-2 font-sans text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[#1A1A1A] transition-colors hover:border-[#1A1A1A] hover:bg-[#FAF9F6] cursor-pointer shadow-xs"
            title="Upload Logo & Adjust Blue / Maroon Palette"
          >
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: branding.primaryColor }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: branding.secondaryColor }} />
            </div>
            <span className="hidden lg:inline">Branding</span>
          </button>

          {/* Embed Configuration Button */}
          <button
            onClick={onOpenConfig}
            className="inline-flex items-center gap-1.5 border border-[#1A1A1A] px-3.5 sm:px-4 py-2 font-sans text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white transition-all cursor-pointer shadow-editorial-sm"
            style={{ 
              backgroundColor: hasActiveFlipbook ? '#1A1A1A' : branding.secondaryColor 
            }}
            title="Configure Flipbook Embed or Details"
          >
            <Code className="h-3.5 w-3.5" />
            <span>{hasActiveFlipbook ? 'Edit Embed' : 'Enter Embed Code'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            className="inline-flex items-center gap-1.5 border border-[#1A1A1A]/40 bg-transparent px-3 py-2 font-sans text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[#1A1A1A] transition-colors hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white cursor-pointer"
            title="Share Publication"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Help & Shortcuts */}
          <button
            onClick={onOpenShortcuts}
            className="hidden sm:inline-flex items-center justify-center border border-[#1A1A1A]/40 bg-transparent p-2 text-[#1A1A1A] transition-colors hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white cursor-pointer"
            title="Keyboard Shortcuts & Guide"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* Fullscreen Mode */}
          <button
            onClick={onToggleFullscreen}
            className="inline-flex items-center gap-1.5 border border-[#1A1A1A]/40 bg-transparent px-3 py-2 font-sans text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[#1A1A1A] transition-colors hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen Mode (F)'}
          >
            {isFullscreen ? (
              <>
                <Minimize className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Exit</span>
              </>
            ) : (
              <>
                <Maximize className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Full</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
