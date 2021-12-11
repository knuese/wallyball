import { Reducer } from 'redux'
import { TeamState } from '../../types'

export const initialState: TeamState = {
  players: []
}

const reducer: Reducer<TeamState> = (state = initialState): TeamState => {
  return state
}

export default reducer
