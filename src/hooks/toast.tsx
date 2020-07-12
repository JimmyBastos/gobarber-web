import React, { createContext, useCallback, useContext, useState } from 'react'
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer'

export interface ToastMessage {
  id: string
  type?: 'info' | 'success' | 'error'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
)

function useToast (): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider')
  }

  return context
}

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(({ type, title, description }) => {
    const id = uuid()

    const message = {
      id,
      type,
      title,
      description
    }

    setMessages(messages => [...messages, message])
  }, [])

  const removeToast = useCallback((id) => {
    setMessages(messages =>
      messages.filter(message => message.id !== id)
    )
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      { children }
      <ToastContainer messages={messages}/>
    </ToastContext.Provider>
  )
}

export { useToast, ToastProvider }
