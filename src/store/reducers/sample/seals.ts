import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const sealsJson = {
  name: 'Seals',
  primaryColor: '#BBB477',
  secondaryColor: '#444C38',
  players: [
    {
      name: 'BJ',
      positions: ['RF'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.047, 0.048, 0.049, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'Bamboo',
      positions: ['P'],
      attributes: {
        battingStarPower: 0,
        pitchingStarPower: 4.6,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0],
      pitching: [0.17, 0.199, 0.2, 0.222, 0.275, 0.554, 0.717, 1.0]
    },
    {
      name: 'H.S.',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 1.5 },
      batting: [0.217, 0.271, 0.299, 0.312, 0.364, 0.538, 0.769, 1.0]
    },
    {
      name: 'Misty',
      positions: ['LF', 'RF'],
      attributes: {
        battingStarPower: 2.2
      },
      batting: [0.195, 0.254, 0.264, 0.296, 0.386, 0.585, 0.792, 1.0]
    },
    {
      name: 'Moo Moo',
      positions: ['C', '1B', '3B'],
      attributes: { battingStarPower: 3.6 },
      batting: [0.152, 0.21, 0.215, 0.276, 0.421, 0.71, 0.855, 1.0]
    },
    {
      name: 'Sue',
      positions: ['C', 'P'],
      attributes: { battingStarPower: 3.5 },
      batting: [0.137, 0.177, 0.178, 0.244, 0.394, 0.705, 0.852, 1.0]
    },
    {
      name: 'Wally',
      positions: ['2B', 'SS', '3B'],
      attributes: { battingStarPower: 4 },
      batting: [0.18, 0.244, 0.251, 0.287, 0.434, 0.68, 0.84, 1.0]
    },
    {
      name: 'Walrein',
      positions: ['C', '1B'],
      attributes: { battingStarPower: 0.1 },
      batting: [0.139, 0.147, 0.148, 0.199, 0.234, 0.596, 0.798, 1.0]
    },
    {
      name: 'Willy',
      positions: ['2B', 'SS', '3B'],
      attributes: { battingStarPower: 3.75 },
      batting: [0.175, 0.225, 0.228, 0.274, 0.426, 0.686, 0.843, 1.0]
    }
  ] as PlayerJson[]
}

const sealPlayers = sealsJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

const sealMap = sealPlayers.reduce(
  (acc, cur: Player) => ({ ...acc, [cur.id]: cur }),
  {}
) as Record<string, Player>

export const tempSeals = new Team({
  name: 'Seals',
  primaryColor: '#BBB477',
  secondaryColor: '#444C38',
  roster: sealMap
})

tempSeals.setStarters([
  {
    playerId: idForName(sealPlayers, 'H.S.'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(sealPlayers, 'Misty'),
    position: Position.LEFT_FIELD
  },
  {
    playerId: idForName(sealPlayers, 'Wally'),
    position: Position.SHORTSTOP
  },
  {
    playerId: idForName(sealPlayers, 'Moo Moo'),
    position: Position.THIRD_BASE
  },
  {
    playerId: idForName(sealPlayers, 'Willy'),
    position: Position.SECOND_BASE
  },
  {
    playerId: idForName(sealPlayers, 'Sue'),
    position: Position.CATCHER
  },
  {
    playerId: idForName(sealPlayers, 'Walrein'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(sealPlayers, 'Bamboo'),
    position: Position.PITCHER
  },
  { playerId: idForName(sealPlayers, 'BJ'), position: Position.RIGHT_FIELD }
])
