"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"
import { createClientClient } from "@/lib/supabase/client"
import { v4 as uuidv4 } from "uuid"

interface FileUploadProps {
  onUploadComplete: (url: string) => void
  accept?: string
  folder: string
  buttonText?: string
  className?: string
}

export function FileUpload({
  onUploadComplete,
  accept = "image/*",
  folder,
  buttonText = "Upload arquivo",
  className,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClientClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Criar preview para imagens
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }

      // Gerar nome único para o arquivo
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Upload para o Supabase Storage
      const { data, error } = await supabase.storage.from("public").upload(filePath, file)

      if (error) {
        throw error
      }

      // Obter URL pública
      const { data: publicUrlData } = supabase.storage.from("public").getPublicUrl(filePath)

      onUploadComplete(publicUrlData.publicUrl)
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
      alert("Erro ao fazer upload do arquivo. Tente novamente.")
    } finally {
      setIsUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={className}>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        disabled={isUploading}
      />

      {preview ? (
        <div className="relative mb-4">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-40 rounded-md" />
          <button
            type="button"
            onClick={clearPreview}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" /> {buttonText}
          </>
        )}
      </Button>
    </div>
  )
}
