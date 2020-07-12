import React, { useEffect } from 'react'
import { FiCheckCircle, FiInfo, FiAlertCircle, FiXCircle } from 'react-icons/fi'
import { ToastMessage, useToast } from '../../../hooks/toast'
import { Container } from './styles'

interface ToastProps {
  message: ToastMessage
  style: object
}

const icons = {
  info: <FiInfo className="toast__icon" size={24}/>,
  success: <FiCheckCircle className="toast__icon" size={24}/>,
  error: <FiAlertCircle className="toast__icon" size={24}/>
}

const Toast : React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const autoRemoveToast = setTimeout(() => {
      removeToast(message.id)
    }, 4000)

    return () => {
      clearTimeout(autoRemoveToast)
    }
  }, [removeToast, message.id])

  return (
    <Container
      type={message.type}
      hasDescription={Boolean(message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div className="toast__content">
        <strong>
          {message.title}
        </strong>

        {message.description &&
          <p>
            {message.description}
          </p>
        }
      </div>

      <button
        className="toast__close"
        type="button"
        onClick={() => removeToast(message.id)}
      >
        <FiXCircle size={18}/>
      </button>
    </Container>
  )
}

export default Toast
