import Link from 'next/link'

export default function BecomeMemberCTA() {
  return (
    <section
      id="apply"
      className="px-4 sm:px-6 lg:px-8 pb-16 pt-4 scroll-mt-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--maroon)] via-[#5a1620] to-[#3d0f17] text-white">
          {/* Decorative shapes */}
          <div
            aria-hidden
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-300/10 -translate-y-1/2 translate-x-1/3"
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3"
          />

          <div className="relative grid lg:grid-cols-12 gap-8 p-10 md:p-14">
            {/* LEFT: copy */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                Membership Application
              </span>
              <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.1]">
                Become a member of the
                <br />
                <span className="text-amber-300">Colombo Brokers&rsquo; Association</span>
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed max-w-xl">
                Join the authority vested by the Sri Lanka Tea Board.
                Contact the secretariat for membership criteria and registration.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[var(--maroon)] font-semibold hover:bg-amber-50 transition shadow-lg"
                >
                  Apply Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 font-semibold transition"
                >
                  Download Info Pack
                </Link>
              </div>
            </div>

            {/* RIGHT: process steps */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 md:p-7">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-amber-300/90 mb-4">
                  How it works
                </p>
                <ul className="space-y-4">
                  <Step
                    n="1"
                    title="Submit enquiry"
                    text="Reach out via the Contact form or email the secretariat."
                  />
                  <Step
                    n="2"
                    title="Review &amp; criteria"
                    text="The committee reviews your firm against membership criteria."
                  />
                  <Step
                    n="3"
                    title="Welcome aboard"
                    text="Once approved, your firm is enrolled in the directory and gains full member access."
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <li className="flex gap-4">
      <div className="shrink-0 w-9 h-9 rounded-full bg-amber-300 text-[#3d0f17] font-bold flex items-center justify-center">
        {n}
      </div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-white/70 mt-0.5 leading-relaxed">{text}</p>
      </div>
    </li>
  )
}
