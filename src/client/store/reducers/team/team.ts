import { AnyAction, Reducer } from 'redux'
import { LOAD_TEAM, TeamActionTypes, TeamState } from '../../types/team'

export const initialState: TeamState = {
  name: '',
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
        players: payload.players
      }
    default:
      return initialState
  }
}

export default reducer
