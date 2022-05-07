import { Player, Position, Starter, Team } from '../src/model'
import { PlayerId } from '../src/store/types/team'
import { players, roster } from './player'

const updatePlayerNamesForTeam = (
  idToPlayer: Record<string, Player>,
  prefix: string
): Record<string, Player> =>
  Object.values(idToPlayer).reduce((acc, player) => {
    player.name = `${prefix} ${player.name}`
    return {
      ...acc,
      [player.id]: player
    }
  }, {})

export const buildStarters = (idToPlayer: Record<string, Player>): Starter[] =>
  Object.values(idToPlayer).map(({ id, eligiblePositions }) => ({
    playerId: id,
    position: eligiblePositions[0]
  }))

const awayPlayers = updatePlayerNamesForTeam(roster, 'Away')
const homePlayers = updatePlayerNamesForTeam(roster, 'Home')

export const away = new Team({
  name: 'Away Team',
  primaryColor: 'red',
  secondaryColor: 'blue',
  roster: awayPlayers
})

away.setStarters(buildStarters(awayPlayers))

export const home = new Team({
  name: 'Home Team',
  primaryColor: 'green',
  secondaryColor: 'yellow',
  roster: homePlayers
})

home.setStarters(buildStarters(homePlayers))

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
