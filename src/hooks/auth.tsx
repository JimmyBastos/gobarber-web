import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import { api } from '../services/api'

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface SignInCredetials {
  email: string
  password: string
}

interface AuthData {
  token: string
  user: User
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredetials): Promise<void>
  updateUser(user: User): void
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

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      return {
        token,
        user: JSON.parse(user)
      }
    }

    return {} as AuthData
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

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@Gobarber:user', JSON.stringify(user))
    setAuthData(data => ({ token: data.token, user }))
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token')
    localStorage.removeItem('@Gobarber:user')
    setAuthData({} as AuthData)
  }, [])

  useEffect(
    () => {

    }, [authData.token]
  )

  return (
    <AuthContext.Provider
      value={{
        user: authData.user as User,
        signIn,
        signOut,
        updateUser
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export { useAuth, AuthProvider }
