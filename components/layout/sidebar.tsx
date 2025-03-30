"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layout, Menu } from "antd"
import {
  DashboardOutlined,
  ShoppingOutlined,
  DollarOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/slices/authSlice"
import { authService } from "@/lib/services/authService"

const { Sider } = Layout

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await authService.signOut()
      dispatch(logout())
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "items",
      icon: <ShoppingOutlined />,
      label: <Link href="/items">Items</Link>,
    },
    {
      key: "selling",
      icon: <DollarOutlined />,
      label: <Link href="/selling">Selling</Link>,
    },
  ]

  const getSelectedKeys = () => {
    if (pathname === "/dashboard") return ["dashboard"]
    if (pathname.startsWith("/items")) return ["items"]
    if (pathname.startsWith("/selling")) return ["selling"]
    return []
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      className="min-h-screen bg-white shadow-md"
      width={250}
    >
      <div className="flex h-16 items-center justify-center p-4">
        <h1 className={`text-xl font-bold text-primary transition-opacity ${collapsed ? "opacity-0" : "opacity-100"}`}>
          Admin Panel
        </h1>
      </div>

      <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="absolute right-4 top-4">
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

      <Menu theme="light" mode="inline" selectedKeys={getSelectedKeys()} items={menuItems} className="border-r-0" />

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <UserOutlined className="mr-2" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </Sider>
  )
}

