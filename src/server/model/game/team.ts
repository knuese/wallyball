import { Player, Position } from '..'

export type Starter = {
  playerId: string
  position: Position
}

type Defense = Record<Position, string>

export type BoxScore = {
  box: Record<string, string>[]
  doubles: string
  triples: string
  homeRuns: string
}

export class Team {
  name: string
  players: Record<string, Player>
  private battingOrder: string[]
  private defense: Defense
  private batterIndex: number

  constructor(
    name: string,
    players: Record<string, Player>,
    starters: Starter[]
  ) {
    if (starters.length !== 9) {
      throw new Error('must specify nine starters')
    }

    this.players = players
    this.battingOrder = starters.map(({ playerId }) => playerId)
    this.defense = starters.reduce((acc, { playerId, position }) => {
      const player = this.players[playerId]
      if (!player.canPlay(position)) {
        throw new Error(`${player.name} cannot play ${position}`)
      }

      return { ...acc, [position]: playerId }
    }, {} as Defense)

    if (Object.keys(this.defense).length !== 9) {
      throw new Error('must specify a player for every position')
    }

    this.name = name
    this.batterIndex = 0
  }

  nextBatter(): Player {
    const i = this.batterIndex % 9
    this.batterIndex++

    const playerId = this.battingOrder[i]
    return this.players[playerId]
  }

  defenderAt(position: Position): Player {
    return this.players[this.defense[position]]
  }

  getBoxScore(): BoxScore {
    const box = this.battingOrder.map((playerId) => {
      const player = this.players[playerId]
      return {
        name: player.name,
        ...player.getBattingStatLine()
      }
    }) as Record<string, string>[]

    const playersForHitType = (key: string): string => {
      return this.battingOrder
        .map((playerId) => this.players[playerId])
        .filter((p) => p.gameStats.batting[key] > 0)
        .map(
          (p) =>
            `${p.name}${
              p.gameStats.batting[key] > 1
                ? ` (${p.gameStats.batting[key]})`
                : ''
            }`
        )
        .join(', ')
    }

    return {
      box,
      doubles: playersForHitType('doubles'),
      triples: playersForHitType('triples'),
      homeRuns: playersForHitType('homeRuns')
    }
  }
}
