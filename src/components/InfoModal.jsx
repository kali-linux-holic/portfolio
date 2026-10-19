import React, { useState, useEffect } from 'react';
import { DiscordIcon } from './Icons';
import { X } from 'lucide-react';
import { sound } from '../utils/sound';
import { fetchDiscordProfile } from '../utils/discord';

export default function InfoModal({ isOpen, onClose, discordUserId, discordLink }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultDisplayName = 'Vecna';

  // Fetch live Discord profile
  const loadProfile = async (targetId) => {
    if (!targetId) return;

    setLoading(true);
    try {
      const data = await fetchDiscordProfile(targetId);
      if (data) {
        setProfile(data);
      }
    } catch (e) {
      console.error('Failed to load profile', e);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and 10-minute silent auto-refresh interval
  useEffect(() => {
    if (discordUserId) {
      loadProfile(discordUserId);
    }

    // Silently refresh every 10 minutes (600,000 ms)
    const interval = setInterval(() => {
      if (discordUserId) {
        loadProfile(discordUserId);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [discordUserId]);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playTap();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Target Discord URL for the button
  const finalDiscordUrl = discordUserId
    ? `https://discord.com/users/${discordUserId}`
    : discordLink || 'https://discord.com';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl dream-modal text-white p-6 sm:p-8 max-h-[92dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <div className="flex items-center justify-end mb-2">
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="p-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Live Discord Avatar in Circular Shape with Decoration */}
        <div className="flex flex-col items-center text-center mt-1">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Circular Avatar */}
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Discord Live Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-white/30 shadow-2xl relative z-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 border-2 border-white/30 flex items-center justify-center text-white font-cinzel text-3xl font-bold shadow-2xl">
                V
              </div>
            )}

            {/* Live Discord Avatar Decoration (Positioned over the avatar) */}
            {profile?.decorationUrl && (
              <img
                src={profile.decorationUrl}
                alt="Avatar Decoration"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 scale-120 -translate-y-0.5"
              />
            )}

            {/* Online Status Dot */}
            <span
              className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-black z-20 ${
                profile?.status === 'dnd'
                  ? 'bg-rose-500'
                  : profile?.status === 'idle'
                  ? 'bg-amber-400'
                  : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
              }`}
              title={`Status: ${profile?.status || 'Online'}`}
            />
          </div>

          {/* Discord Display Name */}
          <h2 className="font-cinzel text-2xl sm:text-3xl font-semibold tracking-wide text-white mt-3 flex items-center justify-center gap-1.5">
            <span>{profile?.displayName || defaultDisplayName}</span>
          </h2>
          {profile?.username && (
            <span className="text-[11px] font-mono-code text-white/40 -mt-0.5">
              @{profile.username}
            </span>
          )}

          {/* Same Home Page Discord Button with exact signature white glow aura */}
          <div className="mt-3.5 mb-5 flex items-center justify-center">
            <a
              href={finalDiscordUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playTap()}
              title="Connect on Discord"
              className="group text-white transition-all duration-300 transform hover:scale-115 active:scale-95 cursor-pointer block p-1 luminous-glow luminous-glow-hover"
            >
              <DiscordIcon size={34} className="text-white" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

        {/* Exact Information Text Requested by User */}
        <div className="space-y-4 text-center">
          {/* Title: Full Stack Developer */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full shiny-silver-bubble text-xs font-mono-code uppercase tracking-widest">
              Full Stack Developer
            </span>
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans px-2">
            Hey, I'm Vecna, a passionate Full Stack Developer who loves building modern websites, powerful applications, and custom Discord tools.
          </p>

          {/* Experience tag */}
          <div className="p-3 rounded-2xl border border-white/15 bg-white/[0.03]">
            <div className="text-[10px] font-mono-code uppercase tracking-wider text-white/50 mb-1.5">
              Core Technical Stack
            </div>
            <div className="text-xs font-mono-code text-white/80 tracking-wide mb-2">
              4+ experience in:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[10px] font-mono-code px-3 py-0.5 rounded-full shiny-silver-bubble cursor-default">
                JS
              </span>
              <span className="text-[10px] font-mono-code px-3 py-0.5 rounded-full shiny-silver-bubble cursor-default">
                PYTHON
              </span>
              <span className="text-[10px] font-mono-code px-3 py-0.5 rounded-full shiny-silver-bubble cursor-default">
                CSS
              </span>
              <span className="text-[10px] font-mono-code px-3 py-0.5 rounded-full shiny-silver-bubble cursor-default">
                HTML
              </span>
              <span className="text-[10px] font-mono-code px-3 py-0.5 rounded-full shiny-silver-bubble cursor-default">
                JAVA
              </span>
            </div>
          </div>

          {/* Developed milestones stats */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-base sm:text-lg font-bold font-mono-code text-white">100+</div>
              <div className="text-[9px] font-mono-code text-white/50 uppercase leading-tight mt-0.5">Discord Tools</div>
            </div>
            <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-base sm:text-lg font-bold font-mono-code text-white">50+</div>
              <div className="text-[9px] font-mono-code text-white/50 uppercase leading-tight mt-0.5">Discord Bots</div>
            </div>
            <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-base sm:text-lg font-bold font-mono-code text-white">20+</div>
              <div className="text-[9px] font-mono-code text-white/50 uppercase leading-tight mt-0.5">Webs & Apps</div>
            </div>
          </div>

          {/* Text Summary */}
          <p className="text-[11px] font-mono-code text-white/60 italic pt-1">
            "Developed 100+ discord tools, 50+ discord bots, 20+ webs etc."
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end text-[10px] font-mono-code text-white/40">
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
}
