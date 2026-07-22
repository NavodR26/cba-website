// Link intentionally unused in this file
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TopBar from '@/components/TopBar'
import PageHeroPremium from '@/components/PageHeroPremium'
import ContactForm from '@/components/ContactForm'
import { getEvents } from '@/lib/events'

export const metadata = {
  title: "Contact | The Colombo Brokers' Association",
  description:
    "Contact the Colombo Brokers' Association for membership, media, official correspondence and general enquiries.",
  openGraph: {
    title: "Contact | The Colombo Brokers' Association",
    description:
      "Contact the Colombo Brokers' Association for membership, media, official correspondence and general enquiries.",
  },
}

export default async function ContactPage() {
  const events = await getEvents()
  const safeEvents = events.map((e: any) => ({
    title: e.title,
    start_date: e.start_date ? new Date(e.start_date).toISOString() : null,
    category: e.category,
    type: e.type,
    sale_no: e.sale_no,
  }))

  return (
    <main id="main-content" className="cba-page-shell bg-white text-gray-800">
      <TopBar events={safeEvents} />
      <Navbar />

      <PageHeroPremium
        badge="Get in Touch"
        title="Contact the Association"
        subtitle="Reach our Secretariat for membership, administration and general enquiries."
        backgroundImage="/contact_hero.png"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* INFO + FORM */}
      <section className="py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-5 gap-10">
          {/* OFFICE HOURS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Office Hours</h3>
              </div>
              <div className="pl-13 space-y-1 text-sm text-gray-600">
                <p>Mon – Fri: <span className="font-medium text-gray-900">8:30 am – 5:00 pm</span></p>
                <p>Sat – Sun: <span className="font-medium text-gray-900">Closed</span></p>
              </div>
            </div>

            {/* Secretarial Services Card */}
            <div className="bg-gradient-to-br from-[var(--maroon)] to-[#5a1620] rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-300">Secretarial Services (Pvt) Ltd.</h3>
                  <p className="text-xs text-white/70 mt-1 uppercase tracking-wider">Main Office</p>
                </div>
              </div>
              <div className="space-y-3 pl-16">
                <div className="flex items-center gap-3 text-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/90">No. 10, Gothami Road, Colombo 08</span>
                </div>
                <a href="tel:+94112015900" className="flex items-center gap-3 text-sm hover:text-amber-300 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span className="text-white/90">+94 11 201 5900</span>
                </a>
                <a href="mailto:secretariat@msl.lk" className="flex items-center gap-3 text-sm hover:text-amber-300 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <span className="text-white/90">secretariat@msl.lk</span>
                </a>
              </div>
            </div>

            {/* CBA Chairman Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-400">CBA Chairman</h3>
                </div>
              </div>
              <div className="space-y-3 pl-16">
                <p className="text-white font-medium">Mr. Ramesh Rayappan</p>
                <p className="text-sm text-white/70">CEO/Director - Mercantile Produce Brokers Pvt Ltd</p>
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white/90">133, Jawatta Road, Colombo 05</span>
                  </div>
                  <a href="tel:+94112581358" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <span className="text-white/90">+94 11 258 1358</span>
                  </a>
                  <a href="mailto:chairmancba@merctea.net" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    <span className="text-white/90">chairmancba@merctea.net</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7 md:p-9 hover-glow animate-fade-in-scale transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Send us a message
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                We typically respond within 1–2 business days.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="px-6 pb-16">
        <div className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-sm animate-fade-in-scale hover-glow transition-all duration-300">
          <iframe
            title="CBA Location"
            src="https://www.google.com/maps?q=Gothami+Road+Colombo+08+Sri+Lanka&output=embed"
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

