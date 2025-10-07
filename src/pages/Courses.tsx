import { Card, List, Typography } from 'antd'

const { Title, Text } = Typography

const courses = [
  { id: 1, title: 'React Fundamentals', description: 'Components, hooks, and state management.' },
  { id: 2, title: 'Advanced TypeScript', description: 'Type-safe patterns for large applications.' },
  { id: 3, title: 'Design Systems with Ant Design', description: 'Craft polished UIs using Ant Design.' },
]

const Courses = () => {
  return (
    <div className="space-y-6">
      <div>
        <Title level={3} className="!mb-1">
          Courses
        </Title>
        <Text type="secondary">Browse the catalog of available courses.</Text>
      </div>

      <Card>
        <List
          itemLayout="vertical"
          dataSource={courses}
          renderItem={(course) => (
            <List.Item key={course.id}>
              <List.Item.Meta
                title={<Text className="font-semibold text-primary">{course.title}</Text>}
                description={course.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default Courses
