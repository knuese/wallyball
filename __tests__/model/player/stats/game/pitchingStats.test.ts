import { omit } from 'lodash'
import { PitchingStats } from '../../../../../src/model'

describe('pitching stats', () => {
  it('initializes everything to 0', () => {
    const stats = new PitchingStats()
    expect(
      Object.values(omit(stats, 'inningsPitched')).every((s) => s === 0)
    ).toBe(true)
    expect(stats.inningsPitched).toEqual('0.0')
  })

  it('adds two sets of stats together', () => {
    const one = {
      inningsPitched: '8.2',
      battersFaced: 31,
      hits: 5,
      walks: 2,
      strikeouts: 10,
      runs: 2,
      earnedRuns: 1
    } as PitchingStats

    const two = {
      inningsPitched: '3.0',
      battersFaced: 14,
      hits: 3,
      walks: 1,
      strikeouts: 2,
      runs: 1,
      earnedRuns: 1
    } as PitchingStats

    expect(PitchingStats.add(one, two)).toEqual({
      inningsPitched: '11.2',
      battersFaced: one.battersFaced + two.battersFaced,
      hits: one.hits + two.hits,
      walks: one.walks + two.walks,
      strikeouts: one.strikeouts + two.strikeouts,
      runs: one.runs + two.runs,
      earnedRuns: one.earnedRuns + two.earnedRuns
    })
  })
})
