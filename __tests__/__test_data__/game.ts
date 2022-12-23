import { Bases } from '../../src/model'
import { away, home } from './team'

export default {
  away,
  home,
  inning: 1,
  isBottom: false,
  outs: 0,
  isOver: false,
  bases: {
    advanceRunners: jest.fn(() => ({ runnersScored: [], outs: 0 })),
    clear: jest.fn(),
    getBases: jest.fn(() => ({}))
  } as any as Bases,
  scores: {
    away: [],
    home: []
  },
  playsForInning: []
}
