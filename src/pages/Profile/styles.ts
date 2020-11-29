import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'
import { animated } from 'react-spring'

export const Header = styled.div`
  height: 9rem;
  padding: 2rem 0;
  background-color: #28262e;

  display: flex;
  align-items: center;

  .goback {
    svg {
      color: #999591;
      height: 1.5rem;
      width: 1.5rem;
    }
  }
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

export const Container = styled.div`
  min-height: 100vh;
`

export const Content = styled.div`
  margin-top: -6rem;
  width: 100%;

  .sign-up-form {
    text-align: center;
    margin: 4rem auto;
    width: 20rem;

    &__title {
      font-size: 1.25rem;
      text-align: left;
      margin-bottom: 1.5rem;
    }
  }
`

export const AvatarInput = styled.div`
  margin: auto;
  position: relative;
  margin-bottom: 2rem;
  width: 12rem;

  .avatar-input {
    &__image {
      width: 12rem;
      height: 12rem;
      border-radius: 50%;
    }

    &__upload {
      cursor: pointer;
      position: absolute;
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      background-color: #ff9000;
      right: .5rem;
      bottom: .5rem;
      border: 0;
      transition: background-color 0.2s;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${shade(0.2, '#ff9000')}
      }

      input {
        display: none;
      }

      svg {
        color: #312e38;
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
`
