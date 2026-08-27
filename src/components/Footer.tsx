import React from 'react';
import { ExternalLink, Palette } from 'lucide-react';
import { FlipbookConfig } from '../types/flipbook';
import { BrandingConfig } from '../types/branding';
import { StecLogo } from './StecLogo';

interface FooterProps {
  config: FlipbookConfig;
  branding: BrandingConfig;
  onOpenEmbedModal: () => void;
  onOpenBrandingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  config, 
  branding, 
  onOpenEmbedModal, 
  onOpenBrandingModal 
}) => {
  return (
    <footer className="border-t border-[#1A1A1A] bg-[#FAF9F6] px-6 sm:px-10 py-8 font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3.5">
          <StecLogo
            customLogoUrl={branding.logoUrl}
            size={34}
            primaryColor={branding.primaryColor}
            secondaryColor={branding.secondaryColor}
          />
          <div className="flex flex-col">
            <span className="font-bold tracking-widest text-[#1A1A1A]">
              &copy; {new Date().getFullYear()} {branding.siteName}
            </span>
            <span className="opacity-60 text-[9px] lowercase tracking-normal">
              {branding.institutionName} • Lapu-Lapu City
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 opacity-80">
          <button
            onClick={onOpenBrandingModal}
            className="hover:underline flex items-center gap-1 cursor-pointer"
            style={{ color: branding.secondaryColor }}
          >
            <Palette className="h-3 w-3" /> Brand Settings
          </button>
          
          <button
            onClick={onOpenEmbedModal}
            className="hover:underline cursor-pointer"
          >
            Configure Embed
          </button>

          <span>Science & Tech Hub</span>
          
          <a
            href="https://heyzine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline text-[#1A1A1A]"
          >
            Heyzine 3D Engine <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

      </div>
    </footer>
  );
};
