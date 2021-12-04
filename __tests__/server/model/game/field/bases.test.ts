import { Bases, Outcome } from '../../../../../src/server/model'
import {
  bases as baseMaps,
  batter,
  first,
  second,
  third
} from '../../../../../__test_data__'

describe('bases', () => {
  describe('getBases', () => {
    it('returns the base map', () => {
      const bases = new Bases({ ...baseMaps['001'] })
      expect(bases.getBases()).toEqual({ ...baseMaps['001'] })
    })
  })

  describe('clear', () => {
    it('clears the bases', () => {
      const bases = new Bases({ ...baseMaps['111'] })
      bases.clear()
      expect(bases.getBases()).toEqual({ ...baseMaps['000'] })
    })
  })

  describe('advanceRunners', () => {
    describe('single', () => {
      it('puts a runner on first', () => {
        const bases = new Bases()
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.SINGLE,
          0
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: batter,
          second: null,
          third: null
        })
      })

      it('advances a runner that is on base', () => {
        const bases = new Bases({ ...baseMaps['010'] })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.SINGLE,
          0
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: batter,
          second: null,
          third: second
        })
      })

      it('scores a run if someone is on third', () => {
        const bases = new Bases({ ...baseMaps['100'] })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.SINGLE,
          0
        )

        expect(runnersScored).toEqual([third.id])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: batter,
          second: null,
          third: null
        })
      })
    })

    describe('double', () => {
      it('puts a runner on second', () => {
        const bases = new Bases()
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.DOUBLE,
          0
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: null,
          second: batter,
          third: null
        })
      })

      it('advances a runner that is on base', () => {
        const bases = new Bases({ ...baseMaps['001'] })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.DOUBLE,
          0
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: null,
          second: batter,
          third: first
        })
      })

      it.each([
        [[second.id], baseMaps['010']],
        [[second.id, third.id], baseMaps['110']]
      ])('%s score runs for runners %s', (runs, baseMap) => {
        const bases = new Bases({ ...baseMap })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.DOUBLE,
          0
        )

        expect(runnersScored).toEqual(runs)
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: null,
          second: batter,
          third: null
        })
      })
    })

    describe('triple', () => {
      it('puts a runner on third', () => {
        const bases = new Bases()
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.TRIPLE,
          0
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: null,
          second: null,
          third: batter
        })
      })

      it.each([
        [[first.id], baseMaps['001']],
        [[first.id, second.id], baseMaps['011']],
        [[first.id, second.id, third.id], baseMaps['111']]
      ])('%s score for runners %s', (runs, baseMap) => {
        const bases = new Bases({ ...baseMap })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.TRIPLE,
          0
        )

        expect(runnersScored).toEqual(runs)
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: null,
          second: null,
          third: batter
        })
      })
    })

    describe('home run', () => {
      it.each([
        [[batter.id], baseMaps['000']],
        [[batter.id, third.id], baseMaps['100']],
        [[batter.id, first.id, second.id], baseMaps['011']],
        [[batter.id, first.id, second.id, third.id], baseMaps['111']]
      ])('%s score for runners %s', (runs, baseMap) => {
        const bases = new Bases({ ...baseMap })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.HOME_RUN,
          0
        )

        expect(runnersScored.sort()).toEqual(runs.sort())
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({ ...baseMaps['000'] })
      })
    })

    describe('walk', () => {
      it('puts a runner on first', () => {
        const bases = new Bases()
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.WALK,
          0
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: batter,
          second: null,
          third: null
        })
      })

      it('scores if the bases are loaded', () => {
        const bases = new Bases({ ...baseMaps['111'] })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.WALK,
          0
        )

        expect(runnersScored).toEqual([third.id])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({
          first: batter,
          second: first,
          third: second
        })
      })

      it.each([
        [baseMaps['001'], { first: batter, second: first, third: null }],
        [baseMaps['010'], { first: batter, second, third: null }],
        [baseMaps['011'], { first: batter, second: first, third: second }],
        [baseMaps['100'], { first: batter, second: null, third }],
        [baseMaps['101'], { first: batter, second: first, third }],
        [baseMaps['110'], { first: batter, second, third }]
      ])('determines the runners for bases %s', (baseMap, expected) => {
        const bases = new Bases({ ...baseMap })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.WALK,
          0
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(0)
        expect(bases.getBases()).toEqual({ ...expected })
      })
    })

    describe('grounder', () => {
      it('returns an out if there are already two outs', () => {
        const bases = new Bases({ ...baseMaps['111'] })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.GROUNDER,
          2
        )

        expect(runnersScored).toEqual([])
        expect(outs).toEqual(1)
      })

      it('uses the GrounderUtil if there are less than two outs', () => {
        const bases = new Bases({ ...baseMaps['101'] })
        const { runnersScored, outs } = bases.advanceRunners(
          batter,
          Outcome.GROUNDER,
          0
        )

        expect(runnersScored).toEqual([third.id])
        expect(outs).toEqual(2)
        expect(bases.getBases()).toEqual({ ...baseMaps['000'] })
      })
    })
  })
})
