import { combineReducers } from 'redux'

import game from './game'
import teams from './team'

const rootReducer = combineReducers({
  game,
  teams
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
