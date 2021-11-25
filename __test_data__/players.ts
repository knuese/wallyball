import {
  BattingConfig,
  PitchingConfig,
  Player,
  Position
} from '../src/server/model'

const pitcher = new Player(
  'pitcher',
  [Position.PITCHER],
  {} as BattingConfig,
  {} as PitchingConfig
)

const catcher = new Player(
  'catcher',
  [Position.CATCHER],
  {} as BattingConfig,
  {} as PitchingConfig
)

const firstBaseman = new Player(
  'first base',
  [Position.FIRST_BASE],
  {} as BattingConfig,
  {} as PitchingConfig
)

const secondBaseman = new Player(
  'second base',
  [Position.SECOND_BASE],
  {} as BattingConfig,
  {} as PitchingConfig
)

const shortstop = new Player(
  'shortstop',
  [Position.SHORTSTOP],
  {} as BattingConfig,
  {} as PitchingConfig
)

const thirdBaseman = new Player(
  'third base',
  [Position.THIRD_BASE],
  {} as BattingConfig,
  {} as PitchingConfig
)

const leftFielder = new Player(
  'left field',
  [Position.LEFT_FIELD],
  {} as BattingConfig,
  {} as PitchingConfig
)

const centerFielder = new Player(
  'center field',
  [Position.CENTER_FIELD],
  {} as BattingConfig,
  {} as PitchingConfig
)

const rightFielder = new Player(
  'right field',
  [Position.RIGHT_FIELD],
  {} as BattingConfig,
  {} as PitchingConfig
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
  { player: firstBaseman, position: Position.FIRST_BASE },
  { player: pitcher, position: Position.PITCHER },
  { player: thirdBaseman, position: Position.THIRD_BASE },
  { player: catcher, position: Position.CATCHER },
  { player: rightFielder, position: Position.RIGHT_FIELD },
  { player: shortstop, position: Position.SHORTSTOP },
  { player: secondBaseman, position: Position.SECOND_BASE },
  { player: leftFielder, position: Position.LEFT_FIELD },
  { player: centerFielder, position: Position.CENTER_FIELD }
]
