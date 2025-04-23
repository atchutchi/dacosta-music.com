"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClientClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Play, Pause } from "lucide-react"
import { SearchFilter } from "@/components/admin/search-filter"
import { Pagination } from "@/components/ui/pagination"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function LiveSetsPage() {
  const [liveSets, setLiveSets] = useState<any[]>([])
  const [artists, setArtists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [artistFilter, setArtistFilter] = useState("")
  const [playingSetId, setPlayingSetId] = useState<string | null>(null)
  const pageSize = 10
  const supabase = createClientClient()
  const router = useRouter()

  useEffect(() => {
    fetchArtists()
    fetchLiveSets()
  }, [currentPage, searchQuery, artistFilter])

  async function fetchArtists() {
    try {
      const { data, error } = await supabase.from("artists").select("id, name").order("name")
      if (error) throw error
      setArtists(data || [])
    } catch (error) {
      console.error("Erro ao buscar artistas:", error)
    }
  }

  async function fetchLiveSets() {
    try {
      setLoading(true)

      // Contar total de registros para paginação
      let countQuery = supabase.from("live_sets").select("id", { count: "exact" })
      if (searchQuery) {
        countQuery = countQuery.ilike("title", `%${searchQuery}%`)
      }
      if (artistFilter) {
        countQuery = countQuery.eq("artist_id", artistFilter)
      }
      const { count, error: countError } = await countQuery

      if (countError) throw countError

      // Calcular total de páginas
      const total = count || 0
      setTotalPages(Math.ceil(total / pageSize))

      // Buscar live sets com paginação
      let query = supabase
        .from("live_sets")
        .select(
          `
          *,
          artists:artist_id (
            id,
            name
          ),
          events:event_id (
            id,
            title
          )
        `,
        )
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`)
      }
      if (artistFilter) {
        query = query.eq("artist_id", artistFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setLiveSets(data || [])
    } catch (error) {
      console.error("Erro ao buscar live sets:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteLiveSet(id: string) {
    try {
      const { error } = await supabase.from("live_sets").delete().eq("id", id)
      if (error) throw error
      fetchLiveSets()
    } catch (error) {
      console.error("Erro ao excluir live set:", error)
      alert("Erro ao excluir live set. Tente novamente.")
    }
  }

  function togglePlay(setId: string, audioUrl: string) {
    if (playingSetId === setId) {
      // Pausar o set atual
      const audioElement = document.getElementById(`audio-${setId}`) as HTMLAudioElement
      if (audioElement) {
        audioElement.pause()
      }
      setPlayingSetId(null)
    } else {
      // Pausar qualquer set que esteja tocando
      if (playingSetId) {
        const currentAudio = document.getElementById(`audio-${playingSetId}`) as HTMLAudioElement
        if (currentAudio) {
          currentAudio.pause()
        }
      }

      // Tocar o novo set
      const audioElement = document.getElementById(`audio-${setId}`) as HTMLAudioElement
      if (audioElement) {
        audioElement.play()
      }
      setPlayingSetId(setId)
    }
  }

  // Função para formatar duração em minutos:segundos
  function formatDuration(seconds: number) {
    if (!seconds) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Live Sets</h1>
        <Button asChild>
          <Link href="/admin/live-sets/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Live Set
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SearchFilter onSearch={setSearchQuery} placeholder="Pesquisar live sets..." />

        <select
          value={artistFilter}
          onChange={(e) => setArtistFilter(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Todos os artistas</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Live Sets</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : liveSets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Título</th>
                    <th className="px-4 py-2 text-left">Artista</th>
                    <th className="px-4 py-2 text-left">Evento</th>
                    <th className="px-4 py-2 text-left">Data</th>
                    <th className="px-4 py-2 text-left">Áudio</th>
                    <th className="px-4 py-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {liveSets.map((liveSet) => (
                    <tr key={liveSet.id} className="border-b">
                      <td className="px-4 py-2">{liveSet.title}</td>
                      <td className="px-4 py-2">{liveSet.artists?.name}</td>
                      <td className="px-4 py-2">{liveSet.events?.title || "—"}</td>
                      <td className="px-4 py-2">
                        {liveSet.performance_date
                          ? format(new Date(liveSet.performance_date), "dd/MM/yyyy", { locale: ptBR })
                          : "—"}
                      </td>
                      <td className="px-4 py-2">
                        {liveSet.audio_url ? (
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePlay(liveSet.id, liveSet.audio_url)}
                              className="h-8 w-8 p-0"
                            >
                              {playingSetId === liveSet.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <audio
                              id={`audio-${liveSet.id}`}
                              src={liveSet.audio_url}
                              onEnded={() => setPlayingSetId(null)}
                              className="hidden"
                            />
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/live-sets/${liveSet.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <ConfirmDialog
                            title="Excluir live set"
                            description="Tem certeza que deseja excluir este live set? Esta ação não pode ser desfeita."
                            onConfirm={() => handleDeleteLiveSet(liveSet.id)}
                            variant="destructive"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </ConfirmDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhum live set encontrado</p>
          )}

          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
