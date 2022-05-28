export default class BattingStats {
  [k: string]: number
  plateAppearances: number
  atBats: number
  runs: number
  hits: number
  doubles: number
  triples: number
  homeRuns: number
  rbis: number
  walks: number
  hbps: number
  strikeouts: number
  flies: number
  grounders: number

  constructor() {
    this.plateAppearances = 0
    this.atBats = 0
    this.runs = 0
    this.hits = 0
    this.doubles = 0
    this.triples = 0
    this.homeRuns = 0
    this.rbis = 0
    this.walks = 0
    this.hbps = 0
    this.strikeouts = 0
    this.flies = 0
    this.grounders = 0
  }

  static add(one: BattingStats, two: BattingStats): BattingStats {
    const newStats = new BattingStats()

    newStats.plateAppearances = one.plateAppearances + two.plateAppearances
    newStats.atBats = one.atBats + two.atBats
    newStats.runs = one.runs + two.runs
    newStats.hits = one.hits + two.hits
    newStats.doubles = one.doubles + two.doubles
    newStats.triples = one.triples + two.triples
    newStats.homeRuns = one.homeRuns + two.homeRuns
    newStats.rbis = one.rbis + two.rbis
    newStats.walks = one.walks + two.walks
    newStats.hbps = one.hbps + two.hbps
    newStats.strikeouts = one.strikeouts + two.strikeouts
    newStats.flies = one.flies + two.flies
    newStats.grounders = one.grounders + two.grounders

    return newStats
  }
}
