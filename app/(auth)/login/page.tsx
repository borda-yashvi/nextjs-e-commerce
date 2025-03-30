"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Form, Input, Checkbox, Card, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { loginStart, loginSuccess, loginFailure } from "@/lib/redux/slices/authSlice"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      dispatch(loginStart())

      // For demo purposes, we'll just simulate a successful login
      // In a real app, you would use the authService
      // const data = await authService.signIn(values.email, values.password);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful login
      dispatch(
        loginSuccess({
          id: "1",
          email: values.email,
          name: "Demo User",
        }),
      )

      message.success("Login successful!")
      router.push("/dashboard")
    } catch (error: any) {
      dispatch(loginFailure(error.message || "Login failed"))
      message.error("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-gray-500">Welcome back! Please login to your account.</p>
        </div>

        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  )
}

