import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Criar cliente Supabase para API routes
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function GET() {
  try {
    // Buscar todos os artistas com suas estatísticas
    const { data: artists, error } = await supabase
      .from("artists")
      .select(`
        *,
        artist_stats (*)
      `)
      .order("name")

    if (error) {
      throw error
    }

    return NextResponse.json(artists)
  } catch (error) {
    console.error("Erro ao buscar artistas:", error)
    return NextResponse.json({ error: "Erro ao buscar artistas" }, { status: 500 })
  }
}
