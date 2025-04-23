import { createBrowserClient } from "@supabase/ssr"

// Exportar a função com o nome createClient para manter compatibilidade
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Também exportar como createClientClient para compatibilidade com código existente
export function createClientClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
