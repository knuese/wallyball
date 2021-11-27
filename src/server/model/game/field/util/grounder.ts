import { BaseMap } from '..'
import { Player } from '../../..'

type GrounderOutput = {
  newBases: BaseMap
  runs: number
  outs: number
}

export class GrounderUtil {
  static calc(batter: Player, bases: BaseMap, numOuts: number): GrounderOutput {
    const baseStr =
      '' + Number(bases.third) + Number(bases.second) + Number(bases.first)

    let newBases, runs, outs

    switch (baseStr) {
      case '000':
        newBases = { first: null, second: null, third: null }
        runs = 0
        outs = 1
        break
      case '001':
        newBases = { first: null, second: null, third: null }
        runs = 0
        outs = 2
        break
      case '010':
        newBases = { ...bases }
        runs = 0
        outs = 1
        break
      case '011':
        newBases = { first: batter, second: null, third: null }
        runs = 0
        outs = 2
        break
      case '100':
        newBases = { first: null, second: null, third: null }
        runs = 1
        outs = 1
        break
      case '101':
        newBases = { first: null, second: null, third: null }
        runs = Number(numOuts === 0)
        outs = 2
        break
      case '110':
        newBases = { first: null, second: bases.second, third: null }
        runs = 1
        outs = 1
        break
      case '111':
        newBases = { first: null, second: bases.first, third: bases.second }
        runs = 0
        outs = 2
        break
      default:
        newBases = { ...bases }
        runs = 0
        outs = 0
        break
    }

    return { newBases, runs, outs }
  }
}
