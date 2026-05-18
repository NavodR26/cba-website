'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== lastPathnameRef.current) {
      lastPathnameRef.current = pathname;

      // 1. Instantly scroll to top (NOT smooth)
      window.scrollTo({ top: 0, behavior: 'instant' as any });

      // 2. Use double-tick requestAnimationFrame to trigger CSS transition after DOM paints
      // First tick: let browser paint current frame
      // Second tick: apply the transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove('page-transitioning');
            // Trigger transition
            void containerRef.current.offsetHeight; // Force reflow
            containerRef.current.classList.add('page-transitioning');
          }
        });
      });
    }
  }, [pathname]);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        [data-page-transition] {
          min-height: 100vh;
        }

        [data-page-transition].page-transitioning {
          animation: fadeInUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div
        ref={containerRef}
        data-page-transition
        className="page-transitioning"
        style={{ minHeight: '100vh', margin: 0, padding: 0 }}
      >
        {children}
      </div>
    </>
  );
}