import styled, { css } from 'styled-components'
import { animated } from 'react-spring'
interface ToastProps {
  type?: 'success' | 'error' | 'info',
  hasDescription?: boolean
}

const ToastTypeVariations = {
  info: css`
    background: #ececec;
    color: #3172b7;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `
}

export const Container = styled(animated.div)<ToastProps>`
  width: 22rem;
  position: relative;
  border-radius: .5rem;
  padding: 1rem 2rem 1rem 1rem;
  box-shadow: 2px 2px 8px rgba(0,0,0, .2);
  display: flex;
  margin-bottom: .25rem;

  ${props => ToastTypeVariations[props.type || 'info']}

  .toast {
    &__icon {
      margin-right: .75rem;
    }

    &__content {
      flex: 1;
      p {
        margin-top: .25rem;
        font-size: .825rem;
        opacity: .8;
      }
    }

    &__close {
      display: flex;
      align-items: center;
      position: absolute;
      right: 1rem;
      top: 1rem;
      opacity: .6;
      border: 0;
      background: transparent;
      color: inherit;

      ${props => !props.hasDescription && css`
        transform: translateY(-50%);
        top: 50%;
      `}
    }

    ${props => !props.hasDescription && css`
      display: flex;
      align-items: center;
    `}

  }
`
