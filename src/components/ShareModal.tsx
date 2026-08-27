import React, { useState } from 'react';
import { X, Copy, Check, Share2, Twitter, Linkedin, Facebook, Mail } from 'lucide-react';
import { FlipbookConfig } from '../types/flipbook';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FlipbookConfig;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com';
  const embedCode = `<iframe src="${config.embedUrl || currentUrl}" width="100%" height="600" allowfullscreen="true" style="border:1px solid #1a1a1a;"></iframe>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(config.embedUrl || currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const shareText = encodeURIComponent(`Explore "${config.title}" on Neuron Flipbook (Science and Technology Education Center)`);
  const shareTargetUrl = encodeURIComponent(config.embedUrl || currentUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/70 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg border border-[#1A1A1A] bg-[#FAF9F6] p-8 text-[#1A1A1A] shadow-editorial-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] opacity-50 block">Distribution</span>
            <h3 className="font-serif text-2xl italic font-bold">Share Folio Edition</h3>
          </div>
          <button
            onClick={onClose}
            className="border border-[#1A1A1A] p-1.5 hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Direct Link */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-2">
              Publication Direct Access URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={config.embedUrl || currentUrl}
                className="flex-1 border border-[#1A1A1A] bg-white px-3.5 py-2.5 font-mono text-xs text-[#1A1A1A] focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 border border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2.5 font-sans text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-2">
              External Broadcast
            </label>
            <div className="grid grid-cols-4 gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareTargetUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 border border-[#1A1A1A]/30 bg-white p-3 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
              >
                <Twitter className="h-4 w-4" />
                <span className="font-sans text-[9px] uppercase tracking-wider">X / Tweet</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareTargetUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 border border-[#1A1A1A]/30 bg-white p-3 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
              >
                <Linkedin className="h-4 w-4" />
                <span className="font-sans text-[9px] uppercase tracking-wider">LinkedIn</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareTargetUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 border border-[#1A1A1A]/30 bg-white p-3 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
              >
                <Facebook className="h-4 w-4" />
                <span className="font-sans text-[9px] uppercase tracking-wider">Facebook</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(config.title)}&body=${shareText}%20${shareTargetUrl}`}
                className="flex flex-col items-center gap-1.5 border border-[#1A1A1A]/30 bg-white p-3 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
              >
                <Mail className="h-4 w-4" />
                <span className="font-sans text-[9px] uppercase tracking-wider">Dispatch</span>
              </a>
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-sans uppercase tracking-[0.2em] opacity-60">
                HTML Embed Code
              </label>
              <button
                onClick={handleCopyEmbed}
                className="text-[10px] font-sans uppercase tracking-widest text-[#1A1A1A] hover:underline cursor-pointer flex items-center gap-1"
              >
                {copiedEmbed ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copiedEmbed ? 'Copied' : 'Copy HTML'}
              </button>
            </div>
            <textarea
              readOnly
              rows={3}
              value={embedCode}
              className="w-full border border-[#1A1A1A] bg-white p-3 font-mono text-xs text-[#1A1A1A]/80 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="border border-[#1A1A1A] bg-transparent px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
