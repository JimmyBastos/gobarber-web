import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

import Loading from '../Loading'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <Container
    type="button"
    disabled={loading}
    {...props}
  >
    {loading
      ? <Loading
        className="loading"
        size={24}
      />
      : children
    }
  </Container>
)

export default Button
