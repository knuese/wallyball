import { Outcome } from './outcome'
import { BattingStats, PitchingStats } from './stats'

export class Player {
  name: string
  private battingStats: BattingStats
  private pitchingStats?: PitchingStats

  constructor(
    name: string,
    battingStats: BattingStats,
    pitchingStats?: PitchingStats
  ) {
    this.name = name
    this.battingStats = battingStats
    this.pitchingStats = pitchingStats
  }

  bat(): Outcome {
    return this.battingStats.determineOutcome(Math.random())
  }

  pitch(): Outcome {
    if (!this.pitchingStats) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    return this.pitchingStats.determineOutcome(Math.random())
  }
}
