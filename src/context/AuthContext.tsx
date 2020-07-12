import React, { createContext, useCallback } from 'react'

interface AuthContextData {
  name: string,
  signIn: Function
}

interface SignInData {
  email: string
  password: string
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
)

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback((data: SignInData) => {
    console.log(data)
  }, [])

  return (
    <AuthContext.Provider value={{ name: 'jimmy', signIn }}>
      { children }
    </AuthContext.Provider>
  )
}
