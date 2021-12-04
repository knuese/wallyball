import {
  BattingConfig,
  PitchingConfig,
  Player,
  Position,
  Starter
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

export const idToPlayer = {
  [pitcher.id]: pitcher,
  [catcher.id]: catcher,
  [firstBaseman.id]: firstBaseman,
  [secondBaseman.id]: secondBaseman,
  [shortstop.id]: shortstop,
  [thirdBaseman.id]: thirdBaseman,
  [leftFielder.id]: leftFielder,
  [centerFielder.id]: centerFielder,
  [rightFielder.id]: rightFielder
}

export const starterArray = [
  { playerId: firstBaseman.id, position: Position.FIRST_BASE },
  { playerId: pitcher.id, position: Position.PITCHER },
  { playerId: thirdBaseman.id, position: Position.THIRD_BASE },
  { playerId: catcher.id, position: Position.CATCHER },
  { playerId: rightFielder.id, position: Position.RIGHT_FIELD },
  { playerId: shortstop.id, position: Position.SHORTSTOP },
  { playerId: secondBaseman.id, position: Position.SECOND_BASE },
  { playerId: leftFielder.id, position: Position.LEFT_FIELD },
  { playerId: centerFielder.id, position: Position.CENTER_FIELD }
] as Starter[]
