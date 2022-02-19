import { BaseMap } from '..'
import { Outcome } from '../../..'

type FlyOutput = {
  newBases: BaseMap
  runnersScored: string[]
}

export class FlyUtil {
  static calc(
    thresholds: Record<number, Outcome>,
    rawValue: number,
    bases: BaseMap
  ): FlyOutput {
    const runnersScored = [] as string[]
    const newBases = { ...bases }

    if (bases.third) {
      const [kThreshold, flyThreshold] = Object.keys(thresholds)
        .sort()
        .slice(-3, -1)
      const flyRange = Number(flyThreshold) - Number(kThreshold)
      const differential = rawValue - Number(kThreshold)

      if (differential / flyRange > 0.75) {
        runnersScored.push(bases.third.id)
        newBases.third = null
      }
    }

    return { newBases, runnersScored }
  }
}
