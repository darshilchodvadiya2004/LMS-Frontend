import { Layout, Menu, Typography, Button } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { logout } from '../../store/slices/authSlice'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

const navigationItems: MenuProps['items'] = [
  {
    key: '/dashboard',
    label: 'Dashboard',
  },
  {
    key: '/courses',
    label: 'Courses',
  },
]

const PrivateLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAuth()

  const selectedKey = navigationItems.find((item) =>
    location.pathname.startsWith(String(item?.key)),
  )?.key
  const pageTitle = selectedKey === '/courses' ? 'Courses' : 'Dashboard'

  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="py-6 text-center text-white">
          <Title level={4} className="!mb-0 !text-white">
            EduPortal
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={navigationItems}
          selectedKeys={selectedKey ? [String(selectedKey)] : []}
          onClick={({ key }) => navigate(String(key))}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between bg-white px-6 shadow">
          <div>
            <Title level={4} className="!mb-0">
              {pageTitle}
            </Title>
            {user ? <Text type="secondary">Welcome back, {user.name}</Text> : null}
          </div>
          <Button onClick={() => dispatch(logout())}>Log out</Button>
        </Header>
        <Content className="bg-gray-50 p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default PrivateLayout
