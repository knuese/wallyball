import { Dispatch } from 'react'
import {
  BattingConfig,
  PitchingConfig,
  Player,
  Position,
  Side,
  Team
} from '../../../model'
import { RootState } from '../../reducers'
import {
  CLEAR_TEAM,
  Defense,
  Lineup,
  LOAD_TEAM,
  SET_STARTERS_FAILURE,
  SET_STARTERS_SUCCESS,
  TeamActionTypes,
  TeamFileContents
} from '../../types/team'

export const readTeamFile =
  (file: File, isHome?: boolean) =>
  async (dispatch: Dispatch<TeamActionTypes>): Promise<void> => {
    const {
      name,
      primaryColor,
      secondaryColor,
      players: playersFromFile
    } = JSON.parse(await file.text()) as TeamFileContents

    dispatch({
      type: LOAD_TEAM,
      side: isHome ? Side.HOME : Side.AWAY,
      payload: new Team(
        name,
        primaryColor,
        secondaryColor,
        playersFromFile.reduce((acc, config) => {
          const player = new Player(
            config.name,
            config.positions as Position[],
            new BattingConfig(config.batting),
            config.pitching && new PitchingConfig(config.pitching)
          )

          return { ...acc, [player.id]: player }
        }, {})
      )
    })
  }

// TODO rename
export const setTeam =
  (lineup: Lineup, defense: Defense, isHome?: boolean) =>
  (dispatch: Dispatch<TeamActionTypes>, getState: () => RootState): void => {
    const { teams } = getState()

    try {
      const { team } = teams[isHome ? 'home' : 'away']

      if (!team) {
        throw new Error('team not defined')
      }

      team.setStarters(
        Object.values(lineup).map((playerId) => ({
          playerId,
          position: defense[playerId]
        }))
      )

      dispatch({
        type: SET_STARTERS_SUCCESS,
        side: isHome ? Side.HOME : Side.AWAY
      })
    } catch (e) {
      dispatch({
        type: SET_STARTERS_FAILURE,
        side: isHome ? Side.HOME : Side.AWAY,
        payload: e as Error
      })
    }
  }

export const clearTeam =
  (isHome?: boolean) =>
  (dispatch: Dispatch<TeamActionTypes>): void => {
    dispatch({
      type: CLEAR_TEAM,
      side: isHome ? Side.HOME : Side.AWAY
    })
  }