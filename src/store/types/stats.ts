import { BattingStats, PitchingStats } from '../../model'

export type PlayerStats = {
  batting: BattingStats
  pitching: PitchingStats
}

export type StatState = Record<string, PlayerStats> | null

export const LOAD_STATS = 'LOAD_STATS'
export const SAVE_STATS = 'SAVE_STATS'

interface LoadStatsAction {
  type: typeof LOAD_STATS
  payload: Record<string, PlayerStats>
}

interface SaveStatsAction {
  type: typeof SAVE_STATS
  payload: Record<string, PlayerStats>
}

export type StatActionTypes = LoadStatsAction | SaveStatsAction
