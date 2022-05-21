import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const bearsJson = {
  name: 'Bears',
  primaryColor: '#841B2D',
  secondaryColor: '#DEB887',
  players: [
    {
      id: 'bobo',
      name: 'Bo Bo',
      positions: ['1B'],
      attributes: { battingStarPower: 3.1 },
      batting: [0.132, 0.164, 0.165, 0.245, 0.409, 0.738, 0.887, 1.0]
    },
    {
      id: 'buster',
      name: 'Buster',
      positions: ['2B', 'SS', '3B', 'RF', 'LF'],
      attributes: { battingStarPower: 3.3 },
      batting: [0.187, 0.251, 0.264, 0.302, 0.409, 0.658, 0.874, 1.0]
    },
    {
      id: 'cappy',
      name: 'Cappy',
      positions: ['2B', 'SS', '3B'],
      attributes: { battingStarPower: 2 },
      batting: [0.162, 0.209, 0.211, 0.254, 0.366, 0.628, 0.869, 1.0]
    },
    {
      id: 'cupcake',
      name: 'Cupcake',
      positions: ['P', '2B', 'CF'],
      attributes: { battingStarPower: 2 },
      batting: [0.174, 0.23, 0.236, 0.267, 0.372, 0.585, 0.842, 1.0]
    },
    {
      id: 'sammy',
      name: 'Sammy',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 1 },
      batting: [0.209, 0.261, 0.282, 0.294, 0.352, 0.491, 0.805, 1.0]
    },
    {
      id: 'september',
      name: 'September',
      positions: ['P'],
      attributes: {
        battingStarPower: 0,
        pitchingStarPower: 4.25,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.13, 0.157, 0.158, 0.164, 0.184, 0.342, 0.724, 1.0],
      pitching: [0.175, 0.194, 0.195, 0.213, 0.268, 0.506, 0.715, 1.0]
    },
    {
      id: 'spanky',
      name: 'Spanky',
      positions: ['P', '1B', '3B'],
      attributes: { battingStarPower: 3.9 },
      batting: [0.162, 0.212, 0.213, 0.274, 0.409, 0.72, 0.896, 1.0]
    },
    {
      id: 'sparey',
      name: 'Sparey',
      positions: ['2B', '3B'],
      attributes: { battingStarPower: 2.5 },
      batting: [0.182, 0.222, 0.223, 0.264, 0.387, 0.658, 0.888, 1.0]
    },
    {
      id: 'tush',
      name: 'Tush',
      positions: ['P', 'C'],
      attributes: { battingStarPower: 4.5 },
      batting: [0.214, 0.269, 0.271, 0.324, 0.456, 0.733, 0.902, 1.0]
    }
  ] as PlayerJson[]
}

const bearPlayers = bearsJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

export const tempBears = new Team({
  name: 'Bears',
  primaryColor: '#841B2D',
  secondaryColor: '#DEB887',
  roster: bearPlayers
})

tempBears.setStarters([
  {
    playerId: idForName(bearPlayers, 'Sammy'),
    position: Position.LEFT_FIELD
  },
  {
    playerId: idForName(bearPlayers, 'Buster'),
    position: Position.RIGHT_FIELD
  },
  { playerId: idForName(bearPlayers, 'Tush'), position: Position.CATCHER },
  {
    playerId: idForName(bearPlayers, 'Bo Bo'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(bearPlayers, 'Spanky'),
    position: Position.THIRD_BASE
  },
  {
    playerId: idForName(bearPlayers, 'Sparey'),
    position: Position.SECOND_BASE
  },
  { playerId: idForName(bearPlayers, 'Cappy'), position: Position.SHORTSTOP },
  {
    playerId: idForName(bearPlayers, 'Cupcake'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(bearPlayers, 'September'),
    position: Position.PITCHER
  }
])
