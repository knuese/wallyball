import { v4 as uuidv4 } from 'uuid'
import { statToStr } from '../../util'
import { Outcome, Position } from '../enum'
import {
  BattingConfig,
  BattingStats,
  GameStats,
  PitchingConfig,
  PitchingStats
} from './stats'

type PlayerGameStats = {
  batting: BattingStats
  pitching: PitchingStats
}

type PlayerProps = {
  name: string
  positions: Position[] | string[]
  batting: {
    thresholds: number[]
    starPower?: number
  }
  pitching?: {
    thresholds: number[]
    starPower?: number
  }
}

export class Player {
  id: string
  name: string
  eligiblePositions: Position[] | string[]
  battingConfig: BattingConfig
  pitchingConfig?: PitchingConfig
  private gameStats: GameStats

  constructor({ name, positions, batting, pitching }: PlayerProps) {
    this.id = uuidv4()
    this.name = name
    this.eligiblePositions = positions
    this.battingConfig = new BattingConfig(batting)
    this.pitchingConfig = pitching && new PitchingConfig(pitching)
    this.gameStats = new GameStats()
  }

  getBattingThresholds(): Record<number, Outcome> {
    return { ...this.battingConfig.outcomes }
  }

  getBattingStarPower(): number {
    return this.battingConfig.starPower
  }

  getPitchingThresholds(): Record<number, Outcome> {
    if (!this.pitchingConfig) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    return { ...this.pitchingConfig.outcomes }
  }

  getPitchingStarPower(): number {
    if (!this.pitchingConfig) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    return this.pitchingConfig?.starPower
  }

  getGameStats(): PlayerGameStats {
    return {
      batting: { ...this.gameStats.batting },
      pitching: { ...this.gameStats.pitching }
    }
  }

  getBattingStatLine(): string {
    const { batting } = this.gameStats

    if (batting.plateAppearances === 0) {
      return 'first plate appearance'
    }

    const line =
      `${batting.hits} - ${batting.atBats}, ` +
      statToStr(batting.doubles, '2B') +
      statToStr(batting.triples, '3B') +
      statToStr(batting.homeRuns, 'HR') +
      statToStr(batting.rbis, 'RBI') +
      statToStr(batting.walks, 'BB') +
      statToStr(batting.strikeouts, 'SO')

    // chop off the last comma
    return line.replace(/, $/, '')
  }

  getPitchingStatLine(): string {
    const { pitching } = this.gameStats

    return (
      `${pitching.inningsPitched} IP, ` +
      `${pitching.runs} R, ` +
      `${pitching.earnedRuns} ER, ` +
      `${pitching.strikeouts} K`
    )
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

  scored(): void {
    this.gameStats.batting.runs++
  }

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

  logBatterFaced(
    outcome: Outcome,
    outsRecorded: number,
    runsScored: number
  ): void {
    this.gameStats.logBatterFaced(outcome, outsRecorded, runsScored)
  }
}
