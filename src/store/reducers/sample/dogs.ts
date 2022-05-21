import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const dogsJson = {
  name: 'Dogs',
  primaryColor: '#79443B',
  secondaryColor: '#E3DAC9',
  players: [
    {
      id: 'cocker',
      name: 'Cocker',
      positions: ['2B', 'SS', '3B'],
      attributes: { battingStarPower: 1.1 },
      batting: [0.164, 0.2, 0.201, 0.237, 0.316, 0.543, 0.825, 1.0]
    },
    {
      id: 'cocoa',
      name: 'Cocoa',
      positions: ['2B', 'SS', '3B'],
      attributes: { battingStarPower: 1 },
      batting: [0.182, 0.22, 0.221, 0.249, 0.341, 0.548, 0.831, 1.0]
    },
    {
      id: 'puppy',
      name: 'Puppy',
      positions: ['P'],
      attributes: {
        battingStarPower: 0,
        pitchingStarPower: 4,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.145, 0.175, 0.177, 0.195, 0.279, 0.428, 0.745, 1.0],
      pitching: [0.173, 0.194, 0.195, 0.22, 0.282, 0.515, 0.721, 1.0]
    },
    {
      id: 'ralphie',
      name: 'Ralphie',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 0.25 },
      batting: [0.194, 0.22, 0.234, 0.242, 0.291, 0.474, 0.777, 1.0]
    },
    {
      id: 'rocky',
      name: 'Rocky',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 2.5 },
      batting: [0.189, 0.24, 0.257, 0.279, 0.356, 0.521, 0.799, 1.0]
    },
    {
      id: 'snoopy',
      name: 'Snoopy',
      positions: ['2B', 'SS', 'RF'],
      attributes: { battingStarPower: 3 },
      batting: [0.177, 0.224, 0.225, 0.269, 0.394, 0.626, 0.846, 1.0]
    },
    {
      id: 'spot',
      name: 'Spot',
      positions: ['1B'],
      attributes: { battingStarPower: 4.3 },
      batting: [0.139, 0.175, 0.176, 0.256, 0.426, 0.731, 0.901, 1.0]
    },
    {
      id: 'stoutland',
      name: 'Stoutland',
      positions: ['C'],
      attributes: {
        battingStarPower: 0
      },
      batting: [0.149, 0.169, 0.17, 0.209, 0.261, 0.531, 0.812, 1.0]
    },
    {
      id: 'sweetness',
      name: 'Sweetness',
      positions: ['C', '1B', '3B'],
      attributes: { battingStarPower: 4 },
      batting: [0.14, 0.18, 0.181, 0.257, 0.406, 0.723, 0.896, 1.0]
    }
  ] as PlayerJson[]
}

const dogPlayers = dogsJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

export const tempDogs = new Team({
  name: 'Dogs',
  primaryColor: '#79443B',
  secondaryColor: '#E3DAC9',
  roster: dogPlayers
})

tempDogs.setStarters([
  {
    playerId: idForName(dogPlayers, 'Rocky'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(dogPlayers, 'Cocoa'),
    position: Position.SHORTSTOP
  },
  { playerId: idForName(dogPlayers, 'Snoopy'), position: Position.RIGHT_FIELD },
  {
    playerId: idForName(dogPlayers, 'Spot'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(dogPlayers, 'Sweetness'),
    position: Position.THIRD_BASE
  },
  {
    playerId: idForName(dogPlayers, 'Cocker'),
    position: Position.SECOND_BASE
  },
  { playerId: idForName(dogPlayers, 'Stoutland'), position: Position.CATCHER },
  {
    playerId: idForName(dogPlayers, 'Puppy'),
    position: Position.PITCHER
  },
  {
    playerId: idForName(dogPlayers, 'Ralphie'),
    position: Position.LEFT_FIELD
  }
])
