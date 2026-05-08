'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    // Placeholder — wire to API/email service later
    setTimeout(() => setStatus('sent'), 800)
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <Field label="Full Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />
      <Field label="Subject" name="subject" required />

      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30 focus:border-[var(--maroon)] transition"
        />
      </div>

      <div className="sm:col-span-2 flex items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          By submitting you agree to our privacy policy.
        </p>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="px-7 py-3 bg-[var(--maroon)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition"
        >
          {status === 'sent'
            ? 'Message Sent ✓'
            : status === 'sending'
            ? 'Sending…'
            : 'Send Message'}
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
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5"
      >
        {label} {required && <span className="text-[var(--maroon)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30 focus:border-[var(--maroon)] transition"
      />
    </div>
  )
}
