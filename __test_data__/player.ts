import { BattingConfig, PitchingConfig, Player, Position } from '../src/model'

const battingRaw = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1]
const battingConfig = new BattingConfig(battingRaw)

const pitchingRaw = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1]
const pitchingConfig = new PitchingConfig(pitchingRaw)

export const pitcher = new Player(
  'Pitcher',
  [Position.PITCHER],
  battingConfig,
  pitchingConfig
)

export const catcher = new Player('Catcher', [Position.CATCHER], battingConfig)

export const firstBase = new Player(
  'First Baseman',
  [Position.FIRST_BASE],
  battingConfig
)

export const secondBase = new Player(
  'Second Baseman',
  [Position.SECOND_BASE],
  battingConfig
)

export const shortstop = new Player(
  'Shortstop',
  [Position.SHORTSTOP],
  battingConfig
)

export const thirdBase = new Player(
  'Third Baseman',
  [Position.THIRD_BASE],
  battingConfig
)

export const leftField = new Player(
  'Left Field',
  [Position.LEFT_FIELD],
  battingConfig
)

export const centerField = new Player(
  'Center Field',
  [Position.CENTER_FIELD],
  battingConfig
)

export const rightField = new Player(
  'Right Field',
  [Position.RIGHT_FIELD],
  battingConfig
)

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
  batting: battingRaw,
  pitching: player.isPitcher() ? pitchingRaw : null
}))

// as expected by Team constructor
export const mappedPlayers: Record<string, Player> = players.reduce(
  (acc, cur) => ({ ...acc, [cur.id]: cur }),
  {}
)
