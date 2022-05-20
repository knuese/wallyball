import { Player, Position } from '../../../model'

export type PlayerJson = {
  name: string
  positions: Position[]
  attributes: Record<string, any>
  batting: number[]
  pitching?: number[]
}

export const idForName = (players: Player[], name: string): string =>
  (players.find((p) => p.name === name) as Player).id
