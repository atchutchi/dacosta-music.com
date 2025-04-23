import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Criar cliente Supabase para API routes
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const month = url.searchParams.get("month")
    const year = url.searchParams.get("year")

    let query = supabase
      .from("events")
      .select(`
        *,
        event_artists (
          artists:artist_id (
            id,
            name,
            slug,
            logo_url
          )
        )
      `)
      .order("start_date")

    // Filtrar por mês e ano se fornecidos
    if (month && year) {
      const startDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1)
      const endDate = new Date(Number.parseInt(year), Number.parseInt(month), 0)

      query = query.gte("start_date", startDate.toISOString()).lte("start_date", endDate.toISOString())
    }

    const { data: events, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json(events)
  } catch (error) {
    console.error("Erro ao buscar eventos:", error)
    return NextResponse.json({ error: "Erro ao buscar eventos" }, { status: 500 })
  }
}
