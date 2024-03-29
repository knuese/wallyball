import { Defense, Lineup, Player } from '../model'

export const isLineupFull = (lineup: Lineup): boolean =>
  Object.values(lineup).filter((v) => v).length === 9

export const isDefenseValid = (defense: Defense): boolean =>
  new Set(Object.values(defense)).size === 9

export const buildStarters = ({
  lineup,
  defense
}: {
  lineup: Lineup
  defense: Defense
}) =>
  Object.entries(lineup)
    .sort(([indexOne], [indexTwo]) => Number(indexOne) - Number(indexTwo))
    .map(([_index, playerId]) => ({
      playerId,
      position: defense[playerId]
    }))

export const getPlayerById = (
  players: Player[],
  id: string
): Player | undefined => {
  return players.find((p) => p.id === id)
}
