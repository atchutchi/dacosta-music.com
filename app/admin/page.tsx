"use client"

import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Music, Disc } from "lucide-react"

// Adicionar esta configuração para evitar pré-renderização durante o build
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = createServerClient()

  // Buscar estatísticas
  const [{ count: artistsCount }, { count: eventsCount }, { count: albumsCount }, { count: tracksCount }] =
    await Promise.all([
      supabase.from("artists").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("albums").select("*", { count: "exact", head: true }),
      supabase.from("tracks").select("*", { count: "exact", head: true }),
    ])

  // Buscar eventos recentes
  const { data: recentEvents } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true })
    .limit(5)

  // Buscar artistas
  const { data: artists } = await supabase.from("artists").select("*").limit(5)

  const stats = [
    { name: "Artistas", value: artistsCount || 0, icon: Users, color: "bg-blue-100 text-blue-600" },
    { name: "Eventos", value: eventsCount || 0, icon: Calendar, color: "bg-green-100 text-green-600" },
    { name: "Álbuns", value: albumsCount || 0, icon: Disc, color: "bg-purple-100 text-purple-600" },
    { name: "Faixas", value: tracksCount || 0, icon: Music, color: "bg-amber-100 text-amber-600" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-2 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
          <CardDescription>Lista dos próximos eventos agendados</CardDescription>
        </CardHeader>
        <CardContent>
          {recentEvents && recentEvents.length > 0 ? (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{new Date(event.start_date).toLocaleDateString("pt-BR")}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.start_date).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhum evento agendado</p>
          )}
        </CardContent>
      </Card>

      {/* Artists */}
      <Card>
        <CardHeader>
          <CardTitle>Artistas</CardTitle>
          <CardDescription>Lista dos artistas cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          {artists && artists.length > 0 ? (
            <div className="space-y-4">
              {artists.map((artist) => (
                <div key={artist.id} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
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
                  <div>
                    <p className="font-medium">{artist.name}</p>
                    <p className="text-sm text-gray-500">
                      {artist.bio ? artist.bio.substring(0, 50) + "..." : "Sem biografia"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Nenhum artista cadastrado</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
