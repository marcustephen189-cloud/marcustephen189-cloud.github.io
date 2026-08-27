import React from 'react';
import { X, HelpCircle, Keyboard, MousePointer, Smartphone } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/70 p-4 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg border border-[#1A1A1A] bg-[#FAF9F6] p-8 text-[#1A1A1A] shadow-editorial-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] opacity-50 block">Navigation Guide</span>
            <h3 className="font-serif text-2xl italic font-bold">Shortcuts & Interactions</h3>
          </div>
          <button
            onClick={onClose}
            className="border border-[#1A1A1A] p-1.5 hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="mt-6 space-y-4">
          <div className="border border-[#1A1A1A] bg-white p-4 shadow-editorial-sm space-y-3">
            <div className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
              <Keyboard className="h-3.5 w-3.5" /> Keyboard Commands
            </div>
            
            <div className="grid grid-cols-2 gap-2 font-sans text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/70">Next Page</span>
                <kbd className="border border-[#1A1A1A] bg-[#FAF9F6] px-2 py-0.5 font-mono text-[10px]">&rarr; or Space</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/70">Prev Page</span>
                <kbd className="border border-[#1A1A1A] bg-[#FAF9F6] px-2 py-0.5 font-mono text-[10px]">&larr;</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/70">Fullscreen</span>
                <kbd className="border border-[#1A1A1A] bg-[#FAF9F6] px-2 py-0.5 font-mono text-[10px]">F</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#1A1A1A]/10">
                <span className="text-[#1A1A1A]/70">Dismiss Full</span>
                <kbd className="border border-[#1A1A1A] bg-[#FAF9F6] px-2 py-0.5 font-mono text-[10px]">Esc</kbd>
              </div>
            </div>
          </div>

          <div className="border border-[#1A1A1A] bg-white p-4 shadow-editorial-sm space-y-2">
            <div className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
              <MousePointer className="h-3.5 w-3.5" /> Cursor & Gesture Mechanics
            </div>
            <ul className="font-sans text-xs text-[#1A1A1A]/70 space-y-1.5 list-disc pl-4">
              <li>Click or drag page corners to engage realistic 3D paper curvature.</li>
              <li>Double-click on fine details to magnify layout segments.</li>
              <li>Mouse scroll wheel enables progressive zoom levels.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="border border-[#1A1A1A] bg-[#1A1A1A] px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
