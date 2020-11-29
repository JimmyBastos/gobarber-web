import React, { useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { Container, Transition, Content, Background } from './styles'

import * as Yup from 'yup'

import logoImage from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'
import { api } from '../../services/api'

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = useCallback(async (formData: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido')
      })

      await schema.validate(formData, { abortEarly: false })

      await api.post('/password/forgot', formData)

      addToast({
        type: 'success',
        title: 'Recuperação enviada!',
        description: 'Siga os passos enviados para o seu e-mail para recuperar sua senha.'
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(
          getValidationErrors(error)
        )
      } else {
        console.error(error)
        addToast({
          type: 'error',
          title: 'Erro ao solicitar recuperação de senha!',
          description: 'Ocorreu ao tentar realizar a recuperação de senha. Atualize a página e tente novamente.'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [addToast])

  return (
    <Container>
      <Transition>
        <Content>
          <img src={logoImage} alt="GoBarber" />

          <Form ref={formRef} className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-form__title">Recuperar Senha</h1>

            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Button
              loading={isLoading}
              type="submit"
            >
              Recuperar
            </Button>
          </Form>

          <Link className="create-account" to="/">
            <FiArrowLeft/>
            Voltar para o login
          </Link>
        </Content>
      </Transition>
      <Background/>
    </Container>
  )
}

export default ForgotPassword
