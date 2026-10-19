import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons';
import { sound } from '../utils/sound';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    sound.playTap();
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    sound.playStamp();
    setIsSent(true);

    // Provide mailto fallback
    const subject = encodeURIComponent(`Inquiry from ${name} via Portfolio`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section id="contact" className="py-20 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-kanji text-sm text-[#B85D3B] font-semibold">書簡</span>
          <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
            // The Tea Room & Correspondence
          </span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
          Initiate a Conversation
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] mt-2 max-w-xl">
          Whether you are architecting a mission-critical system, seeking consulting, or looking to discuss creative computing — drop a note.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Inquiries & Bio Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Email Copy Card */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
            <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase mb-2">
              Direct Mailbox
            </div>
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)]">
              <span className="font-mono-code text-xs sm:text-sm text-[var(--text-primary)] truncate font-medium">
                {portfolioData.personal.email}
              </span>
              <button
                onClick={copyEmail}
                title="Copy email to clipboard"
                className="px-3 py-1.5 rounded-lg bg-[#22201D] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#22201D] text-xs font-mono-code flex items-center gap-1.5 hover:opacity-90 transition-all cursor-pointer shadow-xs shrink-0"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Availability Status */}
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
            <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase mb-2">
              Current Engagement Capacity
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 animate-pulse"></span>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {portfolioData.personal.availability}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Typical response latency: &lt; 24 hours across IST / JST / UTC timezones.
                </p>
              </div>
            </div>
          </div>

          {/* Social Presence Links */}
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
            <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase mb-4">
              Digital Coordinates & Networks
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] flex items-center gap-2 transition-all"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>
              <a
                href={portfolioData.personal.twitter}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] flex items-center gap-2 transition-all"
              >
                <TwitterIcon size={14} />
                <span>X / Twitter</span>
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] flex items-center gap-2 transition-all"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Tactile Letterpad Form */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 backdrop-blur-xs shadow-sm overflow-hidden">
            {/* Hanko Stamp Imprint Overlay upon submission */}
            {isSent && (
              <div className="absolute top-6 right-6 flex flex-col items-center animate-fade-in pointer-events-none">
                <div className="w-16 h-16 rounded-xl border-2 border-[#B85D3B] flex items-center justify-center bg-[#B85D3B]/10 rotate-6 shadow-sm">
                  <span className="font-kanji text-2xl text-[#B85D3B] font-bold">受取</span>
                </div>
                <span className="text-[10px] font-mono-code text-[#B85D3B] mt-1 uppercase">
                  Imprinted
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
              <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
                Handwritten Stationery Memo (書状)
              </span>
              <span className="font-kanji text-xs text-[var(--text-secondary)]">一期一会</span>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="font-kanji text-3xl text-[#B85D3B]">誠にありがとうございます</div>
                <h4 className="font-serif-title text-2xl font-medium">Message Dispatched</h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                  Your message has been stamped with the artisan seal and your email client is launching. I look forward to connecting.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 px-4 py-1.5 rounded-lg border border-[var(--border-color)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1.5">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kenzo Tange / Studio"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)] text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[#B85D3B] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1.5">
                      Return Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. kenzo@architecture.jp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)] text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[#B85D3B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[var(--text-secondary)] mb-1.5">
                    Architectural Inquiry / Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, distributed system requirements, or creative vision..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper)] text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[#B85D3B] transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[var(--border-color)] gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-[var(--text-muted)]">
                    <Sparkles size={12} className="text-[#B85D3B]" />
                    <span>Sealed with personalized Hanko stamp</span>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#22201D] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#22201D] text-xs font-mono-code font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Imprint Seal & Send</span>
                    <Send size={12} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
