import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-20 text-gray-900">
      <div className="max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--maroon)]">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          The page may have moved, or the address may be incorrect. Use the shortcuts below to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-[var(--maroon)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
            Home
          </Link>
          <Link href="/resources" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]">
            Resources
          </Link>
          <Link href="/contact" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[var(--maroon)]/30 hover:text-[var(--maroon)]">
            Contact
          </Link>
        </div>
      </div>
    </main>
  )
}
