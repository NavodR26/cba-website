'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ── GLOBAL GAVEL POSITION OFFSETS ───────────────────────────────────────
// These control the gavel's resting alignment relative to the base.
// They do NOT affect the strike contact point — that stays locked to
// GAVEL_CONTACT_Y so the calibrated impact position is preserved exactly.
// Horizontal offset: shifts the gavel image so the hammer HEAD (not the
// bounding box) lands on the base centre at strike. Negative = left.
const GAVEL_HEAD_OFFSET_X = 15;

// Wooden base horizontal nudge. Negative = left.
const BASE_OFFSET_X = -80;
// Raise the base so the hammer head meets its upper surface at the strike.
const BASE_OFFSET_Y = 5;

const GAVEL_OFFSET_Y = -5;

const GAVEL_CONTACT_Y = 25; // px — the calibrated "impact" position. DO NOT
                             // change this: it's what makes the head land on
                             // the base center. Verified correct already.

// Motion keyframes, anchored to the real contact point. The resting gap
// (25px previously) is widened by GAVEL_OFFSET_Y so the gavel hovers
// further above the base at idle/lift — this is what fixes the handle
// overlapping the base. STRIKE_Y is intentionally left as-is.
const REST_GAP = 20 + GAVEL_OFFSET_Y;   // was 25 — now includes clearance fix
const IDLE_Y = GAVEL_CONTACT_Y - REST_GAP;   // hovers clear of the base
const LIFT_Y = IDLE_Y - 40;                  // raised further for anticipation
const STRIKE_Y = GAVEL_CONTACT_Y;            // exact contact — unchanged

// Strike point on the base surface (256×256 container).
const STRIKE_POINT_X = 128 + BASE_OFFSET_X;
const STRIKE_POINT_Y = 175 + BASE_OFFSET_Y;

// Gavel render size — kept large for presence on the loader screen.
const GAVEL_RENDER_SIZE = 340;
const STRIKE_ADJUSTMENT_Y = 3;

export default function GavelLoader() {
  const mounted = useRef(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animationStage, setAnimationStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        return Math.min(p + Math.random() * 2.5, 95);
      });
    }, 120);

    setTimeout(() => setAnimationStage(1), 300);
    setTimeout(() => setAnimationStage(2), 1000);
    setTimeout(() => setAnimationStage(3), 2200);
    setTimeout(() => setAnimationStage(4), 3000);
    setTimeout(() => {
      setAnimationStage(5);
    }, 3800);
    setTimeout(() => setAnimationStage(6), 4200);

    const completeTimer = setTimeout(() => setProgress(100), 4400);
    const exitTimer = setTimeout(() => setIsExiting(true), 5000);
    const hideTimer = setTimeout(() => setVisible(false), 5600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // Keep the first server-rendered frame opaque, preventing a flash of
          // the home page before the loading experience takes over.
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            y: animationStage >= 5 ? [0, -3, 2, -1, 0] : 0,
          }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }}
          transition={{
            opacity: { duration: isExiting ? 0.6 : 0.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            backgroundColor: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            y: { duration: animationStage >= 5 ? 0.42 : 0.08, ease: [0.36, 0, 0.18, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(253, 252, 250, 0.97) 0%, rgba(242, 246, 250, 0.94) 52%, rgba(248, 245, 239, 0.96) 100%)',
            backdropFilter: 'blur(24px) saturate(115%)',
            WebkitBackdropFilter: 'blur(24px) saturate(115%)',
          }}
        >
          {/* Subtle background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Geometric pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(16, 42, 67, 0.1) 1px, transparent 1px),
                  linear-gradient(rgba(16, 42, 67, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
            {/* Subtle circular gradient */}
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.04]"
              style={{
                background: 'radial-gradient(circle, rgba(201, 162, 39, 0.3) 0%, transparent 70%)',
              }}
            />
            <div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.03]"
              style={{
                background: 'radial-gradient(circle, rgba(122, 31, 42, 0.2) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* CBA watermark */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none"
            style={{
              fontSize: 'clamp(8rem, 15vw, 12rem)',
              fontWeight: 700,
              color: '#102A43',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}
          >
            CBA
          </div>
          {/* Gavel and Base Container — fixed 256×256; strike coords assume this size */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Base — entrance, idle float, and impact reaction */}
            <div
              className="absolute bottom-5 left-1/2"
              style={{ transform: `translateX(calc(-50% + ${BASE_OFFSET_X}px)) translateY(${BASE_OFFSET_Y}px)` }}
            >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.86 }}
              animate={{
                opacity: animationStage >= 1 ? 1 : 0,
                y:
                  animationStage >= 5
                    ? [0, 5, -2, 0]
                    : animationStage >= 1
                    ? 0
                    : 20,
                scale:
                  animationStage >= 5
                    ? [1, 0.965, 1.012, 1]
                    : animationStage >= 1
                    ? 1
                    : 0.86,
                rotate: animationStage >= 5 ? [0, -1.2, 0.45, 0] : 0,
              }}
              transition={{
                opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                y: {
                  duration: animationStage >= 5 ? 0.45 : 0.7,
                  ease: animationStage >= 5 ? [0.36, 0, 0.18, 1] : [0.16, 1, 0.3, 1],
                },
                scale: {
                  duration: animationStage >= 5 ? 0.45 : 0.7,
                  ease: animationStage >= 5 ? [0.36, 0, 0.18, 1] : [0.16, 1, 0.3, 1],
                },
                rotate: { duration: 0.45, ease: [0.36, 0, 0.18, 1] },
              }}
            >
              {/* Idle podium glow — pulses gently before the strike */}
              <motion.div
                animate={{
                  opacity: 0,
                  scale: animationStage >= 2 && animationStage < 5 ? [1, 1.12, 1] : animationStage >= 5 ? [1, 1.45, 1.6] : 1,
                }}
                transition={{
                  duration: animationStage >= 5 ? 0.6 : 2.8,
                  repeat: animationStage >= 2 && animationStage < 5 ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-20 rounded-full pointer-events-none blur-2xl"
                style={{
                  background: 'radial-gradient(ellipse, rgba(201, 162, 39, 0.55) 0%, transparent 75%)',
                }}
              />

              <motion.div
                animate={{
                  y: animationStage >= 2 && animationStage < 5 ? [0, -4, 0] : 0,
                  scale: animationStage >= 2 && animationStage < 5 ? [1, 1.012, 1] : 1,
                }}
                transition={{
                  duration: 2.8,
                  repeat: animationStage >= 2 && animationStage < 5 ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <Image
                  src="/base.png"
                  alt="Wooden Base"
                  width={180}
                  height={100}
                  priority
                  className="w-44 h-auto object-contain relative z-[1]"
                  draggable={false}
                  style={{
                    filter: 'drop-shadow(0 18px 32px rgba(0, 0, 0, 0.28))',
                  }}
                />

                {/* Wood-surface shimmer while waiting */}
                <motion.div
                  animate={{
                    opacity: 0,
                    x: animationStage >= 2 && animationStage < 5 ? ['-120%', '120%'] : '-120%',
                  }}
                  transition={{
                    opacity: { duration: 2.4, repeat: animationStage >= 2 && animationStage < 5 ? Infinity : 0, ease: 'easeInOut' },
                    x: { duration: 2.4, repeat: animationStage >= 2 && animationStage < 5 ? Infinity : 0, ease: 'easeInOut' },
                  }}
                  className="absolute inset-0 z-[2] pointer-events-none overflow-hidden rounded-full"
                  style={{
                    maskImage: 'radial-gradient(ellipse 70% 55% at 50% 40%, black 0%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 40%, black 0%, transparent 100%)',
                  }}
                >
                  <div
                    className="h-full w-1/2"
                    style={{
                      background: 'linear-gradient(105deg, transparent 0%, rgba(255, 236, 179, 0.55) 50%, transparent 100%)',
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            </div>

            {/* Gavel — outer div holds horizontal position (CSS transform).
                Inner motion.div animates scale/y/rotate so Framer Motion
                does not overwrite the X offset. */}
            <div
              className="absolute z-10 top-0"
              style={{
                left: '50%',
                width: GAVEL_RENDER_SIZE,
                transform: `translateX(calc(-50% + ${GAVEL_HEAD_OFFSET_X}px))`,
              }}
            >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, filter: 'blur(6px)' }}
              animate={{
                scale: animationStage >= 5 ? [1.035, 0.985, 1.008, 1] : animationStage >= 2 ? 1.035 : 0.88,
                opacity: animationStage >= 2 ? 1 : 0,
                filter: animationStage >= 2 ? 'blur(0px)' : 'blur(6px)',
                y:
                  animationStage === 4
                    ? LIFT_Y
                    : animationStage >= 5
                    ? [LIFT_Y, STRIKE_Y + STRIKE_ADJUSTMENT_Y, STRIKE_Y + 1, STRIKE_Y + STRIKE_ADJUSTMENT_Y]
                    : animationStage >= 2 && animationStage < 4
                    ? [IDLE_Y, IDLE_Y - 3, IDLE_Y]
                    : IDLE_Y,
                rotate: animationStage === 4 ? 18 : animationStage >= 5 ? [18, 0, -1.2, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.9 },
                filter: { duration: 0.9 },
                y: {
                  duration: animationStage === 4 ? 0.62 : animationStage >= 2 && animationStage < 4 ? 3 : 0.46,
                  ease: animationStage === 4 ? [0.25, 0.46, 0.45, 0.94] : animationStage >= 2 && animationStage < 4 ? 'easeInOut' : [0.86, 0, 0.07, 1],
                  repeat: animationStage >= 2 && animationStage < 4 ? Infinity : 0,
                },
                rotate: {
                  duration: animationStage === 4 ? 0.52 : 0.46,
                  ease: animationStage === 4 ? [0.33, 1, 0.68, 1] : [0.86, 0, 0.07, 1],
                },
              }}
              className="relative"
              style={{
                transformOrigin: '70% 85%',
              }}
            >
              {/* Light reflection/shimmer on gavel head */}
              <motion.div
                animate={{
                  opacity: animationStage >= 2 && animationStage < 5 ? [0, 0.6, 0] : 0,
                  x: animationStage >= 2 && animationStage < 5 ? ['-100%', '100%'] : '-100%',
                }}
                transition={{
                  duration: 2.5,
                  repeat: animationStage >= 2 && animationStage < 5 ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                  maskImage: 'radial-gradient(ellipse 45% 35% at 30% 25%, black 0%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 45% 35% at 30% 25%, black 0%, transparent 100%)',
                }}
              >
                <div
                  className="h-full w-1/3"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 236, 179, 0.7) 50%, transparent 100%)',
                  }}
                />
              </motion.div>
              
              <motion.div
                animate={{
                  opacity: 0,
                }}
                transition={{ duration: 1.2, repeat: animationStage >= 2 && animationStage < 5 ? Infinity : 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                }}
              />
              <Image
                src="/gavel.png"
                alt="CBA Gavel"
                width={GAVEL_RENDER_SIZE}
                height={GAVEL_RENDER_SIZE}
                priority
                className="object-contain"
                draggable={false}
                style={{
                  filter: 'drop-shadow(0 20px 38px rgba(0, 0, 0, 0.32))',
                  width: 'auto',
                  height: 'auto',
                }}
              />
            </motion.div>
            </div>

            {/* Contact Shadow + impact flash at strike point */}
            <AnimatePresence>
              {animationStage >= 5 && animationStage <= 6 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-32 h-12 rounded-full pointer-events-none blur-md"
                    style={{
                      left: STRIKE_POINT_X,
                      top: STRIKE_POINT_Y,
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 75%)',
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-28 h-28 rounded-full pointer-events-none"
                    style={{
                      left: STRIKE_POINT_X,
                      top: STRIKE_POINT_Y,
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(255, 236, 179, 0.65) 0%, transparent 70%)',
                    }}
                  />
                </>
              )}
            </AnimatePresence>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-6 relative"
          >
            {/* Premium gold accent lines */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 h-px w-24 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #C9A227 50%, transparent 100%)',
              }}
            />
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 h-px w-24 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #C9A227 50%, transparent 100%)',
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#9b7628]"
            >
              Established 1904
            </motion.p>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.h2
                initial={{ letterSpacing: '0.5em' }}
                animate={{ letterSpacing: '0.2em' }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[1.75rem] md:text-[2.25rem] font-bold"
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                color: '#102A43',
                  fontWeight: 700,
                  letterSpacing: '2px',
                }}
              >
                COLOMBO BROKERS&apos; ASSOCIATION
              </motion.h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              animate={{ opacity: 1, letterSpacing: '0.15em' }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base mt-4"
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                color: '#5F6C7B',
                fontWeight: 500,
              }}
            >
              Connecting • Representing • Advancing
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '12rem' }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-14 h-[3px] rounded-[999px] overflow-hidden"
            style={{
              background: 'rgba(16, 42, 67, 0.10)',
            }}
          >
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #C9A227 0%, #D4AF37 50%, #8B6B2E 100%)',
                width: `${progress}%`,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{ width: '50%' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
