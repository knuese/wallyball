import { AnyAction, Reducer } from 'redux'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  TeamActionTypes,
  TeamState
} from '../../types/team'

export const initialState: TeamState = {
  name: '',
  primaryColor: '#FFF',
  secondaryColor: '#000',
  players: []
}

const reducer: Reducer<TeamState> = (
  state = initialState,
  { type, payload }: TeamActionTypes | AnyAction
): TeamState => {
  switch (type) {
    case LOAD_TEAM:
      return {
        ...state,
        name: payload.name,
        primaryColor: payload.primaryColor,
        secondaryColor: payload.secondaryColor,
        players: payload.players
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
