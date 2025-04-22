"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AnimatedSkillBarProps {
  name: string
  level: number
  index: number
}

export const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({ name, level, index }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: {
        duration: 1,
        ease: [0.165, 0.84, 0.44, 1],
        delay: 0.2 + index * 0.1,
      },
    },
  }

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="mb-6"
      initial="hidden"
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex justify-between mb-2" variants={labelVariants}>
        <span className="font-medium">{name}</span>
        <span>{level}%</span>
      </motion.div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${isHovered ? "bg-gradient-to-r from-sky-400 via-sky-500 to-purple-500" : "bg-gradient-to-r from-sky-400 to-sky-600"}`}
          variants={barVariants}
        >
          {isHovered && (
            <motion.div
              className="h-full w-20 bg-white/20"
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 1,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
