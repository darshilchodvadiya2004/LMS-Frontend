import { Navigate, useRoutes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PrivateLayout from '../components/layout/PrivateLayout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'

const AppRoutes = () => {
  const element = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <PrivateLayout />,
          children: [
            {
              path: '/',
              element: <Navigate to="/dashboard" replace />,
            },
            {
              path: '/dashboard',
              element: <Dashboard />,
            },
            {
              path: '/courses',
              element: <Courses />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/dashboard" replace />,
    },
  ])

  return element
}

export default AppRoutes
