import { AnyAction, Reducer } from 'redux'
import { Bases } from '../../model'
import { tempBears, tempTurtles } from './sampleTeam'
import {
  ADD_TO_PLAY_HISTORY,
  GameState,
  GAME_OVER,
  PROGRESS_INNING,
  RECORD_OUT,
  RUN_SCORED,
  Scores
} from '../types/game'

export const initialState: GameState = {
  away: tempBears,
  home: tempTurtles,
  inning: 1,
  isBottom: false,
  outs: 0,
  bases: new Bases(),
  isOver: false,
  scores: {
    away: [0],
    home: []
  },
  playsForInning: []
}

export const updateScoreInningEnd = ({
  isBottom,
  scores
}: GameState): Scores => {
  let updatedScores

  if (isBottom) {
    updatedScores = {
      away: [...scores.away, 0],
      home: scores.home
    }
  } else {
    updatedScores = {
      away: scores.away,
      home: [...scores.home, 0]
    }
  }

  return updatedScores
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
        isOver: true
      }
    default:
      return initialState
  }
}

export default reducer
