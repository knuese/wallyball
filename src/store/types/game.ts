import { Bases, Team } from '../../model'

export type GameState = {
  away: Team | null
  home: Team | null
  inning: number
  isBottom: boolean
  outs: number
  isOver: boolean
  bases: Bases
  scores: {
    away: number[]
    home: number[]
  }
}

export const RECORD_OUT = 'RECORD_OUT'
export const RUN_SCORED = 'RUN_SCORED'
export const PROGRESS_INNING = 'PROGRESS_INNING'
export const GAME_OVER = 'GAME_OVER'

interface OutAction {
  type: typeof RECORD_OUT
  payload: number
}

interface RunScoredAction {
  type: typeof RUN_SCORED
  payload: number
}

interface ProgressInningAction {
  type: typeof PROGRESS_INNING
  payload?: never
}

interface GameOverAction {
  type: typeof GAME_OVER
  payload?: never
}

export type GameActionTypes =
  | OutAction
  | RunScoredAction
  | ProgressInningAction
  | GameOverAction
