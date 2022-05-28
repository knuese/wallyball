import { AnyAction, Reducer } from 'redux'
import { LOAD_STATS, StatState } from '../types/stats'

export const initialState: StatState = null

const reducer: Reducer<StatState> = (
  state = initialState,
  { type, payload }: AnyAction
): StatState => {
  switch (type) {
    case LOAD_STATS:
      return payload
    default:
      return state
  }
}

export default reducer
