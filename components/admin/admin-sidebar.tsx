"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LayoutDashboard, Users, Calendar, Music, Disc, Radio, Settings, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick?: () => void
}

function NavItem({ href, icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 p-4 transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-center">
          <Image src="/images/logo-white.png" alt="Da Costa Music" width={150} height={60} className="h-auto w-auto" />
        </div>

        <nav className="space-y-1">
          <NavItem
            href="/admin"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            isActive={pathname === "/admin"}
            onClick={closeSidebar}
          />
          <NavItem
            href="/admin/artists"
            icon={<Users className="h-5 w-5" />}
            label="Artistas"
            isActive={pathname?.startsWith("/admin/artists")}
            onClick={closeSidebar}
          />
          <NavItem
            href="/admin/albums"
            icon={<Disc className="h-5 w-5" />}
            label="Álbuns"
            isActive={pathname?.startsWith("/admin/albums")}
            onClick={closeSidebar}
          />
          <NavItem
            href="/admin/tracks"
            icon={<Music className="h-5 w-5" />}
            label="Faixas"
            isActive={pathname?.startsWith("/admin/tracks")}
            onClick={closeSidebar}
          />
          <NavItem
            href="/admin/events"
            icon={<Calendar className="h-5 w-5" />}
            label="Eventos"
            isActive={pathname?.startsWith("/admin/events")}
            onClick={closeSidebar}
          />
          <NavItem
            href="/admin/live-sets"
            icon={<Radio className="h-5 w-5" />}
            label="Live Sets"
            isActive={pathname?.startsWith("/admin/live-sets")}
            onClick={closeSidebar}
          />
          <NavItem
            href="/admin/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Configurações"
            isActive={pathname?.startsWith("/admin/settings")}
            onClick={closeSidebar}
          />
        </nav>
      </div>
    </>
  )
}
