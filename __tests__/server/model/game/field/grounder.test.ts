import { GrounderUtil } from '../../../../../src/server/model/game/field/grounder'

describe('grounder', () => {
  it.each([
    ['000', 0, { newBases: '000', runs: 0, outs: 1 }],
    ['001', 0, { newBases: '000', runs: 0, outs: 2 }],
    ['010', 0, { newBases: '010', runs: 0, outs: 1 }],
    ['011', 0, { newBases: '001', runs: 0, outs: 2 }],
    ['100', 0, { newBases: '000', runs: 1, outs: 1 }],
    ['101', 0, { newBases: '000', runs: 1, outs: 2 }],
    ['101', 1, { newBases: '000', runs: 0, outs: 2 }],
    ['110', 0, { newBases: '010', runs: 1, outs: 1 }],
    ['111', 0, { newBases: '110', runs: 0, outs: 2 }]
  ])('determines the correct output for %s', (str, numOuts, expected) => {
    expect(GrounderUtil.calc(str, numOuts)).toEqual(expected)
  })
})
