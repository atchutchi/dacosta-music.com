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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AudioUpload } from "./audio-upload"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  artist_id: z.string().min(1, "O artista é obrigatório"),
  event_id: z.string().optional(),
  performance_date: z.date().optional(),
  video_url: z.string().optional(),
  audio_url: z.string().optional(),
  event_name: z.string().optional(),
  description: z.string().optional(),
})

interface LiveSetFormProps {
  liveSet?: any
}

export function LiveSetForm({ liveSet }: LiveSetFormProps) {
  const router = useRouter()
  const supabase = createClientClient()
  const [artists, setArtists] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: liveSet?.title || "",
      artist_id: liveSet?.artist_id || "",
      event_id: liveSet?.event_id || "",
      performance_date: liveSet?.performance_date ? new Date(liveSet.performance_date) : undefined,
      video_url: liveSet?.video_url || "",
      audio_url: liveSet?.audio_url || "",
      event_name: liveSet?.event_name || "",
      description: liveSet?.description || "",
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

        // Buscar eventos
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("id, title")
          .order("title")
        if (eventsError) throw eventsError
        setEvents(eventsData || [])
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }

    fetchData()
  }, [supabase])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      if (liveSet) {
        // Atualizar live set existente
        const { error } = await supabase
          .from("live_sets")
          .update({
            title: values.title,
            artist_id: values.artist_id,
            event_id: values.event_id || null,
            performance_date: values.performance_date?.toISOString() || null,
            video_url: values.video_url || null,
            audio_url: values.audio_url || null,
            event_name: values.event_name || null,
            description: values.description || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", liveSet.id)

        if (error) throw error
      } else {
        // Criar novo live set
        const { error } = await supabase.from("live_sets").insert({
          title: values.title,
          artist_id: values.artist_id,
          event_id: values.event_id || null,
          performance_date: values.performance_date?.toISOString() || null,
          video_url: values.video_url || null,
          audio_url: values.audio_url || null,
          event_name: values.event_name || null,
          description: values.description || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (error) throw error
      }

      router.push("/admin/live-sets")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar live set:", error)
      alert("Erro ao salvar live set. Tente novamente.")
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
                  <Input placeholder="Nome do live set" {...field} />
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
            name="event_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Evento (opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um evento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Nenhum evento</SelectItem>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
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
            name="event_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Evento (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do evento" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="performance_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data da Performance</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Vídeo (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="URL do vídeo (YouTube, Vimeo, etc.)" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição do live set"
                  className="min-h-32"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="audio_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arquivo de Áudio (opcional)</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value && (
                    <div className="rounded-md border p-4">
                      <audio src={field.value} controls className="w-full" />
                    </div>
                  )}
                  <AudioUpload onUploadComplete={(url) => field.onChange(url)} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/live-sets")}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : liveSet ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
