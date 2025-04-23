import { createServerClient as createClient } from "@supabase/ssr"

export function createServerClient() {
  // Esta função será usada no Pages Router ou em ambientes onde next/headers não está disponível
  if (typeof window === "undefined") {
    // Server-side (mas não em Server Components do App Router)
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        // Implementação simples para ambientes server-side sem next/headers
        get(name: string) {
          return undefined // Não podemos acessar cookies sem next/headers
        },
        set(name: string, value: string, options: any) {
          // Não podemos definir cookies sem next/headers
        },
        remove(name: string, options: any) {
          // Não podemos remover cookies sem next/headers
        },
      },
    })
  }

  // Client-side
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`))
          ?.split("=")[1]
      },
      set(name: string, value: string, options: any) {
        document.cookie = `${name}=${value}; path=${options.path || "/"}`
      },
      remove(name: string, options: any) {
        document.cookie = `${name}=; path=${options.path || "/"}`
      },
    },
  })
}
