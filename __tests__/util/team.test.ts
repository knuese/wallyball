import { Position } from '../../src/model'
import { buildStarters, isDefenseValid, isLineupFull } from '../../src/util'

describe('teamUtil', () => {
  // object with nine key/value pairs
  const sizeNineObj = [...new Array(9).keys()].reduce(
    (a, c) => ({ ...a, [c]: `${c}` }),
    {}
  ) as any

  describe('isLineupFull', () => {
    it.each([
      [true, 'full', sizeNineObj],
      [false, 'non-full', {}]
    ])('returns %s for a %s lineup', (expected, _desc, lineup) => {
      expect(isLineupFull(lineup as any)).toBe(expected)
    })
  })

  describe('isDefenseValid', () => {
    it('returns true for a valid defense', () => {
      expect(isDefenseValid(sizeNineObj)).toBe(true)
    })

    it('returns false when there are not nine unique positions', () => {
      expect(
        isDefenseValid(
          [...new Array(9).keys()].reduce(
            (a, c) => ({ ...a, [c]: 'REPEAT' }),
            {}
          ) as any
        )
      ).toBe(false)
    })
  })

  describe('buildStarters', () => {
    it('returns the starter array', () => {
      const player1 = { id: 'player1' }
      const player2 = { id: 'player2' }
      const player3 = { id: 'player3' }

      const lineup = {
        '0': player2.id,
        '2': player1.id,
        '1': player3.id
      }

      const defense = {
        [player1.id]: Position.CATCHER,
        [player2.id]: Position.CENTER_FIELD,
        [player3.id]: Position.PITCHER
      }

      expect(buildStarters({ lineup, defense })).toEqual([
        { playerId: player2.id, position: Position.CENTER_FIELD },
        { playerId: player3.id, position: Position.PITCHER },
        { playerId: player1.id, position: Position.CATCHER }
      ])
    })
  })
})
