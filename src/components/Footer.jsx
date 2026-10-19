import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    sound.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 border-t border-[var(--border-color)] mt-20 text-xs font-mono-code text-[var(--text-secondary)]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Artisan Monogram & Colophon */}
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#B85D3B] text-[#FAF7F2] flex items-center justify-center font-kanji font-bold text-xs">
              {portfolioData.personal.kanjiName}
            </div>
            <span className="font-serif-title text-base font-medium text-[var(--text-primary)]">
              {portfolioData.personal.name}
            </span>
            <span className="text-[var(--text-muted)]">· Architectural Portfolio</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Typeset in Cormorant Garamond, Shippori Mincho, and JetBrains Mono. Built with React 19, Tailwind CSS, and Web Audio API synthesis. Zero bloated frameworks.
          </p>
        </div>

        {/* Right: Return to top & coordinates */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="text-[11px] text-[var(--text-muted)]">
            <span>© {new Date().getFullYear()} · All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            title="Return to top"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[#B85D3B] transition-all cursor-pointer shadow-xs"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
