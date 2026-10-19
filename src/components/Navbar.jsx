import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Moon, Sun, Volume2, VolumeX, Terminal, Grid, Search, Menu, X } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({
  isDarkMode,
  toggleTheme,
  soundEnabled,
  toggleSound,
  blueprintMode,
  toggleBlueprint,
  openCommandPalette,
}) {
  const [time, setTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in IST (New Delhi)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const istString = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTime(istString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Works', href: '#works' },
    { label: 'Architecture Lab', href: '#devlab' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Stack', href: '#stack' },
    { label: 'Milestones', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-paper)]/85 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Hanko Seal & Developer Identity */}
        <a
          href="#"
          onClick={() => sound.playStamp()}
          className="flex items-center gap-3 group"
        >
          {/* Hanko stamp */}
          <div className="w-8 h-8 rounded-lg bg-[#B85D3B] text-[#FAF7F2] flex items-center justify-center font-kanji font-bold text-base shadow-xs group-hover:rotate-6 transition-transform">
            {portfolioData.personal.kanjiName}
          </div>
          <div className="flex flex-col">
            <span className="font-serif-title font-medium text-base tracking-tight text-[var(--text-primary)]">
              {portfolioData.personal.name}
            </span>
            <span className="text-[10px] font-mono-code text-[var(--text-muted)] -mt-1 hidden sm:block">
              Architectural Technologist
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playTap()}
              className="text-xs font-mono-code text-[var(--text-secondary)] hover:text-[#B85D3B] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions, Clock, Theme & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Indian Standard Time indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[11px] font-mono-code text-[var(--text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>DEL {time} IST</span>
          </div>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              sound.playTap();
              openCommandPalette();
            }}
            title="Command Palette (Ctrl + K)"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] transition-all cursor-pointer"
          >
            <Search size={13} />
            <span className="hidden sm:inline text-[10px] bg-[var(--border-color)]/50 px-1 py-0.5 rounded">
              ⌘K
            </span>
          </button>

          {/* Blueprint Grid Toggle */}
          <button
            onClick={() => {
              sound.playTap();
              toggleBlueprint();
            }}
            title={blueprintMode ? 'Disable Blueprint Grid' : 'Enable Blueprint Grid'}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              blueprintMode
                ? 'border-[#B85D3B] bg-[#B85D3B]/10 text-[#B85D3B]'
                : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Grid size={15} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Tactile Sound' : 'Enable Tactile Sound'}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'border-[#B85D3B] bg-[#B85D3B]/10 text-[#B85D3B]'
                : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Theme Toggle: Washi vs Sumi-e */}
          <button
            onClick={() => {
              sound.playTap();
              toggleTheme();
            }}
            title={isDarkMode ? 'Switch to Washi Light Paper' : 'Switch to Sumi-e Dark Ink'}
            className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {isDarkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sound.playTap();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] cursor-pointer"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-4 border-t border-[var(--border-color)] bg-[var(--bg-paper)] space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                sound.playTap();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-lg text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
