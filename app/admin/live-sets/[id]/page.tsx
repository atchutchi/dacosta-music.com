"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { createClientClient } from "@/lib/supabase/client"
import { LiveSetForm } from "@/components/admin/live-set-form"

export default function EditLiveSetPage() {
  const params = useParams()
  const liveSetId = params.id as string
  const [liveSet, setLiveSet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientClient()

  useEffect(() => {
    async function fetchLiveSet() {
      try {
        const { data, error } = await supabase.from("live_sets").select("*").eq("id", liveSetId).single()
        if (error) throw error
        setLiveSet(data)
      } catch (error) {
        console.error("Erro ao buscar live set:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLiveSet()
  }, [liveSetId, supabase])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!liveSet) {
    return <div>Live set não encontrado</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar Live Set</h1>
        <p className="text-muted-foreground">Atualize as informações do live set.</p>
      </div>

      <div className="rounded-md border p-6">
        <LiveSetForm liveSet={liveSet} />
      </div>
    </div>
  )
}
