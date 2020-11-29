import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback
} from 'react'

import { Container, Error } from './styles'

import { IconBaseProps } from 'react-icons/lib'
import { FiAlertOctagon } from 'react-icons/fi'
import { useField } from '@unform/core'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object,
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, containerStyle = {}, ...props }) => {
  const {
    fieldName,
    defaultValue,
    registerField,
    error
  } = useField(name)

  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    registerField({
      ref: inputRef.current,
      name: fieldName,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(
      Boolean(inputRef.current?.value)
    )
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return (
    <Container
      style={containerStyle}
      hasError={Boolean(error)}
      isFocused={isFocused}
      isFilled={isFilled}
    >
      {Icon && <Icon size={20}/>}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...props}
      />

      {error &&
        <Error title={error}>
          <FiAlertOctagon color="#c53030" size={20}/>
        </Error>
      }
    </Container>
  )
}

export default Input
