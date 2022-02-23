import { CombinedState, combineReducers, Reducer } from 'redux'
import { Side } from '../../../model'
import { TeamActionTypes, TeamState } from '../../types/team'

import teamReducer from './team'

type CombinedTeamReducer = Reducer<
  CombinedState<{
    away: TeamState
    home: TeamState
  }>,
  TeamActionTypes
>

const createTeamReducer =
  (side: Side, reducerFn: Reducer<TeamState>) =>
  (state: TeamState, action: TeamActionTypes) => {
    const isInitCall = state === undefined
    return action.side !== side && !isInitCall
      ? state
      : reducerFn(state, action)
  }

const combined = combineReducers({
  [Side.AWAY]: createTeamReducer(Side.AWAY, teamReducer),
  [Side.HOME]: createTeamReducer(Side.HOME, teamReducer)
})

export default combined as CombinedTeamReducer
