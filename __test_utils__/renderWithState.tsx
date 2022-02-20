import '@testing-library/jest-dom'

import { render, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import { CombinedState } from 'redux'
import thunk from 'redux-thunk'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { sampleState } from '../__test_data__'

export const createStoreWithMockDispatch = (
  initialState: any = sampleState
): MockStoreEnhanced => {
  const store = createMockStore(initialState)
  store.dispatch = jest.fn()
  return store
}

export const createMockStore = (
  initialState: any = sampleState
): MockStoreEnhanced => {
  const mockStore = configureStore<CombinedState<any>>([thunk])
  return mockStore(initialState)
}

export const renderWithState = (
  ui: JSX.Element,
  state: CombinedState<any> = sampleState,
  store: MockStoreEnhanced = createMockStore(state)
): RenderResult => render(<Provider store={store}>{ui}</Provider>)

export * from '@testing-library/react'
