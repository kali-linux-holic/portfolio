import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Compass, Cpu, Check, Terminal } from 'lucide-react';

export default function Craft() {
  return (
    <section id="philosophy" className="py-20 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-kanji text-sm text-[#B85D3B] font-semibold">信条</span>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
            // Engineering Philosophy & Principles
          </span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
          Craft & Technical Manifesto
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Inspired by traditional Japanese craftsmanship (Takumi) — where beauty is a byproduct of precision, restraint, and deep respect for the material.
        </p>
      </div>

      {/* 4 Philosophy Tenets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {portfolioData.philosophy.map((item) => (
          <div
            key={item.number}
            className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[#B85D3B]/40 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Background Kanji Watermark */}
            <div className="absolute right-3 -bottom-4 font-kanji text-7xl sm:text-8xl text-[var(--text-muted)] opacity-5 select-none pointer-events-none group-hover:scale-105 transition-transform duration-500">
              {item.kanji}
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <span className="font-mono-code text-xs text-[#B85D3B] font-semibold">
                {item.number}
              </span>
              <span className="font-kanji text-sm text-[var(--text-secondary)]">
                {item.kanjiRomaji}
              </span>
            </div>

            <h3 className="font-serif-title text-2xl font-medium tracking-tight mt-4 text-[var(--text-primary)]">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Production Technology Stack Matrix */}
      <div id="stack" className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-kanji text-sm text-[#B85D3B] font-semibold">技術基盤</span>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
            // Production Technical Matrix
          </span>
        </div>
        <h3 className="font-serif-title text-2xl sm:text-3xl font-medium tracking-tight mb-8">
          Battle-Tested Production Stack
        </h3>

        <div className="space-y-8">
          {portfolioData.techStack.map((group, idx) => (
            <div key={idx} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8">
              <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase tracking-wider mb-4 pb-3 border-b border-[var(--border-color)] flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Active in Production</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)] hover:border-[#B85D3B]/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-sm font-semibold text-[var(--text-primary)]">
                        {tech.name}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono-code text-[#B85D3B] mt-1 font-medium">
                      {tech.level}
                    </div>

                    <p className="text-[11px] text-[var(--text-secondary)] mt-2 leading-snug">
                      {tech.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
