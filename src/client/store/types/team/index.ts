export enum Side {
  HOME = 'home',
  AWAY = 'away'
}

export type TeamState = {
  name: string
  players: Record<string, any>[]
}

export type TeamFileContents = {
  name: string
  players: any[]
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
