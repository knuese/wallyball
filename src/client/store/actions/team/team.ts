import { Dispatch } from 'react'
import {
  LOAD_TEAM,
  Side,
  TeamActionTypes,
  TeamFileContents
} from '../../types/team'

export const readTeamFile =
  (file: File, isHome?: boolean) =>
  async (dispatch: Dispatch<TeamActionTypes>): Promise<void> => {
    const { name, players } = JSON.parse(await file.text()) as TeamFileContents
    dispatch({
      type: LOAD_TEAM,
      side: isHome ? Side.HOME : Side.AWAY,
      payload: {
        name,
        players
      }
    })
  }
