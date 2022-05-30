import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const monkeys = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Monkeys',
    primaryColor: '#4B5320',
    secondaryColor: '#FDEE00',
    roster: [
      new Player({
        id: 'cg',
        name: 'C.G.',
        positions: ['P'],
        attributes: {
          battingStarPower: 0,
          pitchingStarPower: 5,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.077, 0.081, 0.082, 0.083, 0.101, 0.242, 0.667, 1.0],
        pitching: [0.17, 0.188, 0.189, 0.205, 0.261, 0.519, 0.715, 1.0],
        stats: stats.cg
      }),
      new Player({
        id: 'capps',
        name: 'Capps',
        positions: ['1B'],
        attributes: { battingStarPower: 3.6 },
        batting: [0.17, 0.202, 0.203, 0.262, 0.392, 0.676, 0.85, 1.0],
        stats: stats.capps
      }),
      new Player({
        id: 'cheeks',
        name: 'Cheeks',
        positions: ['SS'],
        attributes: { battingStarPower: 2 },
        batting: [0.185, 0.215, 0.217, 0.239, 0.322, 0.554, 0.808, 1.0],
        stats: stats.cheeks
      }),
      new Player({
        id: 'eddie',
        name: 'Eddie',
        positions: ['RF'],
        attributes: { battingStarPower: 0 },
        batting: [0.136, 0.146, 0.147, 0.15, 0.184, 0.299, 0.689, 1.0],
        stats: stats.eddie
      }),
      new Player({
        id: 'frank',
        name: 'Frank',
        positions: ['2B'],
        attributes: { battingStarPower: 3.45 },
        batting: [0.187, 0.234, 0.236, 0.279, 0.381, 0.567, 0.802, 1.0],
        stats: stats.frank
      }),
      new Player({
        id: 'mt',
        name: 'M.T.',
        positions: ['LF'],
        attributes: { battingStarPower: 2 },
        batting: [0.199, 0.237, 0.242, 0.266, 0.347, 0.508, 0.777, 1.0],
        stats: stats.mt
      }),
      new Player({
        id: 'nnm',
        name: 'NNM',
        positions: ['C'],
        attributes: { battingStarPower: 3 },
        batting: [0.167, 0.204, 0.205, 0.259, 0.376, 0.65, 0.838, 1.0],
        stats: stats.nnm
      }),
      new Player({
        id: 'panzi',
        name: 'Panzi',
        positions: ['CF'],
        attributes: { battingStarPower: 3 },
        batting: [0.224, 0.276, 0.302, 0.319, 0.389, 0.63, 0.815, 1.0],
        stats: stats.panzi
      }),
      new Player({
        id: 'sm',
        name: 'S.M.',
        positions: ['3B'],
        attributes: { battingStarPower: 3 },
        batting: [0.199, 0.249, 0.256, 0.291, 0.394, 0.625, 0.812, 1.0],
        stats: stats.sm
      })
    ],
    defaultLineup: {
      panzi: 'CF',
      sm: '3B',
      frank: '2B',
      capps: '1B',
      nnm: 'C',
      mt: 'LF',
      cheeks: 'SS',
      eddie: 'RF',
      cg: 'P'
    }
  })

export default monkeys
