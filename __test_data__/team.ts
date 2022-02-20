import { Position, Team } from '../src/model'
import { PlayerId } from '../src/store/types/team'
import { mappedPlayers, players } from './player'

export const team = new Team('Test Team', 'red', 'blue', mappedPlayers)

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
