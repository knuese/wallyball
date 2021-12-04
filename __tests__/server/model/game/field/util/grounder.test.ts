import { GrounderUtil } from '../../../../../../src/server/model/game/field/util/grounder'
import {
  bases,
  batter,
  first,
  second,
  third
} from '../../../../../../__test_data__'

describe('grounder', () => {
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
