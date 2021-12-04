import { Outcome, Player } from '../..'
import { FlyUtil } from './util/fly'
import { GrounderUtil } from './util/grounder'

export type Runner = {
  id: string
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

  getBases(): BaseMap {
    return { ...this.bases }
  }

  clear(): void {
    this.bases = {
      first: null,
      second: null,
      third: null
    }
  }

  advanceRunners({
    batter,
    pitcher,
    outcome,
    rawValue,
    numOuts,
    useBatterStats
  }: {
    batter: Player,
    pitcher: Player,
    outcome: Outcome,
    rawValue: number,
    numOuts: number,
    useBatterStats: boolean
  }): RunnerResponse {
    let runnersScored: string[] = []
    let outs = 0

    const nonNull = (r: Runner | null): r is Runner => r !== null
    const basesLoaded = Object.values(this.bases).every((v) => v)

    switch (outcome) {
      case Outcome.SINGLE:
        if (this.bases.third) {
          runnersScored = [this.bases.third.id]
        }

        this.bases = {
          first: { id: batter.id },
          second: this.bases.first,
          third: this.bases.second
        }
        break
      case Outcome.DOUBLE:
        runnersScored = [this.bases.second, this.bases.third]
          .filter(nonNull)
          .map(({ id }) => id)

        this.bases = {
          first: null,
          second: { id: batter.id },
          third: this.bases.first
        }
        break
      case Outcome.TRIPLE:
        runnersScored = Object.values(this.bases)
          .filter(nonNull)
          .map(({ id }) => id)

        this.bases = {
          first: null,
          second: null,
          third: { id: batter.id }
        }
        break
      case Outcome.HOME_RUN:
        runnersScored = Object.values(this.bases)
          .filter(nonNull)
          .map(({ id }) => id)
        runnersScored.push(batter.id)

        this.bases = {
          first: null,
          second: null,
          third: null
        }
        break
      case Outcome.WALK:
        if (basesLoaded) {
          runnersScored = [this.bases.third?.id as string]
        }

        this.bases = {
          first: { id: batter.id },
          second: this.bases.first || this.bases.second,
          third: (this.bases.first && this.bases.second) || this.bases.third
        }
        break
      case Outcome.FLY:
        outs = 1

        if (numOuts < 2) {
          const statConfig = useBatterStats
            ? batter.getBattingThresholds()
            : pitcher.getPitchingThresholds()
          const {
            newBases,
            runnersScored: runnersScoredOnFly
          } = FlyUtil.calc(statConfig, rawValue, this.bases)

          runnersScored = [...runnersScoredOnFly]
          this.bases = { ...newBases }
        }
        break
      case Outcome.GROUNDER:
        if (numOuts < 2) {
          const {
            newBases,
            runnersScored: runnersScoredOnGrounder,
            outs: outsRecorded
          } = GrounderUtil.calc(batter.id, this.bases, numOuts)

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
