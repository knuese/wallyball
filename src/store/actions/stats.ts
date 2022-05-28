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
      .map((t) => t.getRoster().map((player) => ({
        id: player.id,
        name: player.name,
        team: t.name,
        games: player.getSeasonStats().games + 1,
        batting: BattingStats.add(
          player.getGameStats().batting,
          player.getSeasonStats().batting),
        pitching: new PitchingStats()
      })))
      .flat()
      .reduce((acc, { id, ...stats }) => {
        return {
          ...acc,
          [id]: stats
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
