import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const bamboosJson = {
  name: 'Bamboos',
  primaryColor: '#A50B5E',
  secondaryColor: '#1B1B1B',
  players: [
    {
      id: 'bamboo1',
      name: 'BAMBOO 1',
      positions: ['1B'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo2',
      name: 'BAMBOO 2',
      positions: ['2B'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo3',
      name: 'BAMBOO 3',
      positions: ['3B'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo4',
      name: 'BAMBOO 4',
      positions: ['SS'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo5',
      name: 'BAMBOO 5',
      positions: ['CF'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo6',
      name: 'BAMBOO 6',
      positions: ['LF'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo7',
      name: 'BAMBOO 7',
      positions: ['RF'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo8',
      name: 'BAMBOO 8',
      positions: ['C'],
      attributes: { battingStarPower: 0 },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0]
    },
    {
      id: 'bamboo9',
      name: 'BAMBOO 9',
      positions: ['P'],
      attributes: {
        battingStarPower: 0,
        pitchingStarPower: 5,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0],
      pitching: [0.17, 0.199, 0.2, 0.222, 0.275, 0.554, 0.717, 1.0]
    }
  ] as PlayerJson[]
}

const bambooPlayers = bamboosJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

const bambooMap = bambooPlayers.reduce(
  (acc, cur: Player) => ({ ...acc, [cur.id]: cur }),
  {}
) as Record<string, Player>

export const tempBamboos = new Team({
  name: 'Bamboos',
  primaryColor: '#A50B5E',
  secondaryColor: '#1B1B1B',
  roster: bambooMap
})

tempBamboos.setStarters([
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 1'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 2'),
    position: Position.SECOND_BASE
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 3'),
    position: Position.THIRD_BASE
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 4'),
    position: Position.SHORTSTOP
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 5'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 6'),
    position: Position.LEFT_FIELD
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 7'),
    position: Position.RIGHT_FIELD
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 8'),
    position: Position.CATCHER
  },
  {
    playerId: idForName(bambooPlayers, 'BAMBOO 9'),
    position: Position.PITCHER
  }
])
