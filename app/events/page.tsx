import { redirect } from 'next/navigation'

export const metadata = {
  title: "Auction Calendar | The Colombo Brokers' Association",
  description:
    "This route now redirects to the Resources page, where calendar and auction schedule content is combined.",
  openGraph: {
    title: "Auction Calendar | The Colombo Brokers' Association",
    description:
      "This route now redirects to the Resources page, where calendar and auction schedule content is combined.",
  },
}

export default function EventsPage() {
  redirect('/resources')
}
