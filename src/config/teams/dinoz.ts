import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const dinoz = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Dinoz',
    primaryColor: '#733380',
    secondaryColor: '#D92121',
    roster: [
      new Player({
        id: 'biggeen',
        name: 'Biggeen',
        positions: ['1B'],
        attributes: { battingStarPower: 4.25 },
        batting: [0.125, 0.155, 0.156, 0.251, 0.418, 0.788, 0.901, 1.0],
        stats: stats.biggeen
      }),
      new Player({
        id: 'chip',
        name: 'Chip',
        positions: ['C'],
        attributes: { battingStarPower: 3 },
        batting: [0.142, 0.167, 0.168, 0.24, 0.356, 0.706, 0.875, 1.0],
        stats: stats.chip
      }),
      new Player({
        id: 'dip',
        name: 'Dip',
        positions: ['3B'],
        attributes: { battingStarPower: 3 },
        batting: [0.145, 0.177, 0.178, 0.245, 0.349, 0.688, 0.856, 1.0],
        stats: stats.dip
      }),
      new Player({
        id: 'greend',
        name: 'Green D.',
        positions: ['LF'],
        attributes: { battingStarPower: 2.25 },
        batting: [0.187, 0.23, 0.234, 0.266, 0.357, 0.603, 0.801, 1.0],
        stats: stats.greend
      }),
      new Player({
        id: 'lbd',
        name: 'LBD',
        positions: ['RF'],
        attributes: { battingStarPower: 0.25 },
        batting: [0.147, 0.16, 0.161, 0.169, 0.204, 0.371, 0.722, 1.0],
        stats: stats.lbd
      }),
      new Player({
        id: 'nickbutter',
        name: 'Nick Butter',
        positions: ['CF'],
        attributes: { battingStarPower: 3 },
        batting: [0.24, 0.302, 0.327, 0.337, 0.411, 0.514, 0.787, 1.0],
        stats: stats.nickbutter
      }),
      new Player({
        id: 'reshiram',
        name: 'Reshiram',
        positions: ['2B'],
        attributes: { battingStarPower: 3.5 },
        batting: [0.163, 0.197, 0.198, 0.262, 0.382, 0.76, 0.881, 1.0],
        stats: stats.reshiram
      }),
      new Player({
        id: 'venusaur',
        name: 'Venusaur',
        positions: ['P'],
        attributes: {
          battingStarPower: 0,
          pitchingStarPower: 3,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.132, 0.142, 0.143, 0.147, 0.18, 0.429, 0.715, 1.0],
        pitching: [0.172, 0.218, 0.219, 0.244, 0.3, 0.537, 0.74, 1.0],
        stats: stats.venusaur
      }),
      new Player({
        id: 'zekrom',
        name: 'Zekrom',
        positions: ['SS'],
        attributes: { battingStarPower: 3.5 },
        batting: [0.167, 0.204, 0.205, 0.267, 0.384, 0.752, 0.876, 1.0],
        stats: stats.zekrom
      })
    ],
    defaultLineup: {
      nickbutter: 'CF',
      zekrom: 'SS',
      reshiram: '2B',
      biggeen: '1B',
      chip: 'C',
      dip: '3B',
      greend: 'LF',
      lbd: 'RF',
      venusaur: 'P'
    }
  })

export default dinoz
