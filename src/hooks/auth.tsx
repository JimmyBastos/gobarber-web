import React, { createContext, useCallback, useState, useContext } from 'react'
import { api } from '../services/api'

interface SignInCredetials {
  email: string
  password: string
}

interface AuthData {
  token: string
  user: object
}

interface AuthContextData {
  user: object,
  signIn(credentials: SignInCredetials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
)

function useAuth (): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useContext must be used within an AuthProvider')
  }

  return context
}

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@Gobarber:token')
    const user = localStorage.getItem('@Gobarber:user')

    return (token && user)
      ? { token, user: JSON.parse(user) }
      : {} as AuthData
  })

  const signIn = useCallback(async ({ email, password }) => {
    const { data } = await api.post<AuthData>('/sessions', {
      email,
      password
    })

    localStorage.setItem('@Gobarber:token', data.token)
    localStorage.setItem('@Gobarber:user', JSON.stringify(data.user))

    setAuthData(data)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token')
    localStorage.removeItem('@Gobarber:user')
    setAuthData({} as AuthData)
  }, [])

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}

export { useAuth, AuthProvider }
