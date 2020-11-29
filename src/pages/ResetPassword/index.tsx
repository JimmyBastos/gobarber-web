import React, { useRef, useCallback, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiLock } from 'react-icons/fi'
import { Container, Transition, Content, Background } from './styles'

import * as Yup from 'yup'

import logoImage from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'
import { api } from '../../services/api'

interface ResetPasswordFormData {
  password: string,
  password_confirmation: string,
}

const ResetPassword: React.FC = () => {
  const history = useHistory()

  const formRef = useRef<FormHandles>(null)

  const [isLoading, setIsLoading] = useState(false)

  const { addToast } = useToast()

  const location = useLocation()

  const handleSubmit = useCallback(async (formData: ResetPasswordFormData) => {
    try {
      setIsLoading(true)
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), undefined], 'As senhas não coicidem')
      })

      const query = location.search
      const params = new URLSearchParams(query)

      if (!params.has('token')) throw new Error()

      await schema.validate(formData, { abortEarly: false })

      const { password, password_confirmation } = formData

      await api.post('password/reset', {
        password,
        password_confirmation,
        token: params.get('token')
      })

      history.push('/')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(
          getValidationErrors(error)
        )
      } else {
        console.error(error)
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha!',
          description: 'Não foi possível resetar sua senha. Atualize a página e tente novamente.'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [addToast, history, location])

  return (
    <Container>
      <Transition>
        <Content>
          <img src={logoImage} alt="GoBarber" />

          <Form ref={formRef} className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-form__title">Resetar Senha</h1>

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Confirme a nova senha"
            />

            <Button
              loading={isLoading}
              type="submit"
            >
            Alterar senha
            </Button>
          </Form>
        </Content>
      </Transition>
      <Background/>
    </Container>
  )
}

export default ResetPassword
