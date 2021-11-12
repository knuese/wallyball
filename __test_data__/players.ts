import {
  BattingStats,
  PitchingStats,
  Player,
  Position
} from '../src/server/model'

const pitcher = new Player(
  'pitcher',
  [Position.PITCHER],
  {} as BattingStats,
  {} as PitchingStats
)

const catcher = new Player(
  'catcher',
  [Position.CATCHER],
  {} as BattingStats,
  {} as PitchingStats
)

const firstBaseman = new Player(
  'first base',
  [Position.FIRST_BASE],
  {} as BattingStats,
  {} as PitchingStats
)

const secondBaseman = new Player(
  'second base',
  [Position.SECOND_BASE],
  {} as BattingStats,
  {} as PitchingStats
)

const shortstop = new Player(
  'shortstop',
  [Position.SHORTSTOP],
  {} as BattingStats,
  {} as PitchingStats
)

const thirdBaseman = new Player(
  'third base',
  [Position.THIRD_BASE],
  {} as BattingStats,
  {} as PitchingStats
)

const leftFielder = new Player(
  'left field',
  [Position.LEFT_FIELD],
  {} as BattingStats,
  {} as PitchingStats
)

const centerFielder = new Player(
  'center field',
  [Position.CENTER_FIELD],
  {} as BattingStats,
  {} as PitchingStats
)

const rightFielder = new Player(
  'right field',
  [Position.RIGHT_FIELD],
  {} as BattingStats,
  {} as PitchingStats
)

export const players = {
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

export const starterArray = [
  {
    player: firstBaseman,
    position: Position.FIRST_BASE,
    battingSpot: 3
  },
  { player: pitcher, position: Position.PITCHER, battingSpot: 1 },
  {
    player: thirdBaseman,
    position: Position.THIRD_BASE,
    battingSpot: 6
  },
  { player: catcher, position: Position.CATCHER, battingSpot: 2 },
  {
    player: rightFielder,
    position: Position.RIGHT_FIELD,
    battingSpot: 9
  },
  {
    player: shortstop,
    position: Position.SHORTSTOP,
    battingSpot: 5
  },
  {
    player: secondBaseman,
    position: Position.SECOND_BASE,
    battingSpot: 4
  },
  {
    player: leftFielder,
    position: Position.LEFT_FIELD,
    battingSpot: 7
  },
  {
    player: centerFielder,
    position: Position.CENTER_FIELD,
    battingSpot: 8
  }
]
