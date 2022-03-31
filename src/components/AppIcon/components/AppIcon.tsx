import { FC, useCallback, useRef } from 'react'
import { css } from '@emotion/react'
import { useLongPress } from 'ahooks'

import { CloseButton } from '@components/CloseButton'
import { useAppList } from 'providers/AppList'

import {
  StyledAppIconContainer,
  StyledIcon,
  StyledAppTitle,
  shake,
} from './styled'

type AppIconProps = {
  index: number
  name: string
  src: string
  background: string
}

export const AppIcon: FC<AppIconProps> = ({ index, name, src, background }) => {
  const closeButtonRef = useRef<HTMLDivElement>(null)
  const { isShaking, onShaking, removeMe } = useAppList()

  const onTapRemove = useCallback(() => {
    removeMe(index)
  }, [index, removeMe])

  useLongPress(
    () => {
      onShaking()
    },
    closeButtonRef,
    {
      delay: 1000,
    }
  )

  return (
    <StyledAppIconContainer
      ref={closeButtonRef}
      css={css`
        animation-name: ${isShaking ? shake : 'none'};
        animation-duration: 1000ms;
        animation-delay: ${Math.random() * 1000 + index}ms;
        animation-iteration-count: infinite;
      `}
    >
      {isShaking && (
        <CloseButton
          css={css`
            position: absolute;
            z-index: 1;
            right: -6px;
            top: -6px;
            cursor: pointer;
            font-size: 36px;
          `}
          onClick={onTapRemove}
        />
      )}
      <StyledIcon
        style={{
          backgroundColor: background,
        }}
      >
        <img src={src} alt={name} />
      </StyledIcon>
      <StyledAppTitle>{name}</StyledAppTitle>
    </StyledAppIconContainer>
  )
}
