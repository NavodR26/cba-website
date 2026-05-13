# StatsBar Component Documentation

## Overview
The StatsBar component is a full-width statistics section that displays key metrics about the Colombo Brokers' Association. It features animated counters, gradient backgrounds, and responsive grid layout.

## UI Structure

### Container
- **Element**: `<section>`
- **Classes**: `relative overflow-hidden bg-[#681925] px-4 py-16 text-white sm:px-6 lg:px-8`
- **Background**: Dark maroon gradient with subtle overlay patterns
- **Padding**: Responsive padding (16px on mobile, 24px on small screens, 32px on large)

### Background Elements
- **Gradient Overlay**: `bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_38%,rgba(251,191,36,0.12))]`
- **Top Border**: `h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent`

### Content Container
- **Max Width**: `max-w-[1400px]`
- **Centered**: `mx-auto`

### Header Section
- **Badge**: Small rounded badge with "Association impact" text
- **Title**: "CBA at a glance" (h2, responsive sizing)
- **Description**: Subtitle explaining the stats

### Stats Grid
- **Layout**: Responsive grid (1 column mobile, 2 columns small, 4 columns large)
- **Gap**: 16px between items
- **Cards**: Semi-transparent white background with hover effects

### Individual Stat Card
- **Structure**:
  - Label (uppercase, amber color)
  - Value (large number with CountUp animation)
  - Subtitle (smaller text)
  - Progress bar (animated on hover)

## Data Structure

```typescript
const stats = [
  {
    value: number,      // The number to display
    suffix: string,     // e.g., '+', '%'
    label: string,      // Main label
    sub: string         // Subtitle/description
  }
]
```

## Dependencies
- `CountUp` component for number animation
- `Reveal` component for scroll animations

## Styling Details
- **Colors**: Maroon background (#681925), amber accents, white text
- **Animations**: Hover lift effect, progress bar animation, CountUp numbers
- **Typography**: Bold headings, uppercase labels, responsive text sizes
- **Shadows**: Subtle backdrop blur and box shadows

## Implementation Steps
1. Create `StatsBar.tsx` in components folder
2. Import required components (CountUp, Reveal)
3. Define stats array with data
4. Build the section structure with proper classes
5. Add Reveal wrappers for animations
6. Style cards with hover effects and progress bars
7. Test responsiveness across devices

## Usage
```tsx
import StatsBar from '@/components/StatsBar'

// In page component
<StatsBar />
```

## Customization
- Modify `stats` array to change displayed metrics
- Adjust colors in Tailwind classes
- Change grid layout by modifying grid classes
- Customize animations via Reveal props