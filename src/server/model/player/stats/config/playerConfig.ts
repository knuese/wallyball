import { Outcome } from '../../../enum/outcome'

export abstract class PlayerConfig {
  protected outcomes: Record<number, Outcome> = {}

  constructor(thresholds: Record<string, any>) {
    Object.values(thresholds).forEach((val, i, arr) => {
      if (i > 0 && val < arr[i - 1]) {
        throw new Error('thresholds must be increasing')
      }
    })
  }

  determineOutcome(rand: number): Outcome {
    if (rand < 0 || rand > 1) {
      throw new Error('invalid random number provided')
    }

    const sortedOutcomes = Object.entries(this.outcomes).sort(
      (one, two) => Number(one[0]) - Number(two[0])
    )

    for (const [threshold, outcome] of sortedOutcomes) {
      if (rand <= Number(threshold)) {
        return outcome
      }
    }

    return Outcome.UNKNOWN
  }
}
