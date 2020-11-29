import React from 'react'
import { Container } from './styles'

import { AiOutlineLoading } from 'react-icons/ai'
import { IconBaseProps } from 'react-icons'

type LoadingProps = IconBaseProps

const Loading: React.FC<LoadingProps> = (props) => (
  <Container>
    <AiOutlineLoading
      className="loading"
      size={24}
      {...props}
    />
  </Container>
)

export default Loading
