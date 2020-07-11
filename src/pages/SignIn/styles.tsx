import styled from 'styled-components';
import signInBackgrounImage from '../../assets/sign-in-background.png'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  width: 100%;
  max-width: 45rem;

  .login-form {
    text-align: center;
    margin: 5rem auto;
    width: 20rem;

    &__title {
      margin-bottom: 1.5rem;
    }

    &__recover-pass {
      margin-top: 1rem;
      padding: .5rem;
      color: #F4EDE8;
      display: block;
      text-decoration: none;
    }
  }

  .create-account {
      color: #ff9000;
      text-decoration: none;
      padding: .5rem;
      width: 100%;
      transition: color .2s;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: .5rem;
      }

      &:hover {
        color: ${shade(0.2, '#ff9000')}
      }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgrounImage}) no-repeat center;
  background-size: cover;
`