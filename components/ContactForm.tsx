'use client'

import { useState } from 'react'

const OFFICIAL_EMAIL = 'info@cbasl.lk'

export default function ContactForm() {
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const phone = String(form.get('phone') || '').trim()
    const subject = String(form.get('subject') || '').trim()
    const message = String(form.get('message') || '').trim()

    if (!name) {
      setError('Please enter your full name.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (message.length < 10) {
      setError('Please add a little more detail to your message.')
      return
    }

    const mailSubject = encodeURIComponent(subject || 'CBA Website Enquiry')
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\n${message}\n\n---\nSent via cba.lk contact form`
    )

    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${mailSubject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4 sm:grid-cols-2">
      <Field label="Full Name" name="name" autoComplete="name" required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      <Field label="Subject" name="subject" required />

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
          Message <span className="text-[var(--maroon)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm transition focus:border-[var(--maroon)] focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30"
        />
      </div>

      {error && (
        <div
          className="sm:col-span-2 rounded-lg border border-amber-200 bg-amber-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-amber-800"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="sm:col-span-2 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] sm:text-xs leading-5 text-gray-500 max-w-md">
          Your enquiry opens in your email app addressed to{' '}
          <a href={`mailto:${OFFICIAL_EMAIL}`} className="font-medium text-[var(--maroon)] hover:underline">
            {OFFICIAL_EMAIL}
          </a>
          . Automated delivery will be enabled once our official email service is configured. Your details are used only
          to respond to this enquiry.
        </p>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--maroon)] px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 w-full sm:w-auto"
        >
          Email the Secretariat
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700">
        {label} {required && <span className="text-[var(--maroon)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-[var(--maroon)] focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30"
      />
    </div>
  )
}
