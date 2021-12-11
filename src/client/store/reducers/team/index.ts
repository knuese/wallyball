import { combineReducers, Reducer } from 'redux'
import { TeamState } from '../../types'

import teamReducer from './team'

const createTeamReducer =
  (name: string, reducerFn: Reducer<TeamState>) =>
  (state: TeamState, action: any) => {
    const isInitCall = state === undefined
    return action.name === name && !isInitCall
      ? state
      : reducerFn(state, action)
  }

export default combineReducers({
  away: createTeamReducer('away', teamReducer),
  home: createTeamReducer('home', teamReducer)
})
