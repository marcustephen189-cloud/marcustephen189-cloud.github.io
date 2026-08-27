import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Palette, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Image as ImageIcon,
  Building2,
  Sliders,
  Eye
} from 'lucide-react';
import { BrandingConfig, COLOR_PRESETS } from '../types/branding';
import { StecLogo } from './StecLogo';

interface BrandingModalProps {
  isOpen: boolean;
  onClose: () => void;
  branding: BrandingConfig;
  onSave: (updated: Partial<BrandingConfig>) => void;
}

export const BrandingModal: React.FC<BrandingModalProps> = ({
  isOpen,
  onClose,
  branding,
  onSave,
}) => {
  const [siteName, setSiteName] = useState(branding.siteName);
  const [tagline, setTagline] = useState(branding.tagline);
  const [institutionName, setInstitutionName] = useState(branding.institutionName);
  const [primaryColor, setPrimaryColor] = useState(branding.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(branding.secondaryColor);
  const [accentColor, setAccentColor] = useState(branding.accentColor);
  const [logoUrl, setLogoUrl] = useState<string | null>(branding.logoUrl);
  const [themeMode, setThemeMode] = useState(branding.themeMode);
  const [uploadError, setUploadError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoUrl(event.target.result as string);
        setUploadError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setLogoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setAccentColor(preset.accent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      siteName,
      tagline,
      institutionName,
      primaryColor,
      secondaryColor,
      accentColor,
      logoUrl,
      themeMode,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-fadeIn text-[#1A1A1A]">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border-2 border-[#1A1A1A] bg-[#FAF9F6] p-6 sm:p-8 shadow-editorial-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: secondaryColor }}
            >
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] opacity-60 block">Identity & Colors</span>
              <h3 className="font-serif text-2xl italic font-bold">Custom Branding Suite</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="border border-[#1A1A1A] p-1.5 hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          
          {/* Logo & Seal Upload Section */}
          <div className="border border-[#1A1A1A] bg-white p-5 shadow-editorial-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" style={{ color: secondaryColor }} />
                Brand Logo & Seal
              </span>
              {logoUrl && (
                <button
                  type="button"
                  onClick={handleResetLogo}
                  className="font-sans text-[10px] uppercase tracking-wider text-[#801424] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Reset to STEC Seal
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 p-3 rounded-lg bg-[#FAF9F6] border border-[#1A1A1A]/20">
              <div className="shrink-0 p-2 bg-white rounded-full border border-[#1A1A1A]/30 shadow-md">
                <StecLogo
                  customLogoUrl={logoUrl}
                  size={64}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <p className="font-sans text-xs font-semibold text-[#1A1A1A]">
                  {logoUrl ? "Custom Logo Active" : "Official STEC Lapu-Lapu City Seal (Default)"}
                </p>
                <p className="font-sans text-[11px] text-[#1A1A1A]/70 leading-relaxed">
                  Upload your institutional crest, club badge, or publication emblem. PNG, SVG, or JPG supported.
                </p>
                
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="brand-logo-file"
                  />
                  <label
                    htmlFor="brand-logo-file"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white font-sans text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#1A1A1A] transition-colors cursor-pointer shadow-xs"
                  >
                    <Upload className="h-3 w-3" /> Upload Logo
                  </label>
                  
                  <span className="font-sans text-[10px] text-[#1A1A1A]/50">Max 5MB</span>
                </div>
              </div>
            </div>
            {uploadError && (
              <p className="text-xs text-red-600 font-sans">{uploadError}</p>
            )}
          </div>

          {/* Color Schemes: STEC Blue & Maroon */}
          <div className="border border-[#1A1A1A] bg-white p-5 shadow-editorial-sm space-y-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold block mb-1">
                Color Palette & Theme
              </span>
              <p className="font-sans text-xs text-[#1A1A1A]/70">
                Crafted around the iconic STEC Globe Blue and Lapu-Lapu City Maroon Red ring.
              </p>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COLOR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-3 border text-left transition-all cursor-pointer flex items-center justify-between ${
                    primaryColor === preset.primary && secondaryColor === preset.secondary
                      ? 'border-[#1A1A1A] bg-[#FAF9F6] shadow-sm'
                      : 'border-[#1A1A1A]/30 hover:border-[#1A1A1A] bg-white'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-sans text-xs font-semibold text-[#1A1A1A]">
                      {preset.name}
                    </div>
                    <div className="font-sans text-[10px] text-[#1A1A1A]/60 line-clamp-1">
                      {preset.description}
                    </div>
                  </div>
                  
                  {/* Swatches */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <div className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: preset.primary }} title="Primary Blue" />
                    <div className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: preset.secondary }} title="Secondary Maroon" />
                    <div className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: preset.accent }} title="Accent Gold" />
                  </div>
                </button>
              ))}
            </div>

            {/* Individual Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#1A1A1A]/15">
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                  Primary (Blue)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#1A1A1A] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full border border-[#1A1A1A] bg-[#FAF9F6] px-2 py-1 font-mono text-xs text-[#1A1A1A] uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                  Secondary (Maroon Red)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#1A1A1A] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full border border-[#1A1A1A] bg-[#FAF9F6] px-2 py-1 font-mono text-xs text-[#1A1A1A] uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                  Accent (Gold / Brass)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#1A1A1A] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full border border-[#1A1A1A] bg-[#FAF9F6] px-2 py-1 font-mono text-xs text-[#1A1A1A] uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Website Name & Subtitle */}
          <div className="border border-[#1A1A1A] bg-white p-5 shadow-editorial-sm space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold block">
              Website Identity & Titles
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Website Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="e.g. Neuron flipbook"
                  className="w-full border border-[#1A1A1A] bg-[#FAF9F6] p-2.5 font-serif text-sm italic font-bold text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                  Institution / Organization
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="Science and Technology Education Center"
                  className="w-full border border-[#1A1A1A] bg-[#FAF9F6] p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                Header Subtitle / Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Lapu-Lapu City Digital Folio & Flipbook Archive"
                className="w-full border border-[#1A1A1A] bg-[#FAF9F6] p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1A1A1A]">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#1A1A1A] bg-transparent px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-[#1A1A1A] px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-white hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5 shadow-editorial-sm"
              style={{ backgroundColor: secondaryColor }}
            >
              <Check className="h-3.5 w-3.5" /> Save Branding
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
