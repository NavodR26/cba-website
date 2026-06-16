export default function Loading() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[var(--maroon)]/20 border-t-[var(--maroon)] rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  )
}
