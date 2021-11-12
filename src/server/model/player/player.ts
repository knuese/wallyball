import { Outcome, Position } from '../enum'
import { BattingStats, PitchingStats } from './stats'

export class Player {
  name: string
  private eligiblePositions: Position[]
  private battingStats: BattingStats
  private pitchingStats?: PitchingStats

  constructor(
    name: string,
    eligiblePositions: Position[],
    battingStats: BattingStats,
    pitchingStats?: PitchingStats
  ) {
    this.name = name
    this.eligiblePositions = eligiblePositions
    this.battingStats = battingStats
    this.pitchingStats = pitchingStats
  }

  canPlay(position: Position): boolean {
    return this.eligiblePositions.includes(position)
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
