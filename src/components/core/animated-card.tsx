"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className={`bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-sky-500/50 rounded-lg overflow-hidden transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  image?: string
  index: number
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, index }) => {
  return (
    <AnimatedCard delay={0.1 * index}>
      <div className="h-48 bg-gray-700 relative overflow-hidden group">
        {/* Replace with actual project images */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800">
          <span className="text-sky-500">{title}</span>
        </div>
        <motion.div
          className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-purple-500/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-sky-500 transition-colors">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-700 text-xs rounded-full">
              {item}
            </span>
          ))}
        </div>

        <motion.button
          className="text-sky-500 hover:text-sky-400 font-medium flex items-center gap-1"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          View Project
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </AnimatedCard>
  )
}
