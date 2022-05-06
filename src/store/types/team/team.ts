import { Position, Side, Team } from '../../../model'

export type PlayerId = string
export type Lineup = Record<string, PlayerId>
export type Defense = Record<PlayerId, Position>

export type PlayerConfig = {
  id: string
  name: string
  positions: string[]
  batting: { thresholds: number[]; starPower?: number }
  pitching?: { thresholds: number[]; starPower?: number }
}

export type TeamFileContents = {
  name: string
  primaryColor: string
  secondaryColor: string
  players: PlayerConfig[]
}

export type TeamState = {
  team: Team | null | undefined
  isSet: boolean
  error: Error | null
}

export const CLEAR_TEAM = 'CLEAR_TEAM'
export const LOAD_TEAM = 'LOAD_TEAM'
export const SET_STARTERS_SUCCESS = 'SET_STARTERS_SUCCESS'
export const SET_STARTERS_FAILURE = 'SET_STARTERS_FAILURE'

interface ClearTeamAction {
  type: typeof CLEAR_TEAM
  side: Side
  payload?: never
}

interface LoadTeamAction {
  type: typeof LOAD_TEAM
  side: Side
  payload: Team
}

interface SetStartersSuccessAction {
  type: typeof SET_STARTERS_SUCCESS
  side: Side
  payload?: never
}

interface SetStartersFailureAction {
  type: typeof SET_STARTERS_FAILURE
  side: Side
  payload: Error
}

export type TeamActionTypes =
  | ClearTeamAction
  | LoadTeamAction
  | SetStartersSuccessAction
  | SetStartersFailureAction
