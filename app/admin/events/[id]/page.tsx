import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import EventForm from "@/components/admin/event-form"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = params
  const isNew = id === "new"
  const supabase = createServerClient()

  let event = null
  let selectedArtists: string[] = []
  let artists = []

  // Buscar todos os artistas para o select
  const { data: artistsData } = await supabase.from("artists").select("id, name").order("name")

  artists = artistsData || []

  if (!isNew) {
    // Buscar evento existente
    const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

    if (error || !data) {
      notFound()
    }

    event = data

    // Buscar artistas relacionados ao evento
    const { data: eventArtists } = await supabase.from("event_artists").select("artist_id").eq("event_id", id)

    selectedArtists = eventArtists?.map((item) => item.artist_id) || []
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">{isNew ? "Novo Evento" : `Editar Evento: ${event?.title}`}</h1>

      <EventForm event={event} artists={artists} selectedArtists={selectedArtists} />
    </div>
  )
}
