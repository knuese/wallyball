import { BattingConfig, Outcome } from '../../../../../src/model'

describe('batting config', () => {
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
    const battingStats = new BattingConfig({
      thresholds: [0.1, 0.2, 0.3, 0.4, 0.45, 0.65, 0.777, 1.0]
    })

    expect(battingStats.determineOutcome(rand)).toEqual(expected)
  })

  it('throws an error if there are not 8 thresholds', () => {
    expect(() => new BattingConfig({ thresholds: [] })).toThrow(
      Error('must provide eight thresholds for batting stats')
    )
  })
})
