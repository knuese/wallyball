import { Lineup, Position } from '../../../../src/server/model'
import { players, starterArray } from '../../../../__test_data__'

describe('lineup', () => {
  const battingOrder = starterArray
    .sort((one, two) => one.battingSpot - two.battingSpot)
    .map((s) => s.player)

  describe('initialization', () => {
    it('throws an error if nine starters are not provided', () => {
      expect(() => new Lineup(starterArray.slice(0, 1), [], [])).toThrow(
        'must specify nine starters'
      )
    })

    it('determines the batting order and defense', () => {
      const lineup = new Lineup(starterArray, [], [])

      expect(lineup.battingOrder).toEqual(battingOrder)

      expect(lineup.defense.P).toEqual(players.pitcher)
      expect(lineup.defense.C).toEqual(players.catcher)
      expect(lineup.defense['1B']).toEqual(players.firstBaseman)
      expect(lineup.defense['2B']).toEqual(players.secondBaseman)
      expect(lineup.defense.SS).toEqual(players.shortstop)
      expect(lineup.defense['3B']).toEqual(players.thirdBaseman)
      expect(lineup.defense.LF).toEqual(players.leftFielder)
      expect(lineup.defense.CF).toEqual(players.centerFielder)
      expect(lineup.defense.RF).toEqual(players.rightFielder)
    })

    it('throws an error if a player cannot play a position', () => {
      const starters = starterArray.map((s) => ({ ...s }))
      const i = starters.findIndex((s) => s.position === Position.CATCHER)
      starters[i].position = Position.PITCHER

      expect(() => new Lineup(starters, [], [])).toThrow(
        Error(`${starters[i].player.name} cannot play ${Position.PITCHER}`)
      )
    })

    it('throws an error if a position is not filled', () => {
      const starters = starterArray.map((s) => ({ ...s }))
      const i = starters.findIndex((s) => s.position === Position.CATCHER)
      starters[i] = {
        player: players.pitcher,
        position: Position.PITCHER,
        battingSpot: 2
      }

      expect(() => new Lineup(starters, [], [])).toThrow(
        Error('must specify a player for every position')
      )
    })
  })

  describe('gameplay', () => {
    it('determines the next batter', () => {
      const lineup = new Lineup(starterArray, [], [])

      for (let i = 0; i < starterArray.length * 2; i++) {
        expect(lineup.nextBatter()).toEqual(battingOrder[i % 9])
      }
    })
  })
})
