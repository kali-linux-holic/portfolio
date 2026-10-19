import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { Play, RotateCcw, Server, Database, ShieldCheck, Zap, Activity, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function DevLab() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStage, setActiveStage] = useState(null);
  const [cacheMode, setCacheMode] = useState('hit'); // 'hit' | 'miss'
  const [spikeTraffic, setSpikeTraffic] = useState(false);
  const [telemetry, setTelemetry] = useState({
    latency: '18ms',
    cacheStatus: 'HIT (Sub-ms)',
    throughput: '42,500 req/s',
    circuitBreaker: 'HEALTHY',
    p99: '24ms',
  });

  const pipelineStages = [
    {
      id: 1,
      title: '01. Client Edge',
      subtitle: 'HTTP/3 + QUIC',
      icon: Zap,
      detail: 'TLS 1.3 handshake, zero-RTT connection resumption.',
    },
    {
      id: 2,
      title: '02. Edge Shield',
      subtitle: 'Wasm Rate Limiter',
      icon: ShieldCheck,
      detail: 'Distributed token bucket algorithm inspecting IP headers in 1.4ms.',
    },
    {
      id: 3,
      title: '03. Memory Cache',
      subtitle: 'Redis Cluster',
      icon: Layers,
      detail: cacheMode === 'hit' ? 'Hot key found. Instant zero-copy response stream.' : 'Cache miss. Forwarding request to Go worker pool.',
    },
    {
      id: 4,
      title: '04. Go Service',
      subtitle: 'gRPC Goroutines',
      icon: Server,
      detail: spikeTraffic ? 'Backpressure ring-buffer active. Throttling safely.' : 'Non-blocking I/O event loop dispatching in 3.2ms.',
    },
    {
      id: 5,
      title: '05. Data Engine',
      subtitle: 'PostgreSQL Read Replica',
      icon: Database,
      detail: cacheMode === 'hit' ? 'Bypassed (Zero DB load).' : 'Indexed B-Tree lookup executed in 7.4ms.',
    },
  ];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    sound.playTap();

    let step = 1;
    const maxSteps = cacheMode === 'hit' ? 3 : 5;

    const interval = setInterval(() => {
      setActiveStage(step);
      sound.playTap();

      if (step >= maxSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          sound.playZenChime();

          if (cacheMode === 'hit') {
            setTelemetry({
              latency: spikeTraffic ? '26ms' : '14ms',
              cacheStatus: 'HIT (Redis Memory)',
              throughput: spikeTraffic ? '94,000 req/s' : '48,200 req/s',
              circuitBreaker: 'HEALTHY (0% Drop)',
              p99: '18ms',
            });
          } else {
            setTelemetry({
              latency: spikeTraffic ? '112ms' : '54ms',
              cacheStatus: 'MISS -> DB Fetch',
              throughput: spikeTraffic ? '38,000 req/s' : '22,500 req/s',
              circuitBreaker: spikeTraffic ? 'BACKPRESSURE ENGAGED' : 'HEALTHY',
              p99: '68ms',
            });
          }
        }, 300);
      } else {
        step++;
      }
    }, 400);
  };

  const resetPipeline = () => {
    setActiveStage(null);
    setIsSimulating(false);
    sound.playTap();
  };

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 md:p-8 backdrop-blur-xs relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-kanji text-sm text-[#B85D3B] font-semibold">設計室</span>
            <span className="text-xs font-mono-code uppercase tracking-wider text-[var(--text-muted)]">
              // Live Interactive Architecture Lab
            </span>
          </div>
          <h3 className="font-serif-title text-2xl md:text-3xl font-medium tracking-tight">
            High-Throughput Request Lifecycle
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            Interactive pipeline simulation of a zero-downtime distributed service with Wasm edge filtering, Redis in-memory cache, and Go microservices.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Cache Hit/Miss Toggle */}
          <div className="flex items-center rounded-lg border border-[var(--border-color)] p-0.5 bg-[var(--bg-paper)] text-xs font-mono-code">
            <button
              onClick={() => {
                setCacheMode('hit');
                sound.playTap();
              }}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                cacheMode === 'hit'
                  ? 'bg-[#B85D3B] text-[#FAF7F2] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Cache Hit
            </button>
            <button
              onClick={() => {
                setCacheMode('miss');
                sound.playTap();
              }}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                cacheMode === 'miss'
                  ? 'bg-[#B85D3B] text-[#FAF7F2] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Cache Miss
            </button>
          </div>

          {/* Spike Traffic Toggle */}
          <button
            onClick={() => {
              setSpikeTraffic(!spikeTraffic);
              sound.playTap();
            }}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
              spikeTraffic
                ? 'border-amber-600 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium'
                : 'border-[var(--border-color)] bg-[var(--bg-paper)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Activity size={12} className={spikeTraffic ? 'animate-pulse' : ''} />
            <span>Spike 10k req/s</span>
          </button>

          {/* Trigger Request button */}
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="px-4 py-1.5 rounded-lg bg-[#22201D] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#22201D] text-xs font-mono-code font-medium flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
          >
            <Play size={12} className={isSimulating ? 'animate-spin' : ''} />
            <span>{isSimulating ? 'Dispatching...' : 'Dispatch Request'}</span>
          </button>

          <button
            onClick={resetPipeline}
            title="Reset"
            className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Pipeline Visualizer Nodes */}
      <div className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            const isCompleted = activeStage !== null && activeStage > stage.id;
            const isSkipped = cacheMode === 'hit' && stage.id > 3;

            return (
              <div
                key={stage.id}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'border-[#B85D3B] bg-[#B85D3B]/5 shadow-md scale-102 ring-1 ring-[#B85D3B]'
                    : isCompleted
                    ? 'border-emerald-600/40 bg-emerald-500/5 dark:bg-emerald-500/10'
                    : isSkipped
                    ? 'border-[var(--border-color)] opacity-40 bg-[var(--bg-paper)]'
                    : 'border-[var(--border-color)] bg-[var(--bg-paper)]'
                }`}
              >
                {/* Node Status Pill */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-[#B85D3B] text-white' : 'bg-[var(--border-color)]/30 text-[var(--text-primary)]'}`}>
                    <Icon size={16} />
                  </div>
                  {isCompleted && (
                    <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                  )}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#B85D3B] animate-ping" />
                  )}
                  {isSkipped && (
                    <span className="text-[10px] font-mono-code text-[var(--text-muted)]">BYPASS</span>
                  )}
                </div>

                <div className="text-[11px] font-mono-code text-[var(--text-muted)] uppercase">
                  {stage.title}
                </div>
                <div className="font-medium text-sm text-[var(--text-primary)] mt-0.5">
                  {stage.subtitle}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {stage.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Telemetry Dashboard Strip */}
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-paper-subtle)] p-4">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-color)]/60">
          <div className="text-[11px] font-mono-code text-[var(--text-secondary)] flex items-center gap-1.5">
            <Activity size={12} className="text-[#B85D3B]" />
            <span>REAL-TIME PIPELINE TELEMETRY</span>
          </div>
          <div className="text-[10px] font-mono-code text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>SYSTEM LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div>
            <div className="text-[10px] font-mono-code uppercase text-[var(--text-muted)]">Total Latency</div>
            <div className="text-base font-semibold font-mono-code text-[var(--text-primary)] mt-0.5">{telemetry.latency}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono-code uppercase text-[var(--text-muted)]">Cache Status</div>
            <div className="text-base font-semibold font-mono-code text-[#B85D3B] mt-0.5">{telemetry.cacheStatus}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono-code uppercase text-[var(--text-muted)]">Throughput</div>
            <div className="text-base font-semibold font-mono-code text-[var(--text-primary)] mt-0.5">{telemetry.throughput}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono-code uppercase text-[var(--text-muted)]">Circuit Breaker</div>
            <div className="text-base font-semibold font-mono-code text-emerald-600 dark:text-emerald-400 mt-0.5">{telemetry.circuitBreaker}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono-code uppercase text-[var(--text-muted)]">P99 SLA Guarantee</div>
            <div className="text-base font-semibold font-mono-code text-[var(--text-primary)] mt-0.5">{telemetry.p99}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
