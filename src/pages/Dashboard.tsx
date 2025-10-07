import { useEffect, useState } from 'react'
import { Card, Col, Row, Spin, Statistic, Typography } from 'antd'
import { useAuth } from '../hooks/useAuth'

const { Title, Text } = Typography

const Dashboard = () => {
  const { user } = useAuth()
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (pageLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Title level={3} className="!mb-1">
          Dashboard Overview
        </Title>
        <Text type="secondary">
          {user ? `Here is what is happening today, ${user.name}.` : 'Track your learning progress.'}
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Active Courses" value={4} suffix="/ 12" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Completed Lessons" value={32} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Next Milestone" value="React Hooks" />
          </Card>
        </Col>
      </Row>

      <Card>
        <Title level={5} className="!mb-2">
          Announcements
        </Title>
        <Text type="secondary">
          Stay tuned for upcoming course releases and live sessions.
        </Text>
      </Card>
    </div>
  )
}

export default Dashboard
