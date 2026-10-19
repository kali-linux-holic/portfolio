import React, { useState, useEffect } from 'react';
import { X, Code2, Flame, Server, ArrowUpRight, ArrowLeft, ExternalLink, Search, Sparkles, Terminal, Shield, Zap, Cpu, Bot, Smartphone, Key, Globe, Crosshair } from 'lucide-react';
import { DiscordIcon } from './Icons';
import { sound } from '../utils/sound';

export default function LegacyModal({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(null); // 'developing' | 'nuking' | 'server' | null
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playTap();
        if (selectedCategory) {
          setSelectedCategory(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedCategory, onClose]);

  // Reset category on open
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(null);
      setSearchQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const legacyOptions = [
    {
      id: 'developing',
      title: 'View Developing Legacy',
      eyebrow: '// 15+ Tools, Bots & Architectures',
      icon: Code2,
      accentColor: 'text-sky-300',
      badge: '15 Artifacts',
      description: 'Antinuke bots, token automations, bypass tools, game panels, mobile louding, and full-stack web systems.',
    },
    {
      id: 'nuking',
      title: 'View Nuking Legacy',
      eyebrow: '// Operations, Raids & Exploits',
      icon: Flame,
      accentColor: 'text-rose-400',
      badge: 'Tactical Ops',
      description: 'Tactical tools, high-speed automated raids, mass nukes, and network ops.',
    },
    {
      id: 'server',
      title: 'View Server Legacy',
      eyebrow: '// Communities, Infrastructure & Guilds',
      icon: Server,
      accentColor: 'text-amber-300',
      badge: '8 Servers',
      description: 'Managed communities, server architectures, bot fleets, and growth milestones.',
    },
  ];

  const developingItems = [
    {
      id: '01',
      title: 'Proton — Anti-Nuke Discord Bot',
      badge: 'FLAGSHIP BOT',
      icon: Bot,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-sky-200 border-white/15',
      description: 'An antinuke discord bot "Proton" with multiple features like auto-mod, ticket, raid protection, giveaway, announcements, etc.',
      link: 'https://proton-bot-a0a.pages.dev/',
      linkLabel: 'proton-bot-a0a.pages.dev',
      tags: ['Anti-Nuke', 'Auto-Mod', 'Ticket System', 'Raid Protection', 'Giveaways', 'Announcements'],
    },
    {
      id: '02',
      title: 'Discord Token & Nitro Generator Suite',
      badge: 'AUTOMATION',
      icon: Zap,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-purple-200 border-white/15',
      description: 'Discord Evs Gen, nitro giftlink gen and checker, Vc-joiner, mass token renamer / pfp changer auto ai chat via tokens.',
      tags: ['Evs Gen', 'Nitro Checker', 'VC Joiner', 'Mass Renamer', 'PFP Changer', 'AI Chat'],
    },
    {
      id: '03',
      title: 'Superfast Nuke Multi-Tool',
      badge: 'HIGH-SPEED NUKE',
      icon: Flame,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-rose-200 border-white/15',
      description: 'Superfast Nuke tools with mass ban, mass channels, mass ping, etc. features.',
      tags: ['Mass Ban', 'Mass Channels', 'Mass Ping', 'Multi-Threaded'],
    },
    {
      id: '04',
      title: 'Self-Bot Vanity Warfare Suite',
      badge: 'VANITY SNIPER',
      icon: Crosshair,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-emerald-200 border-white/15',
      description: 'Vanity sniper, Vanity swapper, Vanity protector etc. via self bot.',
      tags: ['Vanity Sniper', 'Vanity Swapper', 'Vanity Protector', 'Self-Bot'],
    },
    {
      id: '05',
      title: 'Comprehensive Self-Bot Framework',
      badge: 'SELF-BOT SUITE',
      icon: Terminal,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-indigo-200 border-white/15',
      description: 'Self bot nuking, self bot raiding, self bot utilities and all self bot features.',
      tags: ['Self Nuking', 'Self Raiding', 'Utilities', 'Full Framework'],
    },
    {
      id: '06',
      title: 'Mobile Louding App Engine',
      badge: 'MOBILE APP',
      icon: Smartphone,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-amber-200 border-white/15',
      description: 'Mobile louding app with self rec feature no crash on screen-sharing and no external modules or sets.',
      tags: ['Self Rec', 'Screen-Sharing Safe', 'Zero Crash', 'No External Modules'],
    },
    {
      id: '07',
      title: 'Real-Time Bot-as-User Client',
      badge: 'GATEWAY CLIENT',
      icon: Key,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-cyan-200 border-white/15',
      description: 'Login into bot via help of bot token and work on it as a real time user.',
      tags: ['Bot Token Login', 'Real-Time User', 'Session Gateway', 'Live Control'],
    },
    {
      id: '08',
      title: 'Discord Quest Automation Suite',
      badge: 'QUEST BOT & EXE',
      icon: Sparkles,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-yellow-200 border-white/15',
      description: 'Quest completor bot, quest completor exe app.',
      tags: ['Quest Completor Bot', 'Standalone EXE App', 'Automated Rewards'],
    },
    {
      id: '09',
      title: 'Game Panels & External Tools',
      badge: 'GAME PANELS',
      icon: Cpu,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-teal-200 border-white/15',
      description: 'Free fire, Minecraft, Bgmi, Valorant panels and external tools.',
      tags: ['Free Fire', 'Minecraft', 'BGMI', 'Valorant', 'External Panels'],
    },
    {
      id: '10',
      title: 'Auto Loud & Python Automation Suite',
      badge: 'PYTHON AUTOMATION',
      icon: Terminal,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-blue-200 border-white/15',
      description: 'Auto loud modules installer, one click loud setup tool, python automation tools etc.',
      tags: ['Auto Installer', '1-Click Setup', 'Python Automation', 'Script Engine'],
    },
    {
      id: '11',
      title: 'Free Fire UID Bypass & Server Booster',
      badge: 'BYPASS & BOOST',
      icon: Shield,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-orange-200 border-white/15',
      description: 'Auto free fire uid bypass for pc, Auto server booster.',
      tags: ['Free Fire UID Bypass', 'PC Bypass', 'Auto Server Booster', 'Discord Boost'],
    },
    {
      id: '12',
      title: 'Full-Stack Web Architectures & Tooling',
      badge: 'WEB SUITE',
      icon: Globe,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-pink-200 border-white/15',
      description: 'All types of websites, external tools for website.',
      tags: ['Custom Websites', 'Frontend / Backend', 'External Web Tools', 'Responsive'],
    },
    {
      id: '13',
      title: 'Website Raider External Tool',
      badge: 'WEB RAIDER',
      icon: Flame,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-red-200 border-white/15',
      description: 'Website raider via external tool.',
      tags: ['Website Raider', 'External Engine', 'High-Throughput'],
    },
    {
      id: '14',
      title: '1-Click Telemetry & Credential Inspector',
      badge: 'INTELLIGENCE TOOL',
      icon: Key,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-violet-200 border-white/15',
      description: 'Discord id token, live location, Ip, passwords grabber via one click.',
      tags: ['Token Grabber', 'Live Location', 'IP Grabber', '1-Click Execution'],
    },
    {
      id: '15',
      title: 'Backdoor Bypass Architecture',
      badge: 'SYSTEM EXPLOIT',
      icon: Shield,
      color: 'border-white/15 hover:border-white/40',
      badgeColor: 'bg-white/10 text-zinc-200 border-white/15',
      description: 'Backdoor bypass system.',
      tags: ['Backdoor Access', 'Bypass System', 'Security Architecture'],
    },
  ];

  const serverLegacyItems = [
    {
      id: '01',
      name: '/nukers',
      tag: 'FLAGSHIP',
      role: 'Primary Network Hub',
      desc: 'Central operations & tactical server legacy',
    },
    {
      id: '02',
      name: '/echofr',
      tag: 'COMMUNITY',
      role: 'Network Guild',
      desc: 'Allied community & development guild',
    },
    {
      id: '03',
      name: '/lovefr',
      tag: 'ALLIANCE',
      role: 'Allied Network',
      desc: 'Core alliance community hub',
    },
    {
      id: '04',
      name: '/noorvana',
      tag: 'SOCIAL',
      role: 'Community Guild',
      desc: 'Prestigious social & network space',
    },
    {
      id: '05',
      name: '/hotstar',
      tag: 'NETWORK',
      role: 'Media Guild',
      desc: 'Entertainment & media community space',
    },
    {
      id: '06',
      name: '/absent',
      tag: 'LEGACY',
      role: 'Core Guild',
      desc: 'Foundational guild architecture',
    },
    {
      id: '07',
      name: '/nighthub',
      tag: 'CENTRAL',
      role: 'Hub Community',
      desc: 'Night network & active guild hub',
    },
    {
      id: '08',
      name: '/heaven',
      tag: 'SANCTUARY',
      role: 'Social Guild',
      desc: 'Elite social sanctuary community',
    },
  ];

  const filteredDevelopingItems = developingItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredServerItems = serverLegacyItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id) => {
    sound.playTap();
    setSelectedCategory(id);
  };

  const handleBack = () => {
    sound.playTap();
    setSelectedCategory(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          selectedCategory === 'developing' || selectedCategory === 'server' ? 'max-w-3xl' : 'max-w-lg'
        } rounded-3xl dream-modal text-white p-5 sm:p-8 max-h-[92dvh] overflow-y-auto transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            {selectedCategory && (
              <button
                onClick={handleBack}
                title="Back to Legacy options"
                className="p-1.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-all cursor-pointer mr-0.5"
              >
                <ArrowLeft size={15} />
              </button>
            )}
            <div>
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-amber-400 block">
                {selectedCategory ? `// ${selectedCategory.toUpperCase()} ARCHIVE` : '// ARCHIVES & FOLIOS'}
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-medium tracking-wide text-white">
                {selectedCategory === 'developing'
                  ? 'Developing Legacy'
                  : selectedCategory === 'nuking'
                  ? 'Nuking Legacy'
                  : selectedCategory === 'server'
                  ? 'Server Legacy'
                  : "Vecna's Legacy"}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="p-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* View 1: Main 3 Legacy Sub-Cards */}
        {!selectedCategory && (
          <div className="space-y-3.5 animate-fade-in">
            {legacyOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className="group relative w-full text-left p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-300 hover:scale-102 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer block overflow-hidden shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${opt.accentColor} shrink-0 mt-0.5`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono-code uppercase tracking-widest text-white/40">
                            {opt.eyebrow}
                          </span>
                          <span className="text-[9px] font-mono-code px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                            {opt.badge}
                          </span>
                        </div>
                        <h3 className="font-serif-title text-xl sm:text-2xl text-white font-medium group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all mt-0.5">
                          {opt.title}
                        </h3>
                        <p className="text-xs text-white/60 font-sans mt-1 leading-snug">
                          {opt.description}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/60 group-hover:translate-x-1 transition-all shrink-0 ml-3">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* View 2: Developing Legacy Detailed 15 Cards */}
        {selectedCategory === 'developing' && (
          <div className="space-y-4 animate-fade-in">
            {/* Top Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-white/70">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>15 DEVELOPED ARTIFACTS // BOTS, ENGINES & EXPLOITS</span>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter tools / bots..."
                  className="w-full sm:w-56 pl-8 pr-3 py-1.5 rounded-xl border border-white/15 bg-black/60 text-xs font-mono-code text-white placeholder-white/40 focus:outline-hidden focus:border-sky-400"
                />
              </div>
            </div>

            {/* 15 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredDevelopingItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="relative p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code text-xs text-white/40 font-semibold">
                            #{item.id}
                          </span>
                          <span className="text-[9px] font-mono-code px-2.5 py-0.5 rounded-full shiny-silver-bubble uppercase tracking-wider">
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-white/40">
                          <ItemIcon size={15} />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-serif-title text-lg sm:text-xl text-white font-medium tracking-wide">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-white/75 font-sans mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer with Tags and optional link */}
                    <div className="mt-4 pt-3 border-t border-white/10">
                      {/* Live Link Button if available (e.g. Proton Bot) */}
                      {item.link && (
                        <div className="mb-2.5">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => sound.playTap()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shiny-silver-bubble text-xs font-mono-code cursor-pointer"
                          >
                            <span>Bot Website</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      )}

                      {/* Tags Bubbles with Shiny Silver Background */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9.5px] font-mono-code px-2.5 py-0.5 rounded-full shiny-silver-bubble cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredDevelopingItems.length === 0 && (
              <div className="text-center py-8 text-xs font-mono-code text-white/40">
                No tools found matching "{searchQuery}"
              </div>
            )}
          </div>
        )}

        {/* View 3: Nuking Legacy */}
        {selectedCategory === 'nuking' && (
          <div className="space-y-4 py-2 animate-fade-in">
            {/* Main Tactical Card */}
            <div className="p-5 sm:p-7 rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_35px_rgba(255,255,255,0.08)] space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-rose-400 font-semibold">
                  // CLASSIFIED OPERATIONS & SUITE
                </span>
              </div>

              {/* Exact user headline */}
              <h3 className="font-serif-title text-2xl sm:text-3xl text-white font-medium tracking-wide leading-tight">
                Most powerful nuking tools with backdoor bypass system
              </h3>

              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                Engineered for maximum execution speed, zero-detection bypass algorithms, multi-threaded mass channel deployment, and complete server neutralization.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="p-3.5 rounded-2xl border border-white/15 bg-white/[0.03]">
                  <span className="inline-block text-[10px] font-mono-code uppercase px-2.5 py-0.5 rounded-full shiny-silver-bubble mb-1">
                    Backdoor Bypass System
                  </span>
                  <div className="text-xs text-white/70 mt-0.5 leading-relaxed">High-penetration bypass engine bypassing traditional antinukes</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-white/15 bg-white/[0.03]">
                  <span className="inline-block text-[10px] font-mono-code uppercase px-2.5 py-0.5 rounded-full shiny-silver-bubble mb-1">
                    High-Concurrency Threading
                  </span>
                  <div className="text-xs text-white/70 mt-0.5 leading-relaxed">Sub-second mass ban, channel purge, and mass webhook execution</div>
                </div>
              </div>
            </div>

            {/* Discord Invite / Proof Vault Card */}
            <div className="p-5 sm:p-6 rounded-3xl border border-white/20 bg-white/[0.03] hover:border-white/40 transition-all space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 text-white luminous-glow">
                  <DiscordIcon size={24} />
                </div>
                <div>
                  <div className="text-xs font-mono-code text-white/40 uppercase tracking-wider">
                    Official Proofs & Operation Vault
                  </div>
                  <div className="text-xs sm:text-sm font-semibold font-mono-code text-white mt-0.5">
                    join /nukers to see nuking legacy
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://discord.gg/nukers"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playTap()}
                className="w-full py-3 px-5 rounded-2xl bg-white hover:bg-white/90 text-black text-xs sm:text-sm font-mono-code font-bold flex items-center justify-center gap-2 transition-all hover:scale-101 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <span>Join discord.gg/nukers</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}

        {/* View 4: Server Legacy (Display Only · 8 Servers) */}
        {selectedCategory === 'server' && (
          <div className="space-y-4 animate-fade-in">
            {/* Top Bar / Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-white/70">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>8 ARCHIVED GUILDS // PRESTIGE SERVER LEGACIES</span>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter servers..."
                  className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-xl border border-white/15 bg-black/60 text-xs font-mono-code text-white placeholder-white/40 focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            {/* Server Display Grid (Display Only, Not clickable vanity links) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredServerItems.map((srv) => (
                <div
                  key={srv.name}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-white/35 transition-all duration-300 flex items-center justify-between group shadow-sm select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white/75 shrink-0 font-mono-code text-sm font-bold group-hover:border-amber-400/50 group-hover:text-amber-200 transition-all">
                      #
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono-code text-base sm:text-lg font-bold text-white tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all truncate">
                          {srv.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code text-white/45 block mt-0.5 truncate">
                        {srv.desc}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono-code px-2.5 py-0.5 rounded-full shiny-silver-bubble shrink-0 uppercase tracking-wider ml-2">
                    {srv.tag}
                  </span>
                </div>
              ))}
            </div>

            {filteredServerItems.length === 0 && (
              <div className="text-center py-8 text-xs font-mono-code text-white/40">
                No servers found matching "{searchQuery}"
              </div>
            )}

            {/* Brief Footer Note for Display-Only */}
            <p className="text-[11px] font-mono-code text-white/40 italic text-center pt-1">
              "Archived guild networks & community alliances built under Vecna's banner."
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-code text-white/40">
          {selectedCategory ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={11} />
              <span>Back to Legacy options</span>
            </button>
          ) : (
            <span>SELECT A LEGACY ARCHIVE TO EXPLORE</span>
          )}

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
