import { Dispatch } from 'react'
import { BattingStats, PitchingStats, Team } from '../../model'
import { STANDINGS_FILE, STATS_FILE } from '../../config'
import { LOAD_STANDINGS, LOAD_STATS, StatActionTypes } from '../types/stats'
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
      .flatMap((t) =>
        t.getRoster().map((player) => ({
          id: player.id,
          name: player.name,
          team: t.name,
          games: player.getSeasonStats().games + 1,
          batting: BattingStats.add(
            player.getGameStats().batting,
            player.getSeasonStats().batting
          ),
          pitching: new PitchingStats()
        }))
      )
      .reduce((acc, { id, ...stats }) => {
        return {
          ...acc,
          [id]: stats
        }
      }, {})

    const newStats = {
      ...stats.individual,
      ...data
    }

    // save to JSON file
    await fs.writeFile(STATS_FILE, JSON.stringify(newStats, null, 2))
  }

export const loadStandings =
  () =>
  async (dispatch: Dispatch<StatActionTypes>): Promise<void> => {
    const standings = await fs.readFile(STANDINGS_FILE)
    dispatch({ type: LOAD_STANDINGS, payload: JSON.parse(standings) })
  }

export const updateStandings =
  (winner: Team, loser: Team) =>
  async (
    _dispatch: Dispatch<StatActionTypes>,
    getState: () => RootState
  ): Promise<void> => {
    const {
      stats: { standings }
    } = getState()

    const newStandings = {
      ...standings,
      [winner.name]: {
        wins: standings[winner.name].wins + 1,
        losses: standings[winner.name].losses
      },
      [loser.name]: {
        wins: standings[loser.name].wins,
        losses: standings[loser.name].losses + 1
      }
    }

    // save to JSON file
    await fs.writeFile(STANDINGS_FILE, JSON.stringify(newStandings, null, 2))
  }
