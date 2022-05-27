import { combineReducers } from 'redux'

import game from './game'
import stats from './stats'

const rootReducer = combineReducers({
  game,
  stats
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
