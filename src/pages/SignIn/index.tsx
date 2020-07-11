import React, { useRef, useCallback } from 'react'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiLock, FiMail } from "react-icons/fi";
import { Container, Content, Background } from './styles'

import * as Yup from 'yup'

import logoImage from '../../assets/logo.svg';

import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleLogin = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
      })

      await schema.validate(data, { abortEarly: false})

    } catch(error) {
      formRef.current?.setErrors(
        getValidationErrors(error)
      )
    }
  }, [])


  return (
    <Container>
      <Content>
        <img src={logoImage} alt="GoBarber"/>

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

        <a className="create-account" href="#cadastro">
          <FiLogIn/>
            Criar Uma Conta
        </a>
      </Content>
      <Background>

      </Background>
    </Container>
  )
}

export default SignIn
