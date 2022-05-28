import { combineReducers } from 'redux'

import game from './game'
import stats from './stats'
import teams from './teams'

const rootReducer = combineReducers({
  game,
  stats,
  teams
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
