import React, { useCallback, useRef } from 'react'
import { FiLock, FiMail, FiUser, FiArrowLeft } from "react-icons/fi";
import { Container, Content, Background } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import * as Yup from 'yup'

import logoImage from '../../assets/logo.svg';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button'
import Input from '../../components/Input'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSignUp = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string()
                .required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .min(6, 'No mínimo 6 digitos'),
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
      <Background/>

      <Content>
        <img src={logoImage} alt="GoBarber"/>

        <Form ref={formRef} className="login-form" onSubmit={handleSignUp}>
          <h1 className="login-form__title">Faça Seu Cadastro</h1>

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

        <a className="login" href="#voltar">
          <FiArrowLeft/>
          Já possui cadastro?
          <strong style={{ marginLeft: '4px' }}>
            Fazer Login
          </strong>
        </a>
      </Content>
    </Container>
  )
}

export default SignUp
