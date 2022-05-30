import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const ugs = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Ugs',
    primaryColor: '#E79FC4',
    secondaryColor: '#F400A1',
    roster: [
      new Player({
        id: 'abima',
        name: 'Abima',
        positions: ['RF'],
        attributes: { battingStarPower: 2 },
        batting: [0.195, 0.237, 0.24, 0.271, 0.372, 0.548, 0.801, 1.0],
        stats: stats.abima
      }),
      new Player({
        id: 'babo',
        name: 'Babo',
        positions: ['3B'],
        attributes: { battingStarPower: 2 },
        batting: [0.182, 0.22, 0.221, 0.259, 0.366, 0.579, 0.81, 1.0],
        stats: stats.babo
      }),
      new Player({
        id: 'bigtoe',
        name: 'Bigtoe',
        positions: ['1B'],
        attributes: { battingStarPower: 2 },
        batting: [0.187, 0.22, 0.221, 0.264, 0.386, 0.61, 0.829, 1.0],
        stats: stats.bigtoe
      }),
      new Player({
        id: 'chuckanucka',
        name: 'Chuckanucka',
        positions: ['2B'],
        attributes: { battingStarPower: 2 },
        batting: [0.175, 0.22, 0.221, 0.261, 0.374, 0.591, 0.816, 1.0],
        stats: stats.chuckanucka
      }),
      new Player({
        id: 'cinko',
        name: 'Cinko',
        positions: ['P'],
        attributes: {
          battingStarPower: 0,
          pitchingStarPower: 4.67,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.099, 0.117, 0.118, 0.12, 0.157, 0.269, 0.678, 1.0],
        pitching: [0.168, 0.189, 0.19, 0.207, 0.271, 0.528, 0.722, 1.0],
        stats: stats.cinko
      }),
      new Player({
        id: 'moxy',
        name: 'Moxy',
        positions: ['LF'],
        attributes: { battingStarPower: 2 },
        batting: [0.212, 0.252, 0.262, 0.279, 0.357, 0.511, 0.756, 1.0],
        stats: stats.moxy
      }),
      new Player({
        id: 'uglydog',
        name: 'Uglydog',
        positions: ['CF'],
        attributes: { battingStarPower: 2 },
        batting: [0.219, 0.267, 0.291, 0.297, 0.362, 0.496, 0.769, 1.0],
        stats: stats.uglydog
      }),
      new Player({
        id: 'wage',
        name: 'Wage',
        positions: ['SS'],
        attributes: { battingStarPower: 2 },
        batting: [0.179, 0.222, 0.224, 0.269, 0.394, 0.625, 0.832, 1.0],
        stats: stats.wage
      }),
      new Player({
        id: 'wedgehead',
        name: 'Wedgehead',
        positions: ['C'],
        attributes: { battingStarPower: 2 },
        batting: [0.179, 0.222, 0.223, 0.269, 0.394, 0.625, 0.812, 1.0],
        stats: stats.wedgehead
      })
    ],
    defaultLineup: {
      uglydog: 'CF',
      moxy: 'LF',
      abima: 'RF',
      wedgehead: 'C',
      bigtoe: '1B',
      chuckanucka: '2B',
      babo: '3B',
      wage: 'SS',
      cinko: 'P'
    }
  })

export default ugs
