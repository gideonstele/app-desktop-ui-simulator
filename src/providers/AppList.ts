import { useCallback, useState } from 'react'

import { IconInfo, iconList } from 'data'
import { createInjection } from '@utils/injection'

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

  const toggleShaking = useCallback(() => {
    setIsShaking(prev => !prev)
  }, [])

  const onShaking = useCallback(() => {
    setIsShaking(true)
  }, [])

  return {
    isShaking,
    toggleShaking,
    onShaking,
    appList,
    removeMe,
  }
})

export const useAppList = AppListContainer.useInjection

export const AppListProvider = AppListContainer.Provider
