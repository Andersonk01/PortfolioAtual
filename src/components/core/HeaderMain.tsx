"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export const HeaderMain: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", active: true },
    { href: "#about", label: "About", active: false },
    { href: "#skills", label: "Skills", active: false },
    { href: "#projects", label: "Projects", active: false },
    { href: "#contact", label: "Contact", active: false },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-black/80 backdrop-blur-lg shadow-lg shadow-ocean-200/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-500 to-ocean-300 rounded-full blur-sm animate-pulse"></div>
              <Image
                width={40}
                height={40}
                src="/logo.png"
                className="relative bg-contain rounded-full border-2 border-ocean-500/50"
                alt="Logo"
              />
            </div>
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-ocean-700 to-ocean-500">
              Anderson Kauêr
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav variants={navVariants} initial="hidden" animate="visible" className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                      link.active
                        ? "text-ocean-700"
                        : "text-ocean-900 dark:text-ocean-100 hover:text-ocean-500 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    {link.active && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean-700 to-ocean-500"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants} className="flex items-center">
                <ThemeToggle />
              </motion.li>
            </ul>
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ocean-900 dark:text-ocean-100 hover:text-ocean-700 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <ul className="flex flex-col space-y-4 p-4 bg-white/95 dark:bg-ocean-900/90 backdrop-blur-md rounded-lg border border-ocean-200 dark:border-ocean-800">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md ${
                      link.active
                        ? "bg-ocean-100 text-ocean-700"
                        : "text-ocean-900 dark:text-ocean-100 hover:bg-ocean-50 dark:hover:bg-ocean-800/50 hover:text-ocean-700 dark:hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-ocean-900 dark:text-ocean-100">Tema</span>
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
