"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "antd"
import { Sidebar } from "@/components/layout/sidebar"
import { useAppSelector } from "@/lib/redux/hooks"

const { Content } = Layout

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Content className="m-4 p-4 bg-white rounded-lg">{children}</Content>
      </Layout>
    </Layout>
  )
}

