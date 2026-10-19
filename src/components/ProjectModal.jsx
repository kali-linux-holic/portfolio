import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playTap();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-paper)] shadow-2xl p-6 sm:p-8 text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-kanji text-sm text-[#B85D3B] font-semibold">{project.kanjiTag}</span>
            <span className="text-xs font-mono-code text-[var(--text-muted)] uppercase tracking-wider">
              {project.category} · {project.year}
            </span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl font-medium tracking-tight">
            {project.title}
          </h2>
          <p className="text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 my-5 pt-4 border-t border-[var(--border-color)]">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono-code px-2.5 py-1 rounded-md border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper-subtle)]">
          {project.metrics.map((m, idx) => (
            <div key={idx}>
              <div className="text-[11px] font-mono-code uppercase text-[var(--text-muted)]">
                {m.label}
              </div>
              <div className="text-xl font-bold font-mono-code text-[#B85D3B] mt-0.5">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Narrative */}
        <div className="space-y-6 text-sm leading-relaxed text-[var(--text-secondary)]">
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-primary)] font-semibold flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              The Engineering Challenge & Context
            </h4>
            <p className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)]">
              {project.problem}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-primary)] font-semibold flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              System Design & Solution Architecture
            </h4>
            <p className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)]">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#22201D] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#22201D] text-xs font-mono-code font-medium flex items-center gap-2 hover:opacity-90 transition-all shadow-xs"
              >
                <span>Live Interactive Prototype</span>
                <ExternalLink size={13} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-xs font-mono-code text-[var(--text-primary)] hover:border-[#B85D3B] flex items-center gap-2 transition-all"
              >
                <GithubIcon size={13} />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="text-xs font-mono-code text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            Press ESC or Close
          </button>
        </div>
      </div>
    </div>
  );
}
