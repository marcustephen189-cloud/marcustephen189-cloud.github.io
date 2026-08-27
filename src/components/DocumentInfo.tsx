import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  Tag, 
  Bookmark, 
  Share2, 
  Search, 
  Volume2, 
  Smartphone, 
  ShieldCheck, 
  BookMarked,
  ArrowUpRight,
  Palette,
  Check
} from 'lucide-react';
import { FlipbookConfig } from '../types/flipbook';
import { BrandingConfig } from '../types/branding';
import { StecLogo } from './StecLogo';

interface DocumentInfoProps {
  config: FlipbookConfig;
  branding: BrandingConfig;
  onOpenShare: () => void;
  onOpenEmbedModal: () => void;
  onOpenBrandingModal: () => void;
}

export const DocumentInfo: React.FC<DocumentInfoProps> = ({
  config,
  branding,
  onOpenShare,
  onOpenEmbedModal,
  onOpenBrandingModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'notes'>('overview');
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');

  const hasActiveFlipbook = Boolean(config.embedUrl || config.embedHtml);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, newNote.trim()]);
    setNewNote('');
  };

  const handleRemoveNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-[#FAF9F6] text-[#1A1A1A] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        
        {/* Curated Editorial Layout: Main Content + Aside Sidebar */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Main Left Section (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tabs */}
            <div className="flex border-b border-[#1A1A1A]">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-b-2 font-bold text-[#1A1A1A]'
                    : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                }`}
                style={{
                  borderBottomColor: activeTab === 'overview' ? branding.secondaryColor : 'transparent'
                }}
              >
                Publication Overview
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`ml-8 pb-3 font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === 'features'
                    ? 'border-b-2 font-bold text-[#1A1A1A]'
                    : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                }`}
                style={{
                  borderBottomColor: activeTab === 'features' ? branding.secondaryColor : 'transparent'
                }}
              >
                Interactive Specifications
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`ml-8 pb-3 font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'border-b-2 font-bold text-[#1A1A1A]'
                    : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                }`}
                style={{
                  borderBottomColor: activeTab === 'notes' ? branding.secondaryColor : 'transparent'
                }}
              >
                Reader Notes ({notes.length})
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <span 
                    className="text-[10px] font-sans uppercase tracking-[0.25em] font-bold block mb-1"
                    style={{ color: branding.primaryColor }}
                  >
                    {branding.institutionName}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] leading-tight">
                    {config.title}
                  </h3>
                  <p className="mt-4 text-base font-serif text-[#1A1A1A]/85 leading-relaxed sm:text-lg">
                    {config.description}
                  </p>
                </div>

                {/* Institutional Credentials Banner */}
                <div 
                  className="border-2 border-[#1A1A1A] p-5 bg-white shadow-editorial-sm flex flex-col sm:flex-row items-center gap-5"
                >
                  <div className="shrink-0 p-1.5 rounded-full border border-black/15 shadow-sm bg-white">
                    <StecLogo
                      customLogoUrl={branding.logoUrl}
                      size={54}
                      primaryColor={branding.primaryColor}
                      secondaryColor={branding.secondaryColor}
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left flex-1">
                    <h4 className="font-serif text-lg italic font-bold text-[#1A1A1A]">
                      {branding.institutionName} — Lapu-Lapu City
                    </h4>
                    <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed">
                      Official digital repository and reader powered by <strong className="text-[#1A1A1A]">{branding.siteName}</strong>. Designed for high-fidelity interactive academic journals, modules, and catalogues.
                    </p>
                  </div>
                  <button
                    onClick={onOpenBrandingModal}
                    className="shrink-0 border border-[#1A1A1A] px-3.5 py-2 font-sans text-[10px] uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                  >
                    Edit Branding
                  </button>
                </div>

                {/* Tags */}
                {config.tags && config.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1A1A1A]/10">
                    <span className="font-sans text-[10px] uppercase tracking-widest opacity-50">Tags:</span>
                    {config.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="border border-[#1A1A1A]/30 px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#1A1A1A]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Heyzine Integration Box */}
                <div className="border border-[#1A1A1A] p-6 bg-white shadow-editorial-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold"
                      style={{ color: branding.secondaryColor }}
                    >
                      Publication Integration Pipeline
                    </span>
                    <span className="font-mono text-[10px] opacity-50">HEYZINE 3D HTML5</span>
                  </div>
                  <p className="font-sans text-xs text-[#1A1A1A]/80 leading-relaxed">
                    This viewer is engineered to accept your Heyzine flipbook embed code or direct URL. Simply click below to supply the iframe code or change the publication details.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onOpenEmbedModal}
                      className="inline-flex items-center gap-2 border border-[#1A1A1A] text-white px-4 py-2 font-sans text-[10px] uppercase tracking-[0.18em] transition-colors cursor-pointer shadow-xs"
                      style={{ backgroundColor: branding.secondaryColor }}
                    >
                      Update Embed Code & Title <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Features */}
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-[#1A1A1A] p-6 bg-white shadow-editorial-sm space-y-2">
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: branding.primaryColor }}>01 / Dynamics</div>
                  <h4 className="font-serif text-xl italic font-bold">3D Realistic Page Engine</h4>
                  <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed">
                    GPU-accelerated realistic page curvature with real-time shadow projection, lighting highlights, and tactile page-curl physics.
                  </p>
                </div>

                <div className="border border-[#1A1A1A] p-6 bg-white shadow-editorial-sm space-y-2">
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: branding.primaryColor }}>02 / Clarity</div>
                  <h4 className="font-serif text-xl italic font-bold">Infinite Crisp Vector Zoom</h4>
                  <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed">
                    Vector typography guarantees crystal clarity at any zoom level, from double-page spreads to intricate footnotes and diagrams.
                  </p>
                </div>

                <div className="border border-[#1A1A1A] p-6 bg-white shadow-editorial-sm space-y-2">
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: branding.secondaryColor }}>03 / Responsive</div>
                  <h4 className="font-serif text-xl italic font-bold">Mobile & Desktop Fluidity</h4>
                  <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed">
                    Automatically adapts from dual-page magazine layout on desktop monitors to intuitive single-page touch gestures on smartphones.
                  </p>
                </div>

                <div className="border border-[#1A1A1A] p-6 bg-white shadow-editorial-sm space-y-2">
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: branding.secondaryColor }}>04 / Media</div>
                  <h4 className="font-serif text-xl italic font-bold">Multimedia Hotspots</h4>
                  <p className="font-sans text-xs text-[#1A1A1A]/70 leading-relaxed">
                    Supports embedded YouTube, Vimeo videos, audio narration, hyperlink hotspots, and interactive forms directly inside pages.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Notes */}
            {activeTab === 'notes' && (
              <div className="border border-[#1A1A1A] p-6 bg-white shadow-editorial-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold">
                    Personal Reading Annotations
                  </span>
                  <span className="text-[10px] font-sans uppercase opacity-40">Local Session Storage</span>
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter an annotation, reference citation, or bookmark..."
                    className="flex-1 border border-[#1A1A1A] bg-[#FAF9F6] px-3 py-2 font-sans text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="border border-[#1A1A1A] px-4 py-2 font-sans text-[10px] uppercase tracking-widest text-white transition-colors cursor-pointer"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    Add
                  </button>
                </form>

                {notes.length === 0 ? (
                  <p className="font-serif italic text-sm text-[#1A1A1A]/50 py-4">
                    No annotations recorded yet. Add reference points or page numbers while reviewing the publication.
                  </p>
                ) : (
                  <ul className="divide-y divide-[#1A1A1A]/10 pt-2">
                    {notes.map((note, i) => (
                      <li key={i} className="py-2.5 flex items-center justify-between font-sans text-xs">
                        <span>{note}</span>
                        <button
                          onClick={() => handleRemoveNote(i)}
                          className="text-[#1A1A1A]/40 hover:text-red-600 font-mono text-sm ml-4"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

          </div>

          {/* Right Aside Sidebar (4 cols) */}
          <aside className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#1A1A1A] lg:pl-10 pt-8 lg:pt-0 flex flex-col justify-between space-y-8">
            <div className="space-y-8">
              
              {/* Metadata block */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[10px] font-sans uppercase tracking-[0.25em] font-bold block"
                    style={{ color: branding.primaryColor }}
                  >
                    Metadata
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif italic leading-none">
                  {config.title}
                </h3>
                <p className="font-sans text-xs uppercase tracking-widest opacity-60">
                  {config.subtitle}
                </p>
              </div>

              {/* Grid attributes */}
              <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-[#1A1A1A]/10">
                <div>
                  <span className="block text-[10px] font-sans uppercase opacity-50 tracking-wider">Format</span>
                  <span className="text-xs font-sans font-medium">Interactive Heyzine</span>
                </div>
                <div>
                  <span className="block text-[10px] font-sans uppercase opacity-50 tracking-wider">Pages</span>
                  <span className="text-xs font-sans font-medium">{config.totalPages} Count</span>
                </div>
                <div>
                  <span className="block text-[10px] font-sans uppercase opacity-50 tracking-wider">Publisher</span>
                  <span className="text-xs font-sans font-medium truncate block max-w-[120px]">{config.author}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-sans uppercase opacity-50 tracking-wider">Edition</span>
                  <span className="text-xs font-sans font-medium">{config.publishedDate}</span>
                </div>
              </div>

              {/* Branding Info Box */}
              <div className="border border-[#1A1A1A]/20 p-4 bg-white space-y-2">
                <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-wider font-semibold">
                  <span>Custom Color Scheme</span>
                  <span className="flex gap-1">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: branding.primaryColor }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: branding.secondaryColor }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: branding.accentColor }} />
                  </span>
                </div>
                <p className="text-[11px] font-sans text-[#1A1A1A]/70">
                  Primary Blue: <code className="font-mono text-[10px]">{branding.primaryColor}</code> &bull; Maroon Red: <code className="font-mono text-[10px]">{branding.secondaryColor}</code>
                </p>
              </div>
            </div>

            {/* Status & Actions Box */}
            <div className="space-y-4 pt-6 border-t border-[#1A1A1A]/10">
              <div className="flex items-center gap-3">
                <div 
                  className={`w-2.5 h-2.5 rounded-full ${hasActiveFlipbook ? 'bg-emerald-600' : 'bg-red-500'}`}
                />
                <span className="text-[10px] font-sans uppercase tracking-[0.15em] font-medium">
                  Status: {hasActiveFlipbook ? 'Active Live Flipbook' : 'Awaiting Embed Code'}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onOpenShare}
                  className="flex-1 h-10 border border-[#1A1A1A] flex items-center justify-center font-sans text-[10px] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                >
                  Share
                </button>
                <button
                  onClick={onOpenEmbedModal}
                  className="flex-1 h-10 border border-[#1A1A1A] flex items-center justify-center font-sans text-[10px] uppercase tracking-widest text-white transition-all cursor-pointer shadow-xs"
                  style={{ backgroundColor: branding.secondaryColor }}
                >
                  Configure
                </button>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
};
