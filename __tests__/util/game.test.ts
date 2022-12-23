import { Player, Team } from '../../src/model'
import {
  calcOffset,
  getNumHits,
  getOrdinal,
  getTotalScore,
  incrementInningsPitched,
  isOver
} from '../../src/util'

describe('game utils', () => {
  describe('calcOffset', () => {
    it('calculates the offset based on star factor and fatigue', () => {
      const batter = {
        attributes: {
          battingStarPower: 2.4
        }
      } as Player
      const pitcher = {
        attributes: {
          pitchingStarPower: 3.1,
          fatigue: (x: number) => x * 0.667
        },
        getGameStats: () => ({
          pitching: { inningsPitched: '3.0' }
        })
      } as Player

      expect(calcOffset(batter, pitcher)).toEqual(0.01301)
    })
  })

  describe('getOrdinal', () => {
    it.each([
      [1, 'st'],
      [2, 'nd'],
      [3, 'rd'],
      [4, 'th'],
      [5, 'th'],
      [6, 'th'],
      [7, 'th'],
      [8, 'th'],
      [9, 'th']
    ])('gets the ordinal for %s', (num, expected) => {
      expect(getOrdinal(num)).toEqual(expected)
    })
  })

  describe('getTotalScore', () => {
    it('calculates the total score', () => {
      const arr = [0, 0, 1, 2, 0, 0, 0, 'X']
      expect(getTotalScore(arr)).toEqual(3)
    })
  })

  describe('getNumHits', () => {
    it('counts the number of hits for a team', () => {
      const p1 = { getGameStats: () => ({ batting: { hits: 1 } }) }
      const p2 = { getGameStats: () => ({ batting: { hits: 2 } }) }
      const team = { getRoster: () => [p1, p2] } as Team
      expect(getNumHits(team)).toEqual(3)
    })
  })

  describe('incrementInningsPitched', () => {
    it.each([
      ['1.1', 2, '2.0'],
      ['2.0', 1, '2.1']
    ])(
      'updates the innings pitched - prev: %s, outs: %s',
      (prev, outs, expected) => {
        expect(incrementInningsPitched(prev, outs)).toEqual(expected)
      }
    )
  })

  describe('isOver', () => {
    // prettier-ignore
    it.each([
      [{ inning: 9, isBottom: false, outs: 3, awayScore: 1, homeScore: 2 }, true],
      [{ inning: 9, isBottom: true, outs: 1, awayScore: 3, homeScore: 4 }, true],
      [{ inning: 11, isBottom: true, outs: 3, awayScore: 5, homeScore: 4 }, true],
      [{ inning: 9, isBottom: true, outs: 2, awayScore: 2, homeScore: 1 }, false],
      [{ inning: 8, isBottom: false, outs: 3, awayScore: 1, homeScore: 2 }, false],
    ])('params(%s) -> isOver === %s', (params, expected) => {
      expect(isOver(params)).toBe(expected)
    })
  })
})
