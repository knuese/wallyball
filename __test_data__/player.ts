import { Player, Position } from '../src/model'

const attributes = { speed: 1, fieldingPct: 0.999 }
const batting = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1]
const pitching = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1]

export const pitcher = new Player({
  name: 'Pitcher',
  positions: [Position.PITCHER],
  attributes,
  batting,
  pitching
})

export const catcher = new Player({
  name: 'Catcher',
  positions: [Position.CATCHER],
  attributes,
  batting
})

export const firstBase = new Player({
  name: 'First Baseman',
  positions: [Position.FIRST_BASE],
  attributes,
  batting
})

export const secondBase = new Player({
  name: 'Second Baseman',
  positions: [Position.SECOND_BASE],
  attributes,
  batting
})

export const shortstop = new Player({
  name: 'Shortstop',
  positions: [Position.SHORTSTOP],
  attributes,
  batting
})

export const thirdBase = new Player({
  name: 'Third Baseman',
  positions: [Position.THIRD_BASE],
  attributes,
  batting
})

export const leftField = new Player({
  name: 'Left Field',
  positions: [Position.LEFT_FIELD],
  attributes,
  batting
})

export const centerField = new Player({
  name: 'Center Field',
  positions: [Position.CENTER_FIELD],
  attributes,
  batting
})

export const rightField = new Player({
  name: 'Right Field',
  positions: [Position.RIGHT_FIELD],
  attributes,
  batting
})

export const players = [
  pitcher,
  catcher,
  firstBase,
  secondBase,
  shortstop,
  thirdBase,
  leftField,
  centerField,
  rightField
]

// as read from JSON file
export const playersFromFile = players.map((player) => ({
  name: player.name,
  positions: player.eligiblePositions,
  batting,
  pitching: player.isPitcher() ? pitching : null
}))

// as expected by Team constructor
export const roster: Record<string, Player> = players.reduce(
  (acc, cur) => ({ ...acc, [cur.id]: cur }),
  {}
)
