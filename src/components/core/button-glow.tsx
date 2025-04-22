"use client"

import type React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonGlowProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  glowColor?: string
}

export const ButtonGlow = ({
  children,
  className,
  variant = "primary",
  size = "md",
  glowColor = "rgba(0, 180, 216, 0.6)",
  ...props
}: ButtonGlowProps) => {
  const variantClasses = {
    primary: "bg-ocean-500 hover:bg-ocean-600 text-white",
    secondary: "bg-ocean-700 hover:bg-ocean-800 text-white",
    outline: "bg-transparent border border-ocean-500 text-ocean-500 hover:bg-ocean-500/10",
  }

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  }

  return (
    <motion.button
      className={cn(
        "relative rounded-lg font-medium transition-all duration-200 overflow-hidden",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
      >
        <span
          className="absolute inset-0 blur-md"
          style={{
            background: glowColor,
            opacity: 0.7,
            transform: "translateY(20%) scale(0.95)",
          }}
        />
      </motion.span>
    </motion.button>
  )
}
