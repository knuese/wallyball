import { Outcome } from '../../../enum/outcome'

export abstract class PlayerConfig {
  private thresholds: ReadonlyArray<number>
  protected outcomes: Record<number, Outcome> = {}

  constructor(thresholds: number[]) {
    this.thresholds = thresholds

    thresholds.forEach((val, i, arr) => {
      if (i > 0 && val < arr[i - 1]) {
        throw new Error('thresholds must be increasing')
      }
    })
  }

  getThresholds(): number[] {
    return [...this.thresholds]
  }

  getOutcomes(): Record<number, Outcome> {
    return { ...this.outcomes }
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
