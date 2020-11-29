import styled from 'styled-components'

export const Container = styled.span`
  margin: 0 auto;
  padding: .5rem;

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
