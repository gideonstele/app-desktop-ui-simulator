import { Global, css } from '@emotion/react'
import { FC } from 'react'

export const GlobalStyle: FC = () => {
  return (
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }
        html,
        body {
          font-family: sans-serif;
          margin: 0;
          padding: 0;
          border: 0;
        }
        html {
          color: #000;
          background: #fff;
          overflow-y: scroll;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        html * {
          outline: 0;
          -webkit-text-size-adjust: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      `}
    />
  )
}
