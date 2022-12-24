import { PitchingStats } from '.'
import { Outcome } from '../../..'
import {
  incrementInningsPitched,
  isAtBat,
  isHit,
  isOut
} from '../../../../util'
import BattingStats from './battingStats'

export class GameStats {
  batting: BattingStats
  pitching: PitchingStats

  private outcomeToStat: Record<string, string> = {
    [Outcome.DOUBLE]: 'doubles',
    [Outcome.TRIPLE]: 'triples',
    [Outcome.HOME_RUN]: 'homeRuns',
    [Outcome.WALK]: 'walks',
    [Outcome.HIT_BY_PITCH]: 'hbps',
    [Outcome.STRIKEOUT]: 'strikeouts',
    [Outcome.FLY]: 'flies',
    [Outcome.GROUNDER]: 'grounders'
  }

  constructor() {
    this.batting = new BattingStats()
    this.pitching = new PitchingStats()
  }

  logAtBat(outcome: Outcome, runsScored: number): void {
    this.batting.plateAppearances++

    if (isAtBat(outcome)) {
      this.batting.atBats++
    }

    if (isHit(outcome)) {
      this.batting.hits++
    }

    const key = this.outcomeToStat[outcome]

    if (key) {
      this.batting[key]++
    }

    this.batting.rbis += runsScored
  }

  logBatterFaced(
    outcome: Outcome,
    outsRecorded: number,
    runsScored: number
  ): void {
    this.pitching.battersFaced++

    if (outsRecorded > 0) {
      this.pitching.inningsPitched = incrementInningsPitched(
        this.pitching.inningsPitched,
        outsRecorded
      )

      if (outcome === Outcome.STRIKEOUT) {
        this.pitching.strikeouts++
      }
    } else if (isHit(outcome)) {
      this.pitching.hits++
    } else if (outcome === Outcome.WALK) {
      this.pitching.walks++
    }

    this.pitching.runs += runsScored
    this.pitching.earnedRuns += runsScored
  }
}
