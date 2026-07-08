'use client'

export default function ScrollMouse() {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none">
      <div className="w-10 h-16 rounded-[12px] border-2 border-[var(--cba-gold)] flex items-start justify-center p-1 opacity-90">
        <div className="w-2 h-2 rounded-full bg-[var(--cba-gold)] animate-scroll-dot" />
      </div>
    </div>
  )
}
