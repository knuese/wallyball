import { Player } from '../../src/model'
import { PlayerStats } from '../../src/store/types/stats'
import {
  addInningsPitched,
  aggregateTeamStats,
  calculateAvg,
  calculateERA,
  calculateGamesBehind,
  calculateObp,
  calculateOps,
  calculateSlg,
  calculateWinPct,
  getAverage,
  getERA,
  inningsPitchedToNumber
} from '../../src/util'

describe('stat util', () => {
  describe('calculateWinPct', () => {
    it.each([
      [1, 1, '.500'],
      [0, 1, '.000'],
      [0, 0, '.000']
    ])(
      'calculates win percentage for wins: %s, losses: %s',
      (wins, losses, expected) => {
        expect(calculateWinPct({ wins, losses })).toEqual(expected)
      }
    )
  })

  describe('calculateGamesBehind', () => {
    it.each([
      [{ wins: 2, losses: 0 }, { wins: 1, losses: 1 }, '1'],
      [{ wins: 1, losses: 0 }, { wins: 0, losses: 0 }, '½'],
      [{ wins: 2, losses: 0 }, { wins: 0, losses: 1 }, '1½'],
      [{ wins: 20, losses: 0 }, { wins: 0, losses: 1 }, '10½']
    ])(
      'calculates games behind for lead(%s) calced(%s)',
      (lead, calced, expected) => {
        expect(calculateGamesBehind(lead, calced)).toEqual(expected)
      }
    )
  })

  describe('calculateAvg', () => {
    it.each([
      [4, 1, '.250'],
      [1, 1, '1.000'],
      [0, 0, '.000']
    ])('calculates average for AB: %s, H: %s', (atBats, hits, expected) => {
      expect(calculateAvg({ atBats, hits })).toEqual(expected)
    })
  })

  describe('calculateObp', () => {
    it.each([
      [28, 5, 2, 1, '.286'],
      [0, 0, 0, 0, '.000']
    ])(
      'calculates OBP for PA: %s, H: %s, BB: %s, HBP: %s',
      (plateAppearances, hits, walks, hbps, expected) => {
        expect(calculateObp({ plateAppearances, hits, walks, hbps })).toEqual(
          expected
        )
      }
    )
  })

  describe('calculateSlg', () => {
    it.each([
      [10, 7, 2, 1, 1, '1.400'],
      [0, 0, 0, 0, 0, '.000']
    ])(
      'calculate SLG for AB: %s, 1B: %s, 2B: %s, 3B: %s, HR: %s',
      (atBats, hits, doubles, triples, homeRuns, expected) => {
        expect(
          calculateSlg({ atBats, hits, doubles, triples, homeRuns })
        ).toEqual(expected)
      }
    )
  })

  describe('calculateOps', () => {
    it('calculates OPS', () => {
      expect(calculateOps({ obp: '.234', slg: '.567' })).toEqual('.801')
    })
  })

  describe('inningsPitchedToNumber', () => {
    it.each([
      ['1.0', 1],
      ['1.1', 1 + 1 / 3],
      ['1.2', 1 + 2 / 3]
    ])('converts %s', (ip, expected) => {
      expect(inningsPitchedToNumber(ip)).toEqual(expected)
    })
  })

  describe('addInningsPitched', () => {
    it.each([
      ['0.0', '1.0', '1.0'],
      ['1.1', '1.1', '2.2'],
      ['3.1', '0.2', '4.0'],
      ['5.2', '2.2', '8.1']
    ])('adds %s + %s', (one, two, expected) => {
      expect(addInningsPitched(one, two)).toEqual(expected)
    })
  })

  describe('calculateERA', () => {
    it.each([
      [0, 0, '0.00'],
      [0, 3, '0.00'],
      [1, 0, 'INF'],
      [1, 3 + 2 / 3, '2.45'],
      [13, 32, '3.66']
    ])(
      'calculates ERA for ER: %s, IP: %s',
      (earnedRuns, inningsPitched, expected) => {
        expect(calculateERA({ earnedRuns, inningsPitched })).toEqual(expected)
      }
    )
  })

  describe('getAverage', () => {
    it('calculates batting average for a player', () => {
      const player = {
        getGameStats: () => ({
          batting: { atBats: 2, hits: 1 }
        }),
        getSeasonStats: () => ({
          batting: { atBats: 84, hits: 29 }
        })
      } as Player

      expect(getAverage(player)).toEqual('.349')
    })
  })

  describe('getERA', () => {
    it('calculates the ERA for a player', () => {
      const player = {
        getGameStats: () => ({
          pitching: { inningsPitched: '2.2', earnedRuns: 1 }
        }),
        getSeasonStats: () => ({
          pitching: { inningsPitched: '29.0', earnedRuns: 8 }
        })
      } as Player

      expect(getERA(player)).toEqual('2.56')
    })
  })

  describe('aggregateTeamStats', () => {
    it('calculates the stats for a team', () => {
      const p1 = {
        batting: {
          plateAppearances: 10,
          atBats: 9,
          runs: 2,
          hits: 3,
          doubles: 0,
          triples: 1,
          homeRuns: 1,
          rbis: 3,
          walks: 1,
          strikeouts: 2
        }
      }
      const p2 = {
        batting: {
          plateAppearances: 15,
          atBats: 12,
          runs: 1,
          hits: 2,
          doubles: 1,
          triples: 0,
          homeRuns: 1,
          rbis: 2,
          walks: 3,
          strikeouts: 5
        }
      }

      expect(aggregateTeamStats([p1, p2] as PlayerStats[])).toEqual({
        plateAppearances:
          p1.batting.plateAppearances + p2.batting.plateAppearances,
        atBats: p1.batting.atBats + p2.batting.atBats,
        runs: p1.batting.runs + p2.batting.runs,
        hits: p1.batting.hits + p2.batting.hits,
        doubles: p1.batting.doubles + p2.batting.doubles,
        triples: p1.batting.triples + p2.batting.triples,
        homeRuns: p1.batting.homeRuns + p2.batting.homeRuns,
        rbis: p1.batting.rbis + p2.batting.rbis,
        walks: p1.batting.walks + p2.batting.walks,
        hbps: 0,
        strikeouts: p1.batting.strikeouts + p2.batting.strikeouts,
        avg: '.238',
        obp: '.360',
        slg: '.667',
        ops: '1.027'
      })
    })
  })
})
