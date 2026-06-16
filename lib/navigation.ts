export type NavChild = { href: string; label: string; desc?: string }
export type NavItem = { href: string; label: string; children?: NavChild[] }

export const NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/about',
    label: 'About',
    children: [
      { href: '/about', label: 'About CBA', desc: 'Vision, mission & history' },
    ],
  },
  {
    href: '/members',
    label: 'Members',
    children: [
      { href: '/members#directors', label: 'Board of Directors', desc: 'Directorship' },
      { href: '/members#committee', label: 'Office Bearers', desc: 'Leadership' },
      { href: '/members#partners', label: 'Partners', desc: 'Supporting institutions' },
      { href: '/members#brokers', label: 'Brokers Directory', desc: 'Member firms' },
    ],
  },
  {
    href: '/resources',
    label: 'Resources',
    children: [
      { href: '/resources', label: 'Downloads', desc: 'Circulars & PDFs' },
      { href: '/#announcements', label: 'Announcements', desc: 'Latest notices' },
      { href: '/resources', label: 'Important Links', desc: 'Industry references' },
    ],
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export const QUICK_ACCESS = [
  { href: '/resources#auction-calendar', label: 'Auction Calendar' },
  { href: '/resources#downloads', label: 'Downloads' },
  { href: '/brokers', label: 'Brokers Directory' },
  { href: '/contact', label: 'Contact Us' },
]
