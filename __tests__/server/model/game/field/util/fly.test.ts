import { Outcome } from '../../../../../../src/server/model'
import { FlyUtil } from '../../../../../../src/server/model/game/field/util'
import { first, third } from '../../../../../../__test_data__'

describe('fly util', () => {
  const thresholds = {
    '0.500': Outcome.STRIKEOUT,
    '0.600': Outcome.FLY,
    '1.000': Outcome.GROUNDER
  }

  it('returns the bases and no runs scored if third is empty', () => {
    const bases = { first, second: null, third: null }
    const { newBases, runnersScored } = FlyUtil.calc(thresholds, 0.123, bases)

    expect(newBases).toEqual(bases)
    expect(runnersScored).toEqual([])
  })

  describe('runner on third', () => {
    const bases = { first: null, second: null, third }

    it('scores the third base runner if the fly is deep enough', () => {
      const { newBases, runnersScored } = FlyUtil.calc(thresholds, 0.588, bases)

      expect(newBases).toEqual({ ...bases, third: null })
      expect(runnersScored).toEqual([third.id])
    })

    it('leaves the runner on third for a shallow fly', () => {
      const { newBases, runnersScored } = FlyUtil.calc(thresholds, 0.502, bases)

      expect(newBases).toEqual({ ...bases })
      expect(runnersScored).toEqual([])
    })
  })
})
