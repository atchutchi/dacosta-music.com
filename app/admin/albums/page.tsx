"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClientClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { SearchFilter } from "@/components/admin/search-filter"
import { Pagination } from "@/components/ui/pagination"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useRouter } from "next/navigation"

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<any[]>([])
  const [artists, setArtists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [artistFilter, setArtistFilter] = useState("")
  const pageSize = 10
  const supabase = createClientClient()
  const router = useRouter()

  useEffect(() => {
    fetchArtists()
    fetchAlbums()
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

  async function fetchAlbums() {
    try {
      setLoading(true)

      // Contar total de registros para paginação
      let countQuery = supabase.from("albums").select("id", { count: "exact" })
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

      // Buscar álbuns com paginação
      let query = supabase
        .from("albums")
        .select(
          `
          *,
          artists:artist_id (
            id,
            name
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
      setAlbums(data || [])
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteAlbum(id: string) {
    try {
      const { error } = await supabase.from("albums").delete().eq("id", id)
      if (error) throw error
      fetchAlbums()
    } catch (error) {
      console.error("Erro ao excluir álbum:", error)
      alert("Erro ao excluir álbum. Tente novamente.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Álbuns</h1>
        <Button asChild>
          <Link href="/admin/albums/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Álbum
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SearchFilter onSearch={setSearchQuery} placeholder="Pesquisar álbuns..." />

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
          <CardTitle>Lista de Álbuns</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : albums.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Capa</th>
                    <th className="px-4 py-2 text-left">Título</th>
                    <th className="px-4 py-2 text-left">Artista</th>
                    <th className="px-4 py-2 text-left">Ano</th>
                    <th className="px-4 py-2 text-left">Tipo</th>
                    <th className="px-4 py-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {albums.map((album) => (
                    <tr key={album.id} className="border-b">
                      <td className="px-4 py-2">
                        <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-200">
                          {album.cover_url ? (
                            <img
                              src={album.cover_url || "/placeholder.svg"}
                              alt={album.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600">
                              {album.title.charAt(0)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">{album.title}</td>
                      <td className="px-4 py-2">{album.artists?.name}</td>
                      <td className="px-4 py-2">{album.release_year}</td>
                      <td className="px-4 py-2">{album.album_type || "Álbum"}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/albums/${album.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <ConfirmDialog
                            title="Excluir álbum"
                            description="Tem certeza que deseja excluir este álbum? Esta ação não pode ser desfeita."
                            onConfirm={() => handleDeleteAlbum(album.id)}
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
            <p className="text-center text-gray-500">Nenhum álbum encontrado</p>
          )}

          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
