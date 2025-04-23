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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Artist {
  id: string
  name: string
}

interface EventFormProps {
  event?: {
    id: string
    title: string
    description: string | null
    location: string
    start_date: string
    end_date: string | null
    image_url: string | null
    ticket_url: string | null
  } | null
  artists: Artist[]
  selectedArtists: string[]
}

export default function EventForm({ event, artists, selectedArtists }: EventFormProps) {
  const isEditing = !!event
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState(event?.title || "")
  const [description, setDescription] = useState(event?.description || "")
  const [location, setLocation] = useState(event?.location || "")
  const [startDate, setStartDate] = useState(
    event?.start_date ? new Date(event.start_date).toISOString().split("T")[0] : "",
  )
  const [startTime, setStartTime] = useState(
    event?.start_date ? new Date(event.start_date).toISOString().split("T")[1].substring(0, 5) : "",
  )
  const [endDate, setEndDate] = useState(event?.end_date ? new Date(event.end_date).toISOString().split("T")[0] : "")
  const [endTime, setEndTime] = useState(
    event?.end_date ? new Date(event.end_date).toISOString().split("T")[1].substring(0, 5) : "",
  )
  const [imageUrl, setImageUrl] = useState(event?.image_url || "")
  const [ticketUrl, setTicketUrl] = useState(event?.ticket_url || "")
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>(selectedArtists || [])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleArtistToggle = (artistId: string) => {
    setSelectedArtistIds((prev) => {
      if (prev.includes(artistId)) {
        return prev.filter((id) => id !== artistId)
      } else {
        return [...prev, artistId]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validar datas
      if (!startDate || !startTime) {
        throw new Error("Data e hora de início são obrigatórias")
      }

      // Formatar datas para ISO
      const formattedStartDate = new Date(`${startDate}T${startTime}:00`)
      let formattedEndDate = null

      if (endDate && endTime) {
        formattedEndDate = new Date(`${endDate}T${endTime}:00`)

        if (formattedEndDate < formattedStartDate) {
          throw new Error("A data de término deve ser posterior à data de início")
        }
      }

      if (isEditing) {
        // Atualizar evento existente
        const { error: updateError } = await supabase
          .from("events")
          .update({
            title,
            description,
            location,
            start_date: formattedStartDate.toISOString(),
            end_date: formattedEndDate ? formattedEndDate.toISOString() : null,
            image_url: imageUrl,
            ticket_url: ticketUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("id", event.id)

        if (updateError) throw updateError

        // Remover relações existentes
        await supabase.from("event_artists").delete().eq("event_id", event.id)

        // Adicionar novas relações
        if (selectedArtistIds.length > 0) {
          const eventArtists = selectedArtistIds.map((artistId) => ({
            event_id: event.id,
            artist_id: artistId,
          }))

          await supabase.from("event_artists").insert(eventArtists)
        }
      } else {
        // Criar novo evento
        const { data: newEvent, error: insertError } = await supabase
          .from("events")
          .insert({
            title,
            description,
            location,
            start_date: formattedStartDate.toISOString(),
            end_date: formattedEndDate ? formattedEndDate.toISOString() : null,
            image_url: imageUrl,
            ticket_url: ticketUrl,
          })
          .select()
          .single()

        if (insertError) throw insertError

        // Adicionar relações com artistas
        if (selectedArtistIds.length > 0 && newEvent) {
          const eventArtists = selectedArtistIds.map((artistId) => ({
            event_id: newEvent.id,
            artist_id: artistId,
          }))

          await supabase.from("event_artists").insert(eventArtists)
        }
      }

      router.push("/admin/events")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao salvar o evento")
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

      <Card>
        <CardHeader>
          <CardTitle>Informações do Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Local</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">Hora de Início</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término (opcional)</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">Hora de Término (opcional)</Label>
              <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ticketUrl">URL para Compra de Ingressos</Label>
            <Input
              id="ticketUrl"
              value={ticketUrl}
              onChange={(e) => setTicketUrl(e.target.value)}
              placeholder="https://exemplo.com/ingressos"
            />
          </div>

          <div className="space-y-2">
            <Label>Artistas</Label>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {artists.map((artist) => (
                <div key={artist.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`artist-${artist.id}`}
                    checked={selectedArtistIds.includes(artist.id)}
                    onCheckedChange={() => handleArtistToggle(artist.id)}
                  />
                  <Label htmlFor={`artist-${artist.id}`}>{artist.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <CardFooter className="flex justify-end space-x-4 px-0 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/events")} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
        </Button>
      </CardFooter>
    </form>
  )
}
