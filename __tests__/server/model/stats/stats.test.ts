import { Outcome } from '../../../../server/model/outcome'
import { Stats } from '../../../../server/model/stats/stats'

class MockStats extends Stats {}

describe('stats', () => {
  it('throws an error if the thresholds are not increasing', () => {
    expect(
      () => new MockStats({ single: 0.3, double: 0.2, triple: 0.4 })
    ).toThrow('thresholds must be increasing')
  })

  it.each([-0.1, 1.01])(
    'throws an error when determining an outcome for %s',
    (rand) => {
      const stats = new MockStats({})
      expect(() => stats.determineOutcome(rand)).toThrow(
        'invalid random number provided'
      )
    }
  )

  it('returns unknown if there is no threshold for a value', () => {
    const stats = new MockStats({})
    expect(stats.determineOutcome(0.1)).toEqual(Outcome.UNKNOWN)
  })
})
