import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const aquatiques = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Aquatiques',
    primaryColor: '#006DB0',
    secondaryColor: '#20B2AA',
    roster: [
      new Player({
        id: 'bruce',
        name: 'Bruce',
        positions: ['LF', 'CF', 'RF'],
        attributes: { battingStarPower: 2 },
        batting: [0.219, 0.269, 0.296, 0.312, 0.377, 0.546, 0.802, 1.0],
        stats: stats.bruce
      }),
      new Player({
        id: 'crunch',
        name: 'Crunch',
        positions: ['C'],
        attributes: { battingStarPower: 2 },
        batting: [0.174, 0.21, 0.215, 0.256, 0.347, 0.595, 0.816, 1.0],
        stats: stats.crunch
      }),
      new Player({
        id: 'fks',
        name: 'F.K.S.',
        positions: ['RF'],
        attributes: { battingStarPower: 1.1 },
        batting: [0.204, 0.235, 0.239, 0.257, 0.341, 0.506, 0.777, 1.0],
        stats: stats.fks
      }),
      new Player({
        id: 'jerryd',
        name: 'Jerryd',
        positions: ['2B', 'LF'],
        attributes: { battingStarPower: 3.75 },
        batting: [0.189, 0.247, 0.262, 0.297, 0.399, 0.631, 0.828, 1.0],
        stats: stats.jerryd
      }),
      new Player({
        id: 'salty',
        name: 'Salty',
        positions: ['2B'],
        attributes: { battingStarPower: 1.25 },
        batting: [0.202, 0.235, 0.239, 0.261, 0.342, 0.543, 0.812, 1.0],
        stats: stats.salty
      }),
      new Player({
        id: 'schwartz',
        name: 'Schwartz',
        positions: ['P'],
        attributes: {
          battingStarPower: 0,
          pitchingStarPower: 4.8,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.117, 0.129, 0.13, 0.132, 0.179, 0.309, 0.666, 1.0],
        pitching: [0.17, 0.189, 0.19, 0.209, 0.267, 0.522, 0.721, 1.0],
        stats: stats.schwartz
      }),
      new Player({
        id: 'seamus',
        name: 'Seamus',
        positions: ['3B'],
        attributes: { battingStarPower: 2.55 },
        batting: [0.18, 0.222, 0.224, 0.269, 0.366, 0.607, 0.821, 1.0],
        stats: stats.seamus
      }),
      new Player({
        id: 'wailord',
        name: 'Wailord',
        positions: ['1B'],
        attributes: { battingStarPower: 4 },
        batting: [0.129, 0.162, 0.163, 0.24, 0.372, 0.711, 0.855, 1.0],
        stats: stats.wailord
      }),
      new Player({
        id: 'whale',
        name: 'Whale',
        positions: ['SS'],
        attributes: { battingStarPower: 3.66 },
        batting: [0.175, 0.227, 0.23, 0.279, 0.392, 0.641, 0.831, 1.0],
        stats: stats.whale
      })
    ],
    defaultLineup: {
      bruce: 'CF',
      jerryd: 'LF',
      whale: 'SS',
      wailord: '1B',
      seamus: '3B',
      crunch: 'C',
      salty: '2B',
      fks: 'RF',
      schwartz: 'P'
    }
  })

export default aquatiques
