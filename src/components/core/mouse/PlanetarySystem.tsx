"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MoonProps {
  size: number
  distance: number
  color: string
  orbitDuration: number
  delay: number
}

interface PlanetarySystemProps {
  planetSize?: number
  planetColor?: string
  followDelay?: number
  showRings?: boolean
  moons?: MoonProps[]
  trailEffect?: boolean
}

export const PlanetarySystem = ({
  planetSize = 50,
  planetColor = "bg-ocean-500",
  followDelay = 0,
  showRings = true,
  trailEffect = false,
  moons = [
    { size: 10, distance: 80, color: "bg-ocean-300", orbitDuration: 5, delay: 0 },
    { size: 15, distance: 110, color: "bg-ocean-100", orbitDuration: 8, delay: 0.5 },
  ],
}: PlanetarySystemProps) => {
  // Use motion values para posicionamento mais suave
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Configure springs com valores otimizados para movimento suave
  const springX = useSpring(mouseX, {
    stiffness: 90,  // Reduzido significativamente
    damping: 12,    // Reduzido para maior suavidade
    mass: 0.1       // Menor massa = mais responsivo
  })
  const springY = useSpring(mouseY, {
    stiffness: 90,
    damping: 12,
    mass: 0.1
  })
  
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  
  // Usar throttle para limitar atualizações
  const throttleRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef(0)
  
  // Limitar o número de pontos da trilha para melhorar o desempenho
  const trailLimit = useMemo(() => trailEffect ? 8 : 0, [trailEffect])

  useEffect(() => {
    // Função para gerenciar movimento do mouse com throttling
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      
      // Limitar atualizações para 60FPS (16ms entre frames)
      if (now - lastUpdateTimeRef.current < 16) {
        if (throttleRef.current) window.cancelAnimationFrame(throttleRef.current)
        
        throttleRef.current = window.requestAnimationFrame(() => {
          updatePosition(e.clientX, e.clientY)
          throttleRef.current = null
        })
        return
      }
      
      updatePosition(e.clientX, e.clientY)
      lastUpdateTimeRef.current = now
    }
    
    // Função separada para atualizar a posição
    const updatePosition = (x: number, y: number) => {
      // Atualizar motion values diretamente é mais eficiente
      mouseX.set(x)
      mouseY.set(y)
      
      if (trailEffect && trailLimit > 0) {
        setTrail(prev => [
          ...prev.slice(-trailLimit), // Limitar o número de pontos da trilha
          { x, y, id: Date.now() }
        ])
      }
      
      if (!isVisible) setIsVisible(true)
    }

    // Delay inicial reduzido
    const timer = setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove)
    }, 100)

    return () => {
      if (throttleRef.current) window.cancelAnimationFrame(throttleRef.current)
      clearTimeout(timer)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isVisible, mouseX, mouseY, trailEffect, trailLimit])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Trail effect (optional) */}
      {trailEffect && trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute bg-ocean-500/5 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: planetSize * (0.3 + (index / trail.length) * 0.7),
            height: planetSize * (0.3 + (index / trail.length) * 0.7),
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut" 
          }}
        />
      ))}

      {/* Main planetary system - uso de style em vez de animate para melhor performance */}
      <motion.div
        className="absolute"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Planet rings (optional) */}
        {showRings && (
          <motion.div
            className="absolute rounded-full border-2 border-ocean-300/30"
            style={{
              width: planetSize * 2.2,
              height: planetSize * 0.8,
              top: planetSize / 2 - (planetSize * 0.8) / 2,
              left: -planetSize * 0.1,
              rotateX: "75deg",
            }}
            animate={{ 
              rotateZ: [0, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              rotateZ: {
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: 8,
                repeat: Infinity,
                ease: "sinInOut"
              }
            }}
          />
        )}

        {/* Moons */}
        {moons.map((moon, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: moon.distance * 2,
              height: moon.distance * 2,
              top: planetSize / 2 - moon.distance,
              left: planetSize / 2 - moon.distance,
            }}
            initial={{ 
              opacity: 0,
              rotate: index * 60 // Each moon starts at a different position
            }}
            animate={{ 
              opacity: 1,
              rotate: 360 + index * 60 
            }}
            transition={{
              opacity: { duration: 1, delay: moon.delay },
              rotate: { 
                duration: moon.orbitDuration, 
                repeat: Infinity, 
                ease: "linear",
                delay: moon.delay
              }
            }}
          >
            {/* The actual moon */}
            <motion.div
              className={`absolute rounded-full ${moon.color} shadow-md`}
              style={{
                width: moon.size,
                height: moon.size,
                top: 0,
                left: moon.distance - moon.size / 2,
              }}
              whileHover={{ scale: 1.2 }}
            />
          </motion.div>
        ))}

        {/* Main planet */}
        <motion.div
          className={`rounded-full ${planetColor} shadow-lg relative`}
          style={{
            width: planetSize,
            height: planetSize,
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            rotate: 360,
          }}
          transition={{
            scale: { duration: 0.8 },
            rotate: { 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {/* Planet surface details */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
            <div className="absolute w-1/3 h-1/3 bg-white/20 rounded-full top-1/4 left-1/4" />
            <div className="absolute w-1/4 h-1/4 bg-white/10 rounded-full top-2/3 right-1/3" />
            <div className="absolute w-1/5 h-1/5 bg-white/10 rounded-full top-1/5 right-1/5" />
            <div className="absolute w-2/5 h-1/4 bg-ocean-700/20 rounded-full bottom-1/4 right-1/4" />
          </div>
          
          {/* Glowing effect */}
          <motion.div 
            className="absolute -inset-2 rounded-full bg-ocean-500/10 blur-md z-[-1]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
} 