"use client"

import { TrackForm } from "@/components/admin/track-form"

export default function NewTrackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nova Faixa</h1>
        <p className="text-muted-foreground">Adicione uma nova faixa ao catálogo.</p>
      </div>

      <div className="rounded-md border p-6">
        <TrackForm />
      </div>
    </div>
  )
}
