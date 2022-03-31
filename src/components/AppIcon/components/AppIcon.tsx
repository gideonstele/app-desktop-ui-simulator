import { FC, useCallback, useRef } from 'react'
import { css } from '@emotion/react'
import { useLongPress } from 'ahooks'
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd'

import { CloseButton } from '@components/CloseButton'
import { useAppList } from 'providers/AppList'

import {
  StyledAppIconContainer,
  StyledIcon,
  StyledAppTitle,
  shake,
} from './styled'

export type AppIconProps = {
  index: number
  name: string
  src: string
  background: string
}

export const AppIcon: FC<AppIconProps> = ({ index, name, src, background }) => {
  const closeButtonRef = useRef<HTMLDivElement>(null)
  const { isShaking, onShaking, removeMe, appList, moveSort } = useAppList()

  const [, drag] = useDrag<AppIconProps>(() => ({
    type: 'BOX',
    item: { name, src, background, index },
    collect: monitor => {
      return {
        isDragging: monitor.getItem()?.name === name,
      }
    },
  }))

  const [, drop] = useDrop<AppIconProps>({
    accept: 'BOX',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: AppIconProps, monitor: DropTargetMonitor) {
      if (!closeButtonRef.current) {
        return
      }
      const dragIndex = item.index
      const currentIndex = index

      // Don't replace items with themselves
      if (dragIndex === currentIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = closeButtonRef.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the left
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging backwards, only move when the cursor is below 50%
      // When dragging forwards, only move when the cursor is above 50%

      // Dragging backwards
      if (dragIndex < currentIndex && hoverClientX < hoverMiddleX) {
        return
      }

      // Dragging forwards
      if (dragIndex > currentIndex && hoverClientX > hoverMiddleX) {
        return
      }

      // Time to actually perform the action
      // moveCard(dragIndex, currentIndex)

      moveSort(item, {
        src: appList[currentIndex].src,
        background: appList[currentIndex].color,
        name: appList[currentIndex].name,
        index: currentIndex,
      })

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = currentIndex
    },
  })

  const onTapRemove = useCallback(() => {
    removeMe(index)
  }, [index, removeMe])

  drag(drop(closeButtonRef))

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
