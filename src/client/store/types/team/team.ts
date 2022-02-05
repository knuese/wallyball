import { PlayerConfig } from '.'

export enum Side {
  HOME = 'home',
  AWAY = 'away'
}

export type Lineup = Record<string, PlayerConfig>
export type Defense = Record<string, string>

export type TeamState = {
  name: string
  primaryColor: string
  secondaryColor: string
  players: PlayerConfig[]
  lineup: Lineup
  defense: Defense
}

export type TeamFileContents = {
  name: string
  primaryColor: string
  secondaryColor: string
  players: PlayerConfig[]
}

export const CLEAR_TEAM = 'CLEAR_TEAM'
export const LOAD_TEAM = 'LOAD_TEAM'
export const SET_TEAM = 'SET_TEAM'

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

interface SetTeamAction {
  type: typeof SET_TEAM
  side: Side
  payload: {
    lineup: Lineup
    defense: Defense
  }
}

export type TeamActionTypes = ClearTeamAction | LoadTeamAction | SetTeamAction
