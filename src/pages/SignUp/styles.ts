import styled, { keyframes } from 'styled-components'
import signInBackgrounImage from '../../assets/sign-up-background.png'
import { shade } from 'polished'
import { animated } from 'react-spring'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Transition = styled(animated.div)`
  width: 100%;
  max-width: 45rem;
  display: flex;
  flex-direction: column;
  place-content: center;

  animation: ${keyframes`
    from {
      opacity: 0;
      transform: translateX(50px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  `} 1s;
`

export const Content = styled.div`
  padding: 1rem;

  img {
    display: block;
    margin: 0 auto;
  }

  width: 100%;
  max-width: 45rem;

  .sign-up-form {
    text-align: center;
    margin: 4rem auto;
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

  .login {
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
