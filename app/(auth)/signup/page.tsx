"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Form, Input, Card, message } from "antd"
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { loginStart, loginSuccess, loginFailure } from "@/lib/redux/slices/authSlice"

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      dispatch(loginStart())

      // For demo purposes, we'll just simulate a successful signup
      // In a real app, you would use the authService
      // const data = await authService.signUp(values.email, values.password);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful signup and login
      dispatch(
        loginSuccess({
          id: "1",
          email: values.email,
          name: values.name,
        }),
      )

      message.success("Account created successfully!")
      router.push("/dashboard")
    } catch (error: any) {
      dispatch(loginFailure(error.message || "Signup failed"))
      message.error("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-gray-500">Sign up to get started</p>
        </div>

        <Form name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("The two passwords do not match!"))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </Form.Item>

          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  )
}

