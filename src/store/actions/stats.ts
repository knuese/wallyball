import { Dispatch } from 'react'
import { BattingStats, PitchingStats, Team } from '../../model'
import { STATS_FILE } from '../../config'
import { LOAD_STATS, StatActionTypes } from '../types/stats'
import { RootState } from '../reducers'
import { fs } from '../../util'

export const loadStats =
  () =>
  async (dispatch: Dispatch<StatActionTypes>): Promise<void> => {
    const stats = await fs.readFile(STATS_FILE)
    dispatch({ type: LOAD_STATS, payload: JSON.parse(stats) })
  }

export const saveStats =
  (...teams: Team[]) =>
  async (
    _dispatch: Dispatch<StatActionTypes>,
    getState: () => RootState
  ): Promise<void> => {
    const { stats } = getState()

    const data = teams
      .map((t) => t.getRoster())
      .flat()
      .reduce((acc, player) => {
        const combinedBatting = BattingStats.add(
          player.getGameStats().batting,
          player.getSeasonStats().batting
        )

        return {
          ...acc,
          [player.id]: {
            batting: combinedBatting,
            pitching: new PitchingStats()
          }
        }
      }, {})

    await fs.writeFile(
      STATS_FILE,
      JSON.stringify({
        ...stats,
        ...data
      })
    )
  }
