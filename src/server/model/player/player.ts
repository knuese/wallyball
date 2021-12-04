import { v4 as uuidv4 } from 'uuid'
import { Outcome, Position } from '../enum'
import { BattingConfig, PitchingConfig, GameStats } from './stats'

export class Player {
  id: string
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
    this.id = uuidv4()
    this.name = name
    this.eligiblePositions = eligiblePositions
    this.battingConfig = battingConfig
    this.pitchingConfig = pitchingConfig
    this.gameStats = new GameStats()
  }

  getBattingThresholds(): Record<number, Outcome> {
    return { ...this.battingConfig.outcomes }
  }

  getPitchingThresholds(): Record<number, Outcome> {
    if (!this.pitchingConfig) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    return { ...this.pitchingConfig.outcomes }
  }

  canPlay(position: Position): boolean {
    return this.eligiblePositions.includes(position)
  }

  bat(): { outcome: Outcome, rawValue: number } {
    const rawValue = Math.random()
    return {
      rawValue,
      outcome: this.battingConfig.determineOutcome(rawValue)
    }
  }

  logAtBat(outcome: Outcome, runsScored: number): void {
    this.gameStats.logAtBat(outcome, runsScored)
  }

  scored(): void {
    this.gameStats.batting.runs++
  }

  pitch(): { outcome: Outcome, rawValue: number } {
    if (!this.pitchingConfig) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    const rawValue = Math.random()
    return {
      rawValue,
      outcome: this.pitchingConfig.determineOutcome(rawValue)
    }
  }

  getBattingStatLine(): any {
    const { atBats, runs, hits, rbis, walks, strikeouts } =
      this.gameStats.batting
    return { atBats, runs, hits, rbis, walks, strikeouts }
  }
}
