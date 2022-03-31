import { useCallback, useState } from 'react'

import { IconInfo, iconList } from 'data'
import { createInjection } from '@utils/injection'
import { AppIconProps } from '@components/AppIcon'

const AppListContainer = createInjection(function useAppListContainer() {
  const [appList, setAppList] = useState<IconInfo[]>(iconList)
  const [isShaking, setIsShaking] = useState(false)

  const removeMe = useCallback(
    (index: number) => {
      const newList = [...appList]
      newList.splice(index, 1)
      setAppList(newList)
    },
    [appList]
  )

  const moveSort = useCallback((from: AppIconProps, to: AppIconProps) => {
    const fromIndex = from.index
    const toIndex = to.index

    setAppList(prevAppList => {
      const newAppList = [...prevAppList]
      ;[newAppList[fromIndex], newAppList[toIndex]] = [
        newAppList[toIndex],
        newAppList[fromIndex],
      ]
      return newAppList
    })
  }, [])

  const toggleShaking = useCallback(() => {
    setIsShaking(prev => !prev)
  }, [])

  const onShaking = useCallback(() => {
    setIsShaking(true)
  }, [])

  const offShaking = useCallback(() => {
    setIsShaking(false)
  }, [])

  return {
    isShaking,
    toggleShaking,
    onShaking,
    offShaking,
    moveSort,
    appList,
    removeMe,
  }
})

export const useAppList = AppListContainer.useInjection

export const AppListProvider = AppListContainer.Provider
