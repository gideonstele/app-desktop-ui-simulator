import styled from '@emotion/styled'

import backgroundImage from '@assets/desktop_bg.jpg'

export const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  --icon-size: 120px;
  --app-icon-size: 180px;
  --grid-item-width: 180px;
  --grid-item-height: 180px;
  --icon-border-radius: 36px;
  --color-text-primary: #ffffff;
  --font-size-large: 20px;
  --grid-item-count: 5;
  --grid-gap: 16px;
  @media screen and (min-width: 1000px) {
    --grid-item-count: 6;
    --grid-gap: 20px;
  }
`

export const StyledBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
  filter: blur(5px);
`
