"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface MousePlanetProps {
  size?: number
  delay?: number
  color?: string
  rings?: boolean
}

export const MousePlanet = ({
  size = 40,
  delay = 0.1,
  color = "bg-ocean-500",
  rings = true,
}: MousePlanetProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    // Add a small delay before showing the planet
    const timer = setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove)
    }, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div
        className="absolute"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
          delay,
        }}
      >
        {/* Planet rings (optional) */}
        {rings && (
          <motion.div
            className="absolute rounded-full border-2 border-ocean-300/30"
            style={{
              width: size * 2,
              height: size * 0.8,
              top: size / 2 - (size * 0.8) / 2,
              left: 0,
              transform: "translateX(-25%)",
            }}
            animate={{ rotateX: 70, rotateZ: 15 }}
          />
        )}

        {/* Main planet */}
        <motion.div
          className={`rounded-full ${color} shadow-lg`}
          style={{
            width: size,
            height: size,
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            rotate: 360,
          }}
          transition={{
            scale: { duration: 0.5 },
            rotate: { 
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }
          }}
        >
          {/* Planet surface details */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            <div className="absolute w-1/4 h-1/4 bg-white/20 rounded-full top-1/4 left-1/4" />
            <div className="absolute w-1/5 h-1/5 bg-white/10 rounded-full top-2/3 right-1/4" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 