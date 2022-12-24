import { PlayerStats } from '../../store/types/stats'
import { BattingStatsSeason } from '../../types'
import { addInningsPitched, getAverage, getERA, statToStr } from '../../util'
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

type PlayerSeasonStats = {
  games: number
  batting: BattingStats
  pitching: PitchingStats
}

type PlayerAttributes = {
  readonly speed: number
  readonly fieldingPct: number
  readonly battingStarPower: number
  readonly pitchingStarPower: number
  readonly fatigue: (ip: number) => number
}

type PlayerProps = {
  id: string
  name: string
  positions: Position[] | string[]
  attributes: Partial<PlayerAttributes>
  batting: number[]
  pitching?: number[]
  stats?: PlayerStats
}

export class Player {
  readonly id: string
  readonly name: string
  readonly eligiblePositions: ReadonlyArray<Position | string>
  readonly attributes: PlayerAttributes
  readonly battingConfig: BattingConfig
  readonly pitchingConfig?: PitchingConfig
  private gameStats: GameStats
  private seasonStats: PlayerSeasonStats

  constructor({
    id,
    name,
    positions,
    batting,
    pitching,
    stats,
    attributes: {
      speed = 1,
      fieldingPct = 0.9,
      battingStarPower = 0,
      pitchingStarPower = 0,
      fatigue = (ip: number) => ip
    }
  }: PlayerProps) {
    this.id = id
    this.name = name
    this.eligiblePositions = positions
    this.battingConfig = new BattingConfig(batting)
    this.pitchingConfig = pitching && new PitchingConfig(pitching)
    this.gameStats = new GameStats()
    this.seasonStats = stats || {
      games: 0,
      batting: new BattingStats(),
      pitching: new PitchingStats()
    }

    this.attributes = {
      speed,
      fieldingPct,
      battingStarPower,
      pitchingStarPower,
      fatigue
    }
  }

  clone(newId: string): Player {
    return new Player({
      id: newId,
      name: this.name,
      positions: this.eligiblePositions.slice(),
      attributes: this.attributes,
      batting: this.battingConfig.getThresholds(),
      pitching: this.pitchingConfig && this.pitchingConfig.getThresholds()
    })
  }

  getBattingThresholds(): Record<number, Outcome> {
    return this.battingConfig.getOutcomes()
  }

  getPitchingThresholds(): Record<number, Outcome> {
    if (!this.pitchingConfig) {
      throw new Error(`${this.name} is not a pitcher`)
    }

    return this.pitchingConfig.getOutcomes()
  }

  getGameStats(): PlayerGameStats {
    return {
      batting: { ...this.gameStats.batting },
      pitching: { ...this.gameStats.pitching }
    }
  }

  getSeasonStats(): PlayerSeasonStats {
    return {
      games: this.seasonStats.games,
      batting: { ...this.seasonStats.batting },
      pitching: { ...this.seasonStats.pitching }
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

  getBatterSeasonStats(): BattingStatsSeason {
    const { batting: today } = this.getGameStats()
    const { batting: season } = this.getSeasonStats()

    return {
      H: today.hits + season.hits,
      HR: today.homeRuns + season.homeRuns,
      RBI: today.rbis + season.rbis,
      AVG: getAverage(this)
    }
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

  getPitcherSeasonStats() {
    const { pitching: today } = this.getGameStats()
    const { pitching: season } = this.getSeasonStats()

    return {
      IP: addInningsPitched(today.inningsPitched, season.inningsPitched),
      BB: today.walks + season.walks,
      K: today.strikeouts + season.strikeouts,
      ERA: getERA(this)
    }
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
