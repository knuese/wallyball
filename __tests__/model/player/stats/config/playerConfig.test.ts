import { Outcome } from '../../../../../src/model'
import { PlayerConfig } from '../../../../../src/model/player/stats/config/playerConfig'

class MockConfig extends PlayerConfig {}

describe('stats', () => {
  it('throws an error if the thresholds are not increasing', () => {
    expect(() => new MockConfig([0.3, 0.2, 0.4])).toThrow(
      'thresholds must be increasing'
    )
  })

  it.each([-0.1, 1.01])(
    'throws an error when determining an outcome for %s',
    (rand) => {
      const stats = new MockConfig([])
      expect(() => stats.determineOutcome(rand)).toThrow(
        'invalid random number provided'
      )
    }
  )

  it('returns unknown if there is no threshold for a value', () => {
    const stats = new MockConfig([])
    expect(stats.determineOutcome(0.1)).toEqual(Outcome.UNKNOWN)
  })
})
