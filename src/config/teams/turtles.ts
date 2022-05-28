import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const turtles = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Turtles',
    primaryColor: '#007F5C',
    secondaryColor: '#A7FC00',
    roster: [
      new Player({
        id: 'browny',
        name: 'Browny',
        positions: ['1B'],
        attributes: { battingStarPower: 4 },
        batting: [0.122, 0.15, 0.151, 0.24, 0.426, 0.767, 0.901, 1.0],
        stats: stats.browny
      }),
      new Player({
        id: 'chan',
        name: 'Chan',
        positions: ['LF'],
        attributes: { battingStarPower: 5 },
        batting: [0.187, 0.262, 0.279, 0.346, 0.509, 0.773, 0.903, 1.0],
        stats: stats.chan
      }),
      new Player({
        id: 'cookie',
        name: 'Cookie',
        positions: ['RF'],
        attributes: { battingStarPower: 0.5 },
        batting: [0.204, 0.242, 0.243, 0.267, 0.331, 0.496, 0.799, 1.0],
        stats: stats.cookie
      }),
      new Player({
        id: 'gary',
        name: 'Gary',
        positions: ['P'],
        attributes: {
          battingStarPower: 0,
          pitchingStarPower: 5,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.164, 0.195, 0.197, 0.209, 0.281, 0.451, 0.756, 1.0],
        pitching: [0.166, 0.185, 0.186, 0.201, 0.26, 0.5, 0.777, 1.0],
        stats: stats.gary
      }),
      new Player({
        id: 'george',
        name: 'George',
        positions: ['SS'],
        attributes: { battingStarPower: 0.25 },
        batting: [0.172, 0.207, 0.209, 0.229, 0.307, 0.509, 0.791, 1.0],
        stats: stats.george
      }),
      new Player({
        id: 'glen',
        name: 'Glen',
        positions: ['2B'],
        attributes: { battingStarPower: 1.5 },
        batting: [0.182, 0.24, 0.244, 0.276, 0.377, 0.581, 0.833, 1.0],
        stats: stats.glen
      }),
      new Player({
        id: 'guss',
        name: 'Guss',
        positions: ['3B'],
        attributes: { battingStarPower: 4.1 },
        batting: [0.135, 0.167, 0.168, 0.251, 0.429, 0.763, 0.904, 1.0],
        stats: stats.guss
      }),
      new Player({
        id: 'shells',
        name: 'Shells',
        positions: ['C'],
        attributes: { battingStarPower: 2.75 },
        batting: [0.16, 0.197, 0.198, 0.269, 0.419, 0.741, 0.902, 1.0],
        stats: stats.shells
      }),
      new Player({
        id: 'zoona',
        name: 'Zoona',
        positions: ['CF'],
        attributes: { battingStarPower: 2 },
        batting: [0.23, 0.279, 0.304, 0.321, 0.367, 0.541, 0.824, 1.0],
        stats: stats.zoona
      })
    ],
    defaultLineup: {
      zoona: 'CF',
      chan: 'LF',
      guss: '3B',
      browny: '1B',
      shells: 'C',
      glen: '2B',
      cookie: 'RF',
      george: 'SS',
      gary: 'P'
    }
  })

export default turtles
