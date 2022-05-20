import { Player, Position, Starter, Team } from '../src/model'
import { PlayerId } from '../src/store/types/team'
import { players, roster } from './player'

export const buildStarters = (roster: Record<string, Player>): Starter[] =>
  Object.values(roster).map(({ id, eligiblePositions }) => ({
    playerId: id,
    position: eligiblePositions[0]
  }))

const awayPlayers = Object.entries(roster).reduce((acc, [id, player]) => {
  const newId = `away-${id}`
  return { ...acc, [newId]: player.clone(newId) }
}, {})

const homePlayers = Object.entries(roster).reduce((acc, [id, player]) => {
  const newId = `home-${id}`
  return { ...acc, [newId]: player.clone(newId) }
}, {})

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
