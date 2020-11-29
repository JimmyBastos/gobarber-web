import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
  height: 3.5rem;
  margin-top: .5rem;
  background-color: #ff9000;
  border-radius: .5rem;
  padding: 0 1rem;
  color: #312e38;
  width: 100%;
  transition: background-color .2s;

  &:hover {
    background-color: ${shade(0.2, '#ff9000')}
  }

  .loading {
    -webkit-animation: loading 0.5s infinite linear;
            animation: loading 0.5s infinite linear;
  }

  @-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
    }
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
    }
  }
`
