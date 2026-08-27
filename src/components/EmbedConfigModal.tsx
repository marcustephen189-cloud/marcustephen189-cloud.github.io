import React, { useState } from 'react';
import { X, Code, Check, Sliders, Palette } from 'lucide-react';
import { FlipbookConfig } from '../types/flipbook';
import { parseHeyzineInput } from '../utils/heyzineParser';

interface EmbedConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FlipbookConfig;
  onSave: (updated: Partial<FlipbookConfig>) => void;
}

export const EmbedConfigModal: React.FC<EmbedConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [embedCodeInput, setEmbedCodeInput] = useState(config.embedHtml || config.embedUrl || '');
  const [title, setTitle] = useState(config.title);
  const [subtitle, setSubtitle] = useState(config.subtitle);
  const [description, setDescription] = useState(config.description);
  const [author, setAuthor] = useState(config.author);
  const [publishedDate, setPublishedDate] = useState(config.publishedDate);
  const [aspectRatio, setAspectRatio] = useState(config.aspectRatio);
  const [totalPages, setTotalPages] = useState(config.totalPages || 24);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (embedCodeInput.trim()) {
      const parsed = parseHeyzineInput(embedCodeInput);
      if (!parsed.isValid) {
        setError('Please enter a valid Heyzine iframe code or URL (e.g. https://heyzine.com/flip-book/...)');
        return;
      }
      onSave({
        title,
        subtitle,
        description,
        author,
        publishedDate,
        aspectRatio,
        totalPages,
        embedUrl: parsed.url,
        embedHtml: parsed.rawHtml || embedCodeInput,
      });
    } else {
      // Clear flipbook embed
      onSave({
        title,
        subtitle,
        description,
        author,
        publishedDate,
        aspectRatio,
        totalPages,
        embedUrl: '',
        embedHtml: '',
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/70 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#1A1A1A] bg-[#FAF9F6] p-8 text-[#1A1A1A] shadow-editorial-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] opacity-50 block">Configuration</span>
            <h3 className="font-serif text-2xl italic font-bold">Folio Embed & Curatorial Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="border border-[#1A1A1A] p-1.5 hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-6">
          {/* Embed Code / URL */}
          <div className="border border-[#1A1A1A] p-5 bg-white shadow-editorial-sm space-y-2">
            <label className="block text-[10px] font-sans uppercase tracking-[0.2em] font-semibold">
              Heyzine Embed Iframe Code or URL
            </label>
            <p className="font-sans text-xs text-[#1A1A1A]/70">
              Paste the <code className="bg-[#FAF9F6] border border-[#1A1A1A]/30 px-1 py-0.5 font-mono text-[11px]">&lt;iframe&gt;</code> snippet from your Heyzine account or the direct link to activate the flipbook.
            </p>
            <textarea
              rows={4}
              value={embedCodeInput}
              onChange={(e) => {
                setEmbedCodeInput(e.target.value);
                setError('');
              }}
              placeholder='<iframe allowfullscreen="allowfullscreen" scrolling="no" class="fp-iframe" src="https://heyzine.com/flip-book/..."></iframe>'
              className="w-full border border-[#1A1A1A] bg-[#FAF9F6] p-3 font-mono text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:bg-white"
            />
            {error && (
              <p className="text-xs text-red-600 font-sans tracking-wide">{error}</p>
            )}
          </div>

          {/* Aspect Ratio & Page Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1.5">
                Stage Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full border border-[#1A1A1A] bg-white p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none"
              >
                <option value="16/9">16:9 Standard Widescreen</option>
                <option value="4/3">4:3 Classic Standard</option>
                <option value="16/10">16:10 Wide Edition</option>
                <option value="a4-spread">A4 Double-Page Spread</option>
                <option value="full">Full Viewport Height (85vh)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1.5">
                Total Page Count
              </label>
              <input
                type="number"
                value={totalPages}
                onChange={(e) => setTotalPages(Number(e.target.value) || 0)}
                className="w-full border border-[#1A1A1A] bg-white p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none"
              />
            </div>
          </div>

          {/* Metadata details */}
          <div className="border-t border-[#1A1A1A]/20 pt-5 space-y-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] opacity-50 block">
              Publication Metadata
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-[#1A1A1A] bg-white p-2.5 font-serif text-sm italic text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1">
                  Subtitle / Archive Ref
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full border border-[#1A1A1A] bg-white p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1">
                  Author / Studio
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full border border-[#1A1A1A] bg-white p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1">
                  Edition Period
                </label>
                <input
                  type="text"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-full border border-[#1A1A1A] bg-white p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1">
                Curatorial Statement / Summary
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-[#1A1A1A] bg-white p-2.5 font-sans text-xs text-[#1A1A1A] focus:outline-none resize-none"
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
              className="border border-[#1A1A1A] bg-[#1A1A1A] px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
