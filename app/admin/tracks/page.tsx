"use client"

// Adicionar esta configuração para evitar pré-renderização durante o build
export const dynamic = "force-dynamic"

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

export default function TracksPage() {
  const [tracks, setTracks] = useState<any[]>([])
  const [artists, setArtists] = useState<any[]>([])
  const [albums, setAlbums] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [artistFilter, setArtistFilter] = useState("")
  const [albumFilter, setAlbumFilter] = useState("")
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const pageSize = 10
  const supabase = createClientClient()
  const router = useRouter()

  useEffect(() => {
    fetchArtists()
    fetchAlbums()
    fetchTracks()
  }, [currentPage, searchQuery, artistFilter, albumFilter])

  async function fetchArtists() {
    try {
      const { data, error } = await supabase.from("artists").select("id, name").order("name")
      if (error) throw error
      setArtists(data || [])
    } catch (error) {
      console.error("Erro ao buscar artistas:", error)
    }
  }

  async function fetchAlbums() {
    try {
      const { data, error } = await supabase.from("albums").select("id, title").order("title")
      if (error) throw error
      setAlbums(data || [])
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error)
    }
  }

  async function fetchTracks() {
    try {
      setLoading(true)

      // Contar total de registros para paginação
      let countQuery = supabase.from("tracks").select("id", { count: "exact" })
      if (searchQuery) {
        countQuery = countQuery.ilike("title", `%${searchQuery}%`)
      }
      if (artistFilter) {
        countQuery = countQuery.eq("artist_id", artistFilter)
      }
      if (albumFilter) {
        countQuery = countQuery.eq("album_id", albumFilter)
      }
      const { count, error: countError } = await countQuery

      if (countError) throw countError

      // Calcular total de páginas
      const total = count || 0
      setTotalPages(Math.ceil(total / pageSize))

      // Buscar faixas com paginação
      let query = supabase
        .from("tracks")
        .select(
          `
          *,
          artists:artist_id (
            id,
            name
          ),
          albums:album_id (
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
      if (albumFilter) {
        query = query.eq("album_id", albumFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setTracks(data || [])
    } catch (error) {
      console.error("Erro ao buscar faixas:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteTrack(id: string) {
    try {
      const { error } = await supabase.from("tracks").delete().eq("id", id)
      if (error) throw error
      fetchTracks()
    } catch (error) {
      console.error("Erro ao excluir faixa:", error)
      alert("Erro ao excluir faixa. Tente novamente.")
    }
  }

  function togglePlay(trackId: string, audioUrl: string) {
    if (playingTrackId === trackId) {
      // Pausar a faixa atual
      const audioElement = document.getElementById(`audio-${trackId}`) as HTMLAudioElement
      if (audioElement) {
        audioElement.pause()
      }
      setPlayingTrackId(null)
    } else {
      // Pausar qualquer faixa que esteja tocando
      if (playingTrackId) {
        const currentAudio = document.getElementById(`audio-${playingTrackId}`) as HTMLAudioElement
        if (currentAudio) {
          currentAudio.pause()
        }
      }

      // Tocar a nova faixa
      const audioElement = document.getElementById(`audio-${trackId}`) as HTMLAudioElement
      if (audioElement) {
        audioElement.play()
      }
      setPlayingTrackId(trackId)
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
        <h1 className="text-2xl font-bold tracking-tight">Faixas</h1>
        <Button asChild>
          <Link href="/admin/tracks/new">
            <Plus className="mr-2 h-4 w-4" /> Nova Faixa
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SearchFilter onSearch={setSearchQuery} placeholder="Pesquisar faixas..." />

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

        <select
          value={albumFilter}
          onChange={(e) => setAlbumFilter(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Todos os álbuns</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Faixas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : tracks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Título</th>
                    <th className="px-4 py-2 text-left">Artista</th>
                    <th className="px-4 py-2 text-left">Álbum</th>
                    <th className="px-4 py-2 text-left">Duração</th>
                    <th className="px-4 py-2 text-left">Áudio</th>
                    <th className="px-4 py-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track) => (
                    <tr key={track.id} className="border-b">
                      <td className="px-4 py-2">{track.title}</td>
                      <td className="px-4 py-2">{track.artists?.name}</td>
                      <td className="px-4 py-2">{track.albums?.title || "—"}</td>
                      <td className="px-4 py-2">{formatDuration(track.duration)}</td>
                      <td className="px-4 py-2">
                        {track.track_url ? (
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePlay(track.id, track.track_url)}
                              className="h-8 w-8 p-0"
                            >
                              {playingTrackId === track.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <audio
                              id={`audio-${track.id}`}
                              src={track.track_url}
                              onEnded={() => setPlayingTrackId(null)}
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
                            <Link href={`/admin/tracks/${track.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <ConfirmDialog
                            title="Excluir faixa"
                            description="Tem certeza que deseja excluir esta faixa? Esta ação não pode ser desfeita."
                            onConfirm={() => handleDeleteTrack(track.id)}
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
            <p className="text-center text-gray-500">Nenhuma faixa encontrada</p>
          )}

          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
