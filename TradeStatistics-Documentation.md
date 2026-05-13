# TradeStatistics Component Documentation

## Overview
`TradeStatistics` is a reusable component that fetches merchandise trade data from a remote API and renders a compact market summary. It is used in two places:
- Home page preview section
- Resources page full report section

## Purpose
This component provides a quick, data-driven view of export performance for Sri Lanka’s main commodities: tea, coconut, spices, and rubber.

## Data Source
- Fetched from a Google Apps Script URL at `API_URL`
- Server-side rendered with Next.js
- Revalidated every 60 seconds using `next` fetch caching

## Data Shape
The response is expected to match this type:
```ts
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
```

## Layout Structure

### Section wrapper
- `<section>` with `py-14 px-4 sm:px-6 lg:px-8 bg-white`
- Contains a centered max-width container: `max-w-[1400px] mx-auto`

### Header grid
- Two-column responsive grid: `lg:grid-cols-[1.4fr_minmax(250px,1fr)]`
- Left panel: title, subtitle, data source badge
- Right panel: latest report card with total value and YoY average

### Summary cards
- A grid of statistic cards showing top commodity values
- On preview mode, only the first 3 cards are shown
- Each card includes:
  - product name
  - YoY percentage badge
  - monthly value
  - comparison text to previous year

### Secondary panels
- `Category summary` panel with proportional bars for each commodity
- `Top performer` and `Category comparison` sidebar cards
- Optional `Historical comparison` card when not in preview mode

### Small homepage preview
- When rendered with `preview={true}`:
  - only the first 3 commodity cards are shown
  - a call-to-action link appears to open the full resources page

## Styling
- Neutral background cards with rounded corners and subtle shadows
- Gradient and accent styles for positive/negative YoY badges
- Responsive typography and spacing for both desktop and mobile
- Hover translate effect on stat cards

## Fetching and Caching
- Uses `fetch(API_URL, { next: { revalidate: 60 } })`
- Supports server-side rendering in Next.js app router
- Data is refreshed every 60 seconds when pages are revalidated

## Important UI elements
- `Export performance` badge
- Main heading: `Summary of Merchandise Trade Statistics / Export Performance (USD mn)`
- Data source note
- Latest report card with:
  - `latestMonth`
  - `updatedAt`
  - `Total value`
  - `YoY average`
- Compact commodity cards
- Category summary progress bars
- Top performer spotlight
- Full statistics CTA on homepage preview

## Rebuild steps
1. Create `components/TradeStatistics.tsx`
2. Add type definitions for API response and rows
3. Build `fetchTradeStats()` with remote API URL and error handling
4. Create the section layout with the grid header and latest report panel
5. Render preview cards or full report cards based on `preview` prop
6. Add sidebar panels for top performers and category comparison
7. Add conditional CTA for homepage preview mode
8. Test with live data and ensure the layout responds well on mobile

## Usage
```tsx
import TradeStatistics from '@/components/TradeStatistics'

export default function Home() {
  return (
    <div>
      <TradeStatistics preview />
    </div>
  )
}
```

```tsx
import TradeStatistics from '@/components/TradeStatistics'

export default function ResourcesPage() {
  return (
    <div>
      <TradeStatistics />
    </div>
  )
}
```

## Notes
- Keep the API URL secure and validate the response before rendering.
- Use the `preview` prop to limit content for homepage quick view.
- The component can be enhanced later with charts, data filtering, or interactive period selectors.
