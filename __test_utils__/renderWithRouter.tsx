import '@testing-library/jest-dom'

import { render, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { MockStoreEnhanced } from 'redux-mock-store'
import { RootState } from '../src/store/reducers'
import { createMockStore } from './renderWithState'
import { sampleState } from '../__test_data__'

type RenderProps = {
  route: string
  state?: Partial<RootState>
  store?: MockStoreEnhanced
}

export const renderWithRouter = (
  ui: JSX.Element,
  { route, state, store }: RenderProps = { route: '/', state: sampleState }
): RenderResult =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store || createMockStore(state)}>{ui}</Provider>
    </MemoryRouter>
  )

export * from '@testing-library/react'
