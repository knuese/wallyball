import { Team, Position, Player } from '../../../src/model'
import {
  buildStarters,
  catcher,
  roster,
  players,
  pitcher,
  shortstop
} from '../../../__test_data__'

describe('Team', () => {
  let team: Team
  const props = {
    name: 'Test Team',
    primaryColor: 'red',
    secondaryColor: 'blue',
    roster
  }

  beforeEach(() => {
    team = new Team(props)
  })

  describe('initialization', () => {
    it('gets the roster', () => {
      expect(team.getRoster()).toEqual(Object.values(roster))
    })

    describe('starters', () => {
      it('throws an error if there are too few starters', () => {
        expect(() => team.setStarters([])).toThrow('must specify nine starters')
      })

      it('throws an error if someone is playing a position they cannot play', () => {
        // make everyone start at catcher
        const badStarters = Object.values(roster).map((p) => ({
          playerId: p.id,
          position: Position.CATCHER
        }))

        expect(() => team.setStarters(badStarters)).toThrow(
          expect.objectContaining({
            message: expect.stringContaining(`cannot play ${Position.CATCHER}`)
          })
        )
      })

      it('throws an error if there is a duplicated position', () => {
        // make all players only eligible to catch
        const badRoster = players.reduce((acc, player) => {
          const clone = player.clone()
          clone.eligiblePositions = [Position.CATCHER]
          return { ...acc, [clone.id]: clone }
        }, {})

        const badTeam = new Team({ ...props, roster: badRoster })

        expect(() => badTeam.setStarters(buildStarters(badRoster))).toThrow(
          'must specify a player for every position'
        )
      })
    })
  })

  describe('gameplay', () => {
    describe('currentBatter', () => {
      it('gets the current batter', () => {
        const starters = buildStarters(roster)
        team.setStarters(starters)

        expect(team.currentBatter()).toEqual(
          expect.objectContaining({
            id: starters[0].playerId
          })
        )
      })

      it('throws an error if no batter is found', () => {
        expect(() => team.currentBatter()).toThrow('current batter not defined')
      })
    })

    describe('next batter', () => {
      it('gets the next batter', () => {
        const starters = buildStarters(roster)
        team.setStarters(starters)

        for (const starter of starters) {
          expect(team.nextBatter()).toEqual(
            expect.objectContaining({
              id: starter.playerId
            })
          )
        }
      })

      it('throws an error if the next batter is not found', () => {
        expect(() => team.nextBatter()).toThrow('next batter not defined')
      })
    })

    describe('peekNextBatter', () => {
      it('looks at the next batter', () => {
        const starters = buildStarters(roster)
        team.setStarters(starters)

        expect(team.peekNextBatter()).toEqual(
          expect.objectContaining({
            id: starters[0].playerId
          })
        )
      })

      it('throws an error if the next batter is not found', () => {
        expect(() => team.peekNextBatter()).toThrow('next batter not defined')
      })
    })

    describe('defenderAt', () => {
      const position = Position.CATCHER

      it('looks up the defender at a position', () => {
        team.setStarters(buildStarters(roster))
        expect(team.defenderAt(position)).toEqual(catcher)
      })

      it('throws an error if no player is found', () => {
        expect(() => team.defenderAt(position)).toThrow(
          `no player found at position ${position}`
        )
      })
    })
  })

  describe('box score', () => {
    beforeEach(() => {
      team.setStarters(buildStarters(roster))
    })

    it('gets the batting lines', () => {
      const lines = team.getBattingLines()
      for (const player of Object.values(roster)) {
        const lineForPlayer = lines.find((l) => l[0] === player.name)
        expect(lineForPlayer).toHaveLength(8)
      }
    })

    describe('batting extra', () => {
      it('gets the stats', () => {
        const [player1, player2] = Object.values(roster)
        const spy1 = jest.spyOn(player1, 'getGameStats')
        const spy2 = jest.spyOn(player2, 'getGameStats')

        spy1.mockReturnValueOnce({
          batting: { doubles: 2, homeRuns: 1 }
        } as any)
        spy2.mockReturnValueOnce({
          batting: { triples: 1, homeRuns: 3 }
        } as any)

        expect(team.getBattingExtra()).toEqual({
          doubles: [`${player1.name} (2)`],
          triples: [player2.name],
          homeRuns: [player1.name, `${player2.name} (3)`]
        })
      })

      it('returns an empty array if there are no stats', () => {
        expect(team.getBattingExtra()).toEqual({
          doubles: [],
          triples: [],
          homeRuns: []
        })
      })
    })

    it('gets the pitching lines', () => {
      const [line] = team.getPitchingLines()
      expect(line[0]).toEqual(pitcher.name)
      expect(line).toHaveLength(8)
    })
  })
})
