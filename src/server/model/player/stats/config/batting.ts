import { Outcome } from '../../../enum/outcome'
import { PlayerConfig } from './playerConfig'

export class BattingConfig extends PlayerConfig {
  constructor(thresholds: number[]) {
    super(thresholds)

    if (thresholds.length !== 8) {
      throw new Error('must provide eight thresholds for batting stats')
    }

    this.outcomes = {
      [thresholds[0]]: Outcome.SINGLE,
      [thresholds[1]]: Outcome.DOUBLE,
      [thresholds[2]]: Outcome.TRIPLE,
      [thresholds[3]]: Outcome.HOME_RUN,
      [thresholds[4]]: Outcome.WALK,
      [thresholds[5]]: Outcome.STRIKEOUT,
      [thresholds[6]]: Outcome.FLY,
      [thresholds[7]]: Outcome.GROUNDER
    }
  }
}
