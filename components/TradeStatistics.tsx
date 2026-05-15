import Link from 'next/link'

const API_URL = 'https://script.google.com/macros/s/AKfycbziOK6ckEQ5i2KqVI9mUqocsMVbkRw9ED5ZO2PaNtAyiY6cHLX-E8TZpcpxDl6g_miH/exec'

type TradeRow = {
  reportMonth: string
  product: string
  monthlyValue: number
  prevYearSameMonth: number
  yoyPercent: number
  ytdPeriod: string
  ytdValue: number
  prevYtd: number
  ytdYoyPercent: number
}

type TradeResponse = {
  success: boolean
  updatedAt?: string
  latestReportMonth?: string
  rows?: TradeRow[]
  totalRows?: number
}

function formatValue(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value)
}

function formatPercent(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

function fetchTradeStats() {
  return fetch(API_URL, {
    next: { revalidate: 60 },
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(`Trade statistics request failed: ${res.status}`)
    }
    return (await res.json()) as TradeResponse
  })
}

export default async function TradeStatistics({ preview }: { preview?: boolean }) {
  let data: TradeResponse = { success: false }

  try {
    data = await fetchTradeStats()
  } catch (error) {
    console.error('[TradeStatistics] failed to load', error)
  }

  const rows = data.rows ?? []
  const latestMonth = data.latestReportMonth ?? 'Latest'
  const totalValue = rows.reduce((sum, row) => sum + (row.monthlyValue ?? 0), 0)
  const totalYoY = rows.reduce((sum, row) => sum + (row.yoyPercent ?? 0), 0) / Math.max(rows.length, 1)
  const strongest = [...rows].sort((a, b) => b.yoyPercent - a.yoyPercent).slice(0, 3)
  const highlight = rows.find((row) => row.product === 'Tea') || rows[0] || {
    product: 'Market',
    monthlyValue: 0,
    reportMonth: latestMonth,
    yoyPercent: 0,
    ytdPeriod: '',
    prevYearSameMonth: 0,
  }
  const previewRows = preview ? rows.slice(0, 3) : rows
  const signal = totalYoY >= 0 ? 'positive' : 'negative'

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_minmax(250px,1fr)] items-start">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--maroon)]/10 text-[var(--maroon)] text-xs uppercase tracking-[0.28em] font-semibold">
              Market snapshot
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 max-w-2xl leading-tight">
              Live trade statistics from the CBA market data feed
            </h2>
            <div className="max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500 font-semibold">
                Data source
              </p>
              <p className="mt-2 leading-relaxed">
                Automatically updated from the Association's Google Sheets market report feed.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">
              Latest report
            </p>
            <p className="mt-3 text-xl font-semibold text-gray-900">{latestMonth}</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Updated: {data.updatedAt ? new Date(data.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 font-semibold">Total value</p>
                <p className="mt-3 text-2xl font-semibold text-gray-900">US$ {formatValue(totalValue)}M</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-200">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 font-semibold">YoY average</p>
                <p className={`mt-3 text-2xl font-semibold ${signal === 'positive' ? 'text-emerald-700' : 'text-red-600'}`}>
                  {formatPercent(totalYoY)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-5 lg:grid-cols-3">
          <div className="grid gap-5 self-start lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {previewRows.map((row) => (
                <article key={row.product} className="min-h-[190px] rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">{row.product}</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${row.yoyPercent >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {formatPercent(row.yoyPercent)}
                    </span>
                  </div>
                  <p className="mt-5 text-3xl font-semibold text-gray-900">US$ {formatValue(row.monthlyValue)}M</p>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    {row.reportMonth} vs {row.prevYearSameMonth ? `US$ ${formatValue(row.prevYearSameMonth)}M` : 'previous year'}
                  </p>
                </article>
              ))}
              {previewRows.length === 0 && (
                <article className="rounded-[1.5rem] border border-dashed border-gray-300 bg-gray-50 p-5 text-sm leading-relaxed text-gray-500 sm:col-span-2 xl:col-span-4">
                  Merchandise trade statistics are currently unavailable. Please check the resources page again shortly.
                </article>
              )}
            </div>

            {!preview && (
              <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">Commodity breakdown</p>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">Export values by category</p>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  {rows.map((row) => (
                    <div key={row.product} className="grid grid-cols-[auto_1fr] gap-4 items-center">
                      <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-[var(--maroon)]"
                          style={{ width: `${Math.min((row.monthlyValue / Math.max(totalValue, 1)) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{row.product}</p>
                        <p className="text-xs text-gray-500">Value US$ {formatValue(row.monthlyValue)}M</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">Top performer</p>
              <p className="mt-4 text-lg font-semibold text-gray-900">{highlight.product}</p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {highlight.product} recorded US$ {formatValue(highlight.monthlyValue)}M for {highlight.reportMonth}, {highlight.yoyPercent >= 0 ? 'up' : 'down'} {formatPercent(highlight.yoyPercent)} year-over-year.
              </p>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">Category comparison</p>
              <ul className="mt-4 space-y-3">
                {strongest.map((row) => (
                  <li key={row.product} className="space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-900">{row.product}</p>
                      <span className={`text-sm font-semibold ${row.yoyPercent >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                        {formatPercent(row.yoyPercent)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">US$ {formatValue(row.monthlyValue)}M · YTD {row.ytdPeriod}</p>
                  </li>
                ))}
              </ul>
            </div>

            {!preview && rows.length > 0 && (
              <div className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500 font-semibold">Historical comparison</p>
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-gray-900 font-semibold">YTD performance</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Across the reported commodities, YTD values are compared against the prior year benchmark.
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>

        {preview && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              View a concise market summary on the homepage. For complete trade statistics, open the resources page.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-full bg-[var(--maroon)] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5b1728] transition"
            >
              View full trade statistics
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
