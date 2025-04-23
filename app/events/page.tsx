import EventCalendar from "@/components/calendar/event-calendar"

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Eventos</h1>
      <EventCalendar />
    </div>
  )
}
