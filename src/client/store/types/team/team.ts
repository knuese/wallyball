import { Player } from '.'

export enum Side {
  HOME = 'home',
  AWAY = 'away'
}

export type TeamState = {
  name: string
  players: Player[]
}

export type TeamFileContents = {
  name: string
  players: Player[]
}

export const LOAD_TEAM = 'LOAD_TEAM'

interface LoadTeamAction {
  type: typeof LOAD_TEAM
  side: Side
  payload: {
    name: string
    players: any[]
  }
}

export type TeamActionTypes = LoadTeamAction
