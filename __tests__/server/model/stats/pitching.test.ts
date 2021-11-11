import { Outcome } from '../../../../server/model/outcome'
import { PitchingStats } from '../../../../server/model/stats'

describe('batting stats', () => {
  it.each([
    [0.006, Outcome.SINGLE],
    [0.111, Outcome.DOUBLE],
    [0.234, Outcome.TRIPLE],
    [0.301, Outcome.HOME_RUN],
    [0.45, Outcome.WALK],
    [0.451, Outcome.HIT_BY_PITCH],
    [0.555, Outcome.STRIKEOUT],
    [0.7, Outcome.FLY],
    [0.999, Outcome.GROUNDER]
  ])('determines the outcome for %s', (rand, expected) => {
    const battingStats = new PitchingStats({
      single: 0.110,
      double: 0.202,
      triple: 0.299,
      homeRun: 0.4,
      walk: 0.45,
      hitByPitch: 0.5,
      strikeout: 0.65,
      fly: 0.779,
      grounder: 1.0
    })

    expect(battingStats.determineOutcome(rand)).toEqual(expected)
  })
})
