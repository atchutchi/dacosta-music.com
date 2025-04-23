import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import ArtistForm from "@/components/admin/artist-form"

interface ArtistPageProps {
  params: {
    id: string
  }
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { id } = params
  const isNew = id === "new"
  const supabase = createServerClient()

  let artist = null
  let stats = null

  if (!isNew) {
    // Buscar artista existente
    const { data, error } = await supabase.from("artists").select("*").eq("id", id).single()

    if (error || !data) {
      notFound()
    }

    artist = data

    // Buscar estatísticas do artista
    const { data: statsData } = await supabase.from("artist_stats").select("*").eq("artist_id", id).single()

    stats = statsData
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        {isNew ? "Novo Artista" : `Editar Artista: ${artist?.name}`}
      </h1>

      <ArtistForm artist={artist} stats={stats} />
    </div>
  )
}
