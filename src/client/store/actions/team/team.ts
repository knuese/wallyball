import { Dispatch } from 'react'
import {
  CLEAR_TEAM,
  LOAD_TEAM,
  Side,
  TeamActionTypes,
  TeamFileContents
} from '../../types/team'

export const readTeamFile =
  (file: File, isHome?: boolean) =>
  async (dispatch: Dispatch<TeamActionTypes>): Promise<void> => {
    const { name, primaryColor, secondaryColor, players } = JSON.parse(
      await file.text()
    ) as TeamFileContents
    dispatch({
      type: LOAD_TEAM,
      side: isHome ? Side.HOME : Side.AWAY,
      payload: {
        name,
        primaryColor,
        secondaryColor,
        players
      }
    })
  }

export const clearTeam =
  (isHome?: boolean) =>
  (dispatch: Dispatch<TeamActionTypes>): void => {
    dispatch({
      type: CLEAR_TEAM,
      side: isHome ? Side.HOME : Side.AWAY,
      payload: {} as never
    })
  }
