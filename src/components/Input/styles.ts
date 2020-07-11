import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  hasError: boolean
}


interface ErrorProps {
  isFocused?: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: .5rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #666360;

  ${props => props.isFilled && css`
    color: #ff9000;
  `}

  ${props => props.hasError && css`
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    border-color: #ff9000;
    color: #ff9000;
  `}

  & + div {
    margin-top: .5rem;
  }

  input {
    color:  #f4ede8;
    background: transparent;
    padding: 1rem 0;
    flex: 1;
    height: 100%;

    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 1rem;
  }

`

export const Error = styled(Tooltip)`
  margin-left: 1rem;

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`
