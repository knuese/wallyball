import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const birdsJson = {
  name: 'Birds',
  primaryColor: '#007FFF',
  secondaryColor: '#89CFF0',
  players: [
    {
      name: 'Eagly',
      positions: ['1B', '3B'],
      attributes: { battingStarPower: 3.1 },
      batting: [0.187, 0.229, 0.23, 0.279, 0.412, 0.67, 0.871, 1.0]
    },
    {
      name: 'Goose',
      positions: ['2B', 'SS', '3B'],
      attributes: { battingStarPower: 3.3 },
      batting: [0.174, 0.229, 0.23, 0.274, 0.411, 0.63, 0.862, 1.0]
    },
    {
      name: 'Paz',
      positions: ['P'],
      attributes: {
        battingStarPower: 3.5,
        pitchingStarPower: 3,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.167, 0.227, 0.228, 0.284, 0.426, 0.696, 0.895, 1.0],
      pitching: [0.182, 0.216, 0.217, 0.239, 0.303, 0.517, 0.715, 1.0]
    },
    {
      name: 'Quackers',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 3 },
      batting: [0.232, 0.294, 0.326, 0.341, 0.386, 0.554, 0.822, 1.0]
    },
    {
      name: 'Quacky',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 2.75 },
      batting: [0.222, 0.272, 0.289, 0.314, 0.371, 0.556, 0.838, 1.0]
    },
    {
      name: 'Screech',
      positions: ['C', '1B'],
      attributes: {
        battingStarPower: 3
      },
      batting: [0.16, 0.199, 0.2, 0.259, 0.389, 0.676, 0.856, 1.0]
    },
    {
      name: 'Stretch',
      positions: ['C', '2B', 'SS', 'RF'],
      attributes: { battingStarPower: 2 },
      batting: [0.175, 0.227, 0.231, 0.266, 0.376, 0.591, 0.847, 1.0]
    },
    {
      name: 'Wadell',
      positions: ['LF', 'RF'],
      attributes: { battingStarPower: 0 },
      batting: [0.145, 0.157, 0.158, 0.162, 0.194, 0.306, 0.712, 1.0]
    },
    {
      name: 'Weiser',
      positions: ['1B', '2B', 'SS', '3B'],
      attributes: { battingStarPower: 3 },
      batting: [0.189, 0.249, 0.25, 0.292, 0.423, 0.671, 0.884, 1.0]
    }
  ] as PlayerJson[]
}

const birdPlayers = birdsJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

const birdMap = birdPlayers.reduce(
  (acc, cur: Player) => ({ ...acc, [cur.id]: cur }),
  {}
) as Record<string, Player>

export const tempBirds = new Team({
  name: 'Birds',
  primaryColor: '#007FFF',
  secondaryColor: '#89CFF0',
  roster: birdMap
})

tempBirds.setStarters([
  {
    playerId: idForName(birdPlayers, 'Quackers'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(birdPlayers, 'Quacky'),
    position: Position.LEFT_FIELD
  },
  { playerId: idForName(birdPlayers, 'Eagly'), position: Position.THIRD_BASE },
  {
    playerId: idForName(birdPlayers, 'Paz'),
    position: Position.PITCHER
  },
  {
    playerId: idForName(birdPlayers, 'Goose'),
    position: Position.SHORTSTOP
  },
  {
    playerId: idForName(birdPlayers, 'Screech'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(birdPlayers, 'Weiser'),
    position: Position.SECOND_BASE
  },
  {
    playerId: idForName(birdPlayers, 'Stretch'),
    position: Position.CATCHER
  },
  {
    playerId: idForName(birdPlayers, 'Wadell'),
    position: Position.RIGHT_FIELD
  }
])
