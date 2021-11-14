import { PitchingStats, Outcome } from '../../../../../src/server/model'

describe('batting stats', () => {
  it.each([
    [0.006, Outcome.SINGLE],
    [0.111, Outcome.DOUBLE],
    [0.234, Outcome.TRIPLE],
    [0.301, Outcome.HOME_RUN],
    [0.45, Outcome.WALK],
    [0.555, Outcome.STRIKEOUT],
    [0.7, Outcome.FLY],
    [0.999, Outcome.GROUNDER]
  ])('determines the outcome for %s', (rand, expected) => {
    const battingStats = new PitchingStats([
      0.11, 0.202, 0.299, 0.4, 0.5, 0.65, 0.779, 1.0
    ])

    expect(battingStats.determineOutcome(rand)).toEqual(expected)
  })
})
