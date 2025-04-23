"use client"

import { AlbumForm } from "@/components/admin/album-form"

export default function NewAlbumPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Novo Álbum</h1>
        <p className="text-muted-foreground">Crie um novo álbum para um artista.</p>
      </div>

      <div className="rounded-md border p-6">
        <AlbumForm />
      </div>
    </div>
  )
}
