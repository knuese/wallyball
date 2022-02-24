import { AnyAction, Reducer } from 'redux'
import { Bases } from '../../model'
import {
  GameState,
  GAME_OVER,
  PROGRESS_INNING,
  RECORD_OUT,
  RUN_SCORED
} from '../types/game'

export const initialState: GameState = {
  away: null,
  home: null,
  inning: 1,
  isBottom: false,
  outs: 0,
  bases: new Bases(),
  isOver: false,
  scores: {
    away: [],
    home: []
  }
}

export const addRuns = (
  state: GameState,
  numRuns: number
): { away: number[]; home: number[] } => {
  const index = state.inning - 1
  const key = state.isBottom ? 'home' : 'away'

  return {
    ...state.scores,
    [key]: [
      ...state.scores[key].slice(0, index),
      (state.scores[key][index] || 0) + numRuns
    ]
  }
}

const reducer: Reducer<GameState> = (
  state = initialState,
  { type, payload }: AnyAction
): GameState => {
  switch (type) {
    case RECORD_OUT:
      return {
        ...state,
        outs: state.outs + 1
      }
    case RUN_SCORED:
      return {
        ...state,
        scores: addRuns(state, payload)
      }
    case PROGRESS_INNING:
      return {
        ...state,
        inning: state.isBottom ? state.inning + 1 : state.inning,
        isBottom: !state.isBottom,
        outs: 0,
        bases: new Bases()
      }
    case GAME_OVER:
      return {
        ...state,
        isOver: true
      }
    default:
      return initialState
  }
}

export default reducer
