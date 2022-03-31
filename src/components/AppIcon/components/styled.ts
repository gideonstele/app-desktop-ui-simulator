import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: var(--icon-border-radius);
  overflow: hidden;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
  }
`

export const StyledAppTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  font-size: var(--font-size-large);
  line-height: 1.8;
  color: var(--color-text-primary);
  text-align: center;
`

export const StyledAppIconContainer = styled.div`
  display: flex;
  position: relative;
  width: var(--app-icon-size);
  height: var(--app-icon-size);
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease-in-out;
`

export const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0) rotate3d(0, 0, 1, 3deg);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0) rotate3d(0, 0, 1, -3deg);
  }
`
