import { isDefenseValid, isLineupFull } from '../../../src/client/util'

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
})
