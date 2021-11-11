import { Outcome } from '../outcome'
import { Stats } from './stats'

export class PitchingStats extends Stats {
  constructor(thresholds: {
    single: number
    double: number
    triple: number
    homeRun: number
    walk: number
    hitByPitch: number
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
      [thresholds.hitByPitch]: Outcome.HIT_BY_PITCH,
      [thresholds.strikeout]: Outcome.STRIKEOUT,
      [thresholds.fly]: Outcome.FLY,
      [thresholds.grounder]: Outcome.GROUNDER
    }
  }
}
