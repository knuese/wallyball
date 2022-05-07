import { Outcome } from '../../../enum/outcome'

export abstract class PlayerConfig {
  thresholds: number[]
  outcomes: Record<number, Outcome> = {}
  starPower: number

  constructor(thresholds: number[], starPower: number) {
    this.thresholds = thresholds

    thresholds.forEach((val, i, arr) => {
      if (i > 0 && val < arr[i - 1]) {
        throw new Error('thresholds must be increasing')
      }
    })

    this.starPower = starPower
  }

  getThresholds(): number[] {
    return [...this.thresholds]
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
