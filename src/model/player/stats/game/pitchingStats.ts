export default class PitchingStats {
  [k: string]: number | string
  inningsPitched: string
  hits: number
  walks: number
  strikeouts: number
  runs: number
  earnedRuns: number

  constructor() {
    this.inningsPitched = '0.0'
    this.hits = 0
    this.walks = 0
    this.strikeouts = 0
    this.runs = 0
    this.earnedRuns = 0
  }
}
