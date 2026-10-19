import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'Creative Dev & WebGL',
    'Systems & Cloud',
    'Frontend Architecture',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  const openProject = (p) => {
    sound.playTap();
    setSelectedProject(p);
  };

  return (
    <section id="works" className="py-20 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-kanji text-sm text-[#B85D3B] font-semibold">作品集</span>
            <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
              // Selected Architectural Folios
            </span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Engineered Works & Systems
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-2 max-w-xl">
            Selected case studies prioritizing resilience, low latency, and uncompromising aesthetic execution.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playTap();
                setActiveCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#22201D] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#22201D] font-medium shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 flex flex-col justify-between hover:border-[#B85D3B]/60 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
          >
            {/* Top Bar with Kanji Stamp & Year */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <span className="font-kanji text-xs px-2 py-0.5 rounded-md border border-[#B85D3B]/30 bg-[#B85D3B]/10 text-[#B85D3B] font-medium">
                    {project.kanjiTag}
                  </span>
                  <span className="text-[11px] font-mono-code text-[var(--text-muted)] uppercase">
                    {project.category}
                  </span>
                </div>
                <span className="text-xs font-mono-code text-[var(--text-muted)]">
                  {project.year}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-5">
                <h3 className="font-serif-title text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-[#B85D3B] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Metrics Highlight Pill */}
              <div className="mt-5 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper-subtle)] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-code uppercase text-[var(--text-muted)]">
                    {project.metrics[0]?.label}
                  </div>
                  <div className="text-sm font-semibold font-mono-code text-[#B85D3B]">
                    {project.metrics[0]?.value}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono-code uppercase text-[var(--text-muted)]">
                    {project.metrics[1]?.label}
                  </div>
                  <div className="text-sm font-semibold font-mono-code text-[var(--text-primary)]">
                    {project.metrics[1]?.value}
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono-code px-2 py-0.5 rounded-md border border-[var(--border-color)] bg-[var(--bg-paper)] text-[var(--text-secondary)]"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-[10px] font-mono-code px-1.5 py-0.5 text-[var(--text-muted)]">
                    +{project.tech.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--border-color)]">
              <button
                onClick={() => openProject(project)}
                className="text-xs font-mono-code text-[#B85D3B] hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <BookOpen size={13} />
                <span>Architecture Case Study</span>
              </button>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Source Code"
                    className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] transition-all"
                  >
                    <GithubIcon size={14} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Live Demo"
                    className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] transition-all"
                  >
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
