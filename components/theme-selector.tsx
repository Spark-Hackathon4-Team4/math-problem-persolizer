"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemeSelectorProps {
  themes: {
    id: string
    name: string
    icon: React.ReactNode
  }[]
  selectedTheme: string
  onSelectTheme: (theme: string) => void
}

export default function ThemeSelector({ themes, selectedTheme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <h2 className="text-xl font-bold">Theme</h2>
        <div className="relative ml-3">
          <Button variant="outline" className="bg-teal-500 text-white hover:bg-teal-600">
            {themes.find((t) => t.id === selectedTheme)?.name || "Select Theme"}
            <span className="ml-2">▼</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            variant="ghost"
            onClick={() => onSelectTheme(theme.id)}
            className={cn("flex flex-col items-center p-3 h-auto", selectedTheme === theme.id ? "bg-gray-100" : "")}
          >
            <div className={cn("p-2 rounded-full mb-1", selectedTheme === theme.id ? "bg-teal-100" : "bg-gray-100")}>
              {theme.icon}
            </div>
            <span className="text-xs">{theme.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
