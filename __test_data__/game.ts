import { Bases } from '../src/model'
import { away, home } from './team'

export default {
  away,
  home,
  inning: 1,
  isBottom: false,
  outs: 0,
  isOver: false,
  bases: new Bases(),
  scores: {
    away: [],
    home: []
  },
  playsForInning: []
}
