import { combineReducers } from 'redux'

import teams from './team'

const rootReducer = combineReducers({
  teams
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
