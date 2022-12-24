import { BattingStats } from '../../../../../src/model'

describe('batting stats', () => {
  it('initializes everything to 0', () => {
    const stats = new BattingStats()
    expect(Object.values(stats).every((s) => s === 0)).toBe(true)
  })

  it('adds two sets of stats together', () => {
    const one = {
      plateAppearances: 4,
      atBats: 3,
      runs: 1,
      hits: 1,
      doubles: 0,
      triples: 0,
      homeRuns: 0,
      rbis: 0,
      walks: 1,
      hbps: 0,
      strikeouts: 1,
      flies: 1,
      grounders: 1
    } as BattingStats

    const two = {
      plateAppearances: 2,
      atBats: 2,
      runs: 0,
      hits: 1,
      doubles: 0,
      triples: 1,
      homeRuns: 0,
      rbis: 1,
      walks: 0,
      hbps: 0,
      strikeouts: 0,
      flies: 1,
      grounders: 0
    } as BattingStats

    expect(BattingStats.add(one, two)).toEqual({
      plateAppearances: one.plateAppearances + two.plateAppearances,
      atBats: one.atBats + two.atBats,
      runs: one.runs + two.runs,
      hits: one.hits + two.hits,
      doubles: one.doubles + two.doubles,
      triples: one.triples + two.triples,
      homeRuns: one.homeRuns + two.homeRuns,
      rbis: one.rbis + two.rbis,
      walks: one.walks + two.walks,
      hbps: one.hbps + two.hbps,
      strikeouts: one.strikeouts + two.strikeouts,
      flies: one.flies + two.flies,
      grounders: one.grounders + two.grounders
    })
  })
})
