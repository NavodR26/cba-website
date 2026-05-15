'use client';
import { motion } from 'framer-motion';

export function GoldRule({ width = 80, delay = 0 }: { width?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width, opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as any }}
      style={{
        height: '2px',
        background: '#C9A227',
        borderRadius: '1px',
        marginBottom: '1.5rem',
      }}
    />
  );
}