import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Criar cliente Supabase para API routes
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Buscar evento pelo ID
    const { data: event, error } = await supabase
      .from("events")
      .select(`
        *,
        event_artists (
          artists:artist_id (
            id,
            name,
            slug,
            logo_url,
            photo_url
          )
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      throw error
    }

    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Erro ao buscar evento:", error)
    return NextResponse.json({ error: "Erro ao buscar evento" }, { status: 500 })
  }
}
