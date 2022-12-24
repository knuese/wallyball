import { addInningsPitched } from '../../../../util'

export default class PitchingStats {
  [k: string]: number | string
  inningsPitched: string
  battersFaced: number
  hits: number
  walks: number
  strikeouts: number
  runs: number
  earnedRuns: number

  constructor() {
    this.inningsPitched = '0.0'
    this.battersFaced = 0
    this.hits = 0
    this.walks = 0
    this.strikeouts = 0
    this.runs = 0
    this.earnedRuns = 0
  }

  static add(one: PitchingStats, two: PitchingStats): PitchingStats {
    const newStats = new PitchingStats()

    newStats.inningsPitched = addInningsPitched(
      one.inningsPitched,
      two.inningsPitched
    )
    newStats.battersFaced = one.battersFaced + two.battersFaced
    newStats.hits = one.hits + two.hits
    newStats.walks = one.walks + two.walks
    newStats.strikeouts = one.strikeouts + two.strikeouts
    newStats.runs = one.runs + two.runs
    newStats.earnedRuns = one.earnedRuns + two.earnedRuns

    return newStats
  }
}
