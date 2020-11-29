import React, { ChangeEvent, useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { Container, Content, AvatarInput, Header, HeaderContent } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/auth'
import Image from '../../components/Image'

interface ProfileFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { addToast } = useToast()
  const { user, updateUser } = useAuth()

  const handleProfile = useCallback(async (formData: ProfileFormData) => {
    try {
      formRef.current?.setErrors({})

      const requirePassword = {
        is: (val: string) => !!val,
        then: Yup.string().required('Campo Obrigatório'),
        otherwise: Yup.string()
      }

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string()
          .when('old_password', requirePassword),
        password_confirmation: Yup.string()
          .when('old_password', requirePassword)
          .oneOf([Yup.ref('password'), undefined], 'As senhas não coicidem')
      })

      await schema.validate(formData, { abortEarly: false })

      const { name, email, old_password } = formData

      const profileData = old_password ? formData : { name, email }

      const { data: user } = await api.put('profile', profileData)

      updateUser(user)

      addToast({
        type: 'success',
        title: 'Perfil atualizado!'
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
          title: 'Erro atualizar perfil!',
          description: 'Recarregue a página e tente novamente.'
        })
      }
    }
  }, [addToast, history])

  const handleAvatarChange = useCallback(async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      if (evt.target.files) {
        const avatar_file = evt.target.files[0]

        const data = new FormData()
        data.append('avatar', avatar_file)

        const { data: user } = await api.patch('/users/avatar', data)

        updateUser(user)

        addToast({
          type: 'success',
          title: 'Avatar atualizado'
        })
      }
    } catch (error) {

    }
  }, [])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link className="goback" to="/dashboard">
            <FiArrowLeft/>
          </Link>
        </HeaderContent>
      </Header>

      <Content>
        <AvatarInput>
          <Image
            className="avatar-input__image"
            src={user.avatar_url}
            alt={user.name}
          />

          <label className="avatar-input__upload" htmlFor="avatar">
            <FiCamera/>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleAvatarChange}
            />
          </label>

        </AvatarInput>

        <Form
          ref={formRef}
          className="sign-up-form"
          onSubmit={handleProfile}
          initialData={{ name: user.name, email: user.email }}
        >
          <h1 className="sign-up-form__title">
            Meu Perfil
          </h1>

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
            containerStyle={{ marginTop: '2rem' }}
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Nova Senha"
          />

          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder="Confirmar Nova Senha"
          />

          <Button type="submit">
            Confirmar Mudanças
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
