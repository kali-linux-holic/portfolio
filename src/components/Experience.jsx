import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-kanji text-sm text-[#B85D3B] font-semibold">経歴</span>
            <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
              // Trajectory & Production Experience
            </span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Engineering Milestones
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-2 max-w-xl">
            A track record of designing distributed architectures, mentoring junior developers, and leading zero-downtime releases.
          </p>
        </div>

        {/* Download CV link */}
        <div>
          <a
            href={portfolioData.personal.resumeUrl}
            onClick={() => sound.playStamp()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-mono-code text-[var(--text-primary)] hover:border-[#B85D3B] transition-all cursor-pointer shadow-xs"
          >
            <span>Download Engineering Folio (PDF)</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-6">
        {portfolioData.careerTimeline.map((item, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[#B85D3B]/50 transition-all duration-300 relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border-color)]">
              <div>
                <span className="text-xs font-mono-code text-[#B85D3B] font-medium">
                  {item.period}
                </span>
                <h3 className="font-serif-title text-2xl font-medium tracking-tight text-[var(--text-primary)] mt-0.5">
                  {item.role}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono-code text-[var(--text-secondary)]">
                <span className="font-medium text-[var(--text-primary)]">{item.company}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[var(--text-muted)]" />
                  {item.location}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-4 leading-relaxed max-w-3xl">
              {item.highlight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
