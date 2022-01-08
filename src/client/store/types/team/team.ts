import { Player } from '.'

export enum Side {
  HOME = 'home',
  AWAY = 'away'
}

export type TeamState = {
  name: string
  primaryColor: string
  secondaryColor: string
  players: Player[]
}

export type TeamFileContents = {
  name: string
  primaryColor: string
  secondaryColor: string
  players: Player[]
}

export const CLEAR_TEAM = 'CLEAR_TEAM'
export const LOAD_TEAM = 'LOAD_TEAM'

interface ClearTeamAction {
  type: typeof CLEAR_TEAM
  side: Side
  payload: never
}

interface LoadTeamAction {
  type: typeof LOAD_TEAM
  side: Side
  payload: TeamFileContents
}

export type TeamActionTypes = ClearTeamAction | LoadTeamAction
