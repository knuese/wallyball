import { Player, Position } from '..'

export type TeamLabel = {
  name: string
  color: string
  background: string
}

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
  primaryColor: string
  secondaryColor: string
  label: TeamLabel
  private battingOrder?: string[]
  private defense?: Defense
  private batterIndex: number

  constructor(
    name: string,
    primaryColor: string,
    secondaryColor: string,
    players: Record<string, Player>
  ) {
    this.name = name
    this.primaryColor = primaryColor
    this.secondaryColor = secondaryColor
    this.players = players
    this.batterIndex = 0

    this.label = {
      name,
      color: secondaryColor,
      background: primaryColor
    }
  }

  getPlayerList(): Player[] {
    return Object.values(this.players)
  }

  setStarters(starters: Starter[]): void {
    if (starters.length !== 9) {
      throw new Error('must specify nine starters')
    }

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
  }

  nextBatter(): Player {
    if (!this.battingOrder) {
      throw new Error('batting order not defined!')
    }

    const i = this.batterIndex % 9
    this.batterIndex++

    const playerId = this.battingOrder[i]
    return this.players[playerId]
  }

  peekNextBatter(): Player {
    if (!this.battingOrder) {
      throw new Error('batting order not defined!')
    }

    const i = this.batterIndex % 9
    const playerId = this.battingOrder[i]
    return this.players[playerId]
  }

  defenderAt(position: Position): Player {
    if (!this.defense) {
      throw new Error('batting order not defined!')
    }

    return this.players[this.defense[position]]
  }

  getBattingLines(): string[][] {
    if (!this.battingOrder) {
      throw new Error('batting order not defined')
    }

    return this.battingOrder.map((playerId) => [
      this.players[playerId].name,
      '0',
      '0',
      '0',
      '0',
      '0',
      '0'
    ])
  }

  getPitchingLines(): string[][] {
    if (!this.defense) {
      throw new Error('defense not defined')
    }

    return [
      [this.defenderAt(Position.PITCHER).name, '0.0', '0', '0', '0', '0', '0']
    ]
  }

  // getBoxScore(): BoxScore {
  //   if (!this.battingOrder) {
  //     throw new Error('batting order not defined!')
  //   }

  //   const box = this.battingOrder.map((playerId) => {
  //     const player = this.players[playerId]
  //     return {
  //       name: player.name,
  //       ...player.getBattingStatLine()
  //     }
  //   }) as Record<string, string>[]

  //   const playersForHitType = (key: string): string => {
  //     if (!this.battingOrder) {
  //       throw new Error('batting order not defined!')
  //     }

  //     return this.battingOrder
  //       .map((playerId) => this.players[playerId])
  //       .filter((p) => p.gameStats.batting[key] > 0)
  //       .map(
  //         (p) =>
  //           `${p.name}${
  //             p.gameStats.batting[key] > 1
  //               ? ` (${p.gameStats.batting[key]})`
  //               : ''
  //           }`
  //       )
  //       .join(', ')
  //   }

  //   return {
  //     box,
  //     doubles: playersForHitType('doubles'),
  //     triples: playersForHitType('triples'),
  //     homeRuns: playersForHitType('homeRuns')
  //   }
  // }
}
