import { Outcome } from '../outcome'
import { Stats } from './stats'

export class BattingStats extends Stats {
  constructor(thresholds: {
    single: number
    double: number
    triple: number
    homeRun: number
    walk: number
    strikeout: number
    fly: number
    grounder: number
  }) {
    super(thresholds)

    this.outcomes = {
      [thresholds.single]: Outcome.SINGLE,
      [thresholds.double]: Outcome.DOUBLE,
      [thresholds.triple]: Outcome.TRIPLE,
      [thresholds.homeRun]: Outcome.HOME_RUN,
      [thresholds.walk]: Outcome.WALK,
      [thresholds.strikeout]: Outcome.STRIKEOUT,
      [thresholds.fly]: Outcome.FLY,
      [thresholds.grounder]: Outcome.GROUNDER
    }
  }
}
