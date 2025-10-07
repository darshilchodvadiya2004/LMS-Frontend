import { delay } from '../utils'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface LoginResponse {
  user: AuthUser
  token: string
}

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  await delay(600)

  const { email, password } = credentials
  const validUser =
    email.trim().toLowerCase() === 'admin@example.com' && password === 'password123'

  if (!validUser) {
    throw new Error('Invalid email or password')
  }

  return {
    user: {
      id: '1',
      name: 'Admin User',
      email: email.trim().toLowerCase(),
    },
    token: 'mock-token-123',
  }
}
