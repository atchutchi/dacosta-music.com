import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // Criar uma resposta que podemos modificar
  const res = NextResponse.next()

  // Criar um cliente Supabase para o middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Verificar se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se o usuário não estiver autenticado e estiver tentando acessar uma rota protegida
  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    const redirectUrl = new URL("/login", request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Se o usuário estiver autenticado e estiver tentando acessar login/register
  if (session && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
    const redirectUrl = new URL("/admin", request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
}
