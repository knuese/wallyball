import { Team, Position } from '../../../../src/server/model'
import { idToPlayer, players, starterArray } from '../../../../__test_data__'

describe('Team', () => {
  describe('initialization', () => {
    it('throws an error if nine starters are not provided', () => {
      expect(
        () => new Team('test', idToPlayer, starterArray.slice(0, 1))
      ).toThrow('must specify nine starters')
    })

    it('determines the defense', () => {
      const team = new Team('test', idToPlayer, starterArray)

      expect(team.defenderAt(Position.PITCHER)).toEqual(players.pitcher)
      expect(team.defenderAt(Position.CATCHER)).toEqual(players.catcher)
      expect(team.defenderAt(Position.FIRST_BASE)).toEqual(players.firstBaseman)
      expect(team.defenderAt(Position.SECOND_BASE)).toEqual(
        players.secondBaseman
      )
      expect(team.defenderAt(Position.SHORTSTOP)).toEqual(players.shortstop)
      expect(team.defenderAt(Position.THIRD_BASE)).toEqual(players.thirdBaseman)
      expect(team.defenderAt(Position.LEFT_FIELD)).toEqual(players.leftFielder)
      expect(team.defenderAt(Position.CENTER_FIELD)).toEqual(
        players.centerFielder
      )
      expect(team.defenderAt(Position.RIGHT_FIELD)).toEqual(
        players.rightFielder
      )
    })

    it('throws an error if a player cannot play a position', () => {
      const starters = starterArray.map((s) => ({ ...s }))
      const i = starters.findIndex((s) => s.position === Position.CATCHER)
      starters[i].position = Position.PITCHER

      expect(() => new Team('test', idToPlayer, starters)).toThrow(
        Error(`${players.catcher.name} cannot play ${Position.PITCHER}`)
      )
    })

    it('throws an error if a position is not filled', () => {
      // replace the catcher with a duplicate of the pitcher
      const starters = starterArray.map((s) => ({ ...s }))
      const i = starters.findIndex((s) => s.position === Position.CATCHER)
      starters[i] = { playerId: players.pitcher.id, position: Position.PITCHER }

      expect(() => new Team('test', idToPlayer, starters)).toThrow(
        Error('must specify a player for every position')
      )
    })
  })

  describe('gameplay', () => {
    it('determines the next batter', () => {
      const team = new Team('test', idToPlayer, starterArray)
      const battingOrder = starterArray.map((s) => s.playerId)

      for (let i = 0; i < starterArray.length * 2; i++) {
        expect(team.nextBatter().id).toEqual(battingOrder[i % 9])
      }
    })
  })
})
