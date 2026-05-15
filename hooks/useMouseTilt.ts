'use client';
import { useMotionValue, useSpring } from 'framer-motion';
import { useCallback } from 'react';

/**
 * Mouse tilt for 3D card/image effect.
 * Returns { rotateX, rotateY, onMouseMove, onMouseLeave }
 * maxTilt = max degrees of tilt (default 8)
 */
export function useMouseTilt(maxTilt = 8) {
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pctX = (e.clientX - centerX) / (rect.width / 2);
    const pctY = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(pctX * maxTilt);
    rotateX.set(-pctY * maxTilt);
  }, [maxTilt, rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}