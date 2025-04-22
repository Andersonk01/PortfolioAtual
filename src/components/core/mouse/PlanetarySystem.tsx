"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

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
  showRings?: boolean
  moons?: MoonProps[]
  trailEffect?: boolean
}

export const PlanetarySystem = ({
  planetSize = 50,
  planetColor = "bg-[#00B4D8]", // Cor atualizada com azul pastel da paleta
  showRings = true,
  trailEffect = false,
  moons = [
    { size: 10, distance: 80, color: "bg-[#90E0EF]", orbitDuration: 5, delay: 0 },
    { size: 15, distance: 110, color: "bg-[#CAF0F8]", orbitDuration: 8, delay: 0.5 },
  ],
}: PlanetarySystemProps) => {
  // Detectar o tema
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'
  
  // Propriedades específicas para o modo buraco negro - movidas para o início
  const blackHoleSize = useMemo(() => planetSize * 0.9, [planetSize])
  const accretionDiskSize = useMemo(() => blackHoleSize * 3, [blackHoleSize])
  
  // Use motion values para posicionamento mais suave
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
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
  
  // Estado para as partículas de acreção
  const [accretionParticles, setAccretionParticles] = useState<Array<{
    id: number;
    size: number;
    distance: number;
    angle: number;
    speed: number;
    opacity: number;
    color: string;
  }>>([])
  
  // Função para gerar cores aleatórias para as partículas (atualizada para usar a paleta de azuis)
  const getRandomAccretionColor = () => {
    const colors = [
      'bg-[#CAF0F8]', 'bg-[#90E0EF]', 'bg-[#00B4D8]', 
      'bg-[#0077B6]', 'bg-[#03045E]', 'bg-white',
      'bg-[#E8F8FF]' // Azul mais claro adicional
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  // Gerar partículas para o efeito de acreção
  useEffect(() => {
    if (isDarkMode) {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: 1 + Math.random() * 3,
        distance: (blackHoleSize/2) + Math.random() * accretionDiskSize,
        angle: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.4,
        opacity: 0.3 + Math.random() * 0.7,
        color: getRandomAccretionColor(),
      }))
      setAccretionParticles(newParticles)
    }
  }, [isDarkMode, blackHoleSize, accretionDiskSize])
  
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

  // Atualizar posição das partículas de acreção
  useEffect(() => {
    if (!isDarkMode || accretionParticles.length === 0) return
    
    const updateParticles = () => {
      setAccretionParticles(current => 
        current.map(particle => {
          // Partículas se movem mais rápido quanto mais próximas do centro
          const speedFactor = 1 + (accretionDiskSize / particle.distance) * 2
          const newAngle = particle.angle + (particle.speed * speedFactor * 0.01)
          
          // Partículas são lentamente atraídas para o centro
          const newDistance = particle.distance > blackHoleSize/1.5 
            ? particle.distance - (particle.distance * 0.0003) 
            : particle.distance
            
          // Partículas desaparecem ao atingir o horizonte de eventos
          const newOpacity = particle.distance < blackHoleSize/1.5 
            ? particle.opacity - 0.01 
            : particle.opacity
            
          return {
            ...particle,
            angle: newAngle,
            distance: newDistance,
            opacity: Math.max(0, newOpacity)
          }
        }).filter(p => p.opacity > 0)
      )
    }
    
    // Adicionar novas partículas à medida que as antigas são consumidas
    const addNewParticles = () => {
      if (accretionParticles.length < 20) {
        setAccretionParticles(current => [
          ...current,
          {
            id: Date.now(),
            size: 1 + Math.random() * 3,
            distance: accretionDiskSize,
            angle: Math.random() * Math.PI * 2,
            speed: 0.1 + Math.random() * 0.4,
            opacity: 0.3 + Math.random() * 0.7,
            color: getRandomAccretionColor(),
          }
        ])
      }
    }
    
    const intervalId = setInterval(() => {
      updateParticles()
      if (Math.random() > 0.7) addNewParticles()
    }, 50)
    
    return () => clearInterval(intervalId)
  }, [isDarkMode, accretionParticles.length, blackHoleSize, accretionDiskSize])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Trail effect - diferentes para planeta e buraco negro */}
      {trailEffect && trail.map((point, index) => (
        <motion.div
          key={point.id}
          className={`absolute ${isDarkMode ? 'bg-[#CAF0F8]/5' : 'bg-[#00B4D8]/5'} rounded-full`}
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

      {/* Main planetary system */}
      <motion.div
        className="absolute"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Partículas de acreção - sendo sugadas para o buraco negro */}
        {isDarkMode && accretionParticles.map(particle => (
          <motion.div
            key={`accretion-particle-${particle.id}`}
            className={`absolute ${particle.color} rounded-full`}
            style={{
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              left: blackHoleSize/2 + Math.cos(particle.angle) * particle.distance,
              top: blackHoleSize/2 + Math.sin(particle.angle) * particle.distance,
              transformOrigin: "center",
              zIndex: particle.distance < blackHoleSize ? 15 : 10,
            }}
          />
        ))}

        {/* Planet rings (apenas no modo planet) */}
        {showRings && !isDarkMode && (
          <motion.div
            className="absolute rounded-full border-2 border-[#90E0EF]/40"
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
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              opacity: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            }}
          />
        )}

        {/* Moons - apenas no modo planet */}
        {!isDarkMode && moons.map((moon, index) => (
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
                repeat: Number.POSITIVE_INFINITY, 
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

        {/* Planeta ou Buraco Negro dependendo do tema */}
        <AnimatePresence mode="wait">
          {!isDarkMode ? (
            /* Planeta normal (modo light) */
            <motion.div
              key="planet"
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
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: 0.8 },
                rotate: { 
                  duration: 30,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                },
                exit: { duration: 0.3 }
              }}
            >
              {/* Planet surface details */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
                <div className="absolute w-1/3 h-1/3 bg-[#CAF0F8]/30 rounded-full top-1/4 left-1/4" />
                <div className="absolute w-1/4 h-1/4 bg-[#CAF0F8]/20 rounded-full top-2/3 right-1/3" />
                <div className="absolute w-1/5 h-1/5 bg-[#CAF0F8]/20 rounded-full top-1/5 right-1/5" />
                <div className="absolute w-2/5 h-1/4 bg-[#0077B6]/30 rounded-full bottom-1/4 right-1/4" />
              </div>
              
              {/* Glowing effect */}
              <motion.div 
                className="absolute -inset-2 rounded-full bg-[#00B4D8]/20 blur-md z-[-1]"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ) : (
            /* Buraco Negro (modo dark) */
            <motion.div
              key="blackhole"
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: 0.8 },
                exit: { duration: 0.3 }
              }}
            >
              {/* Fotosfera do buraco negro - borda brilhante do horizonte de eventos */}
              <motion.div
                className="absolute rounded-full bg-gradient-radial from-[#CAF0F8]/90 via-[#90E0EF]/60 to-transparent"
                style={{
                  width: blackHoleSize * 1.15,
                  height: blackHoleSize * 1.15,
                  top: -blackHoleSize * 0.075,
                  left: -blackHoleSize * 0.075,
                  zIndex: 19
                }}
                animate={{
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              />
            
              {/* Centro do buraco negro - horizonte de eventos */}
              <motion.div
                className="rounded-full bg-white/90 shadow-lg relative z-20"
                style={{
                  width: blackHoleSize,
                  height: blackHoleSize,
                  boxShadow: "0 0 30px 5px rgba(202, 240, 248, 0.5)"
                }}
                animate={{
                  boxShadow: [
                    "0 0 30px 5px rgba(202, 240, 248, 0.5)",
                    "0 0 40px 8px rgba(202, 240, 248, 0.6)",
                    "0 0 30px 5px rgba(202, 240, 248, 0.5)"
                  ]
                }}
                transition={{
                  boxShadow: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Borda do horizonte de eventos */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#00B4D8]/70"
                  animate={{
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    opacity: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }
                  }}
                />
              </motion.div>
              
              {/* Brilho gravitacional */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#0077B6]/30 via-[#90E0EF]/20 to-transparent blur-xl z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  scale: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}