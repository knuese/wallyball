import { Team, Position } from '../../../../src/server/model'
import { players, starterArray } from '../../../../__test_data__'

describe('Team', () => {
  const battingOrder = starterArray.map((s) => s.player)

  describe('initialization', () => {
    it('throws an error if nine starters are not provided', () => {
      expect(() => new Team('test', starterArray.slice(0, 1), [], [])).toThrow(
        'must specify nine starters'
      )
    })

    it('determines the batting order and defense', () => {
      const team = new Team('test', starterArray, [], [])

      expect(team.battingOrder).toEqual(battingOrder)

      expect(team.defense.P).toEqual(players.pitcher)
      expect(team.defense.C).toEqual(players.catcher)
      expect(team.defense['1B']).toEqual(players.firstBaseman)
      expect(team.defense['2B']).toEqual(players.secondBaseman)
      expect(team.defense.SS).toEqual(players.shortstop)
      expect(team.defense['3B']).toEqual(players.thirdBaseman)
      expect(team.defense.LF).toEqual(players.leftFielder)
      expect(team.defense.CF).toEqual(players.centerFielder)
      expect(team.defense.RF).toEqual(players.rightFielder)
    })

    it('throws an error if a player cannot play a position', () => {
      const starters = starterArray.map((s) => ({ ...s }))
      const i = starters.findIndex((s) => s.position === Position.CATCHER)
      starters[i].position = Position.PITCHER

      expect(() => new Team('test', starters, [], [])).toThrow(
        Error(`${starters[i].player.name} cannot play ${Position.PITCHER}`)
      )
    })

    it('throws an error if a position is not filled', () => {
      const starters = starterArray.map((s) => ({ ...s }))
      const i = starters.findIndex((s) => s.position === Position.CATCHER)
      starters[i] = { player: players.pitcher, position: Position.PITCHER }

      expect(() => new Team('test', starters, [], [])).toThrow(
        Error('must specify a player for every position')
      )
    })
  })

  describe('gameplay', () => {
    it('determines the next batter', () => {
      const team = new Team('test', starterArray, [], [])

      for (let i = 0; i < starterArray.length * 2; i++) {
        expect(team.nextBatter()).toEqual(battingOrder[i % 9])
      }
    })
  })
})
