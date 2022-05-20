import { idForName, PlayerJson } from './util'
import { Player, Position, Team } from '../../../model'

const catsJson = {
  name: 'Cats',
  primaryColor: '#54626F',
  secondaryColor: '#FFE4C4',
  players: [
    {
      id: 'bo',
      name: 'Bo',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 1.5 },
      batting: [0.256, 0.317, 0.346, 0.354, 0.402, 0.523, 0.777, 1.0]
    },
    {
      id: 'bobby',
      name: 'Bobby',
      positions: ['C', '1B', '3B'],
      attributes: { battingStarPower: 2 },
      batting: [0.149, 0.182, 0.183, 0.242, 0.337, 0.636, 0.839, 1.0]
    },
    {
      id: 'clo',
      name: 'Clo',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 0 },
      batting: [0.177, 0.207, 0.21, 0.224, 0.266, 0.419, 0.738, 1.0]
    },
    {
      id: 'gina',
      name: 'Gina',
      positions: ['LF', 'CF', 'RF'],
      attributes: { battingStarPower: 0 },
      batting: [0.182, 0.215, 0.219, 0.232, 0.279, 0.424, 0.751, 1.0]
    },
    {
      id: 'gordon',
      name: 'Gordon',
      positions: ['C', '1B', '3B'],
      attributes: { battingStarPower: 2 },
      batting: [0.152, 0.182, 0.183, 0.244, 0.337, 0.64, 0.867, 1.0]
    },
    {
      id: 'lars',
      name: 'Lars',
      positions: ['2B', 'SS'],
      attributes: { battingStarPower: 3 },
      batting: [0.197, 0.249, 0.251, 0.281, 0.364, 0.568, 0.839, 1.0]
    },
    {
      id: 'lyelye',
      name: 'Lye Lye',
      positions: ['1B', '3B'],
      attributes: { battingStarPower: 5 },
      batting: [0.164, 0.234, 0.243, 0.329, 0.508, 0.848, 0.931, 1.0]
    },
    {
      id: 'mamamac',
      name: 'Mama Mac',
      positions: ['P'],
      attributes: {
        battingStarPower: 0,
        pitchingStarPower: 4.4,
        fatigue: (ip: number) => 0.227576 * ip - 0.289091
      },
      batting: [0.102, 0.122, 0.123, 0.129, 0.162, 0.332, 0.762, 1.0],
      pitching: [0.17, 0.19, 0.191, 0.207, 0.261, 0.517, 0.741, 1.0]
    },
    {
      id: 'tajee',
      name: 'Tajee',
      positions: ['2B', 'SS'],
      attributes: { battingStarPower: 3.25 },
      batting: [0.177, 0.214, 0.215, 0.261, 0.374, 0.601, 0.859, 1.0]
    }
  ] as PlayerJson[]
}

const catPlayers = catsJson.players.map(
  (config: PlayerJson) => new Player(config)
) as Player[]

const catMap = catPlayers.reduce(
  (acc, cur: Player) => ({ ...acc, [cur.id]: cur }),
  {}
) as Record<string, Player>

export const tempCats = new Team({
  name: 'Cats',
  primaryColor: '#54626F',
  secondaryColor: '#FFE4C4',
  roster: catMap
})

tempCats.setStarters([
  {
    playerId: idForName(catPlayers, 'Bo'),
    position: Position.CENTER_FIELD
  },
  {
    playerId: idForName(catPlayers, 'Lars'),
    position: Position.SHORTSTOP
  },
  { playerId: idForName(catPlayers, 'Tajee'), position: Position.SECOND_BASE },
  {
    playerId: idForName(catPlayers, 'Lye Lye'),
    position: Position.FIRST_BASE
  },
  {
    playerId: idForName(catPlayers, 'Gordon'),
    position: Position.CATCHER
  },
  {
    playerId: idForName(catPlayers, 'Bobby'),
    position: Position.THIRD_BASE
  },
  { playerId: idForName(catPlayers, 'Gina'), position: Position.LEFT_FIELD },
  {
    playerId: idForName(catPlayers, 'Clo'),
    position: Position.RIGHT_FIELD
  },
  {
    playerId: idForName(catPlayers, 'Mama Mac'),
    position: Position.PITCHER
  }
])
