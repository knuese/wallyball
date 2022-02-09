import { AnyAction, Reducer } from 'redux'
import { v4 as uuidv4 } from 'uuid'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  SET_TEAM,
  PlayerConfig,
  TeamActionTypes,
  TeamState
} from '../../types/team'

export const initialState: TeamState = {
  name: '',
  primaryColor: '#FFF',
  secondaryColor: '#000',
  players: [],
  lineup: {},
  defense: {}
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
        players: payload.players.map((player: PlayerConfig[]) => ({
          ...player,
          id: uuidv4()
        }))
      }
    case SET_TEAM:
      return {
        ...state,
        lineup: payload.lineup,
        defense: payload.defense
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
