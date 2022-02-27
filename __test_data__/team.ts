import { Player, Position, Team } from '../src/model'
import { PlayerId } from '../src/store/types/team'
import { mappedPlayers, players } from './player'

const updatePlayerNamesForTeam = (
  players: Record<string, Player>,
  prefix: string
): Record<string, Player> =>
  Object.entries(players).reduce(
    (acc, [id, player]) => ({
      ...acc,
      [id]: new Player(
        `${prefix} ${player.name}`,
        player.eligiblePositions,
        player.battingConfig,
        player.pitchingConfig
      )
    }),
    {}
  )

const starters = players.map(({ id, eligiblePositions }) => ({
  playerId: id,
  position: eligiblePositions[0]
}))

export const away = new Team(
  'Away Team',
  'red',
  'blue',
  updatePlayerNamesForTeam(mappedPlayers, 'Away'),
  starters
)

export const home = new Team(
  'Home Team',
  'green',
  'yellow',
  updatePlayerNamesForTeam(mappedPlayers, 'Home'),
  starters
)

export const lineup: Record<string, PlayerId> = players.reduce(
  (acc, cur, i) => ({
    ...acc,
    [i]: cur.id
  }),
  {}
)

export const defense: Record<PlayerId, Position> = players.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.id]: cur.eligiblePositions[0]
  }),
  {}
)
