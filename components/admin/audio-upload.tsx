"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2, Play, Pause } from "lucide-react"
import { createClientClient } from "@/lib/supabase/client"
import { v4 as uuidv4 } from "uuid"
import { Slider } from "@/components/ui/slider"

interface AudioUploadProps {
  onUploadComplete: (url: string, duration: number) => void
  className?: string
}

export function AudioUpload({ onUploadComplete, className }: AudioUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const supabase = createClientClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Criar preview de áudio
      const audioUrl = URL.createObjectURL(file)
      setAudioSrc(audioUrl)

      // Carregar áudio para obter duração
      const audio = new Audio(audioUrl)
      audio.addEventListener("loadedmetadata", async () => {
        setDuration(audio.duration)

        // Gerar nome único para o arquivo
        const fileExt = file.name.split(".").pop()
        const fileName = `${uuidv4()}.${fileExt}`
        const filePath = `audio/${fileName}`

        // Upload para o Supabase Storage
        const { data, error } = await supabase.storage.from("public").upload(filePath, file)

        if (error) {
          throw error
        }

        // Obter URL pública
        const { data: publicUrlData } = supabase.storage.from("public").getPublicUrl(filePath)

        onUploadComplete(publicUrlData.publicUrl, audio.duration)
        setIsUploading(false)
      })
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
      alert("Erro ao fazer upload do arquivo de áudio. Tente novamente.")
      setIsUploading(false)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const clearAudio = () => {
    setAudioSrc(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className={className}>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        disabled={isUploading}
      />

      {audioSrc && (
        <div className="mb-4 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <Button type="button" variant="ghost" size="icon" onClick={togglePlay} disabled={isUploading}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <div className="flex flex-1 items-center space-x-2 px-4">
              <span className="text-xs">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={(value) => handleSliderChange(value)}
                disabled={isUploading}
                className="w-full"
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={clearAudio} disabled={isUploading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      )}

      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando áudio...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" /> Upload áudio
          </>
        )}
      </Button>
    </div>
  )
}
