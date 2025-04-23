"use client"

import { LiveSetForm } from "@/components/admin/live-set-form"

export default function NewLiveSetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Novo Live Set</h1>
        <p className="text-muted-foreground">Adicione um novo live set ao catálogo.</p>
      </div>

      <div className="rounded-md border p-6">
        <LiveSetForm />
      </div>
    </div>
  )
}
