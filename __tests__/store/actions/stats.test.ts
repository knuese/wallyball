import { mockStore } from '__test_utils__'
import { fs } from '../../../src/util'
import { STANDINGS_FILE, STATS_FILE } from '../../../src/config'
import {
  loadStandings,
  loadStats,
  saveStats,
  updateStandings
} from '../../../src/store/actions/stats'
import { StatActionTypes } from '../../../src/store/types/stats'
import { PitchingStats, Team } from '../../../src/model'

jest.mock('../../../src/util/fs')

describe('stat actions', () => {
  const mockFs = fs as {
    readFile: jest.Mock
    writeFile: jest.Mock
  }

  beforeEach(() => {
    mockFs.readFile.mockReset()
    mockFs.writeFile.mockReset()
  })

  describe('loadStats', () => {
    it('loads stats', async () => {
      const stats = JSON.stringify({ foo: { games: 1 }, bar: { games: 2 } })
      mockFs.readFile.mockImplementationOnce((path) => {
        if (path === STATS_FILE) return stats
        else throw new Error('wrong path!')
      })

      const store = mockStore<StatActionTypes>()
      await store.dispatch(loadStats())

      expect(store.getActions()).toEqual([
        { type: 'LOAD_STATS', payload: JSON.parse(stats) }
      ])
    })
  })

  describe('saveStats', () => {
    it('saves stats', async () => {
      const oldStats = {
        foo: {
          name: 'Foo',
          team: 'Bars',
          games: 1,
          batting: { hits: 1 },
          pitching: { inningsPitched: '0.0' }
        }
      }
      const store = mockStore<StatActionTypes>({
        stats: { individual: oldStats }
      })

      const team1 = {
        name: 'Bars',
        getRoster: () => [
          {
            id: 'foo',
            name: 'Foo',
            getSeasonStats: () => ({
              games: 1,
              batting: { hits: 1 }
            }),
            getGameStats: () => ({
              batting: { hits: 2 }
            })
          }
        ]
      } as any as Team

      const team2 = {
        name: 'Buzz',
        getRoster: () => [
          {
            id: 'baz',
            name: 'Baz',
            getSeasonStats: () => ({
              games: 0,
              batting: { hits: 0, runs: 0 }
            }),
            getGameStats: () => ({
              batting: { hits: 4, runs: 1 }
            })
          }
        ]
      } as any as Team

      await store.dispatch(saveStats(team1, team2) as any)

      const [actualPath, actualData] = mockFs.writeFile.mock.calls[0]
      expect(actualPath).toEqual(STATS_FILE)
      expect(JSON.parse(actualData)).toEqual({
        foo: {
          name: 'Foo',
          team: 'Bars',
          games: 2,
          batting: expect.objectContaining({ hits: 3 }),
          pitching: { ...new PitchingStats() }
        },
        baz: {
          name: 'Baz',
          team: 'Buzz',
          games: 1,
          batting: expect.objectContaining({ hits: 4, runs: 1 }),
          pitching: { ...new PitchingStats() }
        }
      })
    })
  })

  describe('loadStandings', () => {
    it('loads the standings', async () => {
      const standings = JSON.stringify({
        turtles: { wins: 1, losses: 0 },
        bears: { wins: 0, losses: 1 }
      })
      mockFs.readFile.mockImplementationOnce((path) => {
        if (path === STANDINGS_FILE) return standings
        else throw new Error('wrong path!')
      })

      const store = mockStore<StatActionTypes>()
      await store.dispatch(loadStandings())

      expect(store.getActions()).toEqual([
        { type: 'LOAD_STANDINGS', payload: JSON.parse(standings) }
      ])
    })
  })

  describe('updateStandings', () => {
    it('updates the standings', async () => {
      const oldStandings = {
        turtles: { wins: 1, losses: 0 },
        bears: { wins: 0, losses: 1 }
      }
      const store = mockStore<StatActionTypes>({
        stats: { standings: oldStandings }
      })

      const winner = { name: 'bears' } as Team
      const loser = { name: 'turtles' } as Team

      await store.dispatch(updateStandings(winner, loser) as any)

      expect(fs.writeFile).toHaveBeenCalledWith(
        STANDINGS_FILE,
        JSON.stringify(
          {
            turtles: { wins: 1, losses: 1 },
            bears: { wins: 1, losses: 1 }
          },
          null,
          2
        )
      )
    })
  })
})
