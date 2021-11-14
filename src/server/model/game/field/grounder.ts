type GrounderOutput = {
  newBases: string
  runs: number
  outs: number
}

export class GrounderUtil {
  static calc(baseStr: string, numOuts: number): GrounderOutput {
    const outputMap: Record<string, GrounderOutput> = {
      '000': { newBases: '000', runs: 0, outs: 1 },
      '001': { newBases: '000', runs: 0, outs: 2 },
      '010': { newBases: '010', runs: 0, outs: 1 },
      '011': { newBases: '001', runs: 0, outs: 2 },
      '100': { newBases: '000', runs: 1, outs: 1 },
      '101': { newBases: '000', runs: Number(numOuts === 0), outs: 2 },
      '110': { newBases: '010', runs: 1, outs: 1 },
      '111': { newBases: '110', runs: 0, outs: 2 }
    }

    return outputMap[baseStr]
  }
}
