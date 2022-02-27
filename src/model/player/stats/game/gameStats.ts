import { Outcome } from '../../..'
import { isAtBat, isHit } from '../../../../util'
// import { BattingStats } from './battingStats'

// TODO
export class GameStats {
  // batting: BattingStats

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

  // constructor() {
  // this.batting = new BattingStats()
  // }

  // logAtBat(outcome: Outcome, runsScored: number): void {
  //   if (isAtBat(outcome)) {
  //     this.batting.atBats++
  //   }

  //   if (isHit(outcome)) {
  //     this.batting.hits++
  //   }

  //   const key = this.outcomeToStat[outcome]

  //   if (key) {
  //     this.batting[key]++
  //   }

  //   this.batting.rbis += runsScored
  // }
}
