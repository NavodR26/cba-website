'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function GavelLoader() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const firstLoad = useRef(true);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'hidden' | 'enter' | 'exit'>('hidden');
  const [isRouteChange, setIsRouteChange] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);

  // Synthesize wooden gavel strike using Web Audio API (no audio file needed)
  const playGavelStrike = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtx.current = ctx;

      // Low thud oscillator
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.6, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);

      // High click layer
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseGain.gain.setValueAtTime(0.25, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      noise.start(ctx.currentTime);
    } catch (e) {
      // Audio not available — silent fallback, animation still plays
    }
  }, []);

  const triggerAnimation = useCallback(() => {
    setVisible(true);
    setPhase('enter');

    // Fire sound at gavel strike moment
    const soundTimer = setTimeout(playGavelStrike, 1200);
    // Begin overlay exit
    const exitTimer = setTimeout(() => setPhase('exit'), 4200);
    // Fully remove from DOM
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setPhase('hidden');
      sessionStorage.setItem('cba-intro-seen', 'true');
    }, 5200);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [playGavelStrike]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Show on first load
    if (firstLoad.current) {
      firstLoad.current = false;
      setIsRouteChange(false);
      const cleanup = triggerAnimation();
      return cleanup;
    }

    // Don't show animation on route changes to prevent blocking content
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      setIsRouteChange(true);
      // Just play sound without overlay for route changes
      const soundTimer = setTimeout(playGavelStrike, 300);
      return () => clearTimeout(soundTimer);
    }

    return undefined;
  }, [triggerAnimation, pathname, playGavelStrike]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes gavelDrop {
          0%   { transform: translateY(-420px) scale(0.08) rotateX(50deg) rotateY(-15deg); opacity: 0; }
          6%   { opacity: 1; }
          28%  { transform: translateY(14px) scale(1.12) rotateX(-6deg) rotateY(5deg); opacity: 1; }
          36%  { transform: translateY(0) scale(1) rotateX(0deg) rotateY(0deg); }
          42%  { transform: translateY(0) scale(1) rotateY(0deg); }
          68%  { transform: translateY(0) scale(1) rotateY(360deg); }
          76%  { transform: translateY(0) scale(1.03) rotateY(360deg); }
          83%  { transform: translateY(0) scale(1) rotateY(360deg); }
          100% { transform: translateY(500px) scale(0.1) rotateY(360deg); opacity: 0; }
        }
        @keyframes overlayIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes overlayOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes labelPulse {
          0%,10%  { opacity: 0; letter-spacing: 3px; }
          25%,75% { opacity: 1; letter-spacing: 6px; }
          90%,100%{ opacity: 0; }
        }
        .cba-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: rgba(80, 10, 18, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .cba-overlay--enter { animation: overlayIn 0.35s ease forwards; }
        .cba-overlay--exit  { animation: overlayOut 0.6s ease forwards; }
        .cba-scene { perspective: 900px; }
        .cba-gavel {
          transform-style: preserve-3d;
          animation: gavelDrop 4.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cba-gavel img {
          width: 260px; height: auto; display: block;
          filter: drop-shadow(0 16px 48px rgba(0,0,0,0.9))
                  drop-shadow(0 0 28px rgba(212,160,23,0.2));
          pointer-events: none; user-select: none;
        }
        .cba-label {
          margin-top: 36px;
          font-size: 11px;
          font-family: 'Georgia', serif;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: rgba(245, 230, 200, 0.7);
          animation: labelPulse 3.5s ease forwards;
        }
      `}</style>

      <div
        className={`cba-overlay cba-overlay--${phase === 'exit' ? 'exit' : 'enter'}`}
        role="status"
        aria-label="Loading Colombo Brokers Association"
      >
        <div className="cba-scene">
          <div className="cba-gavel">
            <img src="/cba-gavel.png" alt="" draggable={false} />
          </div>
        </div>
        <p className="cba-label">The Colombo Brokers' Association</p>
      </div>
    </>
  );
}