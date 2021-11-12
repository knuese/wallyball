import { Player, Position } from '..'

type Starter = {
  player: Player
  position: Position
  battingSpot: number
}

type Defense = Record<Position, Player>

export class Lineup {
  battingOrder: Player[]
  defense: Defense
  bench: Player[]
  ineligiblePlayers: Player[]
  private batterIndex: number

  constructor(
    starters: Starter[],
    bench: Player[],
    ineligiblePlayers: Player[]
  ) {
    if (starters.length !== 9) {
      throw new Error('must specify nine starters')
    }

    this.battingOrder = starters
      .sort((one, two) => one.battingSpot - two.battingSpot)
      .map(({ player }) => player)

    this.defense = starters.reduce((acc, { player, position }) => {
      if (!player.canPlay(position)) {
        throw new Error(`${player.name} cannot play ${position}`)
      }

      return { ...acc, [position]: player }
    }, {} as Defense)

    if (Object.keys(this.defense).length !== 9) {
      throw new Error('must specify a player for every position')
    }

    this.bench = bench
    this.ineligiblePlayers = ineligiblePlayers
    this.batterIndex = 0
  }

  nextBatter(): Player {
    const i = this.batterIndex % 9
    this.batterIndex++
    return this.battingOrder[i]
  }
}
