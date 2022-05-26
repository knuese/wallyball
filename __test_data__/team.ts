import { Player, Position, Starter, Team } from '../src/model'
import { players } from './player'

export const buildStarters = (roster: Array<Player>): Starter[] =>
  roster.map(({ id, eligiblePositions }) => ({
    playerId: id,
    position: eligiblePositions[0]
  }))

const awayPlayers = players.map((player) => player.clone(`away-${player.id}`))
const homePlayers = players.map((player) => player.clone(`home-${player.id}`))

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

export const lineup: Record<string, string> = players.reduce(
  (acc, cur, i) => ({ ...acc, [i]: cur.id }),
  {}
)

export const defense: Record<string, Position> = players.reduce(
  (acc, cur) => ({ ...acc, [cur.id]: cur.eligiblePositions[0] }),
  {}
)
