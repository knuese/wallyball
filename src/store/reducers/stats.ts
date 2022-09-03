import { AnyAction, Reducer } from 'redux'
import { LOAD_STANDINGS, LOAD_STATS, StatState } from '../types/stats'

export const initialState: StatState = {
  individual: null,
  standings: null
}

const reducer: Reducer<StatState> = (
  state = initialState,
  { type, payload }: AnyAction
): StatState => {
  switch (type) {
    case LOAD_STATS:
      return {
        ...state,
        individual: payload
      }
    case LOAD_STANDINGS:
      return {
        ...state,
        standings: payload
      }
    default:
      return state
  }
}

export default reducer
