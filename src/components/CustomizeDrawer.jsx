import React, { useState } from 'react';
import { X, Sliders, Check, RotateCcw, Copy, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CustomizeDrawer({ isOpen, onClose, data, onUpdateData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    onUpdateData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const copyCodeSnippet = () => {
    const code = `// Updated personal config for src/data/portfolioData.js:
personal: ${JSON.stringify(data.personal, null, 2)}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    sound.playStamp();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md h-full bg-[var(--bg-paper)] border-l border-[var(--border-color)] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
            <div className="flex items-center gap-2">
              <Sliders size={16} className="text-[#B85D3B]" />
              <h3 className="font-serif-title text-xl font-medium">Customise Profile</h3>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                onClose();
              }}
              className="p-1 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
            Live preview your personal details in real-time. Permanent changes can also be edited in <code className="text-[#B85D3B] font-mono-code">src/data/portfolioData.js</code>.
          </p>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={data.personal.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-mono-code focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1">
                  Hanko Seal Kanji
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={data.personal.kanjiName}
                  onChange={(e) => handleChange('kanjiName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-mono-code text-center font-kanji focus:outline-hidden focus:border-[#B85D3B]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  value={data.personal.yearsOfExperience}
                  onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-mono-code focus:outline-hidden focus:border-[#B85D3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={data.personal.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-mono-code focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1">
                Location
              </label>
              <input
                type="text"
                value={data.personal.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-mono-code focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={data.personal.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-mono-code focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1">
                Availability Badge Text
              </label>
              <input
                type="text"
                value={data.personal.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] font-mono-code focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[var(--border-color)] mt-6 space-y-2">
          <button
            onClick={copyCodeSnippet}
            className="w-full py-2.5 rounded-xl bg-[#22201D] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#22201D] text-xs font-mono-code font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-xs"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied config JSON!' : 'Copy Code to Clipboard'}</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="w-full py-2 rounded-xl border border-[var(--border-color)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            Done & Close
          </button>
        </div>
      </div>
    </div>
  );
}
