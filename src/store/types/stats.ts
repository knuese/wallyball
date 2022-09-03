import { BattingStats, PitchingStats } from '../../model'

export type PlayerStats = {
  name: string
  team: string
  games: number
  batting: BattingStats
  pitching: PitchingStats
}

export type StandingsEntry = {
  wins: number
  losses: number
}

export type StatState = {
  individual: Record<string, PlayerStats> | null
  standings: Record<string, StandingsEntry> | null
}

export const LOAD_STATS = 'LOAD_STATS'
export const SAVE_STATS = 'SAVE_STATS'
export const LOAD_STANDINGS = 'LOAD_STANDINGS'
export const SAVE_STANDINGS = 'SAVE_STANDINGS'

interface LoadStatsAction {
  type: typeof LOAD_STATS
  payload: Record<string, PlayerStats>
}

interface SaveStatsAction {
  type: typeof SAVE_STATS
  payload: Record<string, PlayerStats>
}

interface LoadStandingsAction {
  type: typeof LOAD_STANDINGS
  payload: Record<string, StandingsEntry>
}

interface SaveStandingsAction {
  type: typeof SAVE_STANDINGS
  payload: Record<string, StandingsEntry>
}

export type StatActionTypes = LoadStatsAction | SaveStatsAction | LoadStandingsAction | SaveStandingsAction
