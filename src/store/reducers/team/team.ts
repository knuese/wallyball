import { AnyAction, Reducer } from 'redux'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  SET_STARTERS_FAILURE,
  SET_STARTERS_SUCCESS,
  TeamActionTypes,
  TeamState
} from '../../types/team'

export const initialState: TeamState = {
  team: null,
  isSet: false,
  error: null
}

const reducer: Reducer<TeamState> = (
  state = initialState,
  { type, payload }: TeamActionTypes | AnyAction
): TeamState => {
  switch (type) {
    case LOAD_TEAM:
      return {
        ...state,
        team: payload
      }
    case SET_STARTERS_SUCCESS:
      return {
        ...state,
        isSet: true
      }
    case SET_STARTERS_FAILURE:
      return {
        ...state,
        isSet: false,
        error: payload
      }
    case CLEAR_TEAM:
      return {
        ...initialState
      }
    default:
      return initialState
  }
}

export default reducer
