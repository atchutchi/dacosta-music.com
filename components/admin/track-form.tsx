"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createClientClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AudioUpload } from "./audio-upload"

const formSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  artist_id: z.string().min(1, "O artista é obrigatório"),
  album_id: z.string().optional(),
  track_number: z.coerce.number().int().min(1).optional(),
  duration: z.coerce.number().min(0).default(0),
  track_url: z.string().optional(),
})

interface TrackFormProps {
  track?: any
}

export function TrackForm({ track }: TrackFormProps) {
  const router = useRouter()
  const supabase = createClientClient()
  const [artists, setArtists] = useState<any[]>([])
  const [albums, setAlbums] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: track?.title || "",
      artist_id: track?.artist_id || "",
      album_id: track?.album_id || "",
      track_number: track?.track_number || undefined,
      duration: track?.duration || 0,
      track_url: track?.track_url || "",
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar artistas
        const { data: artistsData, error: artistsError } = await supabase
          .from("artists")
          .select("id, name")
          .order("name")
        if (artistsError) throw artistsError
        setArtists(artistsData || [])

        // Buscar álbuns
        const { data: albumsData, error: albumsError } = await supabase
          .from("albums")
          .select("id, title")
          .order("title")
        if (albumsError) throw albumsError
        setAlbums(albumsData || [])
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }

    fetchData()
  }, [supabase])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      if (track) {
        // Atualizar faixa existente
        const { error } = await supabase
          .from("tracks")
          .update({
            title: values.title,
            artist_id: values.artist_id,
            album_id: values.album_id || null,
            track_number: values.track_number || null,
            duration: values.duration,
            track_url: values.track_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", track.id)

        if (error) throw error
      } else {
        // Criar nova faixa
        const { error } = await supabase.from("tracks").insert({
          title: values.title,
          artist_id: values.artist_id,
          album_id: values.album_id || null,
          track_number: values.track_number || null,
          duration: values.duration,
          track_url: values.track_url,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (error) throw error
      }

      router.push("/admin/tracks")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar faixa:", error)
      alert("Erro ao salvar faixa. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da faixa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artist_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artista</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um artista" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {artists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="album_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Álbum (opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um álbum" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Nenhum álbum</SelectItem>
                    {albums.map((album) => (
                      <SelectItem key={album.id} value={album.id}>
                        {album.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="track_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número da faixa (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Número da faixa no álbum"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="track_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arquivo de Áudio</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value && (
                    <div className="rounded-md border p-4">
                      <audio src={field.value} controls className="w-full" />
                    </div>
                  )}
                  <AudioUpload
                    onUploadComplete={(url, duration) => {
                      field.onChange(url)
                      form.setValue("duration", duration)
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/tracks")} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : track ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
