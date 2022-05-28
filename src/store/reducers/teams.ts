import { AnyAction, Reducer } from 'redux'
import { LOAD_TEAMS, TeamsState } from '../types/teams'

export const initialState: TeamsState = []

const reducer: Reducer<TeamsState> = (
  state = initialState,
  { type, payload }: AnyAction
): TeamsState => {
  switch (type) {
    case LOAD_TEAMS:
      return payload
    default:
      return state
  }
}

export default reducer
