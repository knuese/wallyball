import { AnyAction, Reducer } from 'redux'
import { Bases } from '../../model'
import { randomTeams } from './sample'
import {
  ADD_TO_PLAY_HISTORY,
  GameState,
  GAME_OVER,
  PROGRESS_INNING,
  RECORD_OUT,
  RUN_SCORED,
  ScoreArray,
  Scores
} from '../types/game'

export const initialState: GameState = {
  // away: null,
  // home: null,
  ...randomTeams(),
  inning: 1,
  isBottom: false,
  outs: 0,
  bases: new Bases(),
  isOver: false,
  scores: {
    away: [],
    home: []
  },
  playsForInning: []
}

export const updateScoreInningEnd = (
  { isBottom, inning, scores }: GameState,
  isOver?: boolean
): Scores => {
  const awayScores = [...scores.away]
  const homeScores = [...scores.home]

  if (isOver) {
    if (!isBottom) {
      awayScores.push(0)
      homeScores.push('X')
    } else if (homeScores.length !== awayScores.length) {
      homeScores.push(0)
    }
  } else {
    const arr = isBottom ? homeScores : awayScores
    if (!arr[inning - 1]) {
      arr.push(0)
    }
  }

  return {
    away: awayScores,
    home: homeScores
  }
}

export const addRuns = (
  state: GameState,
  numRuns: number
): { away: ScoreArray; home: ScoreArray } => {
  const index = state.inning - 1
  const key = state.isBottom ? 'home' : 'away'

  return {
    ...state.scores,
    [key]: [
      ...state.scores[key].slice(0, index),
      Number(state.scores[key][index] || 0) + numRuns
    ]
  }
}

const reducer: Reducer<GameState> = (
  state = initialState,
  { type, payload }: AnyAction
): GameState => {
  switch (type) {
    case ADD_TO_PLAY_HISTORY:
      return {
        ...state,
        playsForInning: [payload, ...state.playsForInning]
      }
    case RECORD_OUT:
      return {
        ...state,
        outs: state.outs + payload
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
        bases: new Bases(),
        scores: updateScoreInningEnd(state),
        playsForInning: []
      }
    case GAME_OVER:
      return {
        ...state,
        isOver: true,
        scores: updateScoreInningEnd(state, true)
      }
    default:
      return initialState
  }
}

export default reducer
