import Link from 'next/link'

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Terms of Use
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              The Colombo Brokers&rsquo; Association
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-200 text-gray-700 hover:text-[var(--maroon)] group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Close</span>
          </Link>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-[var(--maroon)] to-[#681721] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Terms of Use Document</p>
                <p className="text-white/70 text-xs">Official CBA Document</p>
              </div>
            </div>
            <a 
              href="/CBA_Privacy_Policy_Terms_of_Use.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
          
          <div className="w-full h-[75vh] sm:h-[80vh] bg-gray-100">
            <iframe
              src="/CBA_Privacy_Policy_Terms_of_Use.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="w-full h-full border-0"
              title="Terms of Use PDF"
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For questions about our Terms of Use, contact us at <a href="mailto:info@cbasl.lk" className="text-[var(--maroon)] hover:underline font-medium">info@cbasl.lk</a></p>
        </div>
      </div>
    </div>
  )
}
