"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
    setMounted(true)
  }, [])

  const toggle = (e?: React.MouseEvent) => {
    const next = !dark
    const root = document.documentElement

    // Check if View Transition is supported
    if (!(document as any).startViewTransition) {
      updateTheme(next)
      return
    }

    // Capture click coordinates for the circular reveal
    if (e) {
      root.style.setProperty("--x", `${e.clientX}px`)
      root.style.setProperty("--y", `${e.clientY}px`)
    }

    // ✨ Circular Wave Transition
    ;(document as any).startViewTransition(() => {
      updateTheme(next)
    })
  }

  const updateTheme = (next: boolean) => {
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-8" disabled>
        <Sun className="size-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 transition-transform hover:scale-105 active:scale-95"
      onClick={toggle}
    >
      {dark ? (
        <Sun className="size-4 text-yellow-400" />
      ) : (
        <Moon className="size-4 text-indigo-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
