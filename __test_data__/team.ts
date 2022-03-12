import { Player, Position, Team } from '../src/model'
import { PlayerId } from '../src/store/types/team'
import { mappedPlayers, players } from './player'

const updatePlayerNamesForTeam = (
  idToPlayer: Record<string, Player>,
  prefix: string
): Record<string, Player> =>
  Object.values(idToPlayer).reduce((acc, player) => {
    const newPlayer = new Player(
      `${prefix} ${player.name}`,
      player.eligiblePositions,
      player.battingConfig,
      player.pitchingConfig
    )
    return {
      ...acc,
      [newPlayer.id]: newPlayer
    }
  }, {})

const buildStarters = (idToPlayer: Record<string, Player>) =>
  Object.values(idToPlayer).map(({ id, eligiblePositions }) => ({
    playerId: id,
    position: eligiblePositions[0]
  }))

const awayPlayers = updatePlayerNamesForTeam(mappedPlayers, 'Away')
const homePlayers = updatePlayerNamesForTeam(mappedPlayers, 'Home')

export const away = new Team(
  'Away Team',
  'red',
  'blue',
  awayPlayers,
  buildStarters(awayPlayers)
)

export const home = new Team(
  'Home Team',
  'green',
  'yellow',
  homePlayers,
  buildStarters(homePlayers)
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
