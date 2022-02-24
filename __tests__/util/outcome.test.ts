import { Outcome } from '../../src/model'
import { isAtBat, isHit } from '../../src/util'

describe('outcome util', () => {
  describe('isHit', () => {
    it.each([
      [Outcome.SINGLE, true],
      [Outcome.DOUBLE, true],
      [Outcome.TRIPLE, true],
      [Outcome.HOME_RUN, true],
      [Outcome.WALK, false],
      [Outcome.HIT_BY_PITCH, false],
      [Outcome.STRIKEOUT, false],
      [Outcome.FLY, false],
      [Outcome.GROUNDER, false]
    ])('"%s" is hit: %s', (outcome, expected) => {
      expect(isHit(outcome)).toBe(expected)
    })
  })

  describe('isAtBat', () => {
    it.each([
      [Outcome.SINGLE, true],
      [Outcome.DOUBLE, true],
      [Outcome.TRIPLE, true],
      [Outcome.HOME_RUN, true],
      [Outcome.WALK, false],
      [Outcome.HIT_BY_PITCH, false],
      [Outcome.STRIKEOUT, true],
      [Outcome.FLY, true],
      [Outcome.GROUNDER, true]
    ])('"%s" is at bat: %s', (outcome, expected) => {
      expect(isAtBat(outcome)).toBe(expected)
    })
  })
})
