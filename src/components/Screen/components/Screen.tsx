import { FC, MouseEventHandler, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { AppIcon } from '@components/AppIcon'
import { useAppList } from 'providers/AppList'

import { Grid } from './styled'

export const Screen: FC = () => {
  const { appList, offShaking } = useAppList()

  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    e => {
      if (e.target === e.currentTarget) {
        offShaking()
      }
    },
    [offShaking]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid onClick={onClick}>
        {appList.map(({ name, src, color }, index) => (
          <AppIcon
            key={name}
            index={index}
            name={name}
            src={src}
            background={color}
          />
        ))}
      </Grid>
    </DndProvider>
  )
}
