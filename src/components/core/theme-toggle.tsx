"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  
  // Evitar erro de hidratação
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isDarkMode = isMounted && theme === "dark"

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Moon className={`h-4 w-4 ${isDarkMode ? 'text-ocean-300' : 'text-ocean-900'}`} />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-ocean-500"
      />
      <Sun className={`h-4 w-4 ${!isDarkMode ? 'text-ocean-700' : 'text-gray-400'}`} />

      <motion.div
        className="absolute -z-10 rounded-full bg-ocean-500/20 blur-xl"
        animate={{
          scale: isDarkMode ? [1, 1.1, 1] : [1, 1.2, 1],
          opacity: isDarkMode ? [0.2, 0.3, 0.2] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          width: "100px",
          height: "100px",
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  )
}
