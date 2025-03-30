import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReduxProvider } from "@/lib/redux/provider"
import { ThemeProvider } from "@/components/theme-provider"
import { ConfigProvider } from "antd"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard with Next.js, TypeScript, Ant Design, and shadcn/ui",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ConfigProvider>{children}</ConfigProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}



import './globals.css'