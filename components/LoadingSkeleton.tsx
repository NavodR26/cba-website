'use client'

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-32 bg-gray-200 rounded-lg" />
    </div>
  )
}

export function EventCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-2xl p-4 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-2xl" />
        </div>
      ))}
    </div>
  )
}

export function CalendarSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-200 rounded-lg mb-4" />
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  )
}

export function VirtualTourSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[21/9] bg-gray-200 rounded-2xl mb-6" />
      <div className="flex justify-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-16 h-12 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

export function FullPageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center space-y-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-32 mx-auto" />
      </div>
    </div>
  )
}
