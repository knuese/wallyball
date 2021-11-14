import { Outcome } from '../..'
import { GrounderUtil } from './grounder'

type BaseMap = {
  first: boolean
  second: boolean
  third: boolean
}

type RunnerResponse = {
  runsScored: number
  outs: number
}

export class Bases {
  private bases: BaseMap

  constructor(
    bases: BaseMap = {
      first: false,
      second: false,
      third: false
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

  static strToMap(str: string): BaseMap {
    if (!/^[01]{3}$/.test(str)) {
      throw new Error('invalid base string provided')
    }

    return {
      first: str.charAt(2) === '1',
      second: str.charAt(1) === '1',
      third: str.charAt(0) === '1'
    }
  }

  clear(): void {
    this.bases = {
      first: false,
      second: false,
      third: false
    }
  }

  advanceRunners(outcome: Outcome, numOuts: number): RunnerResponse {
    let runsScored = 0
    let outs = 0

    switch (outcome) {
      case Outcome.SINGLE:
        if (this.bases.third) {
          runsScored = 1
        }

        this.bases = {
          first: true,
          second: this.bases.first,
          third: this.bases.second
        }
        break
      case Outcome.DOUBLE:
        runsScored = [this.bases.second, this.bases.third].filter(
          (v) => v
        ).length

        this.bases = {
          first: false,
          second: true,
          third: this.bases.first
        }
        break
      case Outcome.TRIPLE:
        runsScored = Object.values(this.bases).filter((v) => v).length

        this.bases = {
          first: false,
          second: false,
          third: true
        }
        break
      case Outcome.HOME_RUN:
        runsScored = Object.values(this.bases).filter((v) => v).length + 1
        this.bases = {
          first: false,
          second: false,
          third: false
        }
        break
      case Outcome.WALK:
        runsScored = Object.values(this.bases).every((v) => v) ? 1 : 0
        this.bases = {
          first: true,
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
          third: false
        }

        break
      case Outcome.GROUNDER:
        if (numOuts < 2) {
          const {
            newBases,
            runs,
            outs: outsRecorded
          } = GrounderUtil.calc(this.toBinaryStr(), numOuts)

          this.bases = Bases.strToMap(newBases)
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
