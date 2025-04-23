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
import { FileUpload } from "./file-upload"

const formSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  artist_id: z.string().min(1, "O artista é obrigatório"),
  release_year: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  album_type: z.enum(["album", "ep", "single"]),
  cover_url: z.string().optional(),
})

interface AlbumFormProps {
  album?: any
}

export function AlbumForm({ album }: AlbumFormProps) {
  const router = useRouter()
  const supabase = createClientClient()
  const [artists, setArtists] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: album?.title || "",
      artist_id: album?.artist_id || "",
      release_year: album?.release_year || new Date().getFullYear(),
      album_type: album?.album_type || "album",
      cover_url: album?.cover_url || "",
    },
  })

  useEffect(() => {
    async function fetchArtists() {
      try {
        const { data, error } = await supabase.from("artists").select("id, name").order("name")
        if (error) throw error
        setArtists(data || [])
      } catch (error) {
        console.error("Erro ao buscar artistas:", error)
      }
    }

    fetchArtists()
  }, [supabase])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      if (album) {
        // Atualizar álbum existente
        const { error } = await supabase
          .from("albums")
          .update({
            title: values.title,
            artist_id: values.artist_id,
            release_year: values.release_year,
            album_type: values.album_type,
            cover_url: values.cover_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", album.id)

        if (error) throw error
      } else {
        // Criar novo álbum
        const { error } = await supabase.from("albums").insert({
          title: values.title,
          artist_id: values.artist_id,
          release_year: values.release_year,
          album_type: values.album_type,
          cover_url: values.cover_url,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (error) throw error
      }

      router.push("/admin/albums")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar álbum:", error)
      alert("Erro ao salvar álbum. Tente novamente.")
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
                  <Input placeholder="Nome do álbum" {...field} />
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
            name="release_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano de Lançamento</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ano" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="album_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="album">Álbum</SelectItem>
                    <SelectItem value="ep">EP</SelectItem>
                    <SelectItem value="single">Single</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cover_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capa do Álbum</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value && (
                    <div className="overflow-hidden rounded-md border">
                      <img
                        src={field.value || "/placeholder.svg"}
                        alt="Capa do álbum"
                        className="h-48 w-auto object-cover"
                      />
                    </div>
                  )}
                  <FileUpload
                    onUploadComplete={(url) => field.onChange(url)}
                    accept="image/*"
                    folder="album-covers"
                    buttonText="Upload capa"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/albums")} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : album ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
