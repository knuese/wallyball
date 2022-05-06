import {
  BattingConfig,
  PitchingConfig,
  Player,
  Position,
  Team
} from '../../model'

type PlayerJson = {
  name: string
  positions: Position[]
  batting: {
    thresholds: number[]
    starPower: number
  }
  pitching?: {
    thresholds: number[]
    starPower: number
  }
}

const idForName = (players: Player[], name: string): string =>
  (players.find((p) => p.name === name) as Player).id

const bearsJson = {
  name: 'Bears',
  primaryColor: '#841B2D',
  secondaryColor: '#DEB887',
  players: [
    {
      name: 'Bo Bo',
      positions: ['1B'],
      batting: {
        thresholds: [0.139, 0.162, 0.163, 0.258, 0.371, 0.659, 0.867, 1.0],
        starPower: 3
      }
    },
    {
      name: 'Buster',
      positions: ['2B', 'SS', '3B', 'RF', 'LF'],
      batting: {
        thresholds: [0.191, 0.253, 0.257, 0.294, 0.378, 0.557, 0.797, 1.0],
        starPower: 3.3
      }
    },
    {
      name: 'Cappy',
      positions: ['2B', 'SS', '3B'],
      batting: {
        thresholds: [0.16, 0.199, 0.2, 0.25, 0.327, 0.569, 0.798, 1.0],
        starPower: 2
      }
    },
    {
      name: 'Cupcake',
      positions: ['P', '2B', 'CF'],
      batting: {
        thresholds: [0.168, 0.214, 0.215, 0.247, 0.322, 0.55, 0.747, 1.0],
        starPower: 2
      }
    },
    {
      name: 'Sammy',
      positions: ['LF', 'CF', 'RF'],
      batting: {
        thresholds: [0.184, 0.235, 0.248, 0.263, 0.32, 0.501, 0.699, 1.0],
        starPower: 1.5
      }
    },
    {
      name: 'September',
      positions: ['P'],
      batting: {
        thresholds: [0.162, 0.185, 0.187, 0.198, 0.232, 0.438, 0.688, 1.0],
        starPower: -0.75
      },
      pitching: {
        thresholds: [0.175, 0.194, 0.195, 0.213, 0.268, 0.506, 0.715, 1.0],
        starPower: 4.25
      }
    },
    {
      name: 'Spanky',
      positions: ['P', '1B', '3B'],
      batting: {
        thresholds: [0.16, 0.196, 0.197, 0.264, 0.387, 0.644, 0.837, 1.0],
        starPower: 3.75
      }
    },
    {
      name: 'Sparey',
      positions: ['2B', '3B'],
      batting: {
        thresholds: [0.174, 0.211, 0.212, 0.26, 0.358, 0.598, 0.81, 1.0],
        starPower: 2.75
      }
    },
    {
      name: 'Tush',
      positions: ['P', 'C'],
      batting: {
        thresholds: [0.201, 0.253, 0.255, 0.304, 0.406, 0.629, 0.82, 1.0],
        starPower: 4.5
      }
    }
  ] as PlayerJson[]
}

const turtlesJson = {
  name: 'Turtles',
  primaryColor: '#007F5C',
  secondaryColor: '#A7FC00',
  players: [
    {
      name: 'Browny',
      positions: ['1B', 'C'],
      batting: {
        thresholds: [0.114, 0.137, 0.138, 0.236, 0.367, 0.666, 0.846, 1.0],
        starPower: 4
      }
    },
    {
      name: 'Chan',
      positions: ['LF', 'CF', 'RF'],
      batting: {
        thresholds: [0.204, 0.273, 0.283, 0.327, 0.441, 0.65, 0.827, 1.0],
        starPower: 5
      }
    },
    {
      name: 'Cookie',
      positions: ['2B', '3B', 'RF'],
      batting: {
        thresholds: [0.177, 0.225, 0.23, 0.265, 0.339, 0.522, 0.761, 1.0],
        starPower: 0.5
      }
    },
    {
      name: 'Gary',
      positions: ['P', 'SS'],
      batting: {
        thresholds: [0.153, 0.179, 0.18, 0.201, 0.287, 0.479, 0.687, 1.0],
        starPower: -1
      },
      pitching: {
        thresholds: [0.166, 0.185, 0.186, 0.201, 0.26, 0.5, 0.777, 1.0],
        starPower: 5
      }
    },
    {
      name: 'George',
      positions: ['P', 'SS'],
      batting: {
        thresholds: [0.195, 0.236, 0.237, 0.262, 0.314, 0.515, 0.723, 1.0],
        starPower: 0.25
      }
    },
    {
      name: 'Glen',
      positions: ['2B', 'SS', '3B'],
      batting: {
        thresholds: [0.182, 0.238, 0.24, 0.275, 0.356, 0.555, 0.778, 1.0],
        starPower: 1.5
      }
    },
    {
      name: 'Guss',
      positions: ['1B', '3B'],
      batting: {
        thresholds: [0.122, 0.145, 0.146, 0.241, 0.37, 0.661, 0.857, 1.0],
        starPower: 4.1
      }
    },
    {
      name: 'Shells',
      positions: ['C', 'P'],
      batting: {
        thresholds: [0.143, 0.181, 0.182, 0.259, 0.37, 0.631, 0.848, 1.0],
        starPower: 2.75
      }
    },
    {
      name: 'Zoona',
      positions: ['LF', 'CF', 'RF'],
      batting: {
        thresholds: [0.233, 0.279, 0.294, 0.309, 0.367, 0.527, 0.731, 1.0],
        starPower: 2
      }
    }
  ] as PlayerJson[]
}

const bearPlayers = bearsJson.players.map(
  (p: PlayerJson) =>
    new Player(
      p.name,
      p.positions,
      new BattingConfig(p.batting.thresholds, p.batting.starPower),
      p.pitching ? new PitchingConfig(p.pitching.thresholds, p.pitching.starPower) : ([] as any)
    )
) as Player[]

const bearMap = bearPlayers.reduce(
  (acc, cur: Player) => ({ ...acc, [cur.id]: cur }),
  {}
) as Record<string, Player>

export const tempBears = new Team('Bears', '#841B2D', '#DEB887', bearMap, [
  { playerId: idForName(bearPlayers, 'Sammy'), position: Position.LEFT_FIELD },
  {
    playerId: idForName(bearPlayers, 'Buster'),
    position: Position.RIGHT_FIELD
  },
  { playerId: idForName(bearPlayers, 'Tush'), position: Position.CATCHER },
  { playerId: idForName(bearPlayers, 'Bo Bo'), position: Position.FIRST_BASE },
  { playerId: idForName(bearPlayers, 'Spanky'), position: Position.THIRD_BASE },
  {
    playerId: idForName(bearPlayers, 'Sparey'),
    position: Position.SECOND_BASE
  },
  { playerId: idForName(bearPlayers, 'Cappy'), position: Position.SHORTSTOP },
  {
    playerId: idForName(bearPlayers, 'Cupcake'),
    position: Position.CENTER_FIELD
  },
  { playerId: idForName(bearPlayers, 'September'), position: Position.PITCHER }
])

const turtlePlayers = turtlesJson.players.map(
  (p: PlayerJson) =>
    new Player(
      p.name,
      p.positions,
      new BattingConfig(p.batting.thresholds, p.batting.starPower),
      p.pitching ? new PitchingConfig(p.pitching.thresholds, p.pitching.starPower) : ([] as any)
    )
) as Player[]

const turtleMap = turtlePlayers.reduce(
  (acc, cur: Player) => ({ ...acc, [cur.id]: cur }),
  {}
) as Record<string, Player>

export const tempTurtles = new Team(
  'Turtles',
  '#007F5C',
  '#A7FC00',
  turtleMap,
  [
    {
      playerId: idForName(turtlePlayers, 'Zoona'),
      position: Position.CENTER_FIELD
    },
    {
      playerId: idForName(turtlePlayers, 'Chan'),
      position: Position.LEFT_FIELD
    },
    {
      playerId: idForName(turtlePlayers, 'Guss'),
      position: Position.THIRD_BASE
    },
    {
      playerId: idForName(turtlePlayers, 'Browny'),
      position: Position.FIRST_BASE
    },
    {
      playerId: idForName(turtlePlayers, 'Shells'),
      position: Position.CATCHER
    },
    {
      playerId: idForName(turtlePlayers, 'Glen'),
      position: Position.SECOND_BASE
    },
    {
      playerId: idForName(turtlePlayers, 'Cookie'),
      position: Position.RIGHT_FIELD
    },
    {
      playerId: idForName(turtlePlayers, 'George'),
      position: Position.SHORTSTOP
    },
    { playerId: idForName(turtlePlayers, 'Gary'), position: Position.PITCHER }
  ]
)
