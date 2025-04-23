import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Verificar se o usuário é admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  // Se não for admin, redirecionar para a página inicial
  if (!profile || profile.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
