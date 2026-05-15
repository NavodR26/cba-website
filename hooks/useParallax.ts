'use client';

import { useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useCallback } from 'react';
import type { MouseEvent } from 'react';

export function useScrollParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0px', `${80 * speed}px`]);
  return { ref, y, scrollYProgress };
}

export function useMouseParallax(strength = 12) {
  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);

  const x = useSpring(xMotion, { stiffness: 150, damping: 22 });
  const y = useSpring(yMotion, { stiffness: 150, damping: 22 });

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (event.clientX - centerX) / (rect.width / 2);
      const percentY = (event.clientY - centerY) / (rect.height / 2);

      xMotion.set(percentX * strength);
      yMotion.set(percentY * strength);
    },
    [strength, xMotion, yMotion]
  );

  const onMouseLeave = useCallback(() => {
    xMotion.set(0);
    yMotion.set(0);
  }, [xMotion, yMotion]);

  return { x, y, onMouseMove, onMouseLeave };
}
