import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const bjsJson = {
  name: 'Bjs',
  primaryColor: '#856088',
  secondaryColor: '#DE6FA1',
  players: [
    {
      name: 'BJ 1',
      positions: ['1B'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'BJ 2',
      positions: ['2B'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'BJ 3',
      positions: ['3B'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'BJ 4',
      positions: ['SS'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'BJ 5',
      positions: ['CF'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'BJ 6',
      positions: ['LF'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'BJ 7',
      positions: ['RF'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'BJ 8',
      positions: ['C'],
      attributes: { battingStarPower: 0 },
      batting: [0.046, 0.048, 0.049, 0.05, 0.067, 0.276, 0.638, 1.0]
    },
    {
      name: 'Paul',
      positions: ['P'],
      attributes: {
        battingStarPower: 0,
        pitchingStarPower: 1,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.078, 0.083, 0.084, 0.085, 0.119, 0.381, 0.69, 1.0],
      pitching: [0.194, 0.234, 0.235, 0.255, 0.3, 0.529, 0.717, 1.0]
    }
  ] as PlayerJson[]
}

const bjPlayers = bjsJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

const bjMap = bjPlayers.reduce(
  (acc, cur: Player) => ({ ...acc, [cur.id]: cur }),
  {}
) as Record<string, Player>

export const tempBjs = new Team({
  name: 'Bjs',
  primaryColor: '#856088',
  secondaryColor: '#DE6FA1',
  roster: bjMap
})

tempBjs.setStarters([
  {
    playerId: idForName(bjPlayers, 'BJ 1'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(bjPlayers, 'BJ 2'),
    position: Position.SECOND_BASE
  },
  { playerId: idForName(bjPlayers, 'BJ 3'), position: Position.THIRD_BASE },
  {
    playerId: idForName(bjPlayers, 'BJ 4'),
    position: Position.SHORTSTOP
  },
  {
    playerId: idForName(bjPlayers, 'BJ 5'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(bjPlayers, 'BJ 6'),
    position: Position.LEFT_FIELD
  },
  { playerId: idForName(bjPlayers, 'BJ 7'), position: Position.RIGHT_FIELD },
  {
    playerId: idForName(bjPlayers, 'BJ 8'),
    position: Position.CATCHER
  },
  {
    playerId: idForName(bjPlayers, 'Paul'),
    position: Position.PITCHER
  }
])
