'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }

    if (message.length < 10) {
      setStatus('error')
      setError('Please add a little more detail to your message.')
      return
    }

    setStatus('sending')
    window.setTimeout(() => {
      setStatus('sent')
      e.currentTarget.reset()
    }, 700)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
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
          rows={5}
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition focus:border-[var(--maroon)] focus:outline-none focus:ring-2 focus:ring-[var(--maroon)]/30"
        />
      </div>

      {(status === 'sent' || status === 'error') && (
        <div
          className={`sm:col-span-2 rounded-lg border px-4 py-3 text-sm ${
            status === 'sent'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}
          role="status"
        >
          {status === 'sent'
            ? 'Message prepared successfully. For live delivery, connect this form to your email/API service.'
            : error}
        </div>
      )}

      <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-gray-500">
          Your details are used only to respond to this enquiry.
        </p>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--maroon)] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {status === 'sending' && (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {status === 'sending' ? 'Preparing...' : 'Send Message'}
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
