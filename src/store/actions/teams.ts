import { Dispatch } from 'react'
import { Team } from '../../model'
import { LOAD_TEAMS, TeamActionTypes } from '../types/teams'

export const loadTeams =
  (teams: Team[]) =>
  (dispatch: Dispatch<TeamActionTypes>): void => {
    dispatch({ type: LOAD_TEAMS, payload: teams })
  }
