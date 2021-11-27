import { BaseMap } from '..'
import { Player } from '../../..'

type GrounderOutput = {
  newBases: BaseMap
  runnersScored: string[]
  outs: number
}

export class GrounderUtil {
  static calc(
    { id: batterId }: Player,
    bases: BaseMap,
    numOuts: number
  ): GrounderOutput {
    const baseStr =
      '' + Number(bases.third) + Number(bases.second) + Number(bases.first)

    let newBases, outs, runnersScored: string[]

    switch (baseStr) {
      case '000':
        newBases = { first: null, second: null, third: null }
        runnersScored = []
        outs = 1
        break
      case '001':
        newBases = { first: null, second: null, third: null }
        runnersScored = []
        outs = 2
        break
      case '010':
        newBases = { ...bases }
        runnersScored = []
        outs = 1
        break
      case '011':
        newBases = { first: { playerId: batterId }, second: null, third: null }
        runnersScored = []
        outs = 2
        break
      case '100':
        newBases = { first: null, second: null, third: null }
        runnersScored = [bases.third?.playerId as string]
        outs = 1
        break
      case '101':
        newBases = { first: null, second: null, third: null }
        runnersScored = Number(numOuts === 0)
          ? [bases.third?.playerId as string]
          : []
        outs = 2
        break
      case '110':
        newBases = { first: null, second: bases.second, third: null }
        runnersScored = [bases.third?.playerId as string]
        outs = 1
        break
      case '111':
        newBases = { first: null, second: bases.first, third: bases.second }
        runnersScored = []
        outs = 2
        break
      default:
        newBases = { ...bases }
        runnersScored = []
        outs = 0
        break
    }

    return { newBases, runnersScored, outs }
  }
}
