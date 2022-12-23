import { AnyAction } from 'redux'
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import type { PartialDeep } from 'type-fest'
import { RootState } from '../../src/store/reducers'
import { sampleState } from '../__test_data__'

export const mockStore: <ActionType>(
  state?: PartialDeep<RootState>
) => MockStoreEnhanced<
  PartialDeep<RootState>,
  ThunkDispatch<ActionType, void, AnyAction>
> = <ActionType>(state: PartialDeep<RootState> = sampleState) =>
  configureMockStore<
    PartialDeep<RootState>,
    ThunkDispatch<ActionType, void, AnyAction>
  >([thunk])(state)
