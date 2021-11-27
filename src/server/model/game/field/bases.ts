import { Outcome, Player } from '../..'
import { GrounderUtil } from './util/grounder'

export type BaseMap = {
  first: Player | null
  second: Player | null
  third: Player | null
}

type RunnerResponse = {
  runsScored: number
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
    let runsScored = 0
    let outs = 0
    let occupied

    const nonNull = (p: Player | null): p is Player => p !== null
    const basesLoaded = Object.values(this.bases).every((v) => v)

    switch (outcome) {
      case Outcome.SINGLE:
        if (this.bases.third) {
          runsScored = 1
          this.bases.third.scored()
        }

        this.bases = {
          first: batter,
          second: this.bases.first,
          third: this.bases.second
        }
        break
      case Outcome.DOUBLE:
        occupied = [this.bases.second, this.bases.third].filter(nonNull)
        runsScored = occupied.length
        occupied.forEach((p) => p?.scored())

        this.bases = {
          first: null,
          second: batter,
          third: this.bases.first
        }
        break
      case Outcome.TRIPLE:
        occupied = Object.values(this.bases).filter(nonNull)
        runsScored = occupied.length
        occupied.forEach((p) => p.scored())

        this.bases = {
          first: null,
          second: null,
          third: batter
        }
        break
      case Outcome.HOME_RUN:
        occupied = Object.values(this.bases).filter(nonNull)
        runsScored = occupied.length + 1
        occupied.forEach((p) => p.scored())

        this.bases = {
          first: null,
          second: null,
          third: null
        }
        break
      case Outcome.WALK:
        if (basesLoaded) {
          runsScored = 1
          this.bases.third?.scored()
        }

        this.bases = {
          first: batter,
          second: this.bases.first || this.bases.second,
          third: (this.bases.first && this.bases.second) || this.bases.third
        }
        break
      case Outcome.FLY:
        outs = 1

        // TODO determine if fly was deep or shallow
        if (this.bases.third && numOuts < 2) {
          runsScored = 1
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
            runs,
            outs: outsRecorded
          } = GrounderUtil.calc(batter, this.bases, numOuts)

          this.bases = { ...newBases }
          runsScored = runs
          outs = outsRecorded
        } else {
          // inning is over
          outs = 1
        }
        break
    }

    return { runsScored, outs }
  }
}
