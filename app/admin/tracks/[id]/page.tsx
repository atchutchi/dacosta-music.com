"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClientClient } from "@/lib/supabase/client"
import { TrackForm } from "@/components/admin/track-form"

export default function EditTrackPage() {
  const params = useParams()
  const trackId = params.id as string
  const [track, setTrack] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientClient()

  useEffect(() => {
    async function fetchTrack() {
      try {
        const { data, error } = await supabase.from("tracks").select("*").eq("id", trackId).single()
        if (error) throw error
        setTrack(data)
      } catch (error) {
        console.error("Erro ao buscar faixa:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrack()
  }, [trackId, supabase])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!track) {
    return <div>Faixa não encontrada</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar Faixa</h1>
        <p className="text-muted-foreground">Atualize as informações da faixa.</p>
      </div>

      <div className="rounded-md border p-6">
        <TrackForm track={track} />
      </div>
    </div>
  )
}
