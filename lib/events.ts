const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx9KGyKYZzjAZrcPNiDwTIVoCgzJdZkjiiV7NrMrCiNaVO1yd0Dh7TEaNxOUkCc_w5YXg/exec'

function parseDate(d: string) {
  if (!d) return null
  const date = new Date(d)
  return Number.isNaN(date.getTime()) ? null : date
}

export async function getEvents() {
  try {
    // Revalidate every minute instead of no-store — survives transient drops
    // and is much faster.
    const res = await fetch(ENDPOINT, {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.warn('[getEvents] non-OK response:', res.status)
      return []
    }
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.map((e: any) => ({
      id: e.id,
      type: e.type,
      category: e.category,
      title: e.title,
      sale_no: e.sale_no,
      start_date: parseDate(e.start_date),
      end_date: parseDate(e.end_date),
      catalogue_close: e.catalogue_close,
      time: e.time,
      location: e.location,
      notes: e.notes,
    }))
  } catch (err) {
    console.warn('[getEvents] fetch failed, returning empty list:', err)
    return []
  }
}
