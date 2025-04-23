"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchFilterProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchFilter({ onSearch, placeholder = "Pesquisar...", className }: SearchFilterProps) {
  const [query, setQuery] = useState("")

  // Debounce para evitar muitas chamadas durante a digitação
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 pr-9"
      />
      {query && (
        <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={handleClear}>
          <X className="h-4 w-4" />
          <span className="sr-only">Limpar pesquisa</span>
        </Button>
      )}
    </div>
  )
}
