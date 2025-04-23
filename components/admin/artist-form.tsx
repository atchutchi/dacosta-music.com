"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface ArtistFormProps {
  artist?: {
    id: string
    name: string
    slug: string
    bio: string | null
    logo_url: string | null
    photo_url: string | null
  } | null
  stats?: {
    id: string
    artist_id: string
    streams: number
    followers: number
    monthly_listeners: number
    youtube_views: number
    youtube_subscribers: number
  } | null
}

export default function ArtistForm({ artist, stats }: ArtistFormProps) {
  const isEditing = !!artist
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState(artist?.name || "")
  const [slug, setSlug] = useState(artist?.slug || "")
  const [bio, setBio] = useState(artist?.bio || "")
  const [logoUrl, setLogoUrl] = useState(artist?.logo_url || "")
  const [photoUrl, setPhotoUrl] = useState(artist?.photo_url || "")

  // Estatísticas
  const [streams, setStreams] = useState(stats?.streams?.toString() || "0")
  const [followers, setFollowers] = useState(stats?.followers?.toString() || "0")
  const [monthlyListeners, setMonthlyListeners] = useState(stats?.monthly_listeners?.toString() || "0")
  const [youtubeViews, setYoutubeViews] = useState(stats?.youtube_views?.toString() || "0")
  const [youtubeSubscribers, setYoutubeSubscribers] = useState(stats?.youtube_subscribers?.toString() || "0")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("info")

  // Gerar slug a partir do nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)

    if (!isEditing || slug === "") {
      setSlug(
        newName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isEditing) {
        // Atualizar artista existente
        const { error: updateError } = await supabase
          .from("artists")
          .update({
            name,
            slug,
            bio,
            logo_url: logoUrl,
            photo_url: photoUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("id", artist.id)

        if (updateError) throw updateError

        // Atualizar ou criar estatísticas
        if (stats) {
          await supabase
            .from("artist_stats")
            .update({
              streams: Number.parseInt(streams),
              followers: Number.parseInt(followers),
              monthly_listeners: Number.parseInt(monthlyListeners),
              youtube_views: Number.parseInt(youtubeViews),
              youtube_subscribers: Number.parseInt(youtubeSubscribers),
              updated_at: new Date().toISOString(),
            })
            .eq("id", stats.id)
        } else {
          await supabase.from("artist_stats").insert({
            artist_id: artist.id,
            streams: Number.parseInt(streams),
            followers: Number.parseInt(followers),
            monthly_listeners: Number.parseInt(monthlyListeners),
            youtube_views: Number.parseInt(youtubeViews),
            youtube_subscribers: Number.parseInt(youtubeSubscribers),
          })
        }
      } else {
        // Criar novo artista
        const { data: newArtist, error: insertError } = await supabase
          .from("artists")
          .insert({
            name,
            slug,
            bio,
            logo_url: logoUrl,
            photo_url: photoUrl,
          })
          .select()
          .single()

        if (insertError) throw insertError

        // Criar estatísticas para o novo artista
        await supabase.from("artist_stats").insert({
          artist_id: newArtist.id,
          streams: Number.parseInt(streams),
          followers: Number.parseInt(followers),
          monthly_listeners: Number.parseInt(monthlyListeners),
          youtube_views: Number.parseInt(youtubeViews),
          youtube_subscribers: Number.parseInt(youtubeSubscribers),
        })
      }

      router.push("/admin/artists")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao salvar o artista")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Artista</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={name} onChange={handleNameChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                <p className="text-xs text-gray-500">
                  Usado para a URL do artista (ex: dacosta-music.com/artists/nome-do-artista)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">URL do Logo</Label>
                <Input
                  id="logoUrl"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl">URL da Foto</Label>
                <Input
                  id="photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Artista</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streams">Streams</Label>
                <Input
                  id="streams"
                  type="number"
                  value={streams}
                  onChange={(e) => setStreams(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="followers">Seguidores</Label>
                <Input
                  id="followers"
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyListeners">Ouvintes Mensais</Label>
                <Input
                  id="monthlyListeners"
                  type="number"
                  value={monthlyListeners}
                  onChange={(e) => setMonthlyListeners(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeViews">Visualizações no YouTube</Label>
                <Input
                  id="youtubeViews"
                  type="number"
                  value={youtubeViews}
                  onChange={(e) => setYoutubeViews(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeSubscribers">Inscritos no YouTube</Label>
                <Input
                  id="youtubeSubscribers"
                  type="number"
                  value={youtubeSubscribers}
                  onChange={(e) => setYoutubeSubscribers(e.target.value)}
                  min="0"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-end space-x-4 px-0 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/artists")} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
        </Button>
      </CardFooter>
    </form>
  )
}
