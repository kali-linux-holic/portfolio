import React, { useState, useEffect } from 'react';
import { Search, X, Layers, Moon, Sun, Volume2, Mail, FileText, Compass, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../utils/sound';
import { portfolioData } from '../data/portfolioData';

export default function CommandPalette({
  isOpen,
  onClose,
  isDarkMode,
  toggleTheme,
  blueprintMode,
  toggleBlueprint,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'works',
      label: 'View Selected Works & Case Studies',
      icon: Layers,
      category: 'Navigation',
      action: () => {
        document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'devlab',
      label: 'Launch Distributed Architecture Visualizer',
      icon: Terminal,
      category: 'Interactive Lab',
      action: () => {
        document.getElementById('devlab')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'philosophy',
      label: 'Read Engineering Philosophy (4 Tenets)',
      icon: Compass,
      category: 'Manifesto',
      action: () => {
        document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'experience',
      label: 'Inspect Production Milestones & Timeline',
      icon: FileText,
      category: 'Career',
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'contact',
      label: 'The Tea Room / Dispatch Inquiry',
      icon: Mail,
      category: 'Correspondence',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'copy-email',
      label: `Copy Email (${portfolioData.personal.email})`,
      icon: Mail,
      category: 'Action',
      action: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        sound.playStamp();
        onClose();
      },
    },
    {
      id: 'theme',
      label: isDarkMode ? 'Switch to Washi Light Paper Mode' : 'Switch to Sumi-e Dark Ink Mode',
      icon: isDarkMode ? Sun : Moon,
      category: 'Preference',
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'blueprint',
      label: blueprintMode ? 'Disable Architectural Blueprint Grid' : 'Enable Architectural Blueprint Grid',
      icon: Sparkles,
      category: 'Developer Mode',
      action: () => {
        toggleBlueprint();
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        sound.playTap();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playTap();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playTap();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filtered, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl rounded-2xl border border-[var(--border-color)] bg-[var(--bg-paper)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-color)] gap-3 bg-[var(--bg-card)]">
          <Search size={18} className="text-[var(--text-muted)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden font-mono-code"
          />
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono-code text-[var(--text-muted)]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono-code cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#B85D3B] text-[#FAF7F2]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-paper-subtle)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={14} className={isSelected ? 'text-[#FAF7F2]' : 'text-[var(--text-muted)]'} />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      isSelected ? 'text-[#FAF7F2]/80' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border-color)] bg-[var(--bg-paper-subtle)] text-[10px] font-mono-code text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Dismiss</span>
          </div>
          <span className="font-kanji">指針</span>
        </div>
      </div>
    </div>
  );
}
