import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const seals = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Seals',
    primaryColor: '#BBB477',
    secondaryColor: '#444C38',
    roster: [
      new Player({
        id: 'bj',
        name: 'BJ',
        positions: ['RF'],
        attributes: { battingStarPower: 0 },
        batting: [0.046, 0.047, 0.048, 0.049, 0.067, 0.276, 0.638, 1.0],
        stats: stats.bj
      }),
      new Player({
        id: 'bamboo',
        name: 'Bamboo',
        positions: ['P'],
        attributes: {
          battingStarPower: 0,
          pitchingStarPower: 4.6,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.066, 0.071, 0.072, 0.074, 0.117, 0.374, 0.687, 1.0],
        pitching: [0.17, 0.199, 0.2, 0.222, 0.275, 0.554, 0.717, 1.0],
        stats: stats.bamboo
      }),
      new Player({
        id: 'hs',
        name: 'H.S.',
        positions: ['LF', 'CF', 'RF'],
        attributes: { battingStarPower: 1.5 },
        batting: [0.217, 0.271, 0.299, 0.312, 0.364, 0.538, 0.769, 1.0],
        stats: stats.hs
      }),
      new Player({
        id: 'misty',
        name: 'Misty',
        positions: ['LF', 'RF'],
        attributes: {
          battingStarPower: 2.2
        },
        batting: [0.195, 0.254, 0.264, 0.296, 0.386, 0.585, 0.792, 1.0],
        stats: stats.misty
      }),
      new Player({
        id: 'moomoo',
        name: 'Moo Moo',
        positions: ['C', '1B', '3B'],
        attributes: { battingStarPower: 3.6 },
        batting: [0.152, 0.21, 0.215, 0.276, 0.421, 0.71, 0.855, 1.0],
        stats: stats.moomoo
      }),
      new Player({
        id: 'sue',
        name: 'Sue',
        positions: ['C', 'P'],
        attributes: { battingStarPower: 3.5 },
        batting: [0.137, 0.177, 0.178, 0.244, 0.394, 0.705, 0.852, 1.0],
        stats: stats.sue
      }),
      new Player({
        id: 'wally',
        name: 'Wally',
        positions: ['2B', 'SS', '3B'],
        attributes: { battingStarPower: 4 },
        batting: [0.18, 0.244, 0.251, 0.287, 0.434, 0.68, 0.84, 1.0],
        stats: stats.wally
      }),
      new Player({
        id: 'walrein',
        name: 'Walrein',
        positions: ['C', '1B'],
        attributes: { battingStarPower: 0.1 },
        batting: [0.139, 0.147, 0.148, 0.199, 0.234, 0.596, 0.798, 1.0],
        stats: stats.walrein
      }),
      new Player({
        id: 'willy',
        name: 'Willy',
        positions: ['2B', 'SS', '3B'],
        attributes: { battingStarPower: 3.75 },
        batting: [0.175, 0.225, 0.228, 0.274, 0.426, 0.686, 0.843, 1.0],
        stats: stats.willy
      })
    ]
  })

export default seals
