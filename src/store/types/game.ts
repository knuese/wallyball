import { Bases, Team } from '../../model'

export type ScoreArray = Array<number | string>

export type Scores = {
  away: ScoreArray
  home: ScoreArray
}

export type GameState = {
  away: Team | null
  home: Team | null
  inning: number
  isBottom: boolean
  outs: number
  isOver: boolean
  bases: Bases
  scores: Scores
  playsForInning: string[]
}

export const SET_TEAMS = 'SET_TEAMS'
export const ADD_TO_PLAY_HISTORY = 'ADD_TO_PLAY_HISTORY'
export const RECORD_OUT = 'RECORD_OUT'
export const RUN_SCORED = 'RUN_SCORED'
export const PROGRESS_INNING = 'PROGRESS_INNING'
export const GAME_OVER = 'GAME_OVER'

interface SetTeamsAction {
  type: typeof SET_TEAMS
  payload: {
    away: Team
    home: Team
  }
}

interface AddPlayAction {
  type: typeof ADD_TO_PLAY_HISTORY
  payload: string
}

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
  | SetTeamsAction
  | AddPlayAction
  | OutAction
  | RunScoredAction
  | ProgressInningAction
  | GameOverAction
