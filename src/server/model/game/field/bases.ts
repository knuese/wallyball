import { Outcome, Player } from '../..'
import { GrounderUtil } from './util/grounder'

export type Runner = {
  playerId: string
  speed?: number
}

export type BaseMap = {
  first: Runner | null
  second: Runner | null
  third: Runner | null
}

type RunnerResponse = {
  runnersScored: string[]
  outs: number
}

export class Bases {
  private bases: BaseMap

  constructor(
    bases: BaseMap = {
      first: null,
      second: null,
      third: null
    }
  ) {
    this.bases = bases
  }

  toBinaryStr(): string {
    return (
      '' +
      Number(this.bases.third) +
      Number(this.bases.second) +
      Number(this.bases.first)
    )
  }

  clear(): void {
    this.bases = {
      first: null,
      second: null,
      third: null
    }
  }

  advanceRunners(
    batter: Player,
    outcome: Outcome,
    numOuts: number
  ): RunnerResponse {
    let runnersScored: string[] = []
    let outs = 0

    const nonNull = (r: Runner | null): r is Runner => r !== null
    const basesLoaded = Object.values(this.bases).every((v) => v)

    switch (outcome) {
      case Outcome.SINGLE:
        if (this.bases.third) {
          runnersScored = [this.bases.third.playerId]
        }

        this.bases = {
          first: { playerId: batter.id },
          second: this.bases.first,
          third: this.bases.second
        }
        break
      case Outcome.DOUBLE:
        runnersScored = [this.bases.second, this.bases.third]
          .filter(nonNull)
          .map(({ playerId }) => playerId)

        this.bases = {
          first: null,
          second: { playerId: batter.id },
          third: this.bases.first
        }
        break
      case Outcome.TRIPLE:
        runnersScored = Object.values(this.bases)
          .filter(nonNull)
          .map(({ playerId }) => playerId)

        this.bases = {
          first: null,
          second: null,
          third: { playerId: batter.id }
        }
        break
      case Outcome.HOME_RUN:
        runnersScored = Object.values(this.bases)
          .filter(nonNull)
          .map(({ playerId }) => playerId)
        runnersScored.push(batter.id)

        this.bases = {
          first: null,
          second: null,
          third: null
        }
        break
      case Outcome.WALK:
        if (basesLoaded) {
          runnersScored = [this.bases.third?.playerId as string]
        }

        this.bases = {
          first: { playerId: batter.id },
          second: this.bases.first || this.bases.second,
          third: (this.bases.first && this.bases.second) || this.bases.third
        }
        break
      case Outcome.FLY:
        outs = 1

        // TODO determine if fly was deep or shallow
        if (this.bases.third && numOuts < 2) {
          runnersScored = [this.bases.third.playerId]
        }

        this.bases = {
          first: this.bases.first,
          second: this.bases.second,
          third: null
        }

        break
      case Outcome.GROUNDER:
        if (numOuts < 2) {
          const {
            newBases,
            runnersScored: runnersScoredOnGrounder,
            outs: outsRecorded
          } = GrounderUtil.calc(batter, this.bases, numOuts)

          this.bases = { ...newBases }
          runnersScored = runnersScoredOnGrounder
          outs = outsRecorded
        } else {
          // inning is over
          outs = 1
        }
        break
    }

    return { runnersScored, outs }
  }
}
