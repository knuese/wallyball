import { Team, Position, Player } from '../../../src/model'
import { buildStarters, roster, players } from '../../../__test_data__'

describe('Team', () => {
  const props = {
    name: 'Test Team',
    primaryColor: 'red',
    secondaryColor: 'blue',
    roster: roster,
    starters: buildStarters(roster)
  }

  describe('initialization', () => {
    it('gets the roster', () => {
      const team = new Team(props)
      expect(team.getRoster()).toEqual(Object.values(roster))
    })

    it('throws an error if there are too few starters', () => {
      expect(() => new Team({ ...props, starters: [] })).toThrow(
        'must specify nine starters'
      )
    })

    it('throws an error if someone is playing a position they cannot play', () => {
      // make everyone start at catcher
      const badStarters = Object.values(roster).map((p) => ({
        playerId: p.id,
        position: Position.CATCHER
      }))

      expect(() => new Team({ ...props, starters: badStarters })).toThrow(
        expect.objectContaining({
          message: expect.stringContaining(`cannot play ${Position.CATCHER}`)
        })
      )
    })

    it('throws an error if there is a duplicated position', () => {
      // make all players only eligible to catch
      const badRoster = players.reduce((acc, player) => {
        player.eligiblePositions = [Position.CATCHER]
        return { ...acc, [player.id]: player }
      }, {})

      expect(
        () =>
          new Team({
            ...props,
            roster: badRoster,
            starters: buildStarters(badRoster)
          })
      ).toThrow('must specify a player for every position')
    })

    // TODO
    it.skip('determines the defense', () => {
      // const team = new Team('test', primaryColor, secondaryColor, players)
      // expect(team.defenderAt(Position.PITCHER)).toEqual(players.pitcher)
      // expect(team.defenderAt(Position.CATCHER)).toEqual(players.catcher)
      // expect(team.defenderAt(Position.FIRST_BASE)).toEqual(players.firstBaseman)
      // expect(team.defenderAt(Position.SECOND_BASE)).toEqual(
      //   players.secondBaseman
      // )
      // expect(team.defenderAt(Position.SHORTSTOP)).toEqual(players.shortstop)
      // expect(team.defenderAt(Position.THIRD_BASE)).toEqual(players.thirdBaseman)
      // expect(team.defenderAt(Position.LEFT_FIELD)).toEqual(players.leftFielder)
      // expect(team.defenderAt(Position.CENTER_FIELD)).toEqual(
      //   players.centerFielder
      // )
      // expect(team.defenderAt(Position.RIGHT_FIELD)).toEqual(
      //   players.rightFielder
      // )
    })

    // TODO
    // it('throws an error if a player cannot play a position', () => {
    //   const starters = starterArray.map((s) => ({ ...s }))
    //   const i = starters.findIndex((s) => s.position === Position.CATCHER)
    //   starters[i].position = Position.PITCHER
    //   expect(() => new Team('test', idToPlayer, starters)).toThrow(
    //     Error(`${players.catcher.name} cannot play ${Position.PITCHER}`)
    //   )
    // })
    // TODO
    // it('throws an error if a position is not filled', () => {
    //   // replace the catcher with a duplicate of the pitcher
    //   const starters = starterArray.map((s) => ({ ...s }))
    //   const i = starters.findIndex((s) => s.position === Position.CATCHER)
    //   starters[i] = { playerId: players.pitcher.id, position: Position.PITCHER }
    //   expect(() => new Team('test', idToPlayer, starters)).toThrow(
    //     Error('must specify a player for every position')
    //   )
    // })
  })

  describe('gameplay', () => {
    // TODO
    // it('determines the next batter', () => {
    //   const team = new Team('test', primaryColor, secondaryColor, players)
    //   const battingOrder = starterArray.map((s) => s.playerId)
    //   for (let i = 0; i < starterArray.length * 2; i++) {
    //     expect(team.nextBatter().id).toEqual(battingOrder[i % 9])
    //   }
    // })
  })
})
