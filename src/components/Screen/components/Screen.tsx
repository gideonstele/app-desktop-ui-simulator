import { FC } from 'react'

import { AppIcon } from '@components/AppIcon'
import { useAppList } from 'providers/AppList'

import { Grid } from './styled'

export const Screen: FC = () => {
  const { appList } = useAppList()
  return (
    <Grid>
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
  )
}
