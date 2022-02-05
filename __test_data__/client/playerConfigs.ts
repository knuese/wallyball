import { PlayerConfig } from '../../src/client/store/types/team'

const pitcher = {
  id: 'p',
  name: 'pitcher',
  positions: ['P'],
  batting: [0.1, 0.2, 0.3],
  pitching: [0.1, 0.2, 0.3]
} as PlayerConfig

const catcher = {
  id: 'c',
  name: 'catcher',
  positions: ['C'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

const firstBaseman = {
  id: '1b',
  name: 'first',
  positions: ['1B'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

const secondBaseman = {
  id: '2b',
  name: 'second',
  positions: ['2B'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

const shortstop = {
  id: 'ss',
  name: 'shortstop',
  positions: ['SS'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

const thirdBaseman = {
  id: '3b',
  name: 'third',
  positions: ['3B'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

const leftFielder = {
  id: 'lf',
  name: 'left',
  positions: ['LF'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

const centerFielder = {
  id: 'cf',
  name: 'center',
  positions: ['CF'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

const rightFielder = {
  id: 'rf',
  name: 'right',
  positions: ['RF'],
  batting: [0.1, 0.2, 0.3]
} as PlayerConfig

export const playerConfigs = {
  pitcher,
  catcher,
  firstBaseman,
  secondBaseman,
  shortstop,
  thirdBaseman,
  leftFielder,
  centerFielder,
  rightFielder
}
