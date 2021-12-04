import { Outcome } from '../../../src/server/model'
import { outcomeUtil } from '../../../src/server/util'

describe('outcome util', () => {
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
  ])('"%s" is hit: %s', (outcome, isHit) => {
    expect(outcomeUtil.isHit(outcome)).toBe(isHit)
  })

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
  ])('"%s" is at bat: %s', (outcome, isAtBat) => {
    expect(outcomeUtil.isAtBat(outcome)).toBe(isAtBat)
  })
})
