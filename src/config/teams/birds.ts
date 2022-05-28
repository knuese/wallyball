import { Player, Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

const birds = (stats: Record<string, PlayerStats>) =>
  new Team({
    name: 'Birds',
    primaryColor: '#007FFF',
    secondaryColor: '#89CFF0',
    roster: [
      new Player({
        id: 'eagly',
        name: 'Eagly',
        positions: ['1B', '3B'],
        attributes: { battingStarPower: 3.1 },
        batting: [0.187, 0.229, 0.23, 0.279, 0.412, 0.67, 0.871, 1.0],
        stats: stats.eagly
      }),
      new Player({
        id: 'goose',
        name: 'Goose',
        positions: ['2B', 'SS', '3B'],
        attributes: { battingStarPower: 3.3 },
        batting: [0.174, 0.229, 0.23, 0.274, 0.411, 0.63, 0.862, 1.0],
        stats: stats.goose
      }),
      new Player({
        id: 'paz',
        name: 'Paz',
        positions: ['P'],
        attributes: {
          battingStarPower: 3.5,
          pitchingStarPower: 3,
          fatigue: (ip: number) => 0.227576 * ip - 0.289091
        },
        batting: [0.167, 0.227, 0.228, 0.284, 0.426, 0.696, 0.895, 1.0],
        pitching: [0.182, 0.216, 0.217, 0.239, 0.303, 0.517, 0.715, 1.0],
        stats: stats.paz
      }),
      new Player({
        id: 'quackers',
        name: 'Quackers',
        positions: ['LF', 'CF', 'RF'],
        attributes: { battingStarPower: 3 },
        batting: [0.232, 0.294, 0.326, 0.341, 0.386, 0.554, 0.822, 1.0],
        stats: stats.quackers
      }),
      new Player({
        id: 'quacky',
        name: 'Quacky',
        positions: ['LF', 'CF', 'RF'],
        attributes: { battingStarPower: 2.75 },
        batting: [0.222, 0.272, 0.289, 0.314, 0.371, 0.556, 0.838, 1.0],
        stats: stats.quacky
      }),
      new Player({
        id: 'screech',
        name: 'Screech',
        positions: ['C', '1B'],
        attributes: {
          battingStarPower: 3
        },
        batting: [0.16, 0.199, 0.2, 0.259, 0.389, 0.676, 0.856, 1.0],
        stats: stats.screech
      }),
      new Player({
        id: 'stretch',
        name: 'Stretch',
        positions: ['C', '2B', 'SS', 'RF'],
        attributes: { battingStarPower: 2 },
        batting: [0.175, 0.227, 0.231, 0.266, 0.376, 0.591, 0.847, 1.0],
        stats: stats.stretch
      }),
      new Player({
        id: 'wadell',
        name: 'Wadell',
        positions: ['LF', 'RF'],
        attributes: { battingStarPower: 0 },
        batting: [0.145, 0.157, 0.158, 0.162, 0.194, 0.306, 0.712, 1.0],
        stats: stats.wadell
      }),
      new Player({
        id: 'weiser',
        name: 'Weiser',
        positions: ['1B', '2B', 'SS', '3B'],
        attributes: { battingStarPower: 3 },
        batting: [0.189, 0.249, 0.25, 0.292, 0.423, 0.671, 0.884, 1.0],
        stats: stats.weiser
      })
    ],
    defaultLineup: {
      quackers: 'CF',
      quacky: 'LF',
      eagly: '3B',
      paz: 'P',
      goose: '2B',
      screech: '1B',
      weiser: 'SS',
      stretch: 'C',
      wadell: 'RF'
    }
  })

export default birds
