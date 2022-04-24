import { Player, Position } from '..'

export type Starter = {
  playerId: string
  position: Position | string
}

type Defense = Record<Position, string>

export type BoxScore = {
  box: Record<string, string>[]
  doubles: string
  triples: string
  homeRuns: string
}

export type BattingExtra = {
  doubles?: string[]
  triples?: string[]
  homeRuns?: string[]
}

export class Team {
  name: string
  players: Record<string, Player>
  primaryColor: string
  secondaryColor: string
  private battingOrder?: string[]
  private defense?: Defense
  private batterIndex: number

  constructor(
    name: string,
    primaryColor: string,
    secondaryColor: string,
    players: Record<string, Player>,
    starters: Starter[]
  ) {
    this.name = name
    this.primaryColor = primaryColor
    this.secondaryColor = secondaryColor
    this.players = players
    this.batterIndex = 0

    this.setStarters(starters)
  }

  getPlayerList(): Player[] {
    return Object.values(this.players)
  }

  private setStarters(starters: Starter[]): void {
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

  currentBatter(): Player {
    if (!this.battingOrder) {
      throw new Error('batting order not defined!')
    }

    const playerId = this.battingOrder[this.batterIndex]
    return this.players[playerId]
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

  getBattingLines(): Array<string | number>[] {
    if (!this.battingOrder) {
      throw new Error('batting order not defined')
    }

    return this.battingOrder.map((playerId) => {
      const player = this.players[playerId]
      const { batting } = player.getGameStats()

      return [
        player.name,
        batting.atBats,
        batting.runs,
        batting.hits,
        batting.rbis,
        batting.walks,
        batting.strikeouts,
        '.000'
      ]
    })
  }

  getBattingExtra(): BattingExtra {
    const doubles: string[] = []
    const triples: string[] = []
    const homeRuns: string[] = []

    for (const player of Object.values(this.players)) {
      const { batting: battingStats } = player.getGameStats()
      const doubleCount = battingStats.doubles
      const tripleCount = battingStats.triples
      const homeRunCount = battingStats.homeRuns

      const extras = [
        [doubleCount, doubles],
        [tripleCount, triples],
        [homeRunCount, homeRuns]
      ]

      for (const [count, array] of extras) {
        if (count > 0) {
          ;(array as string[]).push(
            `${player.name}${count > 1 ? ` (${count})` : ''}`
          )
        }
      }
    }

    return { doubles, triples, homeRuns }
  }

  getPitchingLines(): Array<string | number>[] {
    if (!this.defense) {
      throw new Error('defense not defined')
    }

    const pitcher = this.defenderAt(Position.PITCHER)
    const { pitching } = pitcher.getGameStats()

    return [
      [
        pitcher.name,
        pitching.inningsPitched,
        pitching.hits,
        pitching.runs,
        pitching.earnedRuns,
        pitching.walks,
        pitching.strikeouts,
        '0.00'
      ]
    ]
  }
}
