import { BattingStats, Outcome } from '../../../../../src/server/model'

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
    const battingStats = new BattingStats({
      single: 0.1,
      double: 0.2,
      triple: 0.3,
      homeRun: 0.4,
      walk: 0.45,
      strikeout: 0.65,
      fly: 0.777,
      grounder: 1.0
    })

    expect(battingStats.determineOutcome(rand)).toEqual(expected)
  })
})
