import React, { useState } from 'react';
import { 
  Maximize, 
  ExternalLink, 
  RotateCcw, 
  Layers, 
  Sparkles, 
  Code, 
  Check, 
  Eye, 
  Monitor,
  Palette
} from 'lucide-react';
import { FlipbookConfig } from '../types/flipbook';
import { BrandingConfig } from '../types/branding';
import { parseHeyzineInput } from '../utils/heyzineParser';
import { StecLogo } from './StecLogo';

interface FlipbookViewerProps {
  config: FlipbookConfig;
  branding: BrandingConfig;
  onUpdateConfig: (updated: Partial<FlipbookConfig>) => void;
  onOpenEmbedModal: () => void;
  onOpenBrandingModal: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  config,
  branding,
  onUpdateConfig,
  onOpenEmbedModal,
  onOpenBrandingModal,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [theaterMode, setTheaterMode] = useState(false);

  const activeUrl = config.embedUrl || (config.embedHtml ? parseHeyzineInput(config.embedHtml).url : '');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) {
      setInputError('Please enter a Heyzine iframe code or publication URL');
      return;
    }

    const parsed = parseHeyzineInput(quickInput);
    if (parsed.isValid && parsed.url) {
      onUpdateConfig({
        embedUrl: parsed.url,
        embedHtml: parsed.rawHtml || quickInput,
      });
      setQuickInput('');
      setInputError('');
    } else {
      setInputError('Invalid Heyzine embed code or URL. Please verify your iframe or Heyzine link.');
    }
  };

  const handleLoadDemo = () => {
    onUpdateConfig({
      embedUrl: 'https://heyzine.com/flip-book/3f7e6f8efb.html',
      embedHtml: '<iframe allowfullscreen="allowfullscreen" scrolling="no" class="fp-iframe" src="https://heyzine.com/flip-book/3f7e6f8efb.html" style="border: 1px solid lightgray; width: 100%; height: 100%;"></iframe>',
      title: 'Neuron Science & Technology Digest',
      subtitle: 'STEC Lapu-Lapu City Special Digital Edition',
      author: 'STEC Editorial Board',
      publishedDate: 'Academic Year 2026',
    });
  };

  const handleClearFlipbook = () => {
    onUpdateConfig({
      embedUrl: '',
      embedHtml: '',
    });
  };

  const handleRefreshIframe = () => {
    setReloadKey((prev) => prev + 1);
  };

  // Compute container aspect ratio class
  const getAspectRatioClass = () => {
    if (isFullscreen) return 'h-screen w-screen';
    switch (config.aspectRatio) {
      case '16/9':
        return 'aspect-[16/9] w-full min-h-[460px] max-h-[820px]';
      case '4/3':
        return 'aspect-[4/3] w-full min-h-[460px] max-h-[860px]';
      case '16/10':
        return 'aspect-[16/10] w-full min-h-[460px] max-h-[840px]';
      case 'a4-spread':
        return 'aspect-[1.414/1] w-full min-h-[460px] max-h-[840px]';
      case 'full':
        return 'h-[85vh] w-full';
      default:
        return 'aspect-[16/9] w-full min-h-[460px] max-h-[820px]';
    }
  };

  return (
    <section className={`relative transition-all duration-300 ${theaterMode ? 'py-4 bg-[#0d131f] text-white' : 'py-8 sm:py-12 bg-[#F2F0EB] text-[#1A1A1A] border-b border-[#1A1A1A]'}`}>
      <div className={`mx-auto transition-all ${theaterMode || isFullscreen ? 'max-w-full px-2' : 'max-w-7xl px-4 sm:px-10'}`}>
        
        {/* Curated Control Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Ratio and Architecture indicators */}
          <div className="flex items-center gap-3">
            <span 
              className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold flex items-center gap-2"
              style={{ color: branding.primaryColor }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: branding.secondaryColor }}></span>
              {branding.siteName} Stage
            </span>

            {/* Aspect Ratio Selector */}
            <div className="hidden sm:flex items-center gap-1 border border-[#1A1A1A] bg-[#FAF9F6] p-0.5">
              <span className="px-2 text-[9px] font-sans uppercase tracking-widest text-[#1A1A1A]/60">Ratio:</span>
              {(['16/9', '4/3', '16/10', 'a4-spread', 'full'] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => onUpdateConfig({ aspectRatio: ratio })}
                  className={`px-2 py-0.5 font-sans text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
                    config.aspectRatio === ratio
                      ? 'text-white font-medium'
                      : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                  }`}
                  style={{
                    backgroundColor: config.aspectRatio === ratio ? branding.primaryColor : 'transparent'
                  }}
                >
                  {ratio === 'a4-spread' ? 'A4 Spread' : ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Quick viewer controls */}
          <div className="flex items-center gap-2">
            {activeUrl && (
              <>
                <button
                  onClick={() => setTheaterMode(!theaterMode)}
                  className={`inline-flex items-center gap-1.5 border border-[#1A1A1A] px-2.5 py-1 font-sans text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${
                    theaterMode
                      ? 'bg-white text-[#1A1A1A]'
                      : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                  }`}
                  title="Toggle Ambient Theater View"
                >
                  <Monitor className="h-3 w-3" />
                  <span className="hidden md:inline">{theaterMode ? 'Exit Theater' : 'Theater'}</span>
                </button>

                <button
                  onClick={handleRefreshIframe}
                  className="inline-flex items-center gap-1.5 border border-[#1A1A1A] bg-[#FAF9F6] px-2.5 py-1 font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                  title="Reload publication"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span className="hidden md:inline">Reload</span>
                </button>

                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#1A1A1A] bg-[#FAF9F6] px-2.5 py-1 font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                  title="Open source Heyzine viewer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span className="hidden md:inline">Source Link</span>
                </a>

                <button
                  onClick={handleClearFlipbook}
                  className="inline-flex items-center gap-1 border border-[#1A1A1A]/40 bg-transparent px-2.5 py-1 font-sans text-[10px] uppercase tracking-widest text-[#801424] hover:bg-[#801424] hover:text-white transition-colors cursor-pointer"
                  title="Reset stage"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* The Frame / Canvas Container */}
        <div className="flex w-full items-stretch">
          {/* Left Vertical Spine / Rail */}
          {!theaterMode && !isFullscreen && (
            <div 
              className="hidden lg:flex w-16 border-y border-l border-[#1A1A1A] bg-[#FAF9F6] flex-col justify-between items-center py-8 shrink-0 select-none"
              style={{ borderLeftColor: branding.secondaryColor }}
            >
              <div 
                className="rotate-[-90deg] whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.4em] font-bold"
                style={{ color: branding.primaryColor }}
              >
                STEC / NEURON
              </div>
              <div className="w-px h-16 bg-[#1A1A1A]/20"></div>
              <div 
                className="rotate-[-90deg] whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.4em] font-semibold"
                style={{ color: branding.secondaryColor }}
              >
                HEYZINE 3D
              </div>
            </div>
          )}

          {/* Main Display Stage */}
          <div
            className={`relative flex-1 overflow-hidden border-2 border-[#1A1A1A] bg-white transition-all duration-300 ${
              theaterMode ? 'shadow-2xl' : 'shadow-editorial'
            } ${getAspectRatioClass()}`}
          >
            {activeUrl ? (
              /* ACTIVE HEYZINE EMBED IFRAME */
              <div className="relative h-full w-full bg-white">
                <iframe
                  key={reloadKey}
                  src={activeUrl}
                  title={config.title || "Heyzine Digital Flipbook"}
                  allowFullScreen
                  allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                  scrolling="no"
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              /* AWAITING PUBLICATION EMBED - NEURON STEC BRANDED STAGE */
              <div className="flex h-full w-full flex-col items-center justify-center p-8 sm:p-12 text-center relative bg-white bg-grain select-none">
                
                {/* Architectural Corner Badges */}
                <div 
                  className="absolute top-6 right-6 font-sans text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 border border-[#1A1A1A]/20"
                  style={{ color: branding.primaryColor }}
                >
                  {branding.institutionName}
                </div>
                <div className="absolute bottom-6 left-6 font-sans text-[10px] uppercase tracking-tighter opacity-60">
                  [ System: STEC-NEURON-FLIP ]
                </div>
                <div className="absolute top-6 left-6 font-sans text-[10px] uppercase tracking-tighter opacity-60">
                  Edition: {config.publishedDate}
                </div>
                <div 
                  className="absolute bottom-6 right-6 font-sans text-[10px] uppercase tracking-wider font-bold"
                  style={{ color: branding.secondaryColor }}
                >
                  Status: Ready for Heyzine Embed
                </div>

                {/* Central Editorial Hero */}
                <div className="relative z-10 max-w-lg px-4 space-y-6">
                  
                  {/* Brand Seal Emblem */}
                  <div className="mx-auto flex items-center justify-center transition-transform hover:scale-105">
                    <StecLogo
                      customLogoUrl={branding.logoUrl}
                      size={92}
                      primaryColor={branding.primaryColor}
                      secondaryColor={branding.secondaryColor}
                    />
                  </div>

                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl italic text-[#1A1A1A] tracking-tight">
                      Awaiting Publication Embed Code
                    </h2>
                    <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] opacity-80 leading-relaxed max-w-md mx-auto">
                      Once provided, your Heyzine digital publication will be rendered here with high-definition 3D page turning, vector zoom, and full search.
                    </p>
                  </div>

                  {/* Immediate Quick Code Form */}
                  <form onSubmit={handleQuickSubmit} className="pt-2 max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={quickInput}
                        onChange={(e) => {
                          setQuickInput(e.target.value);
                          setInputError('');
                        }}
                        placeholder='Paste Heyzine <iframe> code or URL...'
                        className="flex-1 border border-[#1A1A1A] bg-[#FAF9F6] px-3.5 py-2.5 font-sans text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:bg-white transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 border border-[#1A1A1A] text-white font-sans text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shrink-0 shadow-xs"
                        style={{ backgroundColor: branding.secondaryColor }}
                      >
                        Apply
                      </button>
                    </div>
                    {inputError && (
                      <p className="mt-2 text-xs text-red-600 font-sans tracking-wide text-left">
                        {inputError}
                      </p>
                    )}
                  </form>

                  {/* Action buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={onOpenEmbedModal}
                      className="px-5 py-2 border border-[#1A1A1A] text-white font-sans text-[10px] uppercase tracking-[0.18em] transition-colors cursor-pointer"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      Configure Flipbook
                    </button>

                    <button
                      onClick={onOpenBrandingModal}
                      className="px-5 py-2 border border-[#1A1A1A] bg-white font-sans text-[10px] uppercase tracking-[0.18em] text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                    >
                      Adjust Branding / Logo
                    </button>

                    <button
                      onClick={handleLoadDemo}
                      className="px-5 py-2 border border-[#1A1A1A]/40 bg-transparent font-sans text-[10px] uppercase tracking-[0.18em] hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer text-[#1A1A1A]/80"
                    >
                      Sample Demo
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Viewer Sub-bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">
          <div className="flex items-center gap-3">
            <span className="font-semibold" style={{ color: branding.primaryColor }}>
              &bull; {branding.siteName} Engine
            </span>
            <span className="hidden sm:inline">&bull; 3D Realistic Turn</span>
            <span className="hidden md:inline">&bull; Touch & Mouse-Wheel Zoom</span>
          </div>
          <div>
            <span>Press <kbd className="border border-[#1A1A1A]/40 px-1 py-0.5 font-mono text-[9px]">F</kbd> for Fullscreen</span>
          </div>
        </div>

      </div>
    </section>
  );
};
