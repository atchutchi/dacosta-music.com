"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClientClient } from "@/lib/supabase/client"
import { AlbumForm } from "@/components/admin/album-form"

export default function EditAlbumPage() {
  const params = useParams()
  const albumId = params.id as string
  const [album, setAlbum] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientClient()

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const { data, error } = await supabase.from("albums").select("*").eq("id", albumId).single()
        if (error) throw error
        setAlbum(data)
      } catch (error) {
        console.error("Erro ao buscar álbum:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbum()
  }, [albumId, supabase])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!album) {
    return <div>Álbum não encontrado</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar Álbum</h1>
        <p className="text-muted-foreground">Atualize as informações do álbum.</p>
      </div>

      <div className="rounded-md border p-6">
        <AlbumForm album={album} />
      </div>
    </div>
  )
}
