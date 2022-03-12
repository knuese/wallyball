import { v4 as uuidv4 } from 'uuid'
import { statToStr } from '../../util'
import { Outcome, Position } from '../enum'
import { BattingConfig, BattingStats, GameStats, PitchingConfig } from './stats'

type PlayerGameStats = {
  batting: BattingStats
}

export class Player {
  id: string
  name: string
  eligiblePositions: Position[] | string[]
  battingConfig: BattingConfig
  pitchingConfig?: PitchingConfig
  private gameStats: GameStats

  constructor(
    name: string,
    eligiblePositions: Position[] | string[],
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

  getGameStats(): PlayerGameStats {
    return {
      batting: { ...this.gameStats.batting }
    }
  }

  getBattingStatLine(): string {
    const { batting } = this.gameStats

    if (batting.plateAppearances === 0) {
      return 'first plate appearance'
    }

    const line =
      `${batting.hits}-${batting.atBats}, ` +
      statToStr(batting.doubles, '2B') +
      statToStr(batting.triples, '3B') +
      statToStr(batting.homeRuns, 'HR') +
      statToStr(batting.rbis, 'RBI') +
      statToStr(batting.walks, 'BB') +
      statToStr(batting.strikeouts, 'SO')

    // chop off the last comma
    return line.replace(/, $/, '')
  }

  isPitcher(): boolean {
    return !!this.pitchingConfig
  }

  canPlay(position: Position | string): boolean {
    return this.eligiblePositions.includes(position as any)
  }

  bat(): { outcome: Outcome; rawValue: number } {
    const rawValue = Math.random()
    return {
      rawValue,
      outcome: this.battingConfig.determineOutcome(rawValue)
    }
  }

  logAtBat(outcome: Outcome, runsScored: number): void {
    this.gameStats.logAtBat(outcome, runsScored)
  }

  // scored(): void {
  //   this.gameStats.batting.runs++
  // }

  pitch(): { outcome: Outcome; rawValue: number } {
    if (!this.pitchingConfig) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    const rawValue = Math.random()
    return {
      rawValue,
      outcome: this.pitchingConfig.determineOutcome(rawValue)
    }
  }
}
