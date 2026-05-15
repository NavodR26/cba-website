'use client'

export default function SkeletonLoader({ 
  className = '', 
  variant = 'default' 
}: { 
  className?: string
  variant?: 'default' | 'text' | 'circular' | 'rectangular'
}) {
  const baseClasses = 'animate-pulse bg-gray-200'
  
  const variantClasses = {
    default: 'rounded',
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <SkeletonLoader className="w-12 h-12 rounded-full mb-4" variant="circular" />
      <SkeletonLoader className="h-6 w-3/4 mb-2" variant="text" />
      <SkeletonLoader className="h-4 w-1/2 mb-4" variant="text" />
      <SkeletonLoader className="h-20 w-full" variant="rectangular" />
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
      <SkeletonLoader className="h-12 w-12 mx-auto mb-4 rounded-full" variant="circular" />
      <SkeletonLoader className="h-8 w-24 mx-auto mb-2" variant="text" />
      <SkeletonLoader className="h-4 w-32 mx-auto" variant="text" />
    </div>
  )
}
