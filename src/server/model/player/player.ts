import { Outcome, Position } from '../enum'
import { BattingConfig, PitchingConfig, GameStats } from './stats'

export class Player {
  name: string
  private eligiblePositions: Position[]
  private battingConfig: BattingConfig
  private pitchingConfig?: PitchingConfig
  gameStats: GameStats

  constructor(
    name: string,
    eligiblePositions: Position[],
    battingConfig: BattingConfig,
    pitchingConfig?: PitchingConfig
  ) {
    this.name = name
    this.eligiblePositions = eligiblePositions
    this.battingConfig = battingConfig
    this.pitchingConfig = pitchingConfig
    this.gameStats = new GameStats()
  }

  canPlay(position: Position): boolean {
    return this.eligiblePositions.includes(position)
  }

  bat(): Outcome {
    return this.battingConfig.determineOutcome(Math.random())
  }

  logAtBat(outcome: Outcome, runsScored: number): void {
    this.gameStats.logAtBat(outcome, runsScored)
  }

  scored(): void {
    this.gameStats.batting.runs++
  }

  pitch(): Outcome {
    if (!this.pitchingConfig) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    return this.pitchingConfig.determineOutcome(Math.random())
  }

  getBattingStatLine(): any {
    const { atBats, runs, hits, rbis, walks, strikeouts } =
      this.gameStats.batting
    return { atBats, runs, hits, rbis, walks, strikeouts }
  }
}
