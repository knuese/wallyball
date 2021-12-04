import { BaseMap } from "..";
import { Outcome } from "../../..";

type FlyOutput = {
  newBases: BaseMap
  runnersScored: string[]
}

export class FlyUtil {
  static calc(outcomes: Record<number, Outcome>, rawValue: number, bases: BaseMap): FlyOutput {
    let runnersScored = [] as string[]
    let newBases = { ...bases }

    if (bases.third) {
      const [strikeoutThreshold, flyThreshold] = Object.keys(outcomes).slice(-3, -2)
      const flyRange = Number(flyThreshold) - Number(strikeoutThreshold)
      const differential = rawValue - Number(strikeoutThreshold)

      if ((differential / flyRange) > 0.75) {
        runnersScored.push(bases.third.id)
        newBases.third = null
      }
    }

    return { newBases, runnersScored }
  }
}
