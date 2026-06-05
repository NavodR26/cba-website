'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function GavelLoader() {
  const mounted = useRef(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show on first mount (hard load / page refresh)
    // Next.js App Router layout doesn't remount on client-side navigation
    if (mounted.current) return;
    mounted.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    setVisible(true);

    // Progress bar fills gradually over the entire loader sequence
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        return Math.min(p + Math.random() * 8, 95);
      });
    }, 120);

    // Advanced animation phases:
    // Phase 1 (0-2.8s): Gavel drops from top (very small) to middle with 3D rotation and scaling
    // Phase 2 (1.2s): Impact ripples appear
    // Phase 3 (2.8-4.2s): Gavel does 360-degree spin with fade out
    // Phase 4 (2.8-4.0s): Overlay fades out with blur effect
    // At 4.2s: Unmount

    // Complete progress bar to 100% at animation end
    const completeTimer = setTimeout(() => {
      setProgress(100);
    }, 2800);

    // Fade and unmount
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 4200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes gavelDropAdvanced {
          0% {
            transform: translateY(-500px) scale(0.3) rotateX(90deg) rotateY(-45deg) rotateZ(-35deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          25% {
            transform: translateY(-300px) scale(0.5) rotateX(60deg) rotateY(-30deg) rotateZ(-25deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-50px) scale(0.85) rotateX(25deg) rotateY(-10deg) rotateZ(-8deg);
            opacity: 1;
          }
          72% {
            transform: translateY(10px) scale(1.05) rotateX(-5deg) rotateY(5deg) rotateZ(2deg);
            opacity: 1;
          }
          80% {
            transform: translateY(0px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 1;
          }
        }

        @keyframes gavelRotate360 {
          0% {
            transform: scale(1) rotateY(0deg) rotateX(0deg) rotateZ(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1) rotateY(180deg) rotateX(15deg) rotateZ(10deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.8) rotateY(360deg) rotateX(20deg) rotateZ(0deg);
            opacity: 0;
          }
        }

        @keyframes rippleOuter {
          0% {
            opacity: 0.6;
            r: 5px;
          }
          100% {
            opacity: 0;
            r: 100px;
          }
        }

        @keyframes rippleInner {
          0% {
            opacity: 0.4;
            r: 0px;
          }
          100% {
            opacity: 0;
            r: 70px;
          }
        }

        @keyframes overlayFadeOut {
          0% {
            opacity: 1;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          100% {
            opacity: 0;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
          }
        }

        .gavel-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(122, 31, 42, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .gavel-overlay.fade-out {
          animation: overlayFadeOut 1.2s ease-out forwards;
          animation-delay: 2.8s;
        }

        .gavel-container {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
        }

        .gavel-image {
          width: 240px;
          height: 240px;
          animation: gavelDropAdvanced 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     gavelRotate360 1.4s cubic-bezier(0.17, 0.67, 0.83, 0.67) 2.8s forwards;
          filter: drop-shadow(0 12px 40px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 40px rgba(201, 169, 110, 0.2));
          object-fit: contain;
        }

        .ripple-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 240px;
          height: 240px;
          pointer-events: none;
        }

        .ripple-container svg {
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .ripple-container.show svg {
          opacity: 1;
          animation: none;
        }

        .ripple-outer {
          animation: rippleOuter 0.8s ease-out forwards;
          animation-delay: 1.2s;
        }

        .ripple-inner {
          animation: rippleInner 0.8s ease-out forwards;
          animation-delay: 1.3s;
        }

        .gavel-text {
          text-align: center;
          animation: fadeInText 0.6s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        @keyframes fadeInText {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gavel-text h2 {
          color: #c9a96e;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 1px;
          margin: 0;
          font-family: Georgia, serif;
        }

        .gavel-text p {
          color: #c9a96e;
          font-size: 12px;
          letter-spacing: 2px;
          margin: 8px 0 0;
          text-transform: uppercase;
          font-family: Georgia, serif;
          opacity: 0.9;
        }

        .progress-bar-container {
          position: absolute;
          bottom: 30px;
          width: 200px;
          height: 2px;
          background: rgba(201, 169, 110, 0.2);
          border-radius: 1px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a96e 0%, #e8d4a2 50%, #c9a96e 100%);
          width: 0%;
          border-radius: 1px;
          transition: width 0.12s ease-out;
          box-shadow: 0 0 10px rgba(201, 169, 110, 0.4);
        }
      `}</style>

      <div className={`gavel-overlay ${visible && progress >= 100 ? 'fade-out' : ''}`}>
        <div className="gavel-container">
          {/* Real Gavel Image (switched to new public asset) */}
          <Image
            src="/gavel-loader.png"
            alt="CBA Gavel"
            width={240}
            height={240}
            priority
            className="gavel-image"
            draggable={false}
          />

          {/* Ripple rings (appear on impact at ~800ms) */}
          <div className="ripple-container show">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="100"
                cy="100"
                r="8"
                fill="none"
                stroke="#c9a96e"
                strokeWidth="2"
                className="ripple-outer"
              />
              <circle
                cx="100"
                cy="100"
                r="0"
                fill="none"
                stroke="#c9a96e"
                strokeWidth="2"
                className="ripple-inner"
              />
            </svg>
          </div>
        </div>

        <div className="gavel-text">
          <h2>Colombo Brokers&apos; Association</h2>
          <p>Established 1904</p>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
}
