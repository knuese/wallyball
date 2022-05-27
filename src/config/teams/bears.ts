import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const bears = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Bears',
    primaryColor: '#841B2D',
    secondaryColor: '#DEB887',
    roster: [
      new Player({
        id: 'bobo',
        name: 'Bo Bo',
        positions: ['1B'],
        attributes: { battingStarPower: 3.1 },
        batting: [0.132, 0.164, 0.165, 0.245, 0.409, 0.738, 0.887, 1.0],
        stats: stats.bobo
      }),
      new Player({
        id: 'buster',
        name: 'Buster',
        positions: ['2B', 'SS', '3B', 'RF', 'LF'],
        attributes: { battingStarPower: 3.3 },
        batting: [0.187, 0.251, 0.264, 0.302, 0.409, 0.658, 0.874, 1.0],
        stats: stats.buster
      }),
      new Player({
        id: 'cappy',
        name: 'Cappy',
        positions: ['2B', 'SS', '3B'],
        attributes: { battingStarPower: 2 },
        batting: [0.162, 0.209, 0.211, 0.254, 0.366, 0.628, 0.869, 1.0],
        stats: stats.cappy
      }),
      new Player({
        id: 'cupcake',
        name: 'Cupcake',
        positions: ['P', '2B', 'CF'],
        attributes: { battingStarPower: 2 },
        batting: [0.174, 0.23, 0.236, 0.267, 0.372, 0.585, 0.842, 1.0],
        stats: stats.cupcake
      }),
      new Player({
        id: 'sammy',
        name: 'Sammy',
        positions: ['LF', 'CF', 'RF'],
        attributes: { battingStarPower: 1 },
        batting: [0.209, 0.261, 0.282, 0.294, 0.352, 0.491, 0.805, 1.0],
        stats: stats.sammy
      }),
      new Player({
        id: 'september',
        name: 'September',
        positions: ['P'],
        attributes: {
          battingStarPower: 0,
          pitchingStarPower: 4.25,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.13, 0.157, 0.158, 0.164, 0.184, 0.342, 0.724, 1.0],
        pitching: [0.175, 0.194, 0.195, 0.213, 0.268, 0.506, 0.715, 1.0],
        stats: stats.september
      }),
      new Player({
        id: 'spanky',
        name: 'Spanky',
        positions: ['P', '1B', '3B'],
        attributes: { battingStarPower: 3.9 },
        batting: [0.162, 0.212, 0.213, 0.274, 0.409, 0.72, 0.896, 1.0],
        stats: stats.spanky
      }),
      new Player({
        id: 'sparey',
        name: 'Sparey',
        positions: ['2B', '3B'],
        attributes: { battingStarPower: 2.5 },
        batting: [0.182, 0.222, 0.223, 0.264, 0.387, 0.658, 0.888, 1.0],
        stats: stats.sparey
      }),
      new Player({
        id: 'tush',
        name: 'Tush',
        positions: ['P', 'C'],
        attributes: { battingStarPower: 4.5 },
        batting: [0.214, 0.269, 0.271, 0.324, 0.456, 0.733, 0.902, 1.0],
        stats: stats.tush
      })
    ]
  })

export default bears
