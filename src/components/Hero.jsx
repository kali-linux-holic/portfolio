import React, { useRef, useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GithubCircleIcon, DiscordIcon } from './Icons';
import { Play, Pause, Volume2, VolumeX, Sparkles, X, ArrowUpRight, Info, Shield, Layers } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Hero({ isDarkMode }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    sound.playTap();
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    sound.playTap();
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleViewInformation = () => {
    sound.playTap();
    setInfoModalOpen(true);
  };

  const handleViewLegacy = () => {
    sound.playTap();
    const worksEl = document.getElementById('works');
    if (worksEl) {
      worksEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full my-4 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black min-h-[88vh] md:min-h-[92vh] flex flex-col justify-between">
      {/* Background Loop Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        />

        {/* Soft vignette & subtle dark contrast gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Top Section: Top Heading & Video Controls */}
      <div className="relative z-10 pt-8 pb-4 px-6 md:px-12 flex items-center justify-between">
        {/* Availability status badge */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono-code text-white/70">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>Active // Online</span>
        </div>

        {/* Aesthetic Top Center Heading: Vecna's Legacy */}
        <div className="flex-1 text-center sm:pr-24">
          <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.22em] uppercase text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.45)] select-none">
            Vecna's Legacy
          </h1>
          <div className="text-[10px] sm:text-xs font-mono-code tracking-[0.3em] uppercase text-white/50 mt-1">
            ✦ ARCHITECTURAL SYSTEM // CREATIVE CODING ✦
          </div>
        </div>

        {/* Video Controls Pill */}
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs font-mono-code text-white/80 shrink-0">
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause video' : 'Play video'}
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <div className="w-px h-3 bg-white/20" />
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-amber-300" />}
          </button>
        </div>
      </div>

      {/* Middle Section: Side Banner Cards placed beside the girl */}
      <div className="relative z-10 px-6 sm:px-12 md:px-16 py-8 flex flex-col justify-center max-w-xl">
        <div className="space-y-4">
          {/* Banner 1: View Information */}
          <button
            onClick={handleViewInformation}
            className="group relative w-full sm:w-[320px] text-left p-4 sm:p-5 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 hover:border-white/70 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.22)] hover:scale-102 cursor-pointer block overflow-hidden"
          >
            {/* Subtle glow highlight on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-white/50 block mb-1">
                  // Dossier & Biography
                </span>
                <span className="font-serif-title text-xl sm:text-2xl text-white tracking-wider font-medium group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all">
                  View Information
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/60 group-hover:rotate-45 transition-all">
                <ArrowUpRight size={15} />
              </div>
            </div>
          </button>

          {/* Banner 2: View Legacy */}
          <button
            onClick={handleViewLegacy}
            className="group relative w-full sm:w-[320px] text-left p-4 sm:p-5 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 hover:border-white/70 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.22)] hover:scale-102 cursor-pointer block overflow-hidden"
          >
            {/* Subtle glow highlight on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-white/50 block mb-1">
                  // Selected Works & Systems
                </span>
                <span className="font-serif-title text-xl sm:text-2xl text-white tracking-wider font-medium group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all">
                  View Legacy
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/60 group-hover:translate-y-0.5 transition-all">
                <span className="text-sm">↓</span>
              </div>
            </div>
          </button>

          {/* Social Icons with exact luminous white glow matching the user's screenshot */}
          <div className="pt-3 pl-2 flex items-center gap-5">
            {/* GitHub Glowing Icon */}
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playTap()}
              title="GitHub Profile"
              className="group text-white transition-all duration-300 transform hover:scale-115 cursor-pointer block"
              style={{
                filter:
                  'drop-shadow(0 0 6px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 22px rgba(255, 255, 255, 0.4))',
              }}
            >
              <GithubCircleIcon size={30} className="text-white" />
            </a>

            {/* Discord Glowing Icon */}
            <a
              href={portfolioData.personal.discord || 'https://discord.com'}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playTap()}
              title="Discord Community / Direct"
              className="group text-white transition-all duration-300 transform hover:scale-115 cursor-pointer block"
              style={{
                filter:
                  'drop-shadow(0 0 6px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 22px rgba(255, 255, 255, 0.4))',
              }}
            >
              <DiscordIcon size={30} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Minimalist Bar */}
      <div className="relative z-10 px-6 md:px-12 py-5 flex items-center justify-between text-white/50 text-xs font-mono-code border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="font-kanji text-[#B85D3B]">匠</span>
          <span>EST. 2024 · CRAFT OVER NOISE</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>SCROLL FOR LAB & ARCHITECTURE</span>
          <span>↓</span>
        </div>
      </div>

      {/* View Information Pop-up Modal */}
      {infoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setInfoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#121110] text-[#EDE8DE] p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setInfoModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="pr-8">
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#B85D3B]">
                // System Dossier
              </span>
              <h2 className="font-serif-title text-3xl font-medium tracking-tight text-white mt-1">
                Vecna's Information
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-2 font-mono-code">
                Full-Stack Architecture & Creative Technologist
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 my-6 text-xs font-mono-code">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="text-white/40 uppercase text-[10px]">Location</div>
                <div className="text-white font-medium mt-1">New Delhi / Worldwide</div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="text-white/40 uppercase text-[10px]">Experience</div>
                <div className="text-white font-medium mt-1">4+ Years Production</div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="text-white/40 uppercase text-[10px]">Core Stack</div>
                <div className="text-white font-medium mt-1">React, Go, TypeScript, WebGL</div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="text-white/40 uppercase text-[10px]">Status</div>
                <div className="text-emerald-400 font-medium mt-1">Available for Contracts</div>
              </div>
            </div>

            {/* Philosophy snippet */}
            <p className="text-xs text-white/60 leading-relaxed font-sans border-t border-white/10 pt-4">
              "Designing high-throughput architectures, resilient distributed microservices, and kinetic digital interfaces that treat latency as a fundamental design metric."
            </p>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => {
                  setInfoModalOpen(false);
                  sound.playStamp();
                }}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono-code font-medium hover:bg-white/90 transition-all"
              >
                Dispatch Message
              </a>
              <button
                onClick={() => setInfoModalOpen(false)}
                className="text-xs font-mono-code text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
