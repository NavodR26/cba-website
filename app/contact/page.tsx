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
          {/* INFO CARDS */}
          <div className="lg:col-span-2 space-y-4">
            <InfoCard
              title="Office Address"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              lines={['No. 52, 2nd Floor', 'Navam Mawatha', 'Colombo 02, Sri Lanka']}
            />
            <InfoCard
              title="Phone"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              }
              lines={['+94 11 224 1387']}
              linkHref="tel:+94112241387"
            />
            <InfoCard
              title="Email"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              }
              lines={['info@cba.lk']}
              linkHref="mailto:info@cba.lk"
            />
            <InfoCard
              title="Office Hours"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              }
              lines={['Mon – Fri: 8:30 am – 5:00 pm', 'Sat – Sun: Closed']}
            />
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
            src="https://www.google.com/maps?q=Navam+Mawatha+Colombo+02&output=embed"
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

function InfoCard({
  title,
  icon,
  lines,
  linkHref,
}: {
  title: string
  icon: React.ReactNode
  lines: string[]
  linkHref?: string
}) {
  const content = (
    <>
      <div className="w-11 h-11 rounded-xl bg-[var(--maroon)]/10 text-[var(--maroon)] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="text-sm text-gray-600 mt-0.5 leading-relaxed">
          {lines.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      </div>
    </>
  )
  const wrapClass =
    'group flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[var(--maroon)]/40 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 animate-fade-in-scale'
  return linkHref ? (
    <a href={linkHref} className={wrapClass}>
      {content}
    </a>
  ) : (
    <div className={wrapClass}>{content}</div>
  )
}
