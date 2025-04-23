"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, Music, Disc, Radio, Settings, User, LogOut, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Artistas", href: "/admin/artists" },
    { icon: Calendar, label: "Eventos", href: "/admin/events" },
    { icon: Disc, label: "Álbuns", href: "/admin/albums" },
    { icon: Music, label: "Faixas", href: "/admin/tracks" },
    { icon: Radio, label: "Live Sets", href: "/admin/live-sets" },
    { icon: ShoppingBag, label: "Loja", href: "/admin/shop" },
    { icon: Settings, label: "Configurações", href: "/admin/settings" },
    { icon: User, label: "Perfil", href: "/admin/profile" },
  ]

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">Da Costa Music</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                isActive(item.href) ? "bg-gray-100 text-gray-900" : "",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 px-3 py-2 text-sm font-medium text-red-500"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </nav>
      </div>
    </div>
  )
}
