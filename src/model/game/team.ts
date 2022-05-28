import { Player, Position } from '..'
import { getAverage } from '../../util'

export type Starter = {
  playerId: string
  position: Position | string
}

export type PlayerId = string
export type Lineup = Record<string, PlayerId>
export type Defense = Record<PlayerId, Position>

export type BoxScore = {
  box: Record<string, string>[]
  doubles: string
  triples: string
  homeRuns: string
}

export type BattingExtra = {
  doubles: string[]
  triples: string[]
  homeRuns: string[]
}

export type TeamProps = {
  name: string
  primaryColor: string
  secondaryColor: string
  roster: Player[]
  defaultLineup?: Record<string, string>
}

export class Team {
  readonly name: string
  readonly primaryColor: string
  readonly secondaryColor: string
  private roster: Record<string, Player>
  private defaultLineup?: Record<string, string>
  private battingOrder: string[]
  private defense: Defense
  private batterIndex: number

  constructor({
    name,
    primaryColor,
    secondaryColor,
    roster,
    defaultLineup
  }: TeamProps) {
    this.name = name
    this.primaryColor = primaryColor
    this.secondaryColor = secondaryColor
    this.roster = roster.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
    this.batterIndex = 0

    this.defaultLineup = defaultLineup
    this.battingOrder = []
    this.defense = {} as any
  }

  isReady(): boolean {
    return (
      this.battingOrder.length === 9 && Object.keys(this.defense).length === 9
    )
  }

  getRoster(): Player[] {
    return Object.values(this.roster)
  }

  getPlayer(playerId: string): Player {
    return this.roster[playerId].clone(playerId)
  }

  getDefaultLineup(): Record<string, string> | undefined {
    return this.defaultLineup
  }

  setStarters(starters: Starter[]): void {
    if (starters.length !== 9) {
      throw new Error('must specify nine starters')
    }

    this.battingOrder = starters.map(({ playerId }) => playerId)
    this.defense = starters.reduce((acc, { playerId, position }) => {
      const player = this.roster[playerId]
      if (!player.canPlay(position)) {
        throw new Error(`${player.name} cannot play ${position}`)
      }

      return { ...acc, [position]: playerId }
    }, {} as any)

    if (Object.keys(this.defense).length !== 9) {
      throw new Error('must specify a player for every position')
    }
  }

  clearStarters(): void {
    this.battingOrder = []
    this.defense = {} as any
  }

  currentBatter(): Player {
    const playerId = this.battingOrder[this.batterIndex % 9]
    const player = this.roster[playerId]

    if (!player) {
      throw new Error('current batter not defined!')
    }

    return player
  }

  nextBatter(): Player {
    const i = this.batterIndex % 9
    this.batterIndex++

    const playerId = this.battingOrder[i]
    const player = this.roster[playerId]

    if (!player) {
      throw new Error('next batter not defined!')
    }

    return player
  }

  defenderAt(position: Position): Player {
    const player = this.roster[this.defense[position]]

    if (!player) {
      throw new Error(`no player found at position ${position}`)
    }

    return player
  }

  playerScored(playerId: string): void {
    this.roster[playerId].scored()
  }

  getBattingLines(): Array<string | number>[] {
    return this.battingOrder.map((playerId) => {
      const player = this.roster[playerId]
      const { batting } = player.getGameStats()

      return [
        player.name,
        batting.atBats,
        batting.runs,
        batting.hits,
        batting.rbis,
        batting.walks,
        batting.strikeouts,
        getAverage(player)
      ]
    })
  }

  getBattingExtra(): BattingExtra {
    const doubles: string[] = []
    const triples: string[] = []
    const homeRuns: string[] = []

    for (const player of Object.values(this.roster)) {
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
