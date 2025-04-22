import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { HeaderMain } from "@/components/core/HeaderMain"
import { ThemeProvider } from "@/components/core/theme-provider"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
})

export const metadata: Metadata = {
  title: "Anderson K",
  description: "Portfólio de Anderson Kauer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderMain />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
