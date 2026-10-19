import React, { useRef, useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import { GithubCircleIcon, DiscordIcon } from './components/Icons';
import { Play, Pause, Volume2, VolumeX, Eye, EyeOff, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { sound } from './utils/sound';
import InfoModal from './components/InfoModal';
import LegacyModal from './components/LegacyModal';

export default function App() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showUI, setShowUI] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'info' | 'legacy' | null

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

  const openInfo = () => {
    sound.playTap();
    setActiveModal('info');
  };

  const openLegacy = () => {
    sound.playTap();
    setActiveModal('legacy');
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black select-none font-sans">
      {/* Fullscreen Video Background */}
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}hero-video.mp4`}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-[65%_center] sm:object-center pointer-events-none"
      />

      {/* Subtle Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none" />

      {/* Main UI Overlay (Can be toggled with Eye button) */}
      {showUI && (
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-8 md:p-14 animate-fade-in pointer-events-none">
          {/* Top Center Heading: Vecna's Legacy */}
          <div className="w-full flex flex-col items-center justify-center pt-2 sm:pt-4">
            <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-normal tracking-[0.16em] sm:tracking-[0.25em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.45)] text-center pl-1 sm:pl-2">
              Vecna's Legacy
            </h1>
            <div className="text-[8px] sm:text-[11px] md:text-xs font-mono-code tracking-[0.15em] sm:tracking-[0.35em] uppercase text-white/60 mt-1.5 sm:mt-2 text-center px-2">
              ✦ ARCHITECTING IN THE SHADOWS // WRITING CODE THAT ENDURES ✦
            </div>
          </div>

          {/* Middle / Right: Beside the Girl on PC, thumb-friendly on mobile */}
          <div className="flex-1 flex flex-col justify-end sm:justify-center items-center sm:items-end pb-12 sm:pb-0 sm:mr-4 md:mr-12 lg:mr-20">
            <div className="space-y-3 sm:space-y-4 w-full max-w-[290px] sm:max-w-sm pointer-events-auto">
              {/* Banner 1: View Information */}
              <button
                onClick={openInfo}
                className="group relative w-full text-left px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl dream-glass transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer block overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono-code uppercase tracking-[0.18em] text-white/50 block mb-0.5">
                      // Dossier & Biography
                    </span>
                    <span className="font-serif-title text-lg sm:text-2xl text-white tracking-wider font-medium group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all">
                      View Information
                    </span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/70 group-hover:rotate-45 transition-all">
                    <ArrowUpRight size={14} className="sm:w-[15px] sm:h-[15px]" />
                  </div>
                </div>
              </button>

              {/* Banner 2: View Legacy */}
              <button
                onClick={openLegacy}
                className="group relative w-full text-left px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl dream-glass transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer block overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono-code uppercase tracking-[0.18em] text-white/50 block mb-0.5">
                      // Selected Works & Folios
                    </span>
                    <span className="font-serif-title text-lg sm:text-2xl text-white tracking-wider font-medium group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all">
                      View Legacy
                    </span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/70 group-hover:translate-x-0.5 transition-all">
                    <ArrowUpRight size={14} className="sm:w-[15px] sm:h-[15px]" />
                  </div>
                </div>
              </button>

              {/* Glowing GitHub and Discord Icons matching the screenshot */}
              <div className="pt-2 px-1 flex items-center justify-center sm:justify-start gap-5">
                {/* GitHub */}
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playTap()}
                  title="GitHub Profile"
                  className="group text-white transition-all duration-300 transform hover:scale-115 active:scale-95 cursor-pointer block luminous-glow luminous-glow-hover"
                >
                  <GithubCircleIcon size={30} className="sm:w-8 sm:h-8 text-white" />
                </a>

                {/* Discord */}
                <a
                  href={
                    portfolioData.personal.discordUserId
                      ? `https://discord.com/users/${portfolioData.personal.discordUserId}`
                      : portfolioData.personal.discord || 'https://discord.com'
                  }
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playTap()}
                  title="Discord Profile"
                  className="group text-white transition-all duration-300 transform hover:scale-115 active:scale-95 cursor-pointer block luminous-glow luminous-glow-hover"
                >
                  <DiscordIcon size={30} className="sm:w-8 sm:h-8 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Left Status */}
          <div className="text-[10px] sm:text-xs font-mono-code text-white/40 tracking-wider text-center sm:text-left">
            <span>© {new Date().getFullYear()} VECNA'S LEGACY · FULL HD LOOP</span>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right Video & UI Controls */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-white/20 shadow-2xl">
        {/* Toggle UI / Pure Video Mode */}
        <button
          onClick={() => setShowUI(!showUI)}
          title={showUI ? 'Hide text overlay (Pure Video)' : 'Show text overlay'}
          className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {showUI ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>

        <div className="w-px h-3.5 bg-white/20" />

        {/* Video Play/Pause */}
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pause video' : 'Play video'}
          className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>

        <div className="w-px h-3.5 bg-white/20" />

        {/* Video Audio Mute/Unmute */}
        <button
          onClick={toggleMute}
          title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-amber-400" />}
        </button>
      </div>

      {/* Modal: View Information (Live Discord Avatar, Decoration, & Bio) */}
      <InfoModal
        isOpen={activeModal === 'info'}
        onClose={() => setActiveModal(null)}
        discordUserId={portfolioData.personal.discordUserId}
        discordLink={portfolioData.personal.discord}
      />

      {/* Modal: View Legacy (3 Sub-Cards) */}
      <LegacyModal
        isOpen={activeModal === 'legacy'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
