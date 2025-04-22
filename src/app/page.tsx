"use client"

import { Wrapper } from "@/components/Wrapper"
import { SocialLinks } from "@/components/SocialLinks"
import { DownloadCV } from "@/components/DownloadCV"
import { PlanetarySystem } from "@/components/core/mouse/PlanetarySystem"
import Image from "next/image"
// import Cat from "../public/assets/cat.gif"
import { ButtonAnimated } from "@/components/ButtonAnimated"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedText } from "@/components/core/animated-text"
import { AnimatedSkillBar } from "@/components/core/animated-skill-bar"
import { ProjectCard } from "@/components/core/animated-card"
import { ButtonGlow } from "@/components/core/button-glow"
import { ChevronDown, Send, ExternalLink } from "lucide-react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)

  const skills = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 80 },
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution built with Next.js and Tailwind",
      tech: ["Next.js", "React", "Tailwind CSS"],
      image: "/assets/project1.jpg",
    },
    {
      title: "Dashboard UI",
      description: "Interactive admin dashboard with dark/light theme",
      tech: ["React", "TypeScript", "Chart.js"],
      image: "/assets/project2.jpg",
    },
    {
      title: "Mobile App UI",
      description: "React Native UI components for fitness tracking app",
      tech: ["React Native", "Redux", "Styled Components"],
      image: "/assets/project3.jpg",
    },
  ]

  // Parallax effect for hero section
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    setIsVisible(true)

    // Particle effect for hero section
    const canvas = document.getElementById("particles") as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: any[] = []
        const particleCount = 100

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            color: `rgba(56, 189, 248, ${Math.random() * 0.5 + 0.2})`,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
          })
        }

        const animate = () => {
          requestAnimationFrame(animate)
          ctx!.clearRect(0, 0, canvas.width, canvas.height)

          for (let i = 0; i < particleCount; i++) {
            const p = particles[i]
            ctx!.beginPath()
            ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
            ctx!.fillStyle = p.color
            ctx!.fill()

            p.x += p.speedX
            p.y += p.speedY

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
          }
        }

        animate()

        const handleResize = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return (
    <div className="relative">
      {/* Add the PlanetarySystem component with custom properties */}
      <PlanetarySystem 
        planetSize={45}
        planetColor="bg-ocean-500"
        showRings={true}
        trailEffect={true}
        moons={[
          { size: 8, distance: 70, color: "bg-ocean-300", orbitDuration: 4, delay: 0 },
          { size: 12, distance: 100, color: "bg-ocean-100", orbitDuration: 7, delay: 0.2 },
          { size: 6, distance: 130, color: "bg-white", orbitDuration: 10, delay: 0.3 },
        ]}
      />
      
      {/* Particle canvas */}
      <canvas id="particles" className="fixed inset-0 z-0 pointer-events-none" />

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="about"
        className="min-h-screen flex items-center justify-center pt-24 px-6 lg:px-24 relative overflow-hidden"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 cyberpunk-grid z-0 opacity-30" />

        <Wrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ButtonAnimated name="Frontend Developer" />

              <div className="mt-4 mb-6">
                <AnimatedText
                  text="Transforming Ideas into Reality"
                  className="text-5xl md:text-6xl font-bold text-left"
                  once
                />
                <motion.span
                  className="text-5xl md:text-6xl font-bold text-ocean-500 block mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  with Code
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="relative"
              >
                <Image
                  height={120}
                  width={120}
                  src={"/assets/cat.gif"}
                  alt="cat"
                  className="absolute -bottom-6 right-0 -z-10"
                />
              </motion.div>

              <motion.p
                className="text-lg text-ocean-900 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                I am a Frontend Developer with experience in building web applications using React, Next.js, and
                Tailwind CSS. I am passionate about creating intuitive user experiences and turning complex problems
                into elegant solutions.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <DownloadCV />
                <ButtonGlow variant="outline">Contact Me</ButtonGlow>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <p className="mr-2 text-ocean-700 dark:text-gray-400">Find me on:</p>
                <SocialLinks />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative h-80 w-80 mx-auto lg:h-96 lg:w-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Profile image container with gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-300 animate-spin-slow"></div>
              <div className="absolute inset-1 bg-gray-900 rounded-full"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden">
                {/* Foto real do usuário */}
                <Image 
                  src="/perfil-kauer.png"
                  alt="Anderson Kauêr"
                  fill
                  className="object-cover object-[center_top]"
                />
              </div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute h-8 w-8 rounded-full bg-ocean-500 flex items-center justify-center text-white"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  top: "10%",
                  left: "50%",
                  x: "-50%",
                  transformOrigin: "center 250px",
                }}
              >
                <span className="text-xs">React</span>
              </motion.div>

              <motion.div
                className="absolute h-8 w-8 rounded-full bg-ocean-700 flex items-center justify-center text-white"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  top: "80%",
                  left: "50%",
                  x: "-50%",
                  transformOrigin: "center -250px",
                }}
              >
                <span className="text-xs">Next</span>
              </motion.div>
            </motion.div>
          </div>
        </Wrapper>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-ocean-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 lg:px-24 bg-ocean-50/40 dark:bg-black/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ocean-300/10 via-transparent to-transparent opacity-30"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-2 text-center">
              My <span className="text-ocean-500">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-ocean-300 mx-auto mb-12"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-ocean-900 dark:text-gray-300 mb-8 leading-relaxed">
                With over 5 years of experience in frontend development, I've mastered a range of technologies that
                allow me to build high-performance, responsive web applications with clean, maintainable code.
              </p>

              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-ocean-200 dark:border-gray-700"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-4 text-ocean-900 dark:text-white">Tech Stack Highlights</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "GraphQL", "Jest", "Figma"].map(
                    (tech, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2 text-ocean-900 dark:text-white"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className="text-ocean-500">✓</span> {tech}
                      </motion.li>
                    ),
                  )}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              {skills.map((skill, index) => (
                <AnimatedSkillBar key={index} name={skill.name} level={skill.level} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 lg:px-24 relative">
        <div className="absolute inset-0 cyberpunk-grid opacity-10"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-2 text-center">
              Featured <span className="text-ocean-500">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-ocean-300 mx-auto mb-12"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tech={project.tech}
                image={project.image}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ButtonGlow>
              View All Projects <ExternalLink className="ml-2 h-4 w-4" />
            </ButtonGlow>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-24 bg-ocean-50/40 dark:bg-black/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ocean-300/10 via-transparent to-transparent opacity-30"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-2 text-center">
              Let's <span className="text-ocean-500">Connect</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-ocean-300 mx-auto mb-12"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-ocean-900 dark:text-gray-300 mb-6 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>

              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="h-12 w-12 rounded-full bg-ocean-100 dark:bg-gray-800 flex items-center justify-center text-ocean-500">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(0, 180, 216, 0)",
                          "0 0 15px rgba(0, 180, 216, 0.5)",
                          "0 0 0 rgba(0, 180, 216, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="h-full w-full rounded-full flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-medium text-ocean-900 dark:text-white">Email</h3>
                    <p className="text-ocean-700 dark:text-gray-400">youremail@example.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="h-12 w-12 rounded-full bg-ocean-100 dark:bg-gray-800 flex items-center justify-center text-ocean-500">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(0, 180, 216, 0)",
                          "0 0 15px rgba(0, 180, 216, 0.5)",
                          "0 0 0 rgba(0, 180, 216, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                      className="h-full w-full rounded-full flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-medium text-ocean-900 dark:text-white">Location</h3>
                    <p className="text-ocean-700 dark:text-gray-400">Your City, Country</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-bold mb-4 text-ocean-900 dark:text-white">Connect with me:</h3>
                <div className="flex gap-4">
                  <SocialLinks />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-ocean-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 text-ocean-900 dark:text-white">Send me a message</h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-ocean-900 dark:text-white">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-ocean-50 dark:bg-gray-700 border border-ocean-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-ocean-900 dark:text-white">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-ocean-50 dark:bg-gray-700 border border-ocean-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-ocean-900 dark:text-white">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-ocean-50 dark:bg-gray-700 border border-ocean-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all duration-300"
                  ></textarea>
                </div>

                <ButtonGlow className="w-full">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </ButtonGlow>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
