import { Runner } from '../../../../../../src/server/model'
import { GrounderUtil } from '../../../../../../src/server/model/game/field/util/grounder'

describe('grounder', () => {
  const batter = { id: 'abc1234' } as Runner
  const first = { id: 'first' } as Runner
  const second = { id: 'second' } as Runner
  const third = { id: 'third' } as Runner

  const bases = {
    '000': { first: null, second: null, third: null },
    '001': { first, second: null, third: null },
    '010': { first: null, second, third: null },
    '011': { first, second, third: null },
    '100': { first: null, second: null, third },
    '101': { first, second: null, third },
    '110': { first: null, second, third },
    '111': { first, second, third }
  }

  // only the runner on third can score on a grounder
  // defining this variable to make the test cases below shorter
  const runnersScored = [third.id]

  it.each([
    [bases['000'], 0, { newBases: bases['000'], runnersScored: [], outs: 1 }],
    [bases['001'], 0, { newBases: bases['000'], runnersScored: [], outs: 2 }],
    [bases['010'], 0, { newBases: bases['010'], runnersScored: [], outs: 1 }],
    [
      bases['011'],
      0,
      {
        newBases: { ...bases['000'], first: batter },
        runnersScored: [],
        outs: 2
      }
    ],
    [bases['100'], 0, { newBases: bases['000'], runnersScored, outs: 1 }],
    [bases['101'], 0, { newBases: bases['000'], runnersScored, outs: 2 }],
    [bases['101'], 1, { newBases: bases['000'], runnersScored: [], outs: 2 }],
    [bases['110'], 0, { newBases: bases['010'], runnersScored, outs: 1 }],
    [
      bases['111'],
      0,
      {
        newBases: { first: null, second: first, third: second },
        runnersScored: [],
        outs: 2
      }
    ]
  ])(
    'determines the output of a grounder for %s',
    (bases, numOuts, expected) => {
      expect(GrounderUtil.calc(batter.id, bases, numOuts)).toEqual(expected)
    }
  )
})
