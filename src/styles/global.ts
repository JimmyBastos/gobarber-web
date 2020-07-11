import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 16px;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto Slab', serif;
    color: #FFFFFF;
    font-size: 100%;
    background: #312E38;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }


  input {
    color: inherit;
    border: 0;
  }

  button,input {
    font-size: .875rem;
  }

  button {
    cursor: pointer;
    font-weight: 500;
    border: 0;
  }
`

export default GlobalStyles
