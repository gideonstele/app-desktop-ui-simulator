import { FC } from 'react'

import { StyledContainer, StyledBackground } from './styled'

export const Container: FC = ({ children }) => {
  return (
    <StyledContainer>
      <StyledBackground />
      {children}
    </StyledContainer>
  )
}
