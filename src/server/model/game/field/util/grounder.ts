import { BaseMap } from '..'

type GrounderOutput = {
  newBases: BaseMap
  runnersScored: string[]
  outs: number
}

export class GrounderUtil {
  static calc(
    batterId: string,
    bases: BaseMap,
    numOuts: number
  ): GrounderOutput {
    const baseStr =
      '' +
      Number(Boolean(bases.third)) +
      Number(Boolean(bases.second)) +
      Number(Boolean(bases.first))

    let newBases = { ...bases }
    let outs = 0
    let runnersScored: string[] = []

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
        newBases = { first: { id: batterId }, second: null, third: null }
        runnersScored = []
        outs = 2
        break
      case '100':
        newBases = { first: null, second: null, third: null }
        runnersScored = [bases.third?.id as string]
        outs = 1
        break
      case '101':
        newBases = { first: null, second: null, third: null }
        runnersScored = Number(numOuts === 0) ? [bases.third?.id as string] : []
        outs = 2
        break
      case '110':
        newBases = { first: null, second: bases.second, third: null }
        runnersScored = [bases.third?.id as string]
        outs = 1
        break
      case '111':
        newBases = { first: null, second: bases.first, third: bases.second }
        runnersScored = []
        outs = 2
        break
    }

    return { newBases, runnersScored, outs }
  }
}
