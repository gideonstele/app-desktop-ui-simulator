import { AppListProvider } from 'providers/AppList'

import { Screen } from './components/Screen'
import { GlobalStyle } from './components/GlobalStyle'
import { Container } from './components/Container'

export const App = () => {
  return (
    <AppListProvider>
      <Container>
        <GlobalStyle />
        <Screen />
      </Container>
    </AppListProvider>
  )
}
