import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const turtlesJson = {
  name: 'Turtles',
  primaryColor: '#007F5C',
  secondaryColor: '#A7FC00',
  players: [
    {
      id: 'browny',
      name: 'Browny',
      positions: ['1B', 'C'],
      attributes: { battingStarPower: 4 },
      batting: [0.122, 0.15, 0.151, 0.24, 0.426, 0.767, 0.901, 1.0]
    },
    {
      id: 'chan',
      name: 'Chan',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 5 },
      batting: [0.187, 0.262, 0.279, 0.346, 0.509, 0.773, 0.903, 1.0]
    },
    {
      id: 'cookie',
      name: 'Cookie',
      positions: ['2B', '3B', 'RF'],
      attributes: { battingStarPower: 0.5 },
      batting: [0.204, 0.242, 0.243, 0.267, 0.331, 0.496, 0.799, 1.0]
    },
    {
      id: 'gary',
      name: 'Gary',
      positions: ['P', 'SS'],
      attributes: {
        battingStarPower: 0,
        pitchingStarPower: 5,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.164, 0.195, 0.197, 0.209, 0.281, 0.451, 0.756, 1.0],
      pitching: [0.166, 0.185, 0.186, 0.201, 0.26, 0.5, 0.777, 1.0]
    },
    {
      id: 'george',
      name: 'George',
      positions: ['P', 'SS'],
      attributes: { battingStarPower: 0.25 },
      batting: [0.172, 0.207, 0.209, 0.229, 0.307, 0.509, 0.791, 1.0]
    },
    {
      id: 'glen',
      name: 'Glen',
      positions: ['2B', 'SS', '3B'],
      attributes: { battingStarPower: 1.5 },
      batting: [0.182, 0.24, 0.244, 0.276, 0.377, 0.581, 0.833, 1.0]
    },
    {
      id: 'guss',
      name: 'Guss',
      positions: ['1B', '3B'],
      attributes: { battingStarPower: 4.1 },
      batting: [0.135, 0.167, 0.168, 0.251, 0.429, 0.763, 0.904, 1.0]
    },
    {
      id: 'shells',
      name: 'Shells',
      positions: ['C', 'P'],
      attributes: { battingStarPower: 2.75 },
      batting: [0.16, 0.197, 0.198, 0.269, 0.419, 0.741, 0.902, 1.0]
    },
    {
      id: 'zoona',
      name: 'Zoona',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 2 },
      batting: [0.23, 0.279, 0.304, 0.321, 0.367, 0.541, 0.824, 1.0]
    }
  ] as PlayerJson[]
}

const turtlePlayers = turtlesJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

export const tempTurtles = new Team({
  name: 'Turtles',
  primaryColor: '#007F5C',
  secondaryColor: '#A7FC00',
  roster: turtlePlayers
})

tempTurtles.setStarters([
  {
    playerId: idForName(turtlePlayers, 'Zoona'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(turtlePlayers, 'Chan'),
    position: Position.LEFT_FIELD
  },
  {
    playerId: idForName(turtlePlayers, 'Guss'),
    position: Position.THIRD_BASE
  },
  {
    playerId: idForName(turtlePlayers, 'Browny'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(turtlePlayers, 'Shells'),
    position: Position.CATCHER
  },
  {
    playerId: idForName(turtlePlayers, 'Glen'),
    position: Position.SECOND_BASE
  },
  {
    playerId: idForName(turtlePlayers, 'Cookie'),
    position: Position.RIGHT_FIELD
  },
  {
    playerId: idForName(turtlePlayers, 'George'),
    position: Position.SHORTSTOP
  },
  { playerId: idForName(turtlePlayers, 'Gary'), position: Position.PITCHER }
])
