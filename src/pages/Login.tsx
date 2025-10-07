import { useEffect } from 'react'
import { Button, Card, Form, Input, Typography, Alert } from 'antd'
import { useNavigate, useLocation, type Location } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAuth } from '../hooks/useAuth'
import { login } from '../store/slices/authSlice'
import type { LoginCredentials } from '../services/authService'
import logo from '../assets/logo.png'

const { Title, Text } = Typography

const Login = () => {
  const [form] = Form.useForm<LoginCredentials>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, loading, error } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: Location } | undefined)?.from
      const redirectPath = from?.pathname ?? '/dashboard'
      navigate(redirectPath, { replace: true })
    }
  }, [isAuthenticated, location.state, navigate])

  const handleSubmit = (values: LoginCredentials) => {
    dispatch(login(values))
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:flex-row">
      <div className="flex flex-1 items-center justify-center bg-primary px-8 py-12 text-white">
        <div className="text-center">
          <img src={logo} alt="LMS-Portal logo" className="mx-auto mb-6 h-28 w-28 rounded-full shadow-xl ring-4 ring-white/20" />
          <div className="rounded-xl bg-white/90 px-8 py-6 shadow-xl">
            <h1 className="text-3xl font-bold text-primary">LMS-Portal</h1>
          </div>
          <Text className="mt-6 block text-white/80">
            Learn. Manage. Succeed.
          </Text>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Card
            className="rounded-xl bg-white shadow-lg"
            bodyStyle={{ padding: '2rem' }}
            bordered={false}
          >
            <div className="mb-6 text-center">
              <Title level={3} className="mb-2">
                Welcome Back
              </Title>
            </div>

            {error ? (
              <Alert message={error} type="error" showIcon className="mb-4" />
            ) : null}

            <Form<LoginCredentials>
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              requiredMark={false}
              initialValues={{ email: 'admin@example.com', password: 'password123' }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input size="large" placeholder="you@example.com" autoComplete="email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
