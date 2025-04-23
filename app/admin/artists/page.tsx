"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClientClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"

// Adicionar esta configuração para evitar pré-renderização durante o build
export const dynamic = "force-dynamic"

export default function ArtistsAdminPage() {
  const [artists, setArtists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArtists() {
      try {
        const supabase = createClientClient()
        const { data, error } = await supabase.from("artists").select("*").order("name")

        if (error) throw error
        setArtists(data || [])
      } catch (err: any) {
        console.error("Erro ao buscar artistas:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Artistas</h1>
        <Button asChild>
          <Link href="/admin/artists/new">
            <Plus className="mr-2 h-4 w-4" /> Novo Artista
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Artistas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">Erro ao carregar artistas: {error}</p>
          ) : artists && artists.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Slug</th>
                    <th className="px-4 py-2 text-left">Data de Criação</th>
                    <th className="px-4 py-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((artist) => (
                    <tr key={artist.id} className="border-b">
                      <td className="px-4 py-2">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                            {artist.logo_url ? (
                              <img
                                src={artist.logo_url || "/placeholder.svg"}
                                alt={artist.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600">
                                {artist.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span>{artist.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">{artist.slug}</td>
                      <td className="px-4 py-2">{new Date(artist.created_at).toLocaleDateString("pt-BR")}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/artists/${artist.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhum artista cadastrado</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
