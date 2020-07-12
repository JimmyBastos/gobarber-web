import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiLock, FiMail, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Container, Content, Background, Transition } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import * as Yup from 'yup'

import logoImage from '../../assets/logo.svg'

import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { api } from '../../services/api'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSignUp = useCallback(async (formData: SignUpFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .min(6, 'No mínimo 6 digitos')
      })

      await schema.validate(formData, { abortEarly: false })

      await api.post('users', formData)

      addToast({
        type: 'success',
        title: 'Casdastro Realizado!',
        description: 'Você já pode fazer login'
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
          title: 'Erro finalizar cadastro!',
          description: 'Ocorreu um erro ao fazer seu cadastro, tente novamente.'
        })
      }
    }
  }, [])

  return (
    <Container>
      <Background/>

      <Transition>
        <Content>
          <img src={logoImage} alt="GoBarber"/>

          <Form ref={formRef} className="sign-up-form" onSubmit={handleSignUp}>
            <h1 className="sign-up-form__title">Faça Seu Cadastro</h1>

            <Input
              name="name"
              type="text"
              icon={FiUser}
              placeholder="Nome"
            />

            <Input
              name="email"
              type="text"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button type="submit">
            Cadastrar
            </Button>
          </Form>

          <Link className="login" to="/">
            <FiArrowLeft/>
          Já possui cadastro?
            <strong style={{ marginLeft: '4px' }}>
            Fazer Login
            </strong>
          </Link>
        </Content>
      </Transition>

    </Container>
  )
}

export default SignUp
