'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

export function CountUp({ to, duration = 2000, suffix = '', prefix = '', decimals = 0 }: { to: number; duration?: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = eased * to;
      setCount(Number(value.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, to, duration, decimals]);

  return (
    <span ref={ref} className="counter-animate inline-block">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function AnimatedStat({ value, label, prefix = '', suffix = '', duration = 2000 }: { value: number; label: string; prefix?: string; suffix?: string; duration?: number }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
        <CountUp to={value} duration={duration} prefix={prefix} suffix={suffix} />
      </div>
      <p className="text-sm md:text-base text-gray-600 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export function AnimatedProgress({ value, label, color = 'var(--maroon)' }: { value: number; label: string; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1500, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setWidth(eased * value);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{Math.round(width)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function AnimatedCounter({ end, duration = 2000, className = '' }: { end: number; duration?: number; className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {count.toLocaleString()}
    </motion.div>
  );
}
