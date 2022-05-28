import { Team } from '../../model'

export type TeamsState = Team[]

export const LOAD_TEAMS = 'LOAD_TEAMS'

interface LoadTeamsAction {
  type: typeof LOAD_TEAMS
  payload: Team[]
}

export type TeamActionTypes = LoadTeamsAction
