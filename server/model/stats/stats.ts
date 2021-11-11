import { Outcome } from '../outcome'

export class Stats {
  protected outcomes: Record<number, Outcome> = {}

  constructor(thresholds: Record<string, any>) {
    Object.entries(thresholds)
      .slice(1)
      .forEach(([key, val], i, arr) => {
        const [prevKey, prevVal] = arr[i - 1]
        if (val < prevVal) {
          throw new Error(`${key} cannot be less than ${prevKey}`)
        }
      })
  }

  determineOutcome(rand: number): Outcome {
    if (rand < 0 || rand > 1) {
      throw new Error('invalid random number provided')
    }

    for (const [threshold, outcome] of Object.entries(this.outcomes)) {
      if (rand <= Number(threshold)) {
        return outcome
      }
    }

    return Outcome.UNKNOWN
  }
}
