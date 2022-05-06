import { Player, Position } from '../src/model'

const batting = { thresholds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1] }
const pitching = { thresholds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1] }

export const pitcher = new Player({
  name: 'Pitcher',
  positions: [Position.PITCHER],
  batting,
  pitching
})

export const catcher = new Player({
  name: 'Catcher',
  positions: [Position.CATCHER],
  batting
})

export const firstBase = new Player({
  name: 'First Baseman',
  positions: [Position.FIRST_BASE],
  batting
})

export const secondBase = new Player({
  name: 'Second Baseman',
  positions: [Position.SECOND_BASE],
  batting
})

export const shortstop = new Player({
  name: 'Shortstop',
  positions: [Position.SHORTSTOP],
  batting
})

export const thirdBase = new Player({
  name: 'Third Baseman',
  positions: [Position.THIRD_BASE],
  batting
})

export const leftField = new Player({
  name: 'Left Field',
  positions: [Position.LEFT_FIELD],
  batting
})

export const centerField = new Player({
  name: 'Center Field',
  positions: [Position.CENTER_FIELD],
  batting
})

export const rightField = new Player({
  name: 'Right Field',
  positions: [Position.RIGHT_FIELD],
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
