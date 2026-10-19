import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/sound';
import { Sparkles, RefreshCw, Volume2, VolumeX } from 'lucide-react';

export default function ZenCanvas({ isDarkMode }) {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const stonesRef = useRef([
    { x: 0.28, y: 0.45, r: 24, label: 'Kanso / 簡素' },
    { x: 0.72, y: 0.35, r: 32, label: 'Shizen / 自然' },
    { x: 0.52, y: 0.68, r: 20, label: 'Ma / 間' },
  ]);
  const animationFrameId = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeStone, setActiveStone] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle meditative raked sand background lines (Karesansui patterns)
      const lineColor = isDarkMode ? 'rgba(237, 232, 222, 0.035)' : 'rgba(34, 32, 29, 0.035)';
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      const spacing = 18;
      for (let y = spacing; y < height; y += spacing) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          // Slight sinusoidal natural wave
          const wave = Math.sin(x * 0.008 + y * 0.02) * 3;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }

      // Update and draw ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.alpha -= 0.008;

        if (rip.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        const strokeRgba = isDarkMode
          ? `rgba(217, 115, 78, ${rip.alpha * 0.8})` // terracotta glow in dark mode
          : `rgba(184, 93, 59, ${rip.alpha * 0.7})`; // vermilion ink in light mode
        ctx.strokeStyle = strokeRgba;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Secondary subtle harmonic echo
        if (rip.radius > 16) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = isDarkMode
            ? `rgba(111, 139, 117, ${rip.alpha * 0.4})`
            : `rgba(80, 102, 84, ${rip.alpha * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Zen Stones
      stonesRef.current.forEach((st) => {
        const sx = st.x * width;
        const sy = st.y * height;

        // Sand ring shadow around stone
        ctx.save();
        ctx.beginPath();
        ctx.arc(sx, sy, st.r + 6, 0, Math.PI * 2);
        ctx.strokeStyle = isDarkMode ? 'rgba(237, 232, 222, 0.08)' : 'rgba(34, 32, 29, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();

        // Stone body
        const grad = ctx.createRadialGradient(sx - st.r * 0.3, sy - st.r * 0.3, st.r * 0.1, sx, sy, st.r);
        if (isDarkMode) {
          grad.addColorStop(0, '#2C2926');
          grad.addColorStop(1, '#1A1816');
        } else {
          grad.addColorStop(0, '#EAE5DC');
          grad.addColorStop(1, '#D5CEC0');
        }

        ctx.beginPath();
        ctx.arc(sx, sy, st.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(50, 45, 38, 0.15)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        ctx.fill();

        // Stone boundary
        ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(68, 62, 54, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Subtle label on stone
        ctx.fillStyle = isDarkMode ? '#ABA394' : '#6B655C';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(st.label.split(' / ')[0], sx, sy + 3);
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDarkMode]);

  const addRipple = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ripplesRef.current.push({
      x,
      y,
      radius: 4,
      speed: 1.8 + Math.random() * 0.6,
      alpha: 0.9,
    });

    if (ripplesRef.current.length > 25) {
      ripplesRef.current.shift();
    }

    sound.playTap();
  };

  const handlePointerMove = (e) => {
    // Throttled ripple generation on move
    if (Math.random() < 0.2) {
      addRipple(e.clientX, e.clientY);
    }
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientXCheck(e) - rect.left;
    const y = clientYCheck(e) - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Check if clicked near a stone
    let clickedStone = null;
    stonesRef.current.forEach((st) => {
      const sx = st.x * width;
      const sy = st.y * height;
      const dist = Math.hypot(x - sx, y - sy);
      if (dist < st.r + 15) {
        clickedStone = st;
      }
    });

    if (clickedStone) {
      setActiveStone(clickedStone.label);
      sound.playZenChime();
      for (let r = 0; r < 3; r++) {
        setTimeout(() => {
          ripplesRef.current.push({
            x: clickedStone.x * width,
            y: clickedStone.y * height,
            radius: 4 + r * 6,
            speed: 2 + r * 0.5,
            alpha: 1.0,
          });
        }, r * 90);
      }
    } else {
      sound.playStamp();
      addRipple(clientXCheck(e), clientYCheck(e));
    }
  };

  const clientXCheck = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
  const clientYCheck = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  const clearCanvas = () => {
    ripplesRef.current = [];
    setActiveStone(null);
    sound.playTap();
  };

  const toggleSound = () => {
    const active = sound.toggle();
    setSoundEnabled(active);
    if (active) sound.playZenChime();
  };

  return (
    <div className="relative w-full h-[360px] md:h-[440px] rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-card)] shadow-xs transition-colors backdrop-blur-xs">
      <canvas
        ref={canvasRef}
        onMouseMove={handlePointerMove}
        onClick={handleClick}
        onTouchStart={handleClick}
        className="w-full h-full cursor-crosshair block"
      />

      {/* Top Banner overlay */}
      <div className="absolute top-4 left-5 flex items-center gap-2 pointer-events-none">
        <span className="inline-block w-2 h-2 rounded-full bg-[#B85D3B] animate-pulse"></span>
        <span className="text-[11px] font-mono-code uppercase tracking-wider text-[var(--text-secondary)]">
          Interactive Zen Sandbox (枯山水)
        </span>
      </div>

      {/* Interactive controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={toggleSound}
          title="Toggle Tactile Sound Effects"
          className="px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-paper)] text-[12px] font-mono-code flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#B85D3B] transition-all cursor-pointer"
        >
          {soundEnabled ? <Volume2 size={13} className="text-[#B85D3B]" /> : <VolumeX size={13} />}
          <span>{soundEnabled ? 'Sound On' : 'Sound Muted'}</span>
        </button>

        <button
          onClick={clearCanvas}
          title="Rake Sand / Reset"
          className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-paper)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-5 right-5 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono-code text-[var(--text-muted)] pointer-events-none gap-2">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-[#B85D3B]" />
          <span>Click or drag cursor anywhere to ripple sand & ink</span>
        </div>
        {activeStone ? (
          <span className="text-[#B85D3B] font-medium animate-fade-in">
            Contemplating: {activeStone}
          </span>
        ) : (
          <span>Click the 3 stones for harmonic echo</span>
        )}
      </div>
    </div>
  );
}
