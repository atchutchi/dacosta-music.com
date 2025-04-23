import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Criar cliente Supabase para API routes
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    // Buscar artista pelo slug
    const { data: artist, error } = await supabase
      .from("artists")
      .select(`
        *,
        artist_stats (*),
        albums:albums (
          *,
          tracks:tracks (*)
        ),
        live_sets:live_sets (*)
      `)
      .eq("slug", slug)
      .single()

    if (error) {
      throw error
    }

    if (!artist) {
      return NextResponse.json({ error: "Artista não encontrado" }, { status: 404 })
    }

    return NextResponse.json(artist)
  } catch (error) {
    console.error("Erro ao buscar artista:", error)
    return NextResponse.json({ error: "Erro ao buscar artista" }, { status: 500 })
  }
}
