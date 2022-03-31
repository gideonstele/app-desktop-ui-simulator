/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * enhanced unstated-next
 */
import { createContext, useMemo, useContext } from 'react'

import type { PropsWithChildren, ReactNode } from 'react'

export type UseHook<Value, Props extends { [key: string]: any }> =
  | ((props: Props) => Value)
  | (() => Value)

export interface ContainerConsumerProps<Value> {
  children: (value: Value) => ReactNode
}

const EMPTY: unique symbol = Symbol()

type EmptyType = typeof EMPTY

export function createInjection<Value, Props extends { [key: string]: any }>(
  useHook: UseHook<Value, Props>,
  defaultValue: Value | EmptyType = EMPTY
) {
  const Context = createContext<Value | EmptyType>(defaultValue)
  const hookName = useHook.name || 'useHook'
  Context.displayName = `${hookName}Context`

  function Provider({ initialState, children }: PropsWithChildren<Props>) {
    const value = useHook(initialState)
    return useMemo(
      () => <Context.Provider value={value}>{children}</Context.Provider>,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [value]
    )
  }

  function useInjection(): Value {
    const value = useContext(Context)
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>')
    }
    return value
  }

  function Consumer(props: ContainerConsumerProps<Value>) {
    return (
      <Context.Consumer>
        {value => {
          if (value === EMPTY) {
            throw new Error(
              'You should pass a default value when create the provider.'
            )
          }
          return props.children(value)
        }}
      </Context.Consumer>
    )
  }

  return {
    Provider,
    Consumer,
    useInjection,
  }
}
