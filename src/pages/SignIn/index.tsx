import React, { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi'
import { Container, Transition, Content, Background } from './styles'

import * as Yup from 'yup'

import logoImage from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

interface SignInFormData {
  email: string,
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleLogin = useCallback(async (formData: SignInFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
      })

      await schema.validate(formData, { abortEarly: false })

      await signIn(formData)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(
          getValidationErrors(error)
        )
      } else {
        console.error(error)
        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description: 'Não foi possível fazer login. Verifique seu e-mail e senha.'
        })
      }
    }
  }, [signIn, addToast])

  return (
    <Container>
      <Transition>
        <Content>
          <img src={logoImage} alt="GoBarber" />

          <Form ref={formRef} className="login-form" onSubmit={handleLogin}>
            <h1 className="login-form__title">Faça seu Login</h1>

            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button
              type="submit"
            >
            Entrar
            </Button>

            <a
              className="login-form__recover-pass"
              href="#forgot"
            >
            Esqueci minha senha
            </a>
          </Form>

          <Link className="create-account" to="/signup">
            <FiLogIn />
            Criar Uma Conta
          </Link>
        </Content>
      </Transition>
      <Background/>
    </Container>
  )
}

export default SignIn
