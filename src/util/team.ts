import { Defense, Lineup } from '../model'

export const isLineupFull = (lineup: Lineup): boolean =>
  Object.values(lineup).filter((v) => v).length === 9

export const isDefenseValid = (defense: Defense): boolean =>
  new Set(Object.values(defense)).size === 9
